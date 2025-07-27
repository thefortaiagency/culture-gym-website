'use client';

import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Image from 'next/image';
import Link from 'next/link';

interface EquipmentItem {
  title: string;
  slug: string;
  image: string;
  category: string;
}

export default function EquipmentPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  // Equipment items from the screenshot
  const equipment: EquipmentItem[] = [
    {
      title: 'Shoulder Equipment',
      slug: 'shoulder-equipment',
      image: '/images/equipment/shoulder-equipment.jpg',
      category: 'strength'
    },
    {
      title: 'Rogue Dyna Body',
      slug: 'rogue-dynabody',
      image: '/images/equipment/rogue-dynabody.jpg',
      category: 'cardio'
    },
    {
      title: 'Bench Press',
      slug: 'bench-press',
      image: '/images/equipment/bench-press.jpg',
      category: 'strength'
    },
    {
      title: 'Precore Icarian Paramount Equipment',
      slug: 'precore-icarian-paramount',
      image: '/images/equipment/precore-icarian-paramount.jpg',
      category: 'strength'
    },
    {
      title: 'PowerLift Racks',
      slug: 'powerlift-racks',
      image: '/images/equipment/powerlift-racks.jpg',
      category: 'strength'
    },
    {
      title: 'Leg Equipment',
      slug: 'leg-equipment',
      image: '/images/equipment/leg-equipment.jpg',
      category: 'strength'
    },
    {
      title: 'Hammer Strength Equipment',
      slug: 'hammer-strength',
      image: '/images/equipment/hammer-strength.jpg',
      category: 'strength'
    },
    {
      title: 'Free Weights Room',
      slug: 'free-weights-room',
      image: '/images/equipment/free-weights-room.jpg',
      category: 'free-weights'
    },
    {
      title: 'Chest Equipment',
      slug: 'chest-equipment',
      image: '/images/equipment/chest-equipment.jpg',
      category: 'strength'
    },
    {
      title: 'Cardio Equipment',
      slug: 'cardio-equipment',
      image: '/images/equipment/cardio-equipment.jpg',
      category: 'cardio'
    },
    {
      title: 'Camstar Equipment',
      slug: 'camstar-equipment',
      image: '/images/equipment/camstar-equipment.jpg',
      category: 'strength'
    },
    {
      title: 'BodyMaster Equipment',
      slug: 'bodymaster-equipment',
      image: '/images/equipment/bodymaster-equipment.jpg',
      category: 'strength'
    },
    {
      title: 'Back Equipment',
      slug: 'back-equipment',
      image: '/images/equipment/back-equipment.jpg',
      category: 'strength'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Equipment' },
    { id: 'strength', name: 'Strength Training' },
    { id: 'cardio', name: 'Cardio' },
    { id: 'free-weights', name: 'Free Weights' }
  ];

  const filteredEquipment = selectedCategory === 'all' 
    ? equipment 
    : equipment.filter(item => item.category === selectedCategory);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bebas text-[#A80D0D] mb-4">
            OUR EQUIPMENT
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            State-of-the-art equipment to help you achieve your fitness goals. 
            From professional powerlifting platforms to the latest cardio machines.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`font-bebas text-xl md:text-2xl px-6 py-3 uppercase tracking-wider rounded-xl hover-lift transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'glass-red'
                    : 'glass-dark hover:border-culture-red/30'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Equipment Grid */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#A80D0D]"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredEquipment.map((item, index) => (
                <Link
                  key={index}
                  href={`/equipment/${item.slug}`}
                  className="group relative overflow-hidden rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 hover:border-[#A80D0D]/50 transition-all duration-300 block"
                >
                  <div className="aspect-[4/3] relative">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bebas text-white group-hover:text-[#A80D0D] transition-colors">
                      {item.title}
                    </h3>
                    <div className="flex items-center justify-between mt-2">
                      <p className="text-sm text-white/60 uppercase tracking-wider">
                        {categories.find(c => c.id === item.category)?.name}
                      </p>
                      <span className="text-[#A80D0D] group-hover:translate-x-1 transition-transform duration-300">
                        →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bebas text-[#A80D0D] mb-4">
            Ready to Train?
          </h2>
          <p className="text-lg text-white/80 mb-8">
            Our equipment is maintained daily and our staff is always available to help you get the most out of your workout.
          </p>
          <a
            href="/#membership"
            className="glass-red px-8 py-4 font-bebas text-xl uppercase tracking-wider rounded-xl hover-lift transition-all duration-300 inline-block"
          >
            View Membership Options
          </a>
        </div>
      </section>
    </div>
  );
}