'use client'

import { useState } from 'react'
import Image from 'next/image'

export default function Equipment() {
  const [activeCategory, setActiveCategory] = useState('weights')

  const categories = {
    weights: {
      title: 'FREE WEIGHTS',
      items: [
        '4 sets of dumbbells up to 50 lbs',
        '2 sets up to 100 lbs',
        'Dumbbells up to 120 lbs',
        '3 power lift cages with deadlift platforms',
        '2 additional power racks',
      ],
      image: '/images/weights-section.jpg'
    },
    hammer: {
      title: 'HAMMER STRENGTH',
      items: [
        'Certified Hammer Strength Center',
        '22+ pieces of Hammer Strength equipment',
        'Plate-loaded machines',
        'Selectorized equipment',
        'Full body coverage',
      ],
      image: '/images/weights-dark.jpg'
    },
    cardio: {
      title: 'CARDIO & TRACK',
      items: [
        '1/9 mile indoor running track',
        'Rubberized surface for joint protection',
        'Treadmills and ellipticals',
        'Stationary bikes',
        'Rowing machines',
      ],
      image: '/images/cardio-equipment.jpg'
    },
    amenities: {
      title: 'AMENITIES',
      items: [
        'Men\'s and women\'s saunas',
        'Full shower facilities',
        'Soap and shampoo provided',
        'Turf training area',
        'State-of-the-art group fitness room',
      ],
      image: '/images/training-area.jpg'
    }
  }

  return (
    <section id="equipment" className="bg-culture-black" style={{ paddingTop: '250px', paddingBottom: '80px' }}>
      <div className="container mx-auto px-4">
        <h2 className="section-title text-center mb-12">
          <span className="text-stroke">BUILT FOR</span>{' '}
          <span className="text-culture-red">WARRIORS</span>
        </h2>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {Object.entries(categories).map(([key, category]) => (
            <button
              key={key}
              onClick={() => setActiveCategory(key)}
              className={`font-bebas text-xl md:text-2xl px-6 py-3 uppercase tracking-wider rounded-xl hover-lift transition-all duration-300 ${
                activeCategory === key
                  ? 'glass-red'
                  : 'glass-dark hover:border-culture-red/30'
              }`}
            >
              {category.title}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Image */}
            <div className="relative h-96 md:h-[500px] overflow-hidden rounded-2xl glass-dark">
              <Image
                src={categories[activeCategory as keyof typeof categories].image}
                alt={categories[activeCategory as keyof typeof categories].title}
                fill
                className="object-cover transition-transform duration-700 hover:scale-110 rounded-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-culture-black/50 to-transparent rounded-2xl" />
            </div>

            {/* Details */}
            <div className="glass-dark rounded-2xl p-8 space-y-6 hover-lift">
              <h3 className="font-bebas text-4xl text-culture-red">
                {categories[activeCategory as keyof typeof categories].title}
              </h3>
              <ul className="space-y-4">
                {categories[activeCategory as keyof typeof categories].items.map((item, index) => (
                  <li 
                    key={index}
                    className="flex items-start text-lg slide-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <span className="text-culture-red mr-3 text-2xl">▸</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <button className="glass-red px-6 py-3 font-bebas text-lg uppercase tracking-wider rounded-xl hover-lift transition-all duration-300">
                TOUR OUR FACILITY
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}