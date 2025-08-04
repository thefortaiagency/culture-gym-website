import { NextResponse } from 'next/server'

// Extract calendar ID from the embed URL
const CALENDAR_ID = '1e9f4b53799fd25a1dca0d40fd26410c80c7c9af9b1a4d5e9a5ccdc01a64752f@group.calendar.google.com'
const API_KEY = process.env.GOOGLE_CALENDAR_API_KEY || ''

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const timeMin = searchParams.get('timeMin') || new Date().toISOString()
    const timeMax = searchParams.get('timeMax') || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days ahead
    
    // Option 1: Using Google Calendar API (requires API key)
    if (API_KEY) {
      const url = `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?` +
        `key=${API_KEY}&` +
        `timeMin=${timeMin}&` +
        `timeMax=${timeMax}&` +
        `singleEvents=true&` +
        `orderBy=startTime&` +
        `maxResults=100`
      
      const response = await fetch(url)
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error?.message || 'Failed to fetch calendar events')
      }
      
      // Transform Google Calendar events to our format
      const events = data.items?.map((event: any) => ({
        id: event.id,
        title: event.summary || 'Untitled Event',
        description: event.description || '',
        start: event.start?.dateTime || event.start?.date,
        end: event.end?.dateTime || event.end?.date,
        location: event.location || '',
        instructor: extractInstructor(event.summary, event.description),
        classType: extractClassType(event.summary),
        color: getClassColor(event.summary)
      })) || []
      
      return NextResponse.json({ events, source: 'api' })
    }
    
    // Option 2: Using public iCal feed (no API key needed)
    const icalUrl = `https://calendar.google.com/calendar/ical/${encodeURIComponent(CALENDAR_ID)}/public/basic.ics`
    const icalResponse = await fetch(icalUrl)
    
    if (!icalResponse.ok) {
      throw new Error('Failed to fetch calendar data')
    }
    
    const icalText = await icalResponse.text()
    const events = parseICalendar(icalText, timeMin, timeMax)
    
    return NextResponse.json({ events, source: 'ical' })
    
  } catch (error) {
    console.error('Calendar API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch calendar events', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

// Helper function to parse iCalendar format
function parseICalendar(icalText: string, timeMin: string, timeMax: string) {
  const events: any[] = []
  const lines = icalText.split(/\r?\n/)
  let currentEvent: any = null
  
  const minDate = new Date(timeMin)
  const maxDate = new Date(timeMax)
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim()
    
    if (line === 'BEGIN:VEVENT') {
      currentEvent = {}
    } else if (line === 'END:VEVENT' && currentEvent) {
      // Parse dates
      if (currentEvent.start) {
        const startDate = parseICalDate(currentEvent.start)
        const endDate = currentEvent.end ? parseICalDate(currentEvent.end) : startDate
        
        // Filter by date range
        if (startDate >= minDate && startDate <= maxDate) {
          events.push({
            id: currentEvent.uid || `event-${events.length}`,
            title: currentEvent.summary || 'Untitled Event',
            description: currentEvent.description || '',
            start: startDate.toISOString(),
            end: endDate.toISOString(),
            location: currentEvent.location || '',
            instructor: extractInstructor(currentEvent.summary, currentEvent.description),
            classType: extractClassType(currentEvent.summary),
            color: getClassColor(currentEvent.summary)
          })
        }
      }
      currentEvent = null
    } else if (currentEvent) {
      // Parse event properties
      const colonIndex = line.indexOf(':')
      if (colonIndex > 0) {
        const key = line.substring(0, colonIndex).split(';')[0]
        const value = line.substring(colonIndex + 1)
        
        switch (key) {
          case 'UID':
            currentEvent.uid = value
            break
          case 'SUMMARY':
            currentEvent.summary = value
            break
          case 'DESCRIPTION':
            currentEvent.description = value.replace(/\\n/g, '\n')
            break
          case 'LOCATION':
            currentEvent.location = value
            break
          case 'DTSTART':
            currentEvent.start = value
            break
          case 'DTEND':
            currentEvent.end = value
            break
        }
      }
    }
  }
  
  return events.sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime())
}

// Parse iCalendar date format (YYYYMMDDTHHMMSSZ or YYYYMMDD)
function parseICalDate(dateStr: string): Date {
  // Remove any timezone indicators for simplicity
  dateStr = dateStr.replace(/Z$/, '').replace(/^VALUE=DATE:/, '')
  
  if (dateStr.length === 8) {
    // Date only (YYYYMMDD)
    const year = parseInt(dateStr.substring(0, 4))
    const month = parseInt(dateStr.substring(4, 6)) - 1
    const day = parseInt(dateStr.substring(6, 8))
    return new Date(year, month, day)
  } else if (dateStr.includes('T')) {
    // Date and time (YYYYMMDDTHHMMSS)
    const datePart = dateStr.substring(0, 8)
    const timePart = dateStr.substring(9, 15)
    
    const year = parseInt(datePart.substring(0, 4))
    const month = parseInt(datePart.substring(4, 6)) - 1
    const day = parseInt(datePart.substring(6, 8))
    
    const hour = parseInt(timePart.substring(0, 2))
    const minute = parseInt(timePart.substring(2, 4))
    const second = parseInt(timePart.substring(4, 6))
    
    return new Date(year, month, day, hour, minute, second)
  }
  
  return new Date(dateStr)
}

// Extract instructor name from event title or description
function extractInstructor(title: string = '', description: string = ''): string {
  // Look for patterns like "Instructor: Name" or "with Name"
  const instructorMatch = (title + ' ' + description).match(/(?:instructor|with|by):?\s*([A-Z][a-z]+)/i)
  if (instructorMatch) {
    return instructorMatch[1].toUpperCase()
  }
  
  // Check if the title ends with a name in parentheses
  const nameInParens = title.match(/\(([A-Z][a-z]+)\)$/)
  if (nameInParens) {
    return nameInParens[1].toUpperCase()
  }
  
  return 'TBD'
}

// Extract class type from event title
function extractClassType(title: string = ''): string {
  const upperTitle = title.toUpperCase()
  
  // Common class types
  const classTypes = [
    'SPINNING', 'SPIN',
    'YOGA', 'YOGA FLOW',
    'BARRE', 'BARRE SCULPT',
    'TAI CHI',
    'STRENGTH', 'RIP',
    'ZUMBA',
    'PILATES',
    'BOOTCAMP',
    'HIIT',
    'CROSSFIT',
    'BOXING',
    'KICKBOXING',
    'DANCE',
    'STRONG NATION'
  ]
  
  for (const classType of classTypes) {
    if (upperTitle.includes(classType)) {
      return classType
    }
  }
  
  return 'FITNESS'
}

// Get color based on class type
function getClassColor(title: string = ''): string {
  const upperTitle = title.toUpperCase()
  
  if (upperTitle.includes('SPIN')) return 'bg-orange-500'
  if (upperTitle.includes('YOGA')) return 'bg-purple-500'
  if (upperTitle.includes('BARRE')) return 'bg-pink-500'
  if (upperTitle.includes('TAI CHI')) return 'bg-green-500'
  if (upperTitle.includes('STRENGTH') || upperTitle.includes('RIP')) return 'bg-blue-500'
  if (upperTitle.includes('ZUMBA') || upperTitle.includes('DANCE')) return 'bg-yellow-500'
  if (upperTitle.includes('STRONG NATION')) return 'bg-yellow-500'
  if (upperTitle.includes('BOOT') || upperTitle.includes('HIIT')) return 'bg-red-500'
  if (upperTitle.includes('BOX')) return 'bg-red-600'
  if (upperTitle.includes('PILATES')) return 'bg-teal-500'
  
  return 'bg-gray-500'
}