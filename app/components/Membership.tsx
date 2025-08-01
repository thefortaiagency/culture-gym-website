'use client'

export default function Membership() {
  const plans = [
    {
      name: 'SINGLE',
      price: '$45',
      period: '/month',
      features: [
        'Full gym access',
        'All group fitness classes',
        'Sauna access',
        'Indoor track',
        'Shower facilities',
      ],
      popular: false,
    },
    {
      name: 'COUPLE',
      price: '$65',
      period: '/month',
      features: [
        'Everything in Single',
        'Access for 2 adults',
        'Guest privileges',
        'Priority class booking',
        'Couples training discount',
      ],
      popular: true,
    },
    {
      name: 'FAMILY',
      price: '$65',
      period: '/month +$10/child',
      features: [
        'Everything in Couple',
        'Kids 18 & under included',
        'Family fitness programs',
        'Youth training options',
        'Family locker room',
      ],
      popular: false,
    },
  ]

  const discounts = [
    'MILITARY & FIRST RESPONDERS',
    'STUDENTS',
    'SENIOR CITIZENS',
    'SILVER SNEAKERS',
    'PRIME & RENEW ACTIVE',
    'ACTIVE FIT & SILVER FIT',
  ]

  return (
    <>
      <div style={{ height: '180px', background: 'linear-gradient(to bottom, rgba(31, 31, 31, 0.5), rgba(31, 31, 31, 1))', width: '100%' }}>
      </div>
      <section id="membership" className="bg-culture-gray relative">
        <div className="container mx-auto px-4 pb-20">
        <div className="text-center mb-12">
          <h2 className="section-title mb-4">
            <span className="text-stroke">JOIN THE</span>{' '}
            <span className="text-culture-red">CULTURE</span>
          </h2>
          <p className="text-xl">NO CONTRACTS. NO BS. JUST RESULTS.</p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
          {plans.map((plan, index) => (
            <div
              key={plan.name}
              className={`relative glass-dark p-8 rounded-2xl transition-all duration-300 slide-in hover-lift ${
                plan.popular 
                  ? 'scale-105 shadow-2xl shadow-culture-red/30 border-2 border-culture-red pulse-glow' 
                  : ''
              }`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 glass-red px-4 py-2 rounded-xl">
                  <span className="font-bebas text-sm">MOST POPULAR</span>
                </div>
              )}
              
              <h3 className="font-bebas text-3xl text-center mb-4">{plan.name}</h3>
              <div className="text-center mb-6">
                <span className="text-5xl font-bebas text-culture-red">{plan.price}</span>
                <span className="text-gray-400">{plan.period}</span>
              </div>
              
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-culture-red mr-2">✓</span>
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <a 
                href="https://thecultgym.fliipapp.com/" 
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full py-3 font-bebas text-xl uppercase tracking-wider rounded-xl hover-lift transition-all duration-300 inline-block text-center ${
                  plan.popular
                    ? 'glass-red'
                    : 'glass-dark border border-culture-red/30 hover:glass-red'
                }`}
              >
                GET STARTED
              </a>
            </div>
          ))}
        </div>

        {/* Discounts */}
        <div className="glass-dark p-8 rounded-2xl max-w-4xl mx-auto mb-12 slide-in hover-lift">
          <h3 className="font-bebas text-3xl text-center text-culture-red mb-6">
            SPECIAL DISCOUNTS AVAILABLE
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {discounts.map((discount, index) => (
              <div 
                key={discount}
                className="text-center p-4 glass rounded-xl hover-lift transition-all duration-300 slide-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <span className="text-sm uppercase font-medium">{discount}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile App Section */}
        <div className="glass-dark p-8 rounded-2xl max-w-4xl mx-auto slide-in hover-lift text-center">
          <h3 className="font-bebas text-3xl text-culture-red mb-4">
            ALREADY A MEMBER?
          </h3>
          <p className="text-xl mb-6">Download the Fliip app to manage your membership</p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="https://apps.apple.com/us/app/fliip-app/id1463973940"
              target="_blank"
              rel="noopener noreferrer"
              className="glass px-6 py-3 rounded-xl hover-lift transition-all duration-300 flex items-center gap-3 group"
            >
              <span className="text-3xl">🍎</span>
              <div className="text-left">
                <div className="text-xs text-gray-400">Download on the</div>
                <div className="font-bebas text-lg group-hover:text-culture-red transition-colors">App Store</div>
              </div>
            </a>
            
            <a
              href="https://play.google.com/store/apps/details?id=com.fliipmobileapp&hl=en_US&gl=US&pli=1"
              target="_blank"
              rel="noopener noreferrer"
              className="glass px-6 py-3 rounded-xl hover-lift transition-all duration-300 flex items-center gap-3 group"
            >
              <span className="text-3xl">🤖</span>
              <div className="text-left">
                <div className="text-xs text-gray-400">Get it on</div>
                <div className="font-bebas text-lg group-hover:text-culture-red transition-colors">Google Play</div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
    </>
  )
}