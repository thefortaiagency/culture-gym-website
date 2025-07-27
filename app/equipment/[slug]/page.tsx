'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Navbar from '../../components/Navbar';
import Image from 'next/image';
import Link from 'next/link';

interface EquipmentDetail {
  slug: string;
  title: string;
  category: string;
  description: string;
  features: string[];
  images: string[];
  relatedEquipment: string[];
}

// Equipment database with multiple images per item
const equipmentDatabase: Record<string, EquipmentDetail> = {
  'shoulder-equipment': {
    slug: 'shoulder-equipment',
    title: 'Shoulder Equipment',
    category: 'strength',
    description: 'Professional-grade shoulder training equipment designed for maximum muscle activation and safety. Our shoulder equipment collection features multiple stations for comprehensive deltoid development.',
    features: [
      'Multiple angle adjustments for targeting all deltoid heads',
      'Heavy-duty construction rated for commercial use',
      'Ergonomic padding for comfort during intense workouts',
      'Smooth cable systems with minimal friction',
      'Weight stacks up to 300lbs'
    ],
    images: ['/images/equipment/shoulder-equipment.jpg'],
    relatedEquipment: ['chest-equipment', 'back-equipment']
  },
  'rogue-dynabody': {
    slug: 'rogue-dynabody',
    title: 'Rogue Dyna Body',
    category: 'cardio',
    description: 'Elite cardiovascular training equipment from Rogue Fitness. Built for athletes who demand the best in durability and performance.',
    features: [
      'Commercial-grade construction',
      'Advanced resistance systems',
      'Digital tracking and metrics',
      'Low-impact design for joint protection',
      'Suitable for all fitness levels'
    ],
    images: ['/images/equipment/rogue-dynabody.jpg'],
    relatedEquipment: ['cardio-equipment']
  },
  'bench-press': {
    slug: 'bench-press',
    title: 'Bench Press Stations',
    category: 'strength',
    description: 'Multiple bench press stations including flat, incline, and decline options. Competition-spec equipment for serious strength training.',
    features: [
      'Olympic weight compatibility',
      'Adjustable safety catches',
      'Competition bench specifications',
      'Multiple angle adjustments',
      'Heavy-duty J-hooks'
    ],
    images: ['/images/equipment/bench-press.jpg'],
    relatedEquipment: ['chest-equipment', 'powerlift-racks']
  },
  'precore-icarian-paramount': {
    slug: 'precore-icarian-paramount',
    title: 'Precor Icarian Paramount Equipment',
    category: 'strength',
    description: 'Premium strength training equipment from industry leaders Precor, Icarian, and Paramount. Biomechanically optimized for maximum results.',
    features: [
      'Biomechanically correct movement patterns',
      'Dual weight stacks for independent training',
      'Premium upholstery and padding',
      'Lifetime warranty on frames',
      'Smooth, quiet operation'
    ],
    images: ['/images/equipment/precore-icarian-paramount.jpg'],
    relatedEquipment: ['hammer-strength', 'bodymaster-equipment']
  },
  'powerlift-racks': {
    slug: 'powerlift-racks',
    title: 'PowerLift Racks',
    category: 'strength',
    description: 'Professional powerlifting platforms and racks. Built to withstand the heaviest loads and most intense training sessions.',
    features: [
      '3x3" steel construction',
      'Westside hole spacing',
      'Band peg attachments',
      'Olympic lifting platforms',
      'Safety straps rated to 1000lbs'
    ],
    images: ['/images/equipment/powerlift-racks.jpg'],
    relatedEquipment: ['bench-press', 'free-weights-room']
  },
  'leg-equipment': {
    slug: 'leg-equipment',
    title: 'Leg Training Equipment',
    category: 'strength',
    description: 'Complete leg training station featuring leg press, hack squat, leg extensions, and leg curls. Build powerful legs with our comprehensive equipment.',
    features: [
      '45-degree leg press with 1000lb capacity',
      'Hack squat machine with safety locks',
      'Seated and lying leg curl options',
      'Leg extension with adjustable starting position',
      'Calf raise stations'
    ],
    images: ['/images/equipment/leg-equipment.jpg'],
    relatedEquipment: ['powerlift-racks', 'hammer-strength']
  },
  'hammer-strength': {
    slug: 'hammer-strength',
    title: 'Hammer Strength Equipment',
    category: 'strength',
    description: 'The Culture Gym is a certified Hammer Strength training center. Experience the gold standard in plate-loaded equipment.',
    features: [
      'ISO-lateral technology',
      'Converging and diverging motion paths',
      'Natural grip positions',
      'Independent arm movement',
      'Used by NFL and NBA teams'
    ],
    images: ['/images/equipment/hammer-strength.jpg'],
    relatedEquipment: ['precore-icarian-paramount', 'chest-equipment']
  },
  'free-weights-room': {
    slug: 'free-weights-room',
    title: 'Free Weights Room',
    category: 'free-weights',
    description: 'Dedicated free weights area with dumbbells up to 120lbs, multiple barbell stations, and plenty of space for functional training.',
    features: [
      '4 sets of dumbbells up to 50lbs',
      '2 sets of dumbbells up to 100lbs',
      'Dumbbells up to 120lbs',
      'Olympic barbells and plates',
      'Dedicated deadlift platforms'
    ],
    images: ['/images/equipment/free-weights-room.jpg'],
    relatedEquipment: ['powerlift-racks', 'bench-press']
  },
  'chest-equipment': {
    slug: 'chest-equipment',
    title: 'Chest Training Equipment',
    category: 'strength',
    description: 'Build a powerful chest with our variety of pressing and fly machines. From beginners to advanced athletes, we have equipment for every level.',
    features: [
      'Multiple chest press angles',
      'Cable crossover station',
      'Pec deck machines',
      'Plate-loaded options',
      'Adjustable resistance curves'
    ],
    images: ['/images/equipment/chest-equipment.jpg'],
    relatedEquipment: ['bench-press', 'shoulder-equipment']
  },
  'cardio-equipment': {
    slug: 'cardio-equipment',
    title: 'Cardio Equipment',
    category: 'cardio',
    description: 'State-of-the-art cardiovascular equipment including treadmills, ellipticals, bikes, and our unique 1/9 mile indoor track.',
    features: [
      '1/9 mile rubberized indoor track',
      'Commercial treadmills with TV screens',
      'Low-impact elliptical machines',
      'Recumbent and upright bikes',
      'Rowing machines'
    ],
    images: ['/images/equipment/cardio-equipment.jpg'],
    relatedEquipment: ['rogue-dynabody']
  },
  'camstar-equipment': {
    slug: 'camstar-equipment',
    title: 'Camstar Equipment',
    category: 'strength',
    description: 'Specialized Camstar strength training equipment. Unique resistance profiles for advanced muscle development.',
    features: [
      'Cam-based resistance',
      'Variable resistance curves',
      'Smooth operation',
      'Compact footprint',
      'Full body training options'
    ],
    images: ['/images/equipment/camstar-equipment.jpg'],
    relatedEquipment: ['bodymaster-equipment', 'hammer-strength']
  },
  'bodymaster-equipment': {
    slug: 'bodymaster-equipment',
    title: 'BodyMaster Equipment',
    category: 'strength',
    description: 'BodyMaster machines offering precise muscle isolation and smooth resistance throughout the entire range of motion.',
    features: [
      'Precision bearings for smooth motion',
      'Adjustable seats and pads',
      'Clear instructional placards',
      'Multiple grip options',
      'Suitable for all body types'
    ],
    images: ['/images/equipment/bodymaster-equipment.jpg'],
    relatedEquipment: ['camstar-equipment', 'precore-icarian-paramount']
  },
  'back-equipment': {
    slug: 'back-equipment',
    title: 'Back Training Equipment',
    category: 'strength',
    description: 'Comprehensive back training equipment for building width, thickness, and detail. From lat pulldowns to cable rows.',
    features: [
      'Multiple lat pulldown stations',
      'Seated cable row machines',
      'T-bar row platform',
      'Assisted pull-up machine',
      'Back extension benches'
    ],
    images: ['/images/equipment/back-equipment.jpg'],
    relatedEquipment: ['shoulder-equipment', 'hammer-strength']
  }
};

