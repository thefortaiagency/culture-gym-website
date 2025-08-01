'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

export default function CultureCard() {
  const [isVisible, setIsVisible] = useState(false)
  const [currentFeature, setCurrentFeature] = useState(0)
  
  const features = [
    {
      title: "HISTORIC SPIECE FIELDHOUSE",
      description: "Fort Wayne landmark for over 20 years",
      icon: "🏛️"
    },
    {
      title: "OLD SCHOOL ATMOSPHERE",
      description: "Where iron meets determination",
      icon: "💪"
    },
    {
      title: "COMMUNITY FOCUSED",
      description: "Fix It. Clean It. Be Nice.",
      icon: "🤝"
    },
    {
      title: "EXTENDED HOURS",
      description: "Open early, close late",
      icon: "⏰"
    }
  ]

  useEffect(() => {
    setIsVisible(true)
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative bg-culture-black py-16 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <Image
          src="/images/gym-interior.jpg"
          alt="The Culture Gym Interior"
          fill
          className="object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-culture-black via-culture-black/80 to-culture-black" />
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <div className={`max-w-6xl mx-auto transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          {/* Main Card */}
          <div className="glass-dark rounded-3xl p-8 md:p-12 hover-lift">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Left Content */}
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <h2 className="font-bebas text-5xl md:text-6xl">
                    <span className="text-culture-red culture-pulse">THE CULTURE</span>
                  </h2>
                  <span className="text-4xl">🔥</span>
                </div>
                
                <p className="text-xl md:text-2xl font-light">
                  More than a gym - we're a movement. Born from the legacy of Spiece Fieldhouse, 
                  we've created Northeast Indiana's premier fitness destination.
                </p>

                {/* Dynamic Feature Display */}
                <div className="glass rounded-2xl p-6 transition-all duration-500">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-3xl">{features[currentFeature].icon}</span>
                    <h3 className="font-bebas text-2xl text-culture-red">
                      {features[currentFeature].title}
                    </h3>
                  </div>
                  <p className="text-gray-300">{features[currentFeature].description}</p>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="font-bebas text-3xl text-culture-red">500+</div>
                    <div className="text-sm text-gray-400">Members</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bebas text-3xl text-culture-red">22</div>
                    <div className="text-sm text-gray-400">Hammer Pieces</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bebas text-3xl text-culture-red">30+</div>
                    <div className="text-sm text-gray-400">Classes</div>
                  </div>
                </div>
              </div>

              {/* Right Content - Location & Hours */}
              <div className="space-y-6">
                <div className="glass-red rounded-2xl p-6">
                  <h3 className="font-bebas text-3xl mb-4">FIND YOUR CULTURE</h3>
                  <div className="space-y-3">
                    <p className="flex items-start gap-2">
                      <span>📍</span>
                      <span>
                        <strong>5316 Merchandise Dr</strong><br/>
                        Fort Wayne, IN 46808
                      </span>
                    </p>
                    <p className="flex items-center gap-2">
                      <span>📞</span>
                      <span>(260) 483-1415</span>
                    </p>
                  </div>
                </div>

                <div className="glass rounded-2xl p-6">
                  <h4 className="font-bebas text-2xl text-culture-red mb-3">OPEN NOW</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Mon-Fri</span>
                      <span className="text-gray-300">5:00 AM - 12:00 AM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sat-Sun</span>
                      <span className="text-gray-300">6:00 AM - 9:00 PM</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <a href="#membership" className="glass-red px-6 py-3 font-bebas text-xl uppercase tracking-wider rounded-xl hover-lift flex-1 text-center">
                    JOIN NOW
                  </a>
                  <a href="#classes" className="glass-dark px-6 py-3 font-bebas text-xl uppercase tracking-wider rounded-xl hover-lift flex-1 text-center border border-culture-red/30">
                    TOUR
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            {['No Contracts', 'Free Weights', 'Sauna', 'Indoor Track', 'Personal Training'].map((feature, index) => (
              <div 
                key={feature}
                className="glass px-4 py-2 rounded-full text-sm hover-lift slide-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {feature}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}