'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Navbar from '../components/Navbar'
import BottomNav from '../components/BottomNav'

// Social media posts data - using existing images
const socialPosts = [
  {
    id: 1,
    image: '/images/514231131_1310414934424286_1460178885306871256_n.jpg',
    caption: 'Welcome to The Culture Gym! 💪',
    date: '2024-01-15',
    platform: 'facebook',
    likes: 234,
    link: 'https://www.facebook.com/culturegymfw'
  },
  {
    id: 2,
    image: '/images/514326628_1327836266015486_7424571008551726237_n.jpg',
    caption: 'New equipment alert! Check out our latest additions 🔥',
    date: '2024-01-20',
    platform: 'facebook',
    likes: 189,
    link: 'https://www.facebook.com/culturegymfw'
  },
  {
    id: 3,
    image: '/images/514348507_1324032679729178_397678139558773961_n.jpg',
    caption: 'Group fitness classes in full swing! Join us! 🏋️‍♀️',
    date: '2024-01-25',
    platform: 'facebook',
    likes: 312,
    link: 'https://www.facebook.com/culturegymfw'
  },
  {
    id: 4,
    image: '/images/514350088_1314560717343041_4174767494312555336_n.jpg',
    caption: 'FIX IT. CLEAN IT. BE NICE. Our culture in action! 💯',
    date: '2024-02-01',
    platform: 'facebook',
    likes: 456,
    link: 'https://www.facebook.com/culturegymfw'
  },
  {
    id: 5,
    image: '/images/515082845_1315376133928166_4049645105701932479_n.jpg',
    caption: 'Beast mode activated! 🦾 #CultureGym',
    date: '2024-02-05',
    platform: 'instagram',
    likes: 521,
    link: 'https://www.instagram.com/culturegymfw'
  },
  {
    id: 6,
    image: '/images/515287806_1315376143928165_8698818531847814540_n.jpg',
    caption: 'Community strong at The Culture Gym! 🤝',
    date: '2024-02-10',
    platform: 'instagram',
    likes: 398,
    link: 'https://www.instagram.com/culturegymfw'
  },
  {
    id: 7,
    image: '/images/516558065_1317120080420438_4340825272846079084_n.jpg',
    caption: 'Transform your body, transform your life! 🚀',
    date: '2024-02-15',
    platform: 'instagram',
    likes: 445,
    link: 'https://www.instagram.com/culturegymfw'
  },
  {
    id: 8,
    image: '/images/516756816_1317120120420434_3788766661750156299_n.jpg',
    caption: 'Hammer Strength heaven! 22 pieces and counting! 💪',
    date: '2024-02-20',
    platform: 'facebook',
    likes: 378,
    link: 'https://www.facebook.com/culturegymfw'
  },
  {
    id: 9,
    image: '/images/517377932_1324034396395673_246320575765218443_n.jpg',
    caption: 'Early morning grind! Who\'s with us? 🌅',
    date: '2024-02-25',
    platform: 'instagram',
    likes: 567,
    link: 'https://www.instagram.com/culturegymfw'
  },
  {
    id: 10,
    image: '/images/518173366_1323862636412849_894753409720715595_n.jpg',
    caption: 'Group fitness classes - where community meets fitness! 🏃‍♂️',
    date: '2024-03-01',
    platform: 'facebook',
    likes: 423,
    link: 'https://www.facebook.com/culturegymfw'
  },
  {
    id: 11,
    image: '/images/518475697_1324032696395843_6846144459381777435_n.jpg',
    caption: 'Spiece Fieldhouse legacy continues! 🏛️',
    date: '2024-03-05',
    platform: 'instagram',
    likes: 489,
    link: 'https://www.instagram.com/culturegymfw'
  },
  {
    id: 12,
    image: '/images/519619425_1330175989114847_6704194149731001125_n.jpg',
    caption: 'No contracts, just commitment! Join the Culture! 🎯',
    date: '2024-03-10',
    platform: 'facebook',
    likes: 512,
    link: 'https://www.facebook.com/culturegymfw'
  },
  {
    id: 13,
    image: '/images/520522738_1324034466395666_1325782561492407624_n.jpg',
    caption: 'Fort Wayne\'s old school gym with new school vibes! 🔥',
    date: '2024-03-15',
    platform: 'instagram',
    likes: 634,
    link: 'https://www.instagram.com/culturegymfw'
  }
]

