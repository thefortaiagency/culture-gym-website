'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function DebugPage() {
  const [imageStatus, setImageStatus] = useState<Record<string, string>>({});

  const testImages = [
    '/images/equipment/shoulder-equipment.jpg',
    '/images/weights-section.jpg',
    '/images/gym-interior.jpg'
  ];

  useEffect(() => {
    testImages.forEach(src => {
      const img = new window.Image();
      img.onload = () => {
        setImageStatus(prev => ({ ...prev, [src]: 'loaded' }));
      };
      img.onerror = () => {
        setImageStatus(prev => ({ ...prev, [src]: 'error' }));
      };
      img.src = src;
    });
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-4xl font-bold mb-8">Debug Equipment Images</h1>
      
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl mb-4">Image Load Status:</h2>
          <pre className="bg-gray-800 p-4 rounded">
            {JSON.stringify(imageStatus, null, 2)}
          </pre>
        </div>

        <div>
          <h2 className="text-2xl mb-4">Direct img tags:</h2>
          <div className="flex gap-4">
            <img 
              src="/images/equipment/shoulder-equipment.jpg" 
              alt="Shoulder Equipment"
              className="w-64 h-48 object-cover border border-gray-500"
              onError={(e) => console.error('Direct img error:', e)}
            />
            <img 
              src="/images/weights-section.jpg" 
              alt="Weights Section"
              className="w-64 h-48 object-cover border border-gray-500"
            />
          </div>
        </div>

        <div>
          <h2 className="text-2xl mb-4">Next.js Image component:</h2>
          <div className="flex gap-4">
            <div className="relative w-64 h-48 border border-gray-500">
              <Image
                src="/images/equipment/shoulder-equipment.jpg"
                alt="Shoulder Equipment"
                fill
                className="object-cover"
                onError={(e) => console.error('Next Image error:', e)}
                unoptimized
              />
            </div>
            <div className="relative w-64 h-48 border border-gray-500">
              <Image
                src="/images/weights-section.jpg"
                alt="Weights Section"
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}