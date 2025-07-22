'use client'

import Hero from './components/Hero'
import CultureCard from './components/CultureCard'
import About from './components/About'
import Equipment from './components/Equipment'
import Classes from './components/Classes'
import Membership from './components/Membership'
import Contact from './components/Contact'
import Navbar from './components/Navbar'
import SmoothScroll from './components/SmoothScroll'
import BottomNav from './components/BottomNav'

export default function Home() {
  return (
    <main className="relative z-10">
      <SmoothScroll />
      <Navbar />
      <Hero />
      <CultureCard />
      <Membership />
      <Classes />
      <Equipment />
      <About />
      <Contact />
      <BottomNav />
    </main>
  )
}