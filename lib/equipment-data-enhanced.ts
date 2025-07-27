export interface BrandInfo {
  brand: string;
  founded: string;
  headquarters?: string;
  parentCompany?: string;
  description: string;
  keyFeatures: string[];
  certifications?: string[];
}

export interface EquipmentItem {
  id: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  features: string[];
  images: string[];
  brandInfo?: BrandInfo;
  detailedSpecs?: string[];
}

export const brandInformation: Record<string, BrandInfo> = {
  'hammer-strength': {
    brand: 'Hammer Strength',
    founded: '1989',
    headquarters: 'Schiller Park, Illinois, USA',
    parentCompany: 'Life Fitness (Brunswick Corporation)',
    description: 'Hammer Strength is the gold standard in plate-loaded equipment, pioneering the use of iso-lateral technology that allows for equal strength development and muscle stimulation. Founded by Gary Jones, a former Cincinnati Bengals strength coach, Hammer Strength revolutionized strength training with biomechanically sound movement patterns.',
    keyFeatures: [
      'ISO-Lateral Technology - Independent movement for balanced muscle development',
      'Plate-Loaded Design - Progressive resistance with Olympic plates',
      'Ground Base Equipment - Functional movement patterns',
      'MTS (Motion Technology Selectorized) - Smooth, natural motion',
      'Professional athlete endorsements and Olympic training center partnerships'
    ],
    certifications: ['NFL Official Equipment', 'Olympic Training Centers', 'D1 Athletics']
  },
  'bodymaster': {
    brand: 'BodyMaster',
    founded: '1980s',
    headquarters: 'Rayne, Louisiana, USA',
    description: 'BodyMaster is renowned for creating biomechanically correct strength equipment that provides precise muscle isolation and safe training mechanics. Their equipment features unique cam designs and leverage systems that maintain consistent resistance throughout the entire range of motion.',
    keyFeatures: [
      'Biomechanically engineered cam profiles',
      'Heavy-gauge steel construction (11-gauge minimum)',
      'Precision pivot points with sealed bearings',
      'Ergonomic pad designs for proper body positioning',
      'Smooth, friction-free movement patterns'
    ],
    certifications: ['Commercial Grade Certified', 'IHRSA Member']
  },
  'precor-icarian-paramount': {
    brand: 'Precor / Icarian / Paramount',
    founded: 'Precor (1980), Icarian (1979), Paramount (1954)',
    headquarters: 'Woodinville, Washington, USA (Precor)',
    parentCompany: 'Peloton Interactive (Precor), Core Health & Fitness (Icarian)',
    description: 'This collection represents three legendary brands in commercial fitness. Precor pioneered elliptical training and biomechanics research. Icarian revolutionized plate-loaded equipment with their CFF line. Paramount, one of the oldest names in fitness, introduced multi-station training systems.',
    keyFeatures: [
      'Precor: Advanced biomechanics and elliptical innovation',
      'Icarian: Heavy-duty plate-loaded with unique converging/diverging paths',
      'Paramount: Multi-station versatility and circuit training design',
      'Commercial durability rated for 24/7 facility use',
      'Integrated technology and tracking capabilities'
    ],
    certifications: ['CE Certified', 'UL Listed', 'FDA Registered']
  },
  'rogue-dynabody': {
    brand: 'Rogue Fitness / Dynabody',
    founded: 'Rogue (2006), Dynabody (1980s)',
    headquarters: 'Columbus, Ohio, USA (Rogue)',
    description: 'Rogue Fitness has become synonymous with American-made strength equipment, particularly in CrossFit and functional fitness. Known for their indestructible construction and lifetime warranties. Dynabody was a pioneer in selectorized equipment with innovative weight stack designs.',
    keyFeatures: [
      'Rogue: Made in USA with lifetime structural warranties',
      'Heavy-duty 3x3" 11-gauge steel construction',
      'Innovative attachments and customization options',
      'CrossFit Games official equipment supplier',
      'Dynabody: Revolutionary weight stack technology'
    ],
    certifications: ['Made in USA Certified', 'CrossFit Official Supplier']
  },
  'camstar': {
    brand: 'Camstar',
    founded: '1990s',
    headquarters: 'USA',
    description: 'Camstar specializes in cam-based resistance equipment that provides variable resistance matching the natural strength curve of muscles. Their unique cam profiles ensure maximum muscle engagement throughout the entire range of motion.',
    keyFeatures: [
      'Patented cam technology for variable resistance',
      'Smooth action with minimal friction',
      'Compact footprint ideal for space efficiency',
      'Adjustable starting positions',
      'Heavy-duty commercial construction'
    ]
  }
};

