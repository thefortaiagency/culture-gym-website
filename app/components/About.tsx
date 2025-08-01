'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

export default function About() {
  const [isVisible, setIsVisible] = useState(false)
  const [showFullStory, setShowFullStory] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const stats = [
    { number: '20+', label: 'YEARS OF LEGACY', icon: '🏆' },
    { number: '22', label: 'HAMMER STRENGTH PIECES', icon: '💪' },
    { number: '30', label: 'GROUP CLASSES', icon: '🔥' },
    { number: '130', label: 'LBS MAX DUMBBELLS', icon: '⚡' },
  ]

  return (
    <section id="about" ref={sectionRef} className="py-20 bg-culture-gray relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Philosophy */}
          <div className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <h2 className="section-title mb-8">
              <span className="text-stroke">FIX IT.</span>{' '}
              <span className="text-culture-red">CLEAN IT.</span>{' '}
              <span className="text-stroke">BE NICE.</span>
            </h2>
            <p className="text-xl md:text-2xl font-light max-w-3xl mx-auto mb-4">
              Northeast Indiana's most welcoming gym that embraces all fitness styles and levels. 
              From young athletes to seniors, everyone finds their home here in Fort Wayne.
            </p>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Serving Fort Wayne, New Haven, Huntertown, Leo-Cedarville, and all of Allen County
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className={`glass-dark rounded-xl p-6 text-center hover-lift slide-in ${
                  isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
                }`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="text-4xl mb-3">{stat.icon}</div>
                <div className="text-4xl md:text-5xl font-bebas text-culture-red mb-2">
                  {stat.number}
                </div>
                <div className="text-sm md:text-base uppercase tracking-wider text-gray-300">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Story */}
          <div className={`glass-dark p-8 md:p-12 rounded-2xl slide-in hover-lift transition-all duration-1000 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <h3 className="font-bebas text-3xl md:text-4xl mb-6 text-culture-red">OUR STORY</h3>
            
            <div className="text-lg space-y-4">
              <p>
                The Culture Gym took over Spiece Fieldhouse on <span className="text-culture-red font-semibold">October 1st, 2023</span>. 
                Spiece Fieldhouse had been a <span className="text-culture-red font-semibold">staple in Fort Wayne, IN for over 20 years</span>, 
                offering fitness, swimming, basketball, and volleyball.
              </p>
              
              {!showFullStory ? (
                <p className="text-gray-300">
                  We're proud to carry on that legacy while bringing our own unique approach to fitness and community...
                </p>
              ) : (
                <div className="space-y-4 slide-in">
                  <p>
                    The current Culture Gym offers <span className="text-culture-red font-semibold">free weights, cardiovascular equipment</span>, 
                    and a dedicated <span className="text-culture-red font-semibold">turf area</span> for functional training. 
                    Our facility features a <span className="text-culture-red font-semibold">1/9 mile indoor running and walking track</span> 
                    with a rubberized surface that's easy on your joints.
                  </p>
                  
                  <p>
                    We also offer <span className="text-culture-red font-semibold">men's and women's separate saunas</span>, 
                    as well as <span className="text-culture-red font-semibold">full shower facilities</span> with amenities 
                    like soap and shampoo—just in case you forget yours.
                  </p>
                  
                  <p>
                    Our membership includes access to <span className="text-culture-red font-semibold">close to 30 group fitness classes</span> 
                    in our <span className="text-culture-red font-semibold">state-of-the-art group fitness room</span>. 
                    We're also home to <span className="text-culture-red font-semibold">4 independent personal trainers</span> 
                    who train everybody from young athletes to the elderly.
                  </p>
                  
                  <p className="text-culture-red font-semibold italic">
                    We believe in creating a culture where everyone feels welcome, supported, and motivated to achieve their best.
                  </p>
                </div>
              )}
            </div>
            
            <div className="mt-6">
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  console.log('Read More clicked, current state:', showFullStory);
                  setShowFullStory(!showFullStory);
                }}
                className="glass-red px-6 py-3 font-bebas text-lg uppercase tracking-wider rounded-xl hover-lift transition-all duration-300 inline-flex items-center gap-2 relative z-10"
                style={{ pointerEvents: 'auto' }}
              >
                {showFullStory ? (
                  <>
                    READ LESS
                    <span className="text-sm">↑</span>
                  </>
                ) : (
                  <>
                    READ MORE
                    <span className="text-sm">↓</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Background Image with Pattern Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <Image
          src="/images/gym-interior.jpg"
          alt="Gym Interior"
          fill
          className="object-cover opacity-5"
        />
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(220, 38, 38, 0.03) 35px, rgba(220, 38, 38, 0.03) 70px)`
        }} />
      </div>
    </section>
  )
}