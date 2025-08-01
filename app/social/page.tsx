'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Navbar from '../components/Navbar'
import BottomNav from '../components/BottomNav'

// Complete social media and gym photos data
const socialPosts = [
  // Original Facebook/Social Posts
  {
    id: 1,
    image: '/images/514231131_1310414934424286_1460178885306871256_n.jpg',
    caption: 'Welcome to The Culture Gym! 💪',
    date: '2024-01-15',
    platform: 'facebook',
    category: 'social',
    likes: 234,
    link: 'https://www.facebook.com/culturegymfw'
  },
  {
    id: 2,
    image: '/images/514326628_1327836266015486_7424571008551726237_n.jpg',
    caption: 'New equipment alert! Check out our latest additions 🔥',
    date: '2024-01-20',
    platform: 'facebook',
    category: 'social',
    likes: 189,
    link: 'https://www.facebook.com/culturegymfw'
  },
  {
    id: 3,
    image: '/images/514348507_1324032679729178_397678139558773961_n.jpg',
    caption: 'Group fitness classes in full swing! Join us! 🏋️‍♀️',
    date: '2024-01-25',
    platform: 'facebook',
    category: 'social',
    likes: 312,
    link: 'https://www.facebook.com/culturegymfw'
  },
  {
    id: 4,
    image: '/images/514350088_1314560717343041_4174767494312555336_n.jpg',
    caption: 'FIX IT. CLEAN IT. BE NICE. Our culture in action! 💯',
    date: '2024-02-01',
    platform: 'facebook',
    category: 'social',
    likes: 456,
    link: 'https://www.facebook.com/culturegymfw'
  },
  {
    id: 5,
    image: '/images/515082845_1315376133928166_4049645105701932479_n.jpg',
    caption: 'Beast mode activated! 🦾 #CultureGym',
    date: '2024-02-05',
    platform: 'instagram',
    category: 'social',
    likes: 521,
    link: 'https://www.instagram.com/culturegymfw'
  },
  {
    id: 6,
    image: '/images/515287806_1315376143928165_8698818531847814540_n.jpg',
    caption: 'Community strong at The Culture Gym! 🤝',
    date: '2024-02-10',
    platform: 'instagram',
    category: 'social',
    likes: 398,
    link: 'https://www.instagram.com/culturegymfw'
  },
  {
    id: 7,
    image: '/images/516558065_1317120080420438_4340825272846079084_n.jpg',
    caption: 'Transform your body, transform your life! 🚀',
    date: '2024-02-15',
    platform: 'instagram',
    category: 'social',
    likes: 445,
    link: 'https://www.instagram.com/culturegymfw'
  },
  {
    id: 8,
    image: '/images/516756816_1317120120420434_3788766661750156299_n.jpg',
    caption: 'Hammer Strength heaven! 22 pieces and counting! 💪',
    date: '2024-02-20',
    platform: 'facebook',
    category: 'social',
    likes: 378,
    link: 'https://www.facebook.com/culturegymfw'
  },
  {
    id: 9,
    image: '/images/517377932_1324034396395673_246320575765218443_n.jpg',
    caption: 'Early morning grind! Who\'s with us? 🌅',
    date: '2024-02-25',
    platform: 'instagram',
    category: 'social',
    likes: 567,
    link: 'https://www.instagram.com/culturegymfw'
  },
  {
    id: 10,
    image: '/images/518173366_1323862636412849_894753409720715595_n.jpg',
    caption: 'Group fitness classes - where community meets fitness! 🏃‍♂️',
    date: '2024-03-01',
    platform: 'facebook',
    category: 'social',
    likes: 423,
    link: 'https://www.facebook.com/culturegymfw'
  },
  {
    id: 11,
    image: '/images/518475697_1324032696395843_6846144459381777435_n.jpg',
    caption: 'Spiece Fieldhouse legacy continues! 🏛️',
    date: '2024-03-05',
    platform: 'instagram',
    category: 'social',
    likes: 489,
    link: 'https://www.instagram.com/culturegymfw'
  },
  {
    id: 12,
    image: '/images/519619425_1330175989114847_6704194149731001125_n.jpg',
    caption: 'No contracts, just commitment! Join the Culture! 🎯',
    date: '2024-03-10',
    platform: 'facebook',
    category: 'social',
    likes: 512,
    link: 'https://www.facebook.com/culturegymfw'
  },
  {
    id: 13,
    image: '/images/520522738_1324034466395666_1325782561492407624_n.jpg',
    caption: 'Fort Wayne\'s old school gym with new school vibes! 🔥',
    date: '2024-03-15',
    platform: 'instagram',
    category: 'social',
    likes: 634,
    link: 'https://www.instagram.com/culturegymfw'
  },

  // Group Fitness Photos
  {
    id: 14,
    image: '/images/group fitness/IMG_1136.JPG',
    caption: 'Group fitness energy is UNMATCHED! 💥',
    date: '2024-03-20',
    platform: 'instagram',
    category: 'group-fitness',
    likes: 445,
    link: 'https://www.instagram.com/culturegymfw'
  },
  {
    id: 15,
    image: '/images/group fitness/IMG_1356.JPG',
    caption: 'Morning warriors crushing their goals! 🌅💪',
    date: '2024-03-22',
    platform: 'facebook',
    category: 'group-fitness',
    likes: 367,
    link: 'https://www.facebook.com/culturegymfw'
  },
  {
    id: 16,
    image: '/images/group fitness/IMG_1357.JPG',
    caption: 'Community that sweats together, stays together! 🔥',
    date: '2024-03-25',
    platform: 'instagram',
    category: 'group-fitness',
    likes: 523,
    link: 'https://www.instagram.com/culturegymfw'
  },
  {
    id: 17,
    image: '/images/group fitness/IMG_1358.JPG',
    caption: 'High-intensity, high-energy, high-results! ⚡',
    date: '2024-03-28',
    platform: 'facebook',
    category: 'group-fitness',
    likes: 389,
    link: 'https://www.facebook.com/culturegymfw'
  },
  {
    id: 18,
    image: '/images/group fitness/IMG_1359.JPG',
    caption: 'Push your limits in our group fitness classes! 🚀',
    date: '2024-04-01',
    platform: 'instagram',
    category: 'group-fitness',
    likes: 456,
    link: 'https://www.instagram.com/culturegymfw'
  },
  {
    id: 19,
    image: '/images/group fitness/IMG_1360.JPG',
    caption: 'Functional fitness that builds real strength! 💯',
    date: '2024-04-03',
    platform: 'facebook',
    category: 'group-fitness',
    likes: 298,
    link: 'https://www.facebook.com/culturegymfw'
  },
  {
    id: 20,
    image: '/images/group fitness/IMG_1361.JPG',
    caption: 'Every rep counts, every member matters! 👥',
    date: '2024-04-05',
    platform: 'instagram',
    category: 'group-fitness',
    likes: 512,
    link: 'https://www.instagram.com/culturegymfw'
  },
  {
    id: 21,
    image: '/images/group fitness/IMG_1365.JPG',
    caption: 'State-of-the-art group fitness room! 🏢✨',
    date: '2024-04-08',
    platform: 'facebook',
    category: 'group-fitness',
    likes: 334,
    link: 'https://www.facebook.com/culturegymfw'
  },
  {
    id: 22,
    image: '/images/group fitness/IMG_8123.JPG',
    caption: '30+ group classes - find your perfect fit! 📋',
    date: '2024-04-10',
    platform: 'instagram',
    category: 'group-fitness',
    likes: 478,
    link: 'https://www.instagram.com/culturegymfw'
  },

  // Equipment Showcase - Featured pieces
  {
    id: 23,
    image: '/images/equipment/hammer-strength/IMG_1873.jpeg',
    caption: 'Hammer Strength - the gold standard! 🏆',
    date: '2024-04-12',
    platform: 'instagram',
    category: 'equipment',
    likes: 567,
    link: 'https://www.instagram.com/culturegymfw'
  },
  {
    id: 24,
    image: '/images/equipment/cardio-equipment/IMG_1760.jpeg',
    caption: 'Cardio that doesn\'t feel like work! 🏃‍♂️',
    date: '2024-04-15',
    platform: 'facebook',
    category: 'equipment',
    likes: 345,
    link: 'https://www.facebook.com/culturegymfw'
  },
  {
    id: 25,
    image: '/images/equipment/powerlift-racks/IMG_1871.jpeg',
    caption: 'Power rack paradise for serious lifters! 🏋️‍♀️',
    date: '2024-04-18',
    platform: 'instagram',
    category: 'equipment',
    likes: 623,
    link: 'https://www.instagram.com/culturegymfw'
  },
  {
    id: 26,
    image: '/images/equipment/free-weights-room.jpg',
    caption: 'Free weights room - where legends are made! 💪',
    date: '2024-04-20',
    platform: 'facebook',
    category: 'equipment',
    likes: 445,
    link: 'https://www.facebook.com/culturegymfw'
  },

  // Gym Atmosphere
  {
    id: 27,
    image: '/images/gym-interior.jpg',
    caption: 'Step inside Fort Wayne\'s premier fitness destination! 🏛️',
    date: '2024-04-22',
    platform: 'instagram',
    category: 'atmosphere',
    likes: 543,
    link: 'https://www.instagram.com/culturegymfw'
  },
  {
    id: 28,
    image: '/images/training-area.jpg',
    caption: 'Training area where goals become reality! 🎯',
    date: '2024-04-25',
    platform: 'facebook',
    category: 'atmosphere',
    likes: 398,
    link: 'https://www.facebook.com/culturegymfw'
  },
  {
    id: 29,
    image: '/images/weights-section.jpg',
    caption: 'Weight section that serious lifters call home! 🏠',
    date: '2024-04-28',
    platform: 'instagram',
    category: 'atmosphere',
    likes: 612,
    link: 'https://www.instagram.com/culturegymfw'
  },
  {
    id: 30,
    image: '/images/pic1.jpg',
    caption: 'The Culture Gym - where fitness meets community! 🤝',
    date: '2024-05-01',
    platform: 'facebook',
    category: 'atmosphere',
    likes: 467,
    link: 'https://www.facebook.com/culturegymfw'
  }
]

