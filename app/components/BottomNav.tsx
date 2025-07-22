'use client'

export default function BottomNav() {
  const navSections = [
    { href: '#membership', label: 'Membership' },
    { href: '#classes', label: 'Classes' },
    { href: '#equipment', label: 'Equipment' },
    { href: '#about', label: 'About' },
    { href: '#contact', label: 'Contact' },
  ]

  const quickLinks = [
    { href: '#membership', label: 'Join Now' },
    { href: '#classes', label: 'View Schedule' },
    { href: '#contact', label: 'Visit Us' },
  ]

  const socialLinks = [
    { href: 'https://www.facebook.com/spiecefitness', label: 'Facebook', icon: 'f' },
    { href: 'https://www.instagram.com/the_culture_gym?igsh=dTF3aWhwOGJ2eGFh', label: 'Instagram', icon: '📷' },
  ]

  return (
    <footer className="bg-culture-black border-t border-culture-red/20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo & Tagline */}
          <div className="space-y-4">
            <h3 className="font-bebas text-3xl text-culture-red">THE CULTURE GYM</h3>
            <p className="text-gray-400">Fix It. Clean It. Be Nice.</p>
            <p className="text-sm text-gray-500">
              Fort Wayne's premier old school gym at historic Spiece Fieldhouse
            </p>
          </div>

          {/* Site Navigation */}
          <div className="space-y-4">
            <h4 className="font-bebas text-xl text-culture-red">EXPLORE</h4>
            <ul className="space-y-2">
              {navSections.map((link) => (
                <li key={link.href}>
                  <a 
                    href={link.href}
                    className="text-gray-400 hover:text-culture-red transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Actions */}
          <div className="space-y-4">
            <h4 className="font-bebas text-xl text-culture-red">QUICK LINKS</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a 
                    href={link.href}
                    className="text-gray-400 hover:text-culture-red transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Social */}
          <div className="space-y-4">
            <h4 className="font-bebas text-xl text-culture-red">CONNECT</h4>
            <div className="space-y-2 text-gray-400">
              <p>5310 Merchandise Dr</p>
              <p>Fort Wayne, IN 46808</p>
              <p>(260) 123-4567</p>
            </div>
            <div className="flex gap-4 pt-4">
              {socialLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 glass-dark flex items-center justify-center rounded-lg hover:glass-red transition-all duration-300 hover-lift"
                  aria-label={link.label}
                >
                  <span className="text-lg">{link.icon}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-culture-gray/50">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              © 2024 The Culture Gym. All rights reserved.
            </p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <a href="#" className="text-gray-500 hover:text-gray-300 text-sm">Privacy Policy</a>
              <a href="#" className="text-gray-500 hover:text-gray-300 text-sm">Terms of Service</a>
            </div>
          </div>
          <div className="text-center mt-6">
            <p className="text-gray-600 text-sm">
              Created by{' '}
              <a 
                href="https://thefortaiagency.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-culture-red hover:text-red-500 transition-colors duration-300"
              >
                The Fort AI Agency
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}