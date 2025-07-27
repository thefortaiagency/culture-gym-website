export interface EquipmentItem {
  id: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  features: string[];
  images: string[];
  googleDriveLinks: string[];
}

export const equipmentData: EquipmentItem[] = [
  {
    id: '1',
    title: 'Shoulder Equipment',
    slug: 'shoulder-equipment',
    category: 'strength',
    description: 'Professional-grade shoulder training equipment designed for complete deltoid development.',
    features: [
      'Multiple shoulder press stations',
      'Lateral raise machines',
      'Rear delt equipment',
      'Cable attachments for shoulder work',
      'Olympic shoulder press platforms'
    ],
    images: [
      '/images/equipment/shoulder-equipment/image1.jpg',
      '/images/equipment/shoulder-equipment/image2.jpg'
    ],
    googleDriveLinks: ['https://drive.google.com/file/d/1212LEMYRaL9Po3EfKyg0LUi_XNaUSqflpA']
  },
  {
    id: '2',
    title: 'Rogue-Dynabody',
    slug: 'rogue-dynabody',
    category: 'cardio',
    description: 'Elite Rogue Fitness cardiovascular equipment combined with Dynabody strength systems.',
    features: [
      'Rogue Echo bikes',
      'Assault bikes',
      'Concept2 rowers',
      'SkiErg machines',
      'Air runners'
    ],
    images: [
      '/images/equipment/rogue-dynabody/image1.jpg',
      '/images/equipment/rogue-dynabody/image2.jpg'
    ],
    googleDriveLinks: ['https://drive.google.com/file/d/16lRJ6T69SVWqAQuxN-hxl9G_HTG']
  },
  {
    id: '3',
    title: 'Bench Press',
    slug: 'bench-press',
    category: 'strength',
    description: 'Competition-grade bench press stations for serious strength training.',
    features: [
      'Competition flat benches',
      'Adjustable incline benches',
      'Decline bench stations',
      'Safety racks and spotting platforms',
      'Olympic bar storage'
    ],
    images: [
      '/images/equipment/bench-press/image1.jpg',
      '/images/equipment/bench-press/image2.jpg'
    ],
    googleDriveLinks: ['https://drive.google.com/file/d/1AtcNIEDlqJWU-h37pFvPY3GpJlVau']
  },
  {
    id: '4',
    title: 'Precore-Icarian-Paramount Equipment',
    slug: 'precore-icarian-paramount',
    category: 'strength',
    description: 'Premium commercial equipment from industry leaders Precor, Icarian, and Paramount.',
    features: [
      'Precor strength lines',
      'Icarian plate-loaded equipment',
      'Paramount multi-stations',
      'Biomechanically optimized designs',
      'Commercial-grade durability'
    ],
    images: [
      '/images/equipment/precore-icarian-paramount/image1.jpg',
      '/images/equipment/precore-icarian-paramount/image2.jpg'
    ],
    googleDriveLinks: ['https://drive.google.com/file/d/1Or0ySG8cBAUfUsacMNYQxe6Ulu--2m-']
  },
  {
    id: '5',
    title: 'PowerLift Racks',
    slug: 'powerlift-racks',
    category: 'strength',
    description: 'Professional powerlifting platforms and racks for serious strength athletes.',
    features: [
      'Competition power racks',
      'Monolift attachments',
      'Calibrated plates',
      'Competition bars',
      'Band and chain attachments'
    ],
    images: [
      '/images/equipment/powerlift-racks/image1.jpg',
      '/images/equipment/powerlift-racks/image2.jpg'
    ],
    googleDriveLinks: ['https://drive.google.com/file/d/18PsvXjodeTaw0_K6WvgPOUAOW2']
  },
  {
    id: '6',
    title: 'Leg Equipment',
    slug: 'leg-equipment',
    category: 'strength',
    description: 'Complete leg training equipment for building powerful lower body strength.',
    features: [
      'Leg press machines',
      'Hack squat stations',
      'Leg extension/curl machines',
      'Calf raise equipment',
      'Bulgarian split squat stands'
    ],
    images: [
      '/images/equipment/leg-equipment/image1.jpg',
      '/images/equipment/leg-equipment/image2.jpg'
    ],
    googleDriveLinks: ['https://drive.google.com/file/d/1TuWlV-kOeEtOJhBGqJRpa87JdHOpDyT']
  },
  {
    id: '7',
    title: 'Hammer Strength Equipment',
    slug: 'hammer-strength',
    category: 'strength',
    description: 'The Culture Gym is a certified Hammer Strength training facility.',
    features: [
      'Plate-loaded machines',
      'ISO-lateral technology',
      'Ground Base equipment',
      'MTS (Motion Technology Selectorized)',
      'Full body machine selection'
    ],
    images: [
      '/images/equipment/hammer-strength/image1.jpg',
      '/images/equipment/hammer-strength/image2.jpg'
    ],
    googleDriveLinks: ['https://drive.google.com/file/d/10C5HRtq_f9Hoc6hrwTrfNw01nHNl8Jn']
  },
  {
    id: '8',
    title: 'Free Weights Room',
    slug: 'free-weights-room',
    category: 'free-weights',
    description: 'Extensive free weights collection for functional and strength training.',
    features: [
      'Dumbbells from 5-120 lbs',
      'Multiple barbell stations',
      'EZ-curl bars',
      'Kettlebells',
      'Medicine balls and slam balls'
    ],
    images: [
      '/images/equipment/free-weights-room/image1.jpg',
      '/images/equipment/free-weights-room/image2.jpg'
    ],
    googleDriveLinks: ['https://drive.google.com/file/d/1PNsLIBfmHcM_Bd8o4cO_BiE2aJ-pL1_tsLaoKh2']
  },
  {
    id: '9',
    title: 'Chest Equipment',
    slug: 'chest-equipment',
    category: 'strength',
    description: 'Comprehensive chest training equipment for building a powerful upper body.',
    features: [
      'Multiple chest press angles',
      'Fly machines',
      'Cable crossover stations',
      'Dip stations',
      'Push-up platforms'
    ],
    images: [
      '/images/equipment/chest-equipment/image1.jpg',
      '/images/equipment/chest-equipment/image2.jpg'
    ],
    googleDriveLinks: ['https://drive.google.com/file/d/1fc6XPJifIVhGtynnqtqRFltvdiDsLZhULg3iMJ']
  },
  {
    id: '10',
    title: 'Cardio Equipment',
    slug: 'cardio-equipment',
    category: 'cardio',
    description: 'State-of-the-art cardiovascular equipment for all fitness levels.',
    features: [
      'Treadmills with entertainment systems',
      'Elliptical machines',
      'Stationary bikes',
      'Stair climbers',
      '1/9 mile indoor track'
    ],
    images: [
      '/images/equipment/cardio-equipment/image1.jpg',
      '/images/equipment/cardio-equipment/image2.jpg'
    ],
    googleDriveLinks: ['https://drive.google.com/file/d/CJUArDFpAcEHN5QT9DG_DGPfh']
  },
  {
    id: '11',
    title: 'Camstar Equipment',
    slug: 'camstar-equipment',
    category: 'strength',
    description: 'Specialized Camstar strength training equipment with unique cam profiles.',
    features: [
      'Variable resistance technology',
      'Smooth cam action',
      'Multiple exercise stations',
      'Adjustable range of motion',
      'Commercial durability'
    ],
    images: [
      '/images/equipment/camstar-equipment/image1.jpg',
      '/images/equipment/camstar-equipment/image2.jpg'
    ],
    googleDriveLinks: ['https://drive.google.com/file/d/1Gte5JqM4PnxLVrnToIyChkYVUZ_oZI2']
  },
  {
    id: '12',
    title: 'BodyMaster Equipment',
    slug: 'bodymaster-equipment',
    category: 'strength',
    description: 'BodyMaster commercial strength equipment for precise muscle targeting.',
    features: [
      'Biomechanically correct movement',
      'Heavy-duty construction',
      'Easy adjustment systems',
      'Full body workout capability',
      'Suitable for all fitness levels'
    ],
    images: [
      '/images/equipment/bodymaster-equipment/image1.jpg',
      '/images/equipment/bodymaster-equipment/image2.jpg'
    ],
    googleDriveLinks: ['https://drive.google.com/file/d/TVyDrJGDaCJbFOHCdkhlvlMo8JyBdnRy']
  },
  {
    id: '13',
    title: 'Back Equipment',
    slug: 'back-equipment',
    category: 'strength',
    description: 'Complete back training equipment for building a strong, defined back.',
    features: [
      'Lat pulldown stations',
      'Cable row machines',
      'T-bar rows',
      'Pull-up/chin-up stations',
      'Back extension benches'
    ],
    images: [
      '/images/equipment/back-equipment/image1.jpg',
      '/images/equipment/back-equipment/image2.jpg'
    ],
    googleDriveLinks: ['https://drive.google.com/file/d/16PcOdJCyoOC7mT-vS_V_8Ys']
  }
];