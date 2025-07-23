'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [currentStat, setCurrentStat] = useState(0)
  const [showStats, setShowStats] = useState(false)
  
  const stats = [
    { number: '500+', label: 'ACTIVE MEMBERS' },
    { number: '15+', label: 'YEARS STRONG' },
    { number: '30+', label: 'GROUP CLASSES' },
    { number: '24/7', label: 'ACCESS' }
  ]

  useEffect(() => {
    setIsLoaded(true)
    const interval = setInterval(() => {
      setCurrentStat(prev => (prev + 1) % stats.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section id="top" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <Image
          src="/images/culturegymhero.png"
          alt="Culture Gym Interior"
          fill
          className="object-cover object-top"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-culture-black/80 via-culture-black/60 to-culture-black" />
      </div>


      {/* Content - Positioned at bottom */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-10 text-center px-4 max-w-6xl w-full">
        <h1 className={`font-bebas text-4xl md:text-5xl lg:text-6xl uppercase tracking-wider mb-4 transition-all duration-1000 ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <span className="text-culture-red">THE </span>
          <span className="text-culture-red">
            <span className="culture-pulse" style={{
              textShadow: '0 0 20px rgba(220, 38, 38, 0.8), 0 0 40px rgba(220, 38, 38, 0.5), 0 0 60px rgba(220, 38, 38, 0.3)'
            }}>CULT</span><span style={{ fontSize: '0.8em' }}>ure</span>
          </span>
          <span className="text-culture-red"> GYM</span>
        </h1>
        
        <p className={`text-xl md:text-2xl font-light mb-4 transition-all duration-1000 delay-300 ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          FT WAYNE'S OLD SCHOOL GYM
        </p>
        
        <p className={`text-md md:text-lg font-light mb-8 text-gray-300 transition-all duration-1000 delay-350 ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          📍 Historic Spiece Fieldhouse • Northeast Indiana's Premier Fitness Destination
        </p>

        <div className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-1000 delay-500 ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <a href="#membership" className="glass-red px-8 py-4 font-bebas text-2xl uppercase tracking-wider rounded-xl pulse-glow hover-lift inline-block">
            START YOUR JOURNEY
          </a>
          <a href="#classes" className="glass-dark px-8 py-4 font-bebas text-2xl uppercase tracking-wider hover-lift transition-all duration-300 inline-block rounded-xl border border-culture-red/30">
            VIEW SCHEDULE
          </a>
        </div>

      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-culture-black to-transparent" />
    </section>
  )
}