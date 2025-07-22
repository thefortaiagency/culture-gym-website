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
    <section id="membership" className="pt-40 pb-20 bg-culture-black relative">
      <div className="container mx-auto px-4">
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
              
              <button className={`w-full py-3 font-bebas text-xl uppercase tracking-wider rounded-xl hover-lift transition-all duration-300 ${
                plan.popular
                  ? 'glass-red'
                  : 'glass-dark border border-culture-red/30 hover:glass-red'
              }`}>
                GET STARTED
              </button>
            </div>
          ))}
        </div>

        {/* Discounts */}
        <div className="glass-dark p-8 rounded-2xl max-w-4xl mx-auto slide-in hover-lift">
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
      </div>
    </section>
  )
}