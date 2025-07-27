'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const isHomePage = pathname === '/'

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { href: isHomePage ? '#membership' : '/#membership', label: 'MEMBERSHIP' },
    { href: isHomePage ? '#classes' : '/#classes', label: 'CLASSES' },
    { href: '/equipment', label: 'EQUIPMENT' },
    { href: isHomePage ? '#about' : '/#about', label: 'ABOUT' },
    { href: isHomePage ? '#contact' : '/#contact', label: 'CONTACT' },
  ]

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-culture-black/95 backdrop-blur-md py-2' : 'bg-transparent py-4'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="cursor-pointer">
              <Image
                src="/images/culturelogo2.png"
                alt="The Culture Gym"
                width={180}
                height={60}
                className="brightness-0 invert"
              />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-bebas text-xl tracking-wider hover:text-culture-red transition-colors duration-300"
              >
                {link.label}
              </Link>
            ))}
            <Link href={isHomePage ? "#membership" : "/#membership"} className="glass-red px-6 py-3 font-bebas text-lg uppercase tracking-wider rounded-xl hover-lift transition-all duration-300 inline-block">
              JOIN NOW
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-3xl"
          >
            {isMenuOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 bg-culture-gray/95 backdrop-blur-md rounded-lg p-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="block py-2 font-bebas text-xl tracking-wider hover:text-culture-red transition-colors duration-300"
              >
                {link.label}
              </Link>
            ))}
            <Link href={isHomePage ? "#membership" : "/#membership"} className="glass-red px-6 py-3 font-bebas text-lg uppercase tracking-wider rounded-xl hover-lift transition-all duration-300 w-full mt-4 inline-block text-center">
              JOIN NOW
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}