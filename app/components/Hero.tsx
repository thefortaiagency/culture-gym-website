'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [currentStat, setCurrentStat] = useState(0)
  
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
    <section className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Dynamic Stats Display at Top */}
      <div className="glass-dark py-3 mt-20 relative z-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center">
            <div className="text-center transition-all duration-500">
              <div className="text-3xl font-bebas text-culture-red mb-1">{stats[currentStat].number}</div>
              <div className="text-sm text-gray-300 uppercase tracking-wider">{stats[currentStat].label}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Hero Content */}
      <div className="flex-1 flex items-center justify-center relative">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
        <Image
          src="/images/hero-gym.jpg"
          alt="Culture Gym Interior"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-culture-black/80 via-culture-black/60 to-culture-black" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        <h1 className={`hero-text mb-4 transition-all duration-1000 ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <span className="block">THE</span>
          <span className="block text-culture-red text-crisp culture-pulse" style={{
            fontWeight: '900',
            fontSize: '1.15em',
            letterSpacing: '0.08em'
          }}>
            <span style={{
              textShadow: `
                2px 2px 0 rgba(0, 0, 0, 1),
                -1px -1px 0 rgba(0, 0, 0, 0.5),
                1px -1px 0 rgba(0, 0, 0, 0.5),
                -1px 1px 0 rgba(0, 0, 0, 0.5),
                0 0 20px rgba(220, 38, 38, 0.5)
              `,
              fontSize: '1.1em'
            }}>CULT</span>
            <span style={{
              textShadow: `
                2px 2px 0 rgba(0, 0, 0, 1),
                -1px -1px 0 rgba(0, 0, 0, 0.5),
                1px -1px 0 rgba(0, 0, 0, 0.5),
                -1px 1px 0 rgba(0, 0, 0, 0.5),
                0 0 10px rgba(220, 38, 38, 0.3)
              `,
              fontSize: '0.7em',
              opacity: 0.9
            }}>URE</span>
          </span>
          <span className="block">GYM</span>
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

        {/* Scroll Indicator */}
        <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-1000 delay-700 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="animate-bounce">
            <svg className="w-6 h-6 text-culture-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-culture-black to-transparent" />
      </div>
    </section>
  )
}