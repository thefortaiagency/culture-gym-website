'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function Classes() {
  const router = useRouter()

  // No custom scroll handling - pure CSS approach

  const schedule = [
    { day: 'MONDAY', time: '10:15 AM', class: 'SPINNING (45 MIN)', instructor: 'HANNAH' },
    { day: 'MONDAY', time: '4:30 PM', class: 'BARRE SCULPT (45 MIN)', instructor: 'HANNAH' },
    { day: 'MONDAY', time: '5:25 PM', class: 'STRONG NATION (55 MIN)', instructor: 'NIKKI' },
    { day: 'TUESDAY', time: '6:15 AM', class: 'BARRE SCULPT (45 MIN)', instructor: 'KASI' },
    { day: 'TUESDAY', time: '9:00 AM', class: 'YOGA FLOW (60 MIN)', instructor: 'HANNAH' },
    { day: 'WEDNESDAY', time: '9:15 AM', class: 'TAI CHI (60 MIN)', instructor: 'SUSAN' },
    { day: 'WEDNESDAY', time: '4:45 PM', class: 'SPIN (30 MIN)', instructor: 'LORI' },
    { day: 'WEDNESDAY', time: '5:30 PM', class: 'RIP/STRENGTH (55 MIN)', instructor: 'HANNAH' },
    { day: 'THURSDAY', time: '7:15 AM', class: 'RIP/STRENGTH (55 MIN)', instructor: 'HANNAH' },
    { day: 'THURSDAY', time: '9:00 AM', class: 'SPIN (45 MIN)', instructor: 'KASI' },
    { day: 'FRIDAY', time: '10:15 AM', class: 'RIP/STRENGTH (55 MIN)', instructor: 'HANNAH' },
    { day: 'FRIDAY', time: '4:45 PM', class: 'YOGA FLOW (60 MIN)', instructor: 'HANNAH' },
  ]

  const classTypes = [
    { name: 'SPINNING', color: 'text-orange-500' },
    { name: 'YOGA FLOW', color: 'text-purple-500' },
    { name: 'BARRE SCULPT', color: 'text-pink-500' },
    { name: 'RIP/STRENGTH', color: 'text-blue-500' },
    { name: 'TAI CHI', color: 'text-green-500' },
    { name: 'STRONG NATION', color: 'text-yellow-500' },
  ]

  return (
    <section id="classes" className="pt-40 pb-20 bg-culture-gray relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="section-title mb-4">
            <span className="text-stroke">GROUP</span>{' '}
            <span className="text-culture-red">FITNESS</span>
          </h2>
          <p className="text-xl">30 CLASSES INCLUDED WITH MEMBERSHIP</p>
        </div>

        {/* Class Types Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12 max-w-4xl mx-auto">
          {classTypes.map((type, index) => (
            <div 
              key={type.name}
              className="glass-dark p-4 text-center rounded-xl hover-lift slide-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <span className={`font-bebas text-lg ${type.color}`}>{type.name}</span>
            </div>
          ))}
        </div>

        {/* Schedule Preview */}
        <div className="max-w-5xl mx-auto">
          <div className="glass-dark rounded-2xl overflow-hidden slide-in">
            <div className="p-6 md:p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bebas text-3xl text-culture-red">THIS WEEK'S SCHEDULE</h3>
                <div className="text-sm text-gray-400 animate-pulse">
                  <span className="hidden md:inline">Scroll for more classes </span>
                  <span className="inline-block">↓</span>
                </div>
              </div>
              
              <div className="relative">
                <div 
                  className="space-y-3 pr-2 custom-scrollbar" 
                  style={{ 
                    height: '320px', 
                    overflowY: 'auto',
                    border: '1px solid rgba(220, 38, 38, 0.3)',
                    borderRadius: '8px',
                    padding: '12px'
                  }}
                  tabIndex={0}
                  role="region"
                  aria-label="Weekly class schedule"
                >
                  {schedule.map((item, index) => (
                  <div 
                    key={index}
                    className="flex flex-col md:flex-row md:items-center justify-between p-4 glass rounded-xl hover-lift transition-all duration-300"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <div className="flex items-center gap-4 mb-2 md:mb-0">
                      <span className="font-bebas text-culture-red text-xl w-24">{item.day}</span>
                      <span className="text-gray-400">{item.time}</span>
                    </div>
                    <div className="flex items-center justify-between md:gap-8">
                      <span className="font-medium">{item.class}</span>
                      <span className="text-sm text-gray-400">w/ {item.instructor}</span>
                    </div>
                  </div>
                ))}
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                console.log('Button clicked, navigating to calendar...');
                window.location.href = '/calendar';
              }}
              className="glass-red px-8 py-4 font-bebas text-2xl uppercase tracking-wider rounded-xl hover-lift pulse-glow transition-all duration-300"
              style={{ pointerEvents: 'auto' }}
            >
              <span className="flex items-center gap-2 justify-center">
                VIEW FULL SCHEDULE
                <span className="text-xl">📅</span>
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Background Image */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <Image
          src="/images/group-fitness.jpg"
          alt="Group Fitness"
          fill
          className="object-cover"
        />
      </div>
    </section>
  )
}