export const enhancedEquipmentData: EquipmentItem[] = [
  {
    id: "1",
    title: "Back Training Equipment",
    slug: "back-equipment",
    category: "strength",
    description: "Complete back training equipment for building a strong, defined back with width, thickness, and detail. Our collection features 15 specialized machines targeting every muscle group in your back.",
    features: [
      "Multiple lat pulldown stations with various grip options",
      "Cable row machines with adjustable heights and angles",
      "T-bar row platforms for heavy back thickness work",
      "Pull-up and chin-up stations with assistance options",
      "Back extension benches and reverse hyper machines",
      "ISO-lateral rowing machines for unilateral training",
      "Deadlift platforms with Olympic bars"
    ],
    detailedSpecs: [
      "T-Bar Row Platform - Accommodates up to 500lbs of plates",
      "Cable stations feature 200lb weight stacks",
      "Lat pulldown bars include wide, narrow, and neutral grips",
      "Back extension benches with adjustable pad heights",
      "Pull-up stations with multiple grip positions"
    ],
    images: [
      "/images/equipment/back-equipment/IMG_2607.jpeg",
      "/images/equipment/back-equipment/IMG_2608.jpeg",
      "/images/equipment/back-equipment/IMG_2609.jpeg",
      "/images/equipment/back-equipment/IMG_2610.jpeg",
      "/images/equipment/back-equipment/IMG_2611.jpeg",
      "/images/equipment/back-equipment/IMG_2612.jpeg",
      "/images/equipment/back-equipment/IMG_2613.jpeg",
      "/images/equipment/back-equipment/IMG_2614.jpeg",
      "/images/equipment/back-equipment/IMG_2615.jpeg",
      "/images/equipment/back-equipment/IMG_2616.jpeg",
      "/images/equipment/back-equipment/IMG_2617.jpeg",
      "/images/equipment/back-equipment/IMG_2618.jpeg",
      "/images/equipment/back-equipment/IMG_2619.jpeg",
      "/images/equipment/back-equipment/IMG_2620.jpeg",
      "/images/equipment/back-equipment/IMG_2621.jpeg"
    ]
  },
  {
    id: "2",
    title: "BodyMaster Equipment",
    slug: "bodymaster-equipment",
    category: "strength",
    description: "BodyMaster commercial strength equipment featuring 31 pieces of biomechanically correct machines. Each piece is engineered for precise muscle targeting and safe training mechanics.",
    brandInfo: brandInformation['bodymaster'],
    features: [
      "Biomechanically correct movement patterns throughout full ROM",
      "Heavy-duty commercial construction with 11-gauge steel",
      "Easy adjustment systems with numbered settings",
      "Full body workout capability across all muscle groups",
      "Suitable for all fitness levels from beginner to advanced",
      "Unique cam profiles for consistent resistance",
      "Ergonomic padding and body positioning"
    ],
    detailedSpecs: [
      "Weight stacks range from 150-300lbs depending on machine",
      "Precision bearings rated for 1 million cycles",
      "Powder-coated finish with lifetime warranty on frames",
      "Adjustable seats with gas-assisted positioning",
      "Commercial-grade upholstery rated for 24/7 use"
    ],
    images: [
      "/images/equipment/bodymaster-equipment/IMG_1876.jpeg",
      "/images/equipment/bodymaster-equipment/IMG_2461.jpeg",
      "/images/equipment/bodymaster-equipment/IMG_2463.jpeg",
      "/images/equipment/bodymaster-equipment/IMG_2464.jpeg",
      "/images/equipment/bodymaster-equipment/IMG_2465.jpeg",
      "/images/equipment/bodymaster-equipment/IMG_2466.jpeg",
      "/images/equipment/bodymaster-equipment/IMG_2467.jpeg",
      "/images/equipment/bodymaster-equipment/IMG_2468.jpeg",
      "/images/equipment/bodymaster-equipment/IMG_2469.jpeg",
      "/images/equipment/bodymaster-equipment/IMG_2470.jpeg",
      "/images/equipment/bodymaster-equipment/IMG_2471.jpeg",
      "/images/equipment/bodymaster-equipment/IMG_2473.jpeg",
      "/images/equipment/bodymaster-equipment/IMG_2474.jpeg",
      "/images/equipment/bodymaster-equipment/IMG_2476.jpeg",
      "/images/equipment/bodymaster-equipment/IMG_2477.jpeg",
      "/images/equipment/bodymaster-equipment/IMG_2478.jpeg",
      "/images/equipment/bodymaster-equipment/IMG_2480.jpeg",
      "/images/equipment/bodymaster-equipment/IMG_2482.jpeg",
      "/images/equipment/bodymaster-equipment/IMG_2483.jpeg",
      "/images/equipment/bodymaster-equipment/IMG_2489.jpeg",
      "/images/equipment/bodymaster-equipment/IMG_2490.jpeg",
      "/images/equipment/bodymaster-equipment/IMG_2504.jpeg",
      "/images/equipment/bodymaster-equipment/IMG_2526.jpeg",
      "/images/equipment/bodymaster-equipment/IMG_2527.jpeg",
      "/images/equipment/bodymaster-equipment/IMG_2528.jpeg",
      "/images/equipment/bodymaster-equipment/IMG_2529.jpeg",
      "/images/equipment/bodymaster-equipment/IMG_2530.jpeg",
      "/images/equipment/bodymaster-equipment/IMG_2531.jpeg",
      "/images/equipment/bodymaster-equipment/IMG_2532.jpeg",
      "/images/equipment/bodymaster-equipment/IMG_2533.jpeg",
      "/images/equipment/bodymaster-equipment/IMG_2553.jpeg"
    ]
  },
  {
    id: "3",
    title: "Camstar Equipment",
    slug: "camstar-equipment",
    category: "strength",
    description: "Specialized Camstar strength training equipment featuring unique cam profiles for variable resistance training. Our cam technology ensures maximum muscle engagement throughout the entire range of motion.",
    brandInfo: brandInformation['camstar'],
    features: [
      "Variable resistance technology with patented cam design",
      "Smooth cam-based action with minimal friction",
      "Multiple exercise stations for full-body training",
      "Adjustable range of motion for all body types",
      "Commercial durability and reliability",
      "Space-efficient design",
      "Precision engineering for consistent resistance curves"
    ],
    images: [
      "/images/equipment/camstar-equipment/IMG_2486.jpeg",
      "/images/equipment/camstar-equipment/IMG_2493.jpeg"
    ]
  },
  {
    id: "4",
    title: "Cardio Equipment",
    slug: "cardio-equipment",
    category: "cardio",
    description: "State-of-the-art cardiovascular equipment for all fitness levels, featuring our unique 1/9 mile indoor track. Build endurance, burn calories, and improve heart health with our diverse cardio selection.",
    features: [
      "1/9 mile rubberized indoor track - 9 laps = 1 mile",
      "Treadmills with built-in entertainment systems",
      "Elliptical machines with variable stride lengths",
      "Stationary and recumbent bikes with virtual courses",
      "Stair climbers and stepmills for intense cardio",
      "Rowing machines for full-body cardio workouts",
      "Heart rate monitoring on all equipment"
    ],
    detailedSpecs: [
      "Track surface: Professional-grade rubberized material",
      "Treadmills: 0-15% incline, up to 12mph",
      "Ellipticals: 16-26 inch adjustable stride",
      "Bikes: Magnetic resistance with 25 levels",
      "All cardio equipment includes touchscreen displays"
    ],
    images: [
      "/images/equipment/cardio-equipment/IMG_1760.jpeg",
      "/images/equipment/cardio-equipment/IMG_1761.jpeg",
      "/images/equipment/cardio-equipment/IMG_1863.jpeg",
      "/images/equipment/cardio-equipment/IMG_2063.jpeg",
      "/images/equipment/cardio-equipment/IMG_2213.jpeg",
      "/images/equipment/cardio-equipment/IMG_7876.jpeg"
    ]
  },
  {
    id: "5",
    title: "Chest Training Equipment",
    slug: "chest-equipment",
    category: "strength",
    description: "Comprehensive chest training equipment featuring 21 specialized machines for building a powerful upper body. From converging chest presses to cable crossovers, develop complete pectoral strength and definition.",
    features: [
      "Multiple chest press angles (flat, incline, decline)",
      "Fly machines and pec decks for isolation work",
      "Cable crossover stations with adjustable pulleys",
      "Dip stations and parallettes for bodyweight training",
      "Smith machines for guided barbell work",
      "ISO-lateral presses for independent arm movement",
      "Plate-loaded and selectorized options"
    ],
    detailedSpecs: [
      "Chest press machines accommodate up to 500lbs",
      "Cable crossovers feature dual 200lb weight stacks",
      "Adjustable benches from -15° decline to 85° incline",
      "Pec deck machines with range limiting for safety",
      "Olympic bar storage integrated into press stations"
    ],
    images: [
      "/images/equipment/chest-equipment/IMG_1876.jpeg",
      "/images/equipment/chest-equipment/IMG_2466.jpeg",
      "/images/equipment/chest-equipment/IMG_2469.jpeg",
      "/images/equipment/chest-equipment/IMG_2471.jpeg",
      "/images/equipment/chest-equipment/IMG_2477.jpeg",
      "/images/equipment/chest-equipment/IMG_2478.jpeg",
      "/images/equipment/chest-equipment/IMG_2483.jpeg",
      "/images/equipment/chest-equipment/IMG_2506.jpeg",
      "/images/equipment/chest-equipment/IMG_2509.jpeg",
      "/images/equipment/chest-equipment/IMG_2519.jpeg",
      "/images/equipment/chest-equipment/IMG_2520.jpeg",
      "/images/equipment/chest-equipment/IMG_2524.jpeg",
      "/images/equipment/chest-equipment/IMG_2525.jpeg",
      "/images/equipment/chest-equipment/IMG_2526.jpeg",
      "/images/equipment/chest-equipment/IMG_2527.jpeg",
      "/images/equipment/chest-equipment/IMG_2528.jpeg",
      "/images/equipment/chest-equipment/IMG_2530.jpeg",
      "/images/equipment/chest-equipment/IMG_2531.jpeg",
      "/images/equipment/chest-equipment/IMG_2532.jpeg",
      "/images/equipment/chest-equipment/IMG_2533.jpeg",
      "/images/equipment/chest-equipment/IMG_2553.jpeg"
    ]
  },
  {
    id: "6",
    title: "Hammer Strength Equipment",
    slug: "hammer-strength",
    category: "strength",
    description: "The Culture Gym is a certified Hammer Strength training facility featuring 22 pieces of the gold standard in plate-loaded equipment. Experience the same training tools used by NFL teams and Olympic athletes.",
    brandInfo: brandInformation['hammer-strength'],
    features: [
      "ISO-Lateral technology for independent arm/leg movement",
      "Plate-loaded machines for progressive overload",
      "Ground Base equipment for athletic movements",
      "MTS (Motion Technology Selectorized) options",
      "Full body machine selection from legs to shoulders",
      "Converging and diverging motion paths",
      "Used by professional sports teams worldwide"
    ],
    detailedSpecs: [
      "ISO-Lateral machines feature independent weight horns",
      "Plate storage integrated into each machine",
      "Accommodates standard Olympic plates",
      "Starting resistance as low as 9lbs per side",
      "Maximum load capacity exceeds 1000lbs on most units",
      "NFL and NCAA approved equipment specifications"
    ],
    images: [
      "/images/equipment/hammer-strength/IMG_1873.jpeg",
      "/images/equipment/hammer-strength/IMG_2475.jpeg",
      "/images/equipment/hammer-strength/IMG_2494.jpeg",
      "/images/equipment/hammer-strength/IMG_2495.jpeg",
      "/images/equipment/hammer-strength/IMG_2496.jpeg",
      "/images/equipment/hammer-strength/IMG_2497.jpeg",
      "/images/equipment/hammer-strength/IMG_2498.jpeg",
      "/images/equipment/hammer-strength/IMG_2500.jpeg",
      "/images/equipment/hammer-strength/IMG_2506.jpeg",
      "/images/equipment/hammer-strength/IMG_2507.jpeg",
      "/images/equipment/hammer-strength/IMG_2509.jpeg",
      "/images/equipment/hammer-strength/IMG_2510.jpeg",
      "/images/equipment/hammer-strength/IMG_2511.jpeg",
      "/images/equipment/hammer-strength/IMG_2512.jpeg",
      "/images/equipment/hammer-strength/IMG_2513.jpeg",
      "/images/equipment/hammer-strength/IMG_2515.jpeg",
      "/images/equipment/hammer-strength/IMG_2518.jpeg",
      "/images/equipment/hammer-strength/IMG_2519.jpeg",
      "/images/equipment/hammer-strength/IMG_2520.jpeg",
      "/images/equipment/hammer-strength/IMG_2521.jpeg",
      "/images/equipment/hammer-strength/IMG_2524.jpeg",
      "/images/equipment/hammer-strength/IMG_8937.jpeg"
    ]
  },
  {
    id: "7",
    title: "Leg Training Equipment",
    slug: "leg-equipment",
    category: "strength",
    description: "Complete leg training equipment featuring 22 specialized machines for building powerful lower body strength. From heavy leg presses to precision isolation work, develop quads, hamstrings, glutes, and calves.",
    features: [
      "Multiple leg press machines (45°, horizontal, vertical)",
      "Hack squat stations with various angles",
      "Leg extension and curl machines (seated, lying, standing)",
      "Calf raise equipment (seated, standing, donkey)",
      "Power squat and belt squat machines",
      "Single-leg press for unilateral training",
      "Adduction/abduction machines for hip work"
    ],
    detailedSpecs: [
      "Leg presses rated for 1000+ lbs capacity",
      "Hack squats with safety stops and multiple positions",
      "Leg curls/extensions with 200-250lb weight stacks",
      "Calf machines accommodate users up to 7 feet tall",
      "Belt squat eliminates spinal compression"
    ],
    images: [
      "/images/equipment/leg-equipment/IMG_1876.jpeg",
      "/images/equipment/leg-equipment/IMG_2462.jpeg",
      "/images/equipment/leg-equipment/IMG_2464.jpeg",
      "/images/equipment/leg-equipment/IMG_2465.jpeg",
      "/images/equipment/leg-equipment/IMG_2467.jpeg",
      "/images/equipment/leg-equipment/IMG_2468.jpeg",
      "/images/equipment/leg-equipment/IMG_2470.jpeg",
      "/images/equipment/leg-equipment/IMG_2472.jpeg",
      "/images/equipment/leg-equipment/IMG_2473.jpeg",
      "/images/equipment/leg-equipment/IMG_2474.jpeg",
      "/images/equipment/leg-equipment/IMG_2476.jpeg",
      "/images/equipment/leg-equipment/IMG_2480.jpeg",
      "/images/equipment/leg-equipment/IMG_2498.jpeg",
      "/images/equipment/leg-equipment/IMG_2499.jpeg",
      "/images/equipment/leg-equipment/IMG_2500.jpeg",
      "/images/equipment/leg-equipment/IMG_2501.jpeg",
      "/images/equipment/leg-equipment/IMG_2502.jpeg",
      "/images/equipment/leg-equipment/IMG_2503.jpeg",
      "/images/equipment/leg-equipment/IMG_2504.jpeg",
      "/images/equipment/leg-equipment/IMG_2505.jpeg",
      "/images/equipment/leg-equipment/IMG_2553.jpeg",
      "/images/equipment/leg-equipment/IMG_7873.jpeg"
    ]
  },
  {
    id: "8",
    title: "PowerLift Racks",
    slug: "powerlift-racks",
    category: "strength",
    description: "Professional powerlifting platforms and racks for serious strength athletes. Competition-spec equipment for squats, bench press, and deadlifts with safety features for max effort training.",
    features: [
      "Competition power racks with Westside hole spacing",
      "Monolift attachments for equipped lifting",
      "Calibrated competition plates (kg and lb)",
      "Competition bars (power bars, deadlift bars)",
      "Band and chain attachments for accommodating resistance",
      "Professional platforms with insert areas",
      "Safety straps and spotter arms"
    ],
    detailedSpecs: [
      "3x3 inch 11-gauge steel construction",
      "1000+ lb capacity on all racks",
      "Competition height specifications (IPF approved)",
      "Deadlift platforms 8x8 feet minimum",
      "Band pegs rated for 200lbs tension each"
    ],
    images: [
      "/images/equipment/powerlift-racks/F87AC2A5-2BBC-4B1B-BB68-B265ADD243C8.jpg",
      "/images/equipment/powerlift-racks/IMG_1871.jpeg",
      "/images/equipment/powerlift-racks/IMG_7873.jpeg",
      "/images/equipment/powerlift-racks/IMG_9659.jpeg"
    ]
  },
  {
    id: "9",
    title: "Precor-Icarian-Paramount Equipment",
    slug: "precore-icarian-paramount",
    category: "strength",
    description: "Premium commercial equipment from three industry leaders. This collection of 13 machines represents decades of biomechanics research and innovation in strength training.",
    brandInfo: brandInformation['precor-icarian-paramount'],
    features: [
      "Precor strength lines with advanced biomechanics",
      "Icarian plate-loaded CFF equipment",
      "Paramount multi-stations for circuit training",
      "Converging and diverging motion paths",
      "Commercial-grade durability for 24/7 use",
      "Integrated technology and rep counting",
      "Accommodates users of all sizes"
    ],
    detailedSpecs: [
      "Weight stacks up to 350lbs on select machines",
      "15+ position adjustments on most equipment",
      "Self-lubricating bearings with 2 million cycle rating",
      "Anti-microbial upholstery on all contact points",
      "UL listed for commercial safety standards"
    ],
    images: [
      "/images/equipment/precore-icarian-paramount/IMG_2462.jpeg",
      "/images/equipment/precore-icarian-paramount/IMG_2472.jpeg",
      "/images/equipment/precore-icarian-paramount/IMG_2473.jpeg",
      "/images/equipment/precore-icarian-paramount/IMG_2479.jpeg",
      "/images/equipment/precore-icarian-paramount/IMG_2488.jpeg",
      "/images/equipment/precore-icarian-paramount/IMG_2491.jpeg",
      "/images/equipment/precore-icarian-paramount/IMG_2505.jpeg",
      "/images/equipment/precore-icarian-paramount/IMG_2523.jpeg",
      "/images/equipment/precore-icarian-paramount/IMG_2618.jpeg",
      "/images/equipment/precore-icarian-paramount/IMG_2619.jpeg",
      "/images/equipment/precore-icarian-paramount/IMG_2620.jpeg",
      "/images/equipment/precore-icarian-paramount/IMG_2621.jpeg",
      "/images/equipment/precore-icarian-paramount/IMG_2650.jpeg"
    ]
  },
  {
    id: "10",
    title: "Rogue-Dynabody",
    slug: "rogue-dynabody",
    category: "cardio",
    description: "Elite functional fitness equipment combining Rogue's American-made quality with Dynabody's innovative designs. Perfect for high-intensity training and metabolic conditioning.",
    brandInfo: brandInformation['rogue-dynabody'],
    features: [
      "Rogue Echo bikes for intense cardio",
      "Assault bikes with upper/lower body engagement",
      "Concept2 rowers - CrossFit Games standard",
      "SkiErg machines for total body conditioning",
      "Air runners and manual treadmills",
      "Made in USA with lifetime warranties",
      "Battle-tested in CrossFit boxes worldwide"
    ],
    detailedSpecs: [
      "Echo Bike: Belt-driven with 127lb capacity fan",
      "Concept2 Rower: Model D with PM5 monitor",
      "Air Runner: Motorless design, no electricity needed",
      "All equipment rated for 350+ lb users",
      "Commercial warranties on all Rogue products"
    ],
    images: [
      "/images/equipment/rogue-dynabody/IMG_1877.jpeg",
      "/images/equipment/rogue-dynabody/IMG_2487.jpeg",
      "/images/equipment/rogue-dynabody/IMG_2501.jpeg",
      "/images/equipment/rogue-dynabody/IMG_2525.jpeg",
      "/images/equipment/rogue-dynabody/IMG_8208.jpeg"
    ]
  }
];