export default function SocialPage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [selectedPlatform, setSelectedPlatform] = useState('all')
  const [hoveredPost, setHoveredPost] = useState<number | null>(null)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const filteredPosts = selectedPlatform === 'all' 
    ? socialPosts 
    : socialPosts.filter(post => post.platform === selectedPlatform)

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-culture-black pt-24 pb-20">
        {/* Hero Section */}
        <section className="py-12 bg-gradient-to-b from-culture-gray to-culture-black">
          <div className="container mx-auto px-4">
            <div className={`text-center transition-all duration-1000 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              <h1 className="font-bebas text-5xl md:text-7xl uppercase tracking-wider mb-4">
                <span className="text-culture-red">CULTURE</span> IN ACTION
              </h1>
              <p className="text-xl md:text-2xl font-light text-gray-300 mb-8">
                Follow our journey on social media
              </p>
              
              {/* Platform Filter */}
              <div className="flex justify-center gap-4 mb-8">
                <button
                  onClick={() => setSelectedPlatform('all')}
                  className={`px-6 py-3 font-bebas text-lg uppercase tracking-wider rounded-xl transition-all ${
                    selectedPlatform === 'all' 
                      ? 'glass-red' 
                      : 'glass-dark hover:glass-red'
                  }`}
                >
                  All Posts
                </button>
                <button
                  onClick={() => setSelectedPlatform('instagram')}
                  className={`px-6 py-3 font-bebas text-lg uppercase tracking-wider rounded-xl transition-all ${
                    selectedPlatform === 'instagram' 
                      ? 'glass-red' 
                      : 'glass-dark hover:glass-red'
                  }`}
                >
                  Instagram
                </button>
                <button
                  onClick={() => setSelectedPlatform('facebook')}
                  className={`px-6 py-3 font-bebas text-lg uppercase tracking-wider rounded-xl transition-all ${
                    selectedPlatform === 'facebook' 
                      ? 'glass-red' 
                      : 'glass-dark hover:glass-red'
                  }`}
                >
                  Facebook
                </button>
              </div>

              {/* Social Links */}
              <div className="flex justify-center gap-6">
                <a
                  href="https://www.facebook.com/culturegymfw"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-dark px-6 py-3 rounded-xl hover-lift inline-flex items-center gap-3"
                >
                  <span className="text-2xl">📘</span>
                  <span className="font-bebas text-lg">@culturegymfw</span>
                </a>
                <a
                  href="https://www.instagram.com/culturegymfw"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-dark px-6 py-3 rounded-xl hover-lift inline-flex items-center gap-3"
                >
                  <span className="text-2xl">📸</span>
                  <span className="font-bebas text-lg">@culturegymfw</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredPosts.map((post, index) => (
                <div
                  key={post.id}
                  className={`group relative overflow-hidden rounded-xl glass-dark transition-all duration-700 hover-lift ${
                    isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onMouseEnter={() => setHoveredPost(post.id)}
                  onMouseLeave={() => setHoveredPost(null)}
                >
                  {/* Image */}
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.caption}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    
                    {/* Overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-t from-culture-black via-culture-black/50 to-transparent transition-opacity duration-300 ${
                      hoveredPost === post.id ? 'opacity-100' : 'opacity-0 md:opacity-0 md:group-hover:opacity-100'
                    }`}>
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <p className="text-sm mb-2 line-clamp-2">{post.caption}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-culture-red">❤️</span>
                            <span className="text-sm">{post.likes}</span>
                          </div>
                          <span className="text-xs text-gray-400">
                            {new Date(post.date).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Platform Badge */}
                    <div className="absolute top-2 right-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-bebas uppercase tracking-wider ${
                        post.platform === 'instagram' 
                          ? 'bg-gradient-to-r from-purple-500 to-pink-500' 
                          : 'bg-blue-600'
                      }`}>
                        {post.platform}
                      </span>
                    </div>
                  </div>

                  {/* Click to view */}
                  <a
                    href={post.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute inset-0 z-10"
                  >
                    <span className="sr-only">View on {post.platform}</span>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-t from-culture-gray to-culture-black">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-bebas text-4xl md:text-5xl uppercase tracking-wider mb-6">
              <span className="text-stroke">JOIN THE</span>{' '}
              <span className="text-culture-red">CULTURE</span>
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Follow us for daily motivation, workout tips, and community updates!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/#membership"
                className="glass-red px-8 py-4 font-bebas text-2xl uppercase tracking-wider rounded-xl pulse-glow hover-lift inline-block"
              >
                BECOME A MEMBER
              </a>
              <a
                href="/#contact"
                className="glass-dark px-8 py-4 font-bebas text-2xl uppercase tracking-wider hover-lift transition-all duration-300 inline-block rounded-xl border border-culture-red/30"
              >
                VISIT US TODAY
              </a>
            </div>
          </div>
        </section>
      </main>
      <BottomNav />
    </>
  )
}