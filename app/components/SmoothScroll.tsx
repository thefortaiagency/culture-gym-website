'use client'

import { useEffect } from 'react'

export default function SmoothScroll() {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      
      // Only handle anchor tags with hash links (internal navigation)
      if (target.tagName === 'A') {
        const href = target.getAttribute('href')
        if (href?.startsWith('#')) {
          e.preventDefault()
          const id = href.substring(1)
          if (id) {
            const element = document.getElementById(id)
            if (element) {
              let navHeight = 100 // Default offset for better title visibility
              
              // Custom offsets for each section
              switch(id) {
                case 'about':
                  navHeight = 120; // Shows "FIX IT. CLEAN IT. BE NICE." title properly
                  break;
                case 'equipment':
                  navHeight = 100; // Shows "BUILT FOR WARRIORS" title with optimal spacing
                  break;
                case 'classes':
                  navHeight = 140; // Shows "GROUP FITNESS" title with better spacing
                  break;
                case 'membership':
                  navHeight = 220; // Shows "JOIN THE CULTURE" title at the top properly
                  break;
                case 'contact':
                  navHeight = 120; // Shows contact title properly
                  break;
              }
              
              const elementPosition = element.getBoundingClientRect().top
              const offsetPosition = elementPosition + window.pageYOffset - navHeight
              
              window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
              })
            }
          }
        }
      }
    }

    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])

  return null
}