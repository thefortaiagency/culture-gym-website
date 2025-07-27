'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Navbar from '../../components/Navbar';
import Image from 'next/image';
import Link from 'next/link';
import { enhancedEquipmentData } from '@/lib/equipment-data-enhanced';

export default function EquipmentDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  
  const equipment = enhancedEquipmentData.find(item => item.slug === slug);
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

  // Get related equipment from same category
  const relatedEquipment = enhancedEquipmentData
    .filter(item => item.category === equipment.category && item.slug !== equipment.slug)
    .slice(0, 3);

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
                  src={equipment.images[selectedImage] || '/images/weights-section.jpg'}
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
              
              {/* Brand Information */}
              {equipment.brandInfo && (
                <div className="glass-dark rounded-xl p-6 border-2 border-[#A80D0D]/30">
                  <h3 className="font-bebas text-3xl text-[#A80D0D] mb-4">
                    {equipment.brandInfo.brand}
                  </h3>
                  <p className="text-white/80 mb-4">{equipment.brandInfo.description}</p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-white/60">Founded:</span>
                      <span className="text-white ml-2">{equipment.brandInfo.founded}</span>
                    </div>
                    {equipment.brandInfo.headquarters && (
                      <div>
                        <span className="text-white/60">HQ:</span>
                        <span className="text-white ml-2">{equipment.brandInfo.headquarters}</span>
                      </div>
                    )}
                  </div>
                  {equipment.brandInfo.certifications && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {equipment.brandInfo.certifications.map((cert, idx) => (
                        <span key={idx} className="px-3 py-1 bg-[#A80D0D]/20 text-[#A80D0D] rounded-full text-xs font-semibold">
                          {cert}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )}
              
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
              
              {/* Detailed Specifications */}
              {equipment.detailedSpecs && (
                <div className="glass-dark rounded-xl p-6">
                  <h3 className="font-bebas text-2xl text-[#A80D0D] mb-4">
                    TECHNICAL SPECIFICATIONS
                  </h3>
                  <ul className="space-y-2">
                    {equipment.detailedSpecs.map((spec, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-[#A80D0D] mr-3">•</span>
                        <span className="text-white/80 text-sm">{spec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
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
      {relatedEquipment.length > 0 && (
        <section className="py-16 px-4 border-t border-white/10">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bebas text-[#A80D0D] mb-8">
              Related Equipment
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedEquipment.map((related) => (
                <Link
                  key={related.slug}
                  href={`/equipment/${related.slug}`}
                  className="group relative overflow-hidden rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 hover:border-[#A80D0D]/50 transition-all duration-300"
                >
                  <div className="aspect-[4/3] relative">
                    <Image
                      src={related.images[0] || '/images/weights-section.jpg'}
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
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}