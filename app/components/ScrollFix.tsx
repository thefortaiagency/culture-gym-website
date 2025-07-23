'use client'

import { useEffect } from 'react'

export default function ScrollFix() {
  useEffect(() => {
    // Function to handle anchor clicks
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const anchor = target.closest('a')
      
      if (anchor && anchor.hash && anchor.hash.startsWith('#')) {
        e.preventDefault()
        const targetId = anchor.hash.slice(1)
        const targetElement = document.getElementById(targetId)
        
        if (targetElement) {
          const navbarHeight = 200 // Large offset to ensure content is visible
          const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navbarHeight
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          })
        }
      }
    }

    // Add event listener to all anchor clicks
    document.addEventListener('click', handleAnchorClick)

    // Also handle direct navigation to hash
    if (window.location.hash) {
      setTimeout(() => {
        const targetId = window.location.hash.slice(1)
        const targetElement = document.getElementById(targetId)
        if (targetElement) {
          const navbarHeight = 200
          const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navbarHeight
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          })
        }
      }, 100)
    }

    return () => {
      document.removeEventListener('click', handleAnchorClick)
    }
  }, [])

  return null
}