export default function SocialPage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [selectedFilter, setSelectedFilter] = useState('all')
  const [hoveredPost, setHoveredPost] = useState<number | null>(null)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const filteredPosts = selectedFilter === 'all' 
    ? socialPosts 
    : selectedFilter === 'instagram' || selectedFilter === 'facebook'
    ? socialPosts.filter(post => post.platform === selectedFilter)
    : socialPosts.filter(post => post.category === selectedFilter)

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
              
              {/* Filter Categories */}
              <div className="flex flex-wrap justify-center gap-3 mb-8">
                <button
                  onClick={() => setSelectedFilter('all')}
                  className={`px-4 py-2 font-bebas text-sm md:text-lg uppercase tracking-wider rounded-xl transition-all ${
                    selectedFilter === 'all' 
                      ? 'glass-red' 
                      : 'glass-dark hover:glass-red'
                  }`}
                >
                  All Photos
                </button>
                <button
                  onClick={() => setSelectedFilter('group-fitness')}
                  className={`px-4 py-2 font-bebas text-sm md:text-lg uppercase tracking-wider rounded-xl transition-all ${
                    selectedFilter === 'group-fitness' 
                      ? 'glass-red' 
                      : 'glass-dark hover:glass-red'
                  }`}
                >
                  Group Fitness
                </button>
                <button
                  onClick={() => setSelectedFilter('equipment')}
                  className={`px-4 py-2 font-bebas text-sm md:text-lg uppercase tracking-wider rounded-xl transition-all ${
                    selectedFilter === 'equipment' 
                      ? 'glass-red' 
                      : 'glass-dark hover:glass-red'
                  }`}
                >
                  Equipment
                </button>
                <button
                  onClick={() => setSelectedFilter('atmosphere')}
                  className={`px-4 py-2 font-bebas text-sm md:text-lg uppercase tracking-wider rounded-xl transition-all ${
                    selectedFilter === 'atmosphere' 
                      ? 'glass-red' 
                      : 'glass-dark hover:glass-red'
                  }`}
                >
                  Atmosphere
                </button>
                <button
                  onClick={() => setSelectedFilter('instagram')}
                  className={`px-4 py-2 font-bebas text-sm md:text-lg uppercase tracking-wider rounded-xl transition-all ${
                    selectedFilter === 'instagram' 
                      ? 'glass-red' 
                      : 'glass-dark hover:glass-red'
                  }`}
                >
                  Instagram
                </button>
                <button
                  onClick={() => setSelectedFilter('facebook')}
                  className={`px-4 py-2 font-bebas text-sm md:text-lg uppercase tracking-wider rounded-xl transition-all ${
                    selectedFilter === 'facebook' 
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
            {/* Results Counter */}
            <div className="text-center mb-8">
              <p className="text-lg text-gray-300">
                Showing <span className="text-culture-red font-bebas text-xl">{filteredPosts.length}</span> photos
                {selectedFilter !== 'all' && (
                  <span> in <span className="text-culture-red font-bebas capitalize">{selectedFilter.replace('-', ' ')}</span></span>
                )}
              </p>
            </div>
            
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
                href="https://thecultgym.fliipapp.com/"
                target="_blank"
                rel="noopener noreferrer"
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