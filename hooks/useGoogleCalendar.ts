import { useState, useEffect } from 'react'

export interface CalendarEvent {
  id: string
  title: string
  description: string
  start: string
  end: string
  location: string
  instructor: string
  classType: string
  color: string
}

export interface UseGoogleCalendarOptions {
  timeMin?: Date
  timeMax?: Date
  refreshInterval?: number // in milliseconds
}

export function useGoogleCalendar(options: UseGoogleCalendarOptions = {}) {
  const [events, setEvents] = useState<CalendarEvent[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  const {
    timeMin = new Date(),
    timeMax = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days ahead
    refreshInterval = 5 * 60 * 1000 // 5 minutes
  } = options
  
  const fetchEvents = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const params = new URLSearchParams({
        timeMin: timeMin.toISOString(),
        timeMax: timeMax.toISOString()
      })
      
      const response = await fetch(`/api/calendar?${params}`)
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch calendar events')
      }
      
      setEvents(data.events || [])
    } catch (err) {
      console.error('Error fetching calendar events:', err)
      setError(err instanceof Error ? err.message : 'Failed to load calendar')
      
      // Fall back to sample data if API fails
      setEvents(getSampleEvents())
    } finally {
      setLoading(false)
    }
  }
  
  useEffect(() => {
    fetchEvents()
    
    // Set up auto-refresh if specified
    if (refreshInterval > 0) {
      const interval = setInterval(fetchEvents, refreshInterval)
      return () => clearInterval(interval)
    }
  }, [timeMin.getTime(), timeMax.getTime(), refreshInterval])
  
  return { events, loading, error, refetch: fetchEvents }
}

// Helper function to get events for a specific day
export function getEventsForDay(events: CalendarEvent[], date: Date): CalendarEvent[] {
  const dayStart = new Date(date)
  dayStart.setHours(0, 0, 0, 0)
  
  const dayEnd = new Date(date)
  dayEnd.setHours(23, 59, 59, 999)
  
  return events.filter(event => {
    const eventStart = new Date(event.start)
    return eventStart >= dayStart && eventStart <= dayEnd
  }).sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime())
}

// Helper function to get events for a week
export function getEventsForWeek(events: CalendarEvent[], weekStart: Date): CalendarEvent[] {
  const weekEnd = new Date(weekStart)
  weekEnd.setDate(weekStart.getDate() + 7)
  
  return events.filter(event => {
    const eventStart = new Date(event.start)
    return eventStart >= weekStart && eventStart < weekEnd
  }).sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime())
}

// Format time for display
export function formatEventTime(event: CalendarEvent): string {
  const date = new Date(event.start)
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  }).toUpperCase()
}

// Format duration
export function formatDuration(event: CalendarEvent): string {
  const start = new Date(event.start)
  const end = new Date(event.end)
  const durationMs = end.getTime() - start.getTime()
  const durationMins = Math.round(durationMs / (1000 * 60))
  
  if (durationMins < 60) {
    return `${durationMins} MIN`
  } else {
    const hours = Math.floor(durationMins / 60)
    const mins = durationMins % 60
    return mins > 0 ? `${hours}H ${mins}MIN` : `${hours} HOUR${hours > 1 ? 'S' : ''}`
  }
}

// Get sample events as fallback
function getSampleEvents(): CalendarEvent[] {
  const today = new Date()
  const events: CalendarEvent[] = []
  
  // Sample weekly schedule
  const sampleSchedule = [
    { day: 1, time: '10:15', title: 'SPINNING', duration: 45, instructor: 'HANNAH', color: 'bg-orange-500' },
    { day: 1, time: '16:30', title: 'BARRE SCULPT', duration: 45, instructor: 'HANNAH', color: 'bg-pink-500' },
    { day: 1, time: '17:25', title: 'STRONG NATION', duration: 55, instructor: 'NIKKI', color: 'bg-yellow-500' },
    { day: 2, time: '06:15', title: 'BARRE SCULPT', duration: 45, instructor: 'KASI', color: 'bg-pink-500' },
    { day: 2, time: '09:00', title: 'YOGA FLOW', duration: 60, instructor: 'HANNAH', color: 'bg-purple-500' },
    { day: 3, time: '09:15', title: 'TAI CHI', duration: 60, instructor: 'SUSAN', color: 'bg-green-500' },
    { day: 3, time: '16:45', title: 'SPIN', duration: 30, instructor: 'LORI', color: 'bg-orange-500' },
    { day: 3, time: '17:30', title: 'RIP/STRENGTH', duration: 55, instructor: 'HANNAH', color: 'bg-blue-500' },
    { day: 4, time: '07:15', title: 'RIP/STRENGTH', duration: 55, instructor: 'HANNAH', color: 'bg-blue-500' },
    { day: 4, time: '09:00', title: 'SPIN', duration: 45, instructor: 'KASI', color: 'bg-orange-500' },
    { day: 5, time: '10:15', title: 'RIP/STRENGTH', duration: 55, instructor: 'HANNAH', color: 'bg-blue-500' },
    { day: 5, time: '16:45', title: 'YOGA FLOW', duration: 60, instructor: 'HANNAH', color: 'bg-purple-500' },
  ]
  
  // Generate events for the next 4 weeks
  for (let week = 0; week < 4; week++) {
    for (const schedule of sampleSchedule) {
      const eventDate = new Date(today)
      eventDate.setDate(today.getDate() - today.getDay() + schedule.day + (week * 7))
      
      const [hours, minutes] = schedule.time.split(':').map(Number)
      eventDate.setHours(hours, minutes, 0, 0)
      
      const endDate = new Date(eventDate)
      endDate.setMinutes(endDate.getMinutes() + schedule.duration)
      
      events.push({
        id: `sample-${week}-${schedule.day}-${schedule.time}`,
        title: `${schedule.title} (${schedule.duration} MIN)`,
        description: `Join ${schedule.instructor} for an intense ${schedule.title.toLowerCase()} session`,
        start: eventDate.toISOString(),
        end: endDate.toISOString(),
        location: 'Main Studio',
        instructor: schedule.instructor,
        classType: schedule.title,
        color: schedule.color
      })
    }
  }
  
  return events
}