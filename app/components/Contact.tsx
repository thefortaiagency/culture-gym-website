'use client'

export default function Contact() {
  const hours = [
    { days: 'MONDAY - FRIDAY', time: '5:00 AM - 12:00 AM' },
    { days: 'SATURDAY - SUNDAY', time: '6:00 AM - 9:00 PM' },
  ]

  return (
    <>
      <div style={{ height: '180px', background: 'linear-gradient(to bottom, rgba(31, 31, 31, 0.5), rgba(10, 10, 10, 1))', width: '100%' }}>
      </div>
      <section id="contact" className="pb-20 bg-culture-black">
        <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="section-title text-center mb-12">
            <span className="text-stroke">READY TO</span>{' '}
            <span className="text-culture-red">START?</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="glass-dark rounded-2xl p-8 space-y-8 slide-in hover-lift">
              <div>
                <h3 className="font-bebas text-3xl text-culture-red mb-4">PRIME FORT WAYNE LOCATION</h3>
                <p className="text-xl mb-2">📍 5316 Merchandise Dr</p>
                <p className="text-xl mb-4">Fort Wayne, IN 46808</p>
                <div className="glass rounded-xl p-4 text-sm space-y-2">
                  <p className="text-gray-300">✅ Historic Spiece Fieldhouse - A Fort Wayne Landmark</p>
                  <p className="text-gray-300">✅ Easy Access from I-69 & US-30</p>
                  <p className="text-gray-300">✅ Serving All Northeast Indiana</p>
                  <p className="text-gray-300">✅ Minutes from Downtown Fort Wayne</p>
                  <p className="text-gray-300">✅ Ample Free Parking</p>
                </div>
              </div>

              <div>
                <h3 className="font-bebas text-3xl text-culture-red mb-4">HOURS</h3>
                {hours.map((hour) => (
                  <div key={hour.days} className="flex justify-between mb-2">
                    <span>{hour.days}</span>
                    <span className="text-gray-400">{hour.time}</span>
                  </div>
                ))}
              </div>

              <div>
                <h3 className="font-bebas text-3xl text-culture-red mb-4">CONTACT</h3>
                <p className="text-xl mb-2">Phone: (260) 483-1415</p>
                <p className="text-xl">Email: info@theculturegym.com</p>
              </div>

              {/* Mobile App */}
              <div>
                <h3 className="font-bebas text-2xl text-culture-red mb-3">DOWNLOAD OUR APP</h3>
                <div className="flex gap-3">
                  <a
                    href="https://apps.apple.com/us/app/fliip-app/id1463973940"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass px-4 py-2 rounded-lg hover-lift transition-all duration-300 flex items-center gap-2 text-sm"
                  >
                    <span className="text-xl">🍎</span>
                    <span>iOS</span>
                  </a>
                  <a
                    href="https://play.google.com/store/apps/details?id=com.fliipmobileapp&hl=en_US&gl=US&pli=1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass px-4 py-2 rounded-lg hover-lift transition-all duration-300 flex items-center gap-2 text-sm"
                  >
                    <span className="text-xl">🤖</span>
                    <span>Android</span>
                  </a>
                </div>
              </div>

              <div className="flex gap-4">
                <a 
                  href="https://www.facebook.com/spiecefitness" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 glass-red flex items-center justify-center rounded-xl hover-lift transition-all duration-300"
                  aria-label="Visit The Culture Gym on Facebook"
                >
                  <span className="text-xl font-bold">f</span>
                </a>
                <a 
                  href="https://www.instagram.com/the_culture_gym?igsh=dTF3aWhwOGJ2eGFh" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 glass-red flex items-center justify-center rounded-xl hover-lift transition-all duration-300"
                  aria-label="Visit The Culture Gym on Instagram"
                >
                  <span className="text-xl">📷</span>
                </a>
              </div>
            </div>

            {/* Map/Image */}
            <div className="relative h-96 md:h-full min-h-[400px] glass-dark rounded-2xl overflow-hidden slide-in hover-lift">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3025.6974674012855!2d-85.05669908459456!3d41.12088597928831!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8815e48d6a5a5a5a%3A0x5a5a5a5a5a5a5a5a!2s5316%20Merchandise%20Dr%2C%20Fort%20Wayne%2C%20IN%2046808!5e0!3m2!1sen!2sus!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                className="grayscale contrast-110 rounded-2xl"
              />
              <div className="absolute inset-0 bg-black/20 pointer-events-none rounded-2xl" />
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-12 space-y-4">
            <a 
              href="https://thecultgym.fliipapp.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-red px-8 py-4 font-bebas text-2xl uppercase tracking-wider rounded-xl pulse-glow hover-lift transition-all duration-300 inline-block"
            >
              START FREE TRIAL
            </a>
            <p className="text-gray-400">No credit card required</p>
          </div>
        </div>
      </div>
    </section>
    </>
  )
}