export default function EquipmentDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  
  const equipment = equipmentDatabase[slug];
  const [selectedImage, setSelectedImage] = useState(0);

  if (!equipment) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bebas text-[#A80D0D] mb-4">Equipment Not Found</h1>
          <Link href="/equipment" className="text-white hover:text-[#A80D0D]">
            ← Back to Equipment
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          <Link 
            href="/equipment" 
            className="inline-flex items-center gap-2 text-white/60 hover:text-[#A80D0D] transition-colors mb-6"
          >
            <span>←</span>
            <span className="font-bebas text-lg uppercase tracking-wider">Back to Equipment</span>
          </Link>
          
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Image Gallery */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-white/5 backdrop-blur-sm border border-white/10">
                <Image
                  src={equipment.images[selectedImage]}
                  alt={equipment.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                  unoptimized
                />
              </div>
              
              {/* Thumbnail Gallery (if multiple images) */}
              {equipment.images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {equipment.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`relative aspect-square overflow-hidden rounded border-2 transition-all ${
                        selectedImage === index 
                          ? 'border-[#A80D0D]' 
                          : 'border-white/20 hover:border-white/40'
                      }`}
                    >
                      <Image
                        src={image}
                        alt={`${equipment.title} ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="100px"
                        unoptimized
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {/* Equipment Details */}
            <div className="space-y-6">
              <div>
                <p className="text-[#A80D0D] font-bebas text-xl uppercase tracking-wider mb-2">
                  {equipment.category.replace('-', ' ')}
                </p>
                <h1 className="text-5xl md:text-6xl font-bebas text-white mb-4">
                  {equipment.title}
                </h1>
                <p className="text-lg text-white/80 leading-relaxed">
                  {equipment.description}
                </p>
              </div>
              
              {/* Features */}
              <div className="glass-dark rounded-xl p-6">
                <h3 className="font-bebas text-2xl text-[#A80D0D] mb-4">
                  KEY FEATURES
                </h3>
                <ul className="space-y-3">
                  {equipment.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-[#A80D0D] mr-3 text-xl">▸</span>
                      <span className="text-white/90">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* CTA Button */}
              <div className="flex gap-4">
                <Link
                  href="/#membership"
                  className="glass-red px-8 py-4 font-bebas text-xl uppercase tracking-wider rounded-xl hover-lift transition-all duration-300 inline-block text-center flex-1"
                >
                  Start Training Today
                </Link>
                <Link
                  href="/#contact"
                  className="glass-dark px-8 py-4 font-bebas text-xl uppercase tracking-wider rounded-xl hover-lift transition-all duration-300 inline-block text-center hover:border-[#A80D0D]/50"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Related Equipment */}
      {equipment.relatedEquipment.length > 0 && (
        <section className="py-16 px-4 border-t border-white/10">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bebas text-[#A80D0D] mb-8">
              Related Equipment
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {equipment.relatedEquipment.map((relatedSlug) => {
                const related = equipmentDatabase[relatedSlug];
                if (!related) return null;
                
                return (
                  <Link
                    key={relatedSlug}
                    href={`/equipment/${relatedSlug}`}
                    className="group relative overflow-hidden rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 hover:border-[#A80D0D]/50 transition-all duration-300"
                  >
                    <div className="aspect-[4/3] relative">
                      <Image
                        src={related.images[0]}
                        alt={related.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 33vw"
                        unoptimized
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <div className="p-4">
                      <h3 className="text-xl font-bebas text-white group-hover:text-[#A80D0D] transition-colors">
                        {related.title}
                      </h3>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}