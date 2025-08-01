'use client'

import { useState } from 'react'
import Image from 'next/image'

export default function Calendar() {
  const [currentView, setCurrentView] = useState<'day' | 'week' | 'month'>('week')
  const [currentDate, setCurrentDate] = useState(new Date())
  
  // Sample class data - will be populated from Google Calendar later
  const classes = [
    { id: 1, day: 'MONDAY', time: '10:15 AM', class: 'SPINNING (45 MIN)', instructor: 'HANNAH', color: 'bg-orange-500' },
    { id: 2, day: 'MONDAY', time: '4:30 PM', class: 'BARRE SCULPT (45 MIN)', instructor: 'HANNAH', color: 'bg-pink-500' },
    { id: 3, day: 'MONDAY', time: '5:25 PM', class: 'STRONG NATION (55 MIN)', instructor: 'NIKKI', color: 'bg-yellow-500' },
    { id: 4, day: 'TUESDAY', time: '6:15 AM', class: 'BARRE SCULPT (45 MIN)', instructor: 'KASI', color: 'bg-pink-500' },
    { id: 5, day: 'TUESDAY', time: '9:00 AM', class: 'YOGA FLOW (60 MIN)', instructor: 'HANNAH', color: 'bg-purple-500' },
    { id: 6, day: 'WEDNESDAY', time: '9:15 AM', class: 'TAI CHI (60 MIN)', instructor: 'SUSAN', color: 'bg-green-500' },
    { id: 7, day: 'WEDNESDAY', time: '4:45 PM', class: 'SPIN (30 MIN)', instructor: 'LORI', color: 'bg-orange-500' },
    { id: 8, day: 'WEDNESDAY', time: '5:30 PM', class: 'RIP/STRENGTH (55 MIN)', instructor: 'HANNAH', color: 'bg-blue-500' },
    { id: 9, day: 'THURSDAY', time: '7:15 AM', class: 'RIP/STRENGTH (55 MIN)', instructor: 'HANNAH', color: 'bg-blue-500' },
    { id: 10, day: 'THURSDAY', time: '9:00 AM', class: 'SPIN (45 MIN)', instructor: 'KASI', color: 'bg-orange-500' },
    { id: 11, day: 'FRIDAY', time: '10:15 AM', class: 'RIP/STRENGTH (55 MIN)', instructor: 'HANNAH', color: 'bg-blue-500' },
    { id: 12, day: 'FRIDAY', time: '4:45 PM', class: 'YOGA FLOW (60 MIN)', instructor: 'HANNAH', color: 'bg-purple-500' },
  ]

  const daysOfWeek = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY']
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

  const getWeekDates = () => {
    const startOfWeek = new Date(currentDate)
    const day = startOfWeek.getDay()
    const diff = startOfWeek.getDate() - day
    startOfWeek.setDate(diff)
    
    const weekDates = []
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek)
      date.setDate(startOfWeek.getDate() + i)
      weekDates.push(date)
    }
    return weekDates
  }

  const getMonthDates = () => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const startDate = new Date(firstDay)
    startDate.setDate(firstDay.getDate() - firstDay.getDay())
    
    const dates = []
    const currentDateIter = new Date(startDate)
    
    while (dates.length < 42) { // 6 weeks * 7 days
      dates.push(new Date(currentDateIter))
      currentDateIter.setDate(currentDateIter.getDate() + 1)
    }
    
    return dates
  }

  const getClassesForDay = (dayName: string) => {
    return classes.filter(c => c.day === dayName.toUpperCase())
  }

  const navigateDate = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate)
    if (currentView === 'day') {
      newDate.setDate(currentDate.getDate() + (direction === 'next' ? 1 : -1))
    } else if (currentView === 'week') {
      newDate.setDate(currentDate.getDate() + (direction === 'next' ? 7 : -7))
    } else {
      newDate.setMonth(currentDate.getMonth() + (direction === 'next' ? 1 : -1))
    }
    setCurrentDate(newDate)
  }

  const handleDayClick = (date: Date) => {
    setCurrentDate(new Date(date))
    setCurrentView('day')
  }

  return (
    <div className="min-h-screen bg-culture-black text-culture-white relative">
      {/* Background */}
      <div className="absolute inset-0 opacity-5">
        <Image
          src="/images/gym-interior.jpg"
          alt="Gym Interior"
          fill
          className="object-cover"
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-20">
        {/* Header */}
        <div className="text-center mb-12 slide-in">
          <h1 className="section-title mb-4">
            <span className="text-culture-red">CLASS</span>{' '}
            <span className="text-stroke">SCHEDULE</span>
          </h1>
          <p className="text-xl text-gray-300">Plan your fitness journey</p>
        </div>

        {/* Calendar Controls */}
        <div className="max-w-6xl mx-auto">
          {/* View Tabs */}
          <div className="flex justify-center mb-8">
            <div className="glass-dark rounded-xl p-2 flex gap-2 slide-in">
              {(['day', 'week', 'month'] as const).map((view, index) => (
                <button
                  key={view}
                  onClick={() => setCurrentView(view)}
                  className={`px-6 py-3 font-bebas text-lg uppercase tracking-wider rounded-xl hover-lift transition-all duration-300 ${
                    currentView === view
                      ? 'glass-red'
                      : 'text-gray-300 hover:text-white hover:glass-dark'
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {view}
                </button>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 slide-in">
            <button
              onClick={() => navigateDate('prev')}
              className="glass-dark hover:glass-red px-4 md:px-6 py-3 rounded-xl hover-lift transition-all duration-300 font-bebas text-lg w-full md:w-auto"
            >
              ← Previous
            </button>

            <div className="glass-dark px-4 md:px-6 py-3 rounded-xl w-full md:w-auto">
              <h2 className="font-bebas text-xl md:text-3xl text-center text-culture-red">
                {currentView === 'month' && `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`}
                {currentView === 'week' && `Week of ${getWeekDates()[0].toLocaleDateString()}`}
                {currentView === 'day' && currentDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </h2>
            </div>

            <button
              onClick={() => navigateDate('next')}
              className="glass-dark hover:glass-red px-4 md:px-6 py-3 rounded-xl hover-lift transition-all duration-300 font-bebas text-lg w-full md:w-auto"
            >
              Next →
            </button>
          </div>

          {/* Calendar Views */}
          <div className="glass-dark rounded-2xl p-6 slide-in hover-lift">
            {/* Day View */}
            {currentView === 'day' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="glass rounded-2xl p-6 hover-lift">
                    <h3 className="font-bebas text-2xl text-culture-red mb-4">
                      {daysOfWeek[currentDate.getDay()]}
                    </h3>
                    <div className="space-y-4">
                      {getClassesForDay(daysOfWeek[currentDate.getDay()]).map((cls, index) => (
                        <div key={cls.id} className="glass-dark rounded-2xl p-6 border-l-4 border-culture-red hover-lift slide-in transition-all duration-300" style={{ animationDelay: `${index * 0.1}s` }}>
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <span className={`w-3 h-3 rounded-full ${cls.color}`}></span>
                                <div className="font-bebas text-2xl text-culture-red">{cls.time}</div>
                              </div>
                              <div className="font-bold text-lg mb-1">{cls.class}</div>
                              <div className="text-sm text-gray-300 flex items-center gap-1">
                                <span>👤</span>
                                <span>Instructor: {cls.instructor}</span>
                              </div>
                            </div>
                            <div className="glass-red px-3 py-1 rounded-xl text-xs font-bebas tracking-wider">
                              BOOK
                            </div>
                          </div>
                        </div>
                      ))}
                      {getClassesForDay(daysOfWeek[currentDate.getDay()]).length === 0 && (
                        <p className="text-gray-400 text-center py-8">No classes scheduled</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Week View */}
            {currentView === 'week' && (
              <div className="grid grid-cols-2 md:grid-cols-7 gap-3 overflow-x-auto md:overflow-visible">
                {getWeekDates().map((date, index) => (
                  <div key={index} className="glass rounded-xl p-3 min-h-[150px] md:min-h-[200px] hover-lift slide-in" style={{ animationDelay: `${index * 0.1}s` }}>
                    <div className="font-bebas text-lg text-culture-red mb-2">
                      {daysOfWeek[date.getDay()].slice(0, 3)}
                    </div>
                    <div className="text-sm mb-3 font-semibold">{date.getDate()}</div>
                    <div className="space-y-2">
                      {getClassesForDay(daysOfWeek[date.getDay()]).map((cls, clsIndex) => (
                        <div key={cls.id} className="glass-dark rounded-xl p-2 border-l-2 border-culture-red text-xs hover-lift slide-in transition-all duration-300" style={{ animationDelay: `${(index * 0.1) + (clsIndex * 0.05)}s` }}>
                          <div className="flex items-center gap-1 mb-1">
                            <span className={`w-2 h-2 rounded-full ${cls.color}`}></span>
                            <div className="font-bebas text-culture-red">{cls.time}</div>
                          </div>
                          <div className="font-semibold text-white truncate">{cls.class.split(' ')[0]}</div>
                          <div className="text-gray-300 text-[10px]">{cls.instructor}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Month View */}
            {currentView === 'month' && (
              <div>
                {/* Mobile hint */}
                <div className="md:hidden text-center text-sm text-gray-400 mb-4">
                  Tap any day to see class details
                </div>
                
                {/* Month header */}
                <div className="grid grid-cols-7 gap-1 md:gap-3 mb-6">
                  {daysOfWeek.map((day, index) => (
                    <div key={day} className="glass-red rounded-xl text-center font-bebas py-1 md:py-3 text-xs md:text-base slide-in" style={{ animationDelay: `${index * 0.05}s` }}>
                      {day.slice(0, 1)}
                    </div>
                  ))}
                </div>
                
                {/* Month grid */}
                <div className="grid grid-cols-7 gap-1 md:gap-3">
                  {getMonthDates().map((date, index) => {
                    const isCurrentMonth = date.getMonth() === currentDate.getMonth()
                    const dayClasses = getClassesForDay(daysOfWeek[date.getDay()])
                    
                    return (
                      <div
                        key={index}
                        onClick={() => handleDayClick(date)}
                        className={`glass rounded-lg md:rounded-xl p-1 md:p-3 min-h-[60px] md:min-h-[100px] hover-lift slide-in cursor-pointer transition-all duration-300 ${
                          !isCurrentMonth ? 'opacity-50' : ''
                        } hover:glass-red hover:scale-105`}
                        style={{ animationDelay: `${index * 0.02}s` }}
                      >
                        <div className="font-bebas text-culture-red text-sm md:text-lg mb-1 md:mb-2">{date.getDate()}</div>
                        <div className="space-y-1">
                          {/* Mobile view - just show dots */}
                          <div className="md:hidden">
                            {dayClasses.length > 0 && (
                              <div className="flex flex-wrap gap-1 justify-center">
                                {dayClasses.slice(0, 3).map((cls) => (
                                  <span key={cls.id} className={`w-2 h-2 rounded-full ${cls.color}`}></span>
                                ))}
                                {dayClasses.length > 3 && (
                                  <span className="text-[10px] text-gray-400">+{dayClasses.length - 3}</span>
                                )}
                              </div>
                            )}
                          </div>
                          
                          {/* Desktop view - show class details */}
                          <div className="hidden md:block">
                            {dayClasses.slice(0, 2).map((cls, clsIndex) => (
                              <div
                                key={cls.id}
                                className="glass-dark rounded-lg text-xs p-2 border border-culture-red/30 hover-lift slide-in transition-all duration-300"
                                style={{ animationDelay: `${(index * 0.02) + (clsIndex * 0.01)}s` }}
                              >
                                <div className="flex items-center gap-1 mb-1">
                                  <span className={`w-1.5 h-1.5 rounded-full ${cls.color}`}></span>
                                  <span className="font-bebas text-culture-red">{cls.time}</span>
                                </div>
                                <div className="text-white font-medium truncate">{cls.class.split(' ')[0]}</div>
                              </div>
                            ))}
                            {dayClasses.length > 2 && (
                              <div className="text-xs text-gray-400 font-medium">
                                +{dayClasses.length - 2} more
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Back to Classes Button */}
          <div className="text-center mt-8">
            <a href="/#classes" className="glass-red px-8 py-4 font-bebas text-2xl uppercase tracking-wider rounded-xl hover-lift pulse-glow inline-block transition-all duration-300">
              <span className="flex items-center gap-2 justify-center">
                ← BACK TO CLASSES
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}