const fs = require('fs');
const path = require('path');

// Enhanced equipment brand information
const brandInfo = {
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
  'bodymaster-equipment': {
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
  'precore-icarian-paramount': {
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
  'camstar-equipment': {
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
  }
};

// Specific equipment descriptions based on visual analysis
const equipmentDescriptions = {
  'hammer-strength': {
    'IMG_2494.jpeg': 'ISO-Lateral Shoulder Press - Independent arm movement for balanced development',
    'IMG_2495.jpeg': 'ISO-Lateral High Row - Targets latissimus dorsi with converging path',
    'IMG_2496.jpeg': 'ISO-Lateral Front Lat Pulldown - Wide grip lat development',
    'IMG_2497.jpeg': 'Plate-Loaded Seated Row - Horizontal pulling movement',
    'IMG_2498.jpeg': 'ISO-Lateral Leg Press - 45-degree angle for quad/glute development',
    'IMG_2500.jpeg': 'Ground Base Jammer - Athletic power development',
    'IMG_2506.jpeg': 'ISO-Lateral Chest Press - Converging movement pattern',
    'IMG_2507.jpeg': 'ISO-Lateral Decline Press - Lower pectoral emphasis',
    'IMG_2509.jpeg': 'Plate-Loaded Shoulder Press - Military press movement',
    'IMG_2510.jpeg': 'ISO-Lateral Row - Unilateral back training',
    'IMG_2511.jpeg': 'Seated Dip Machine - Tricep and lower chest development',
    'IMG_2512.jpeg': 'ISO-Lateral Leg Extension - Quadriceps isolation',
    'IMG_2513.jpeg': 'ISO-Lateral Leg Curl - Hamstring development',
    'IMG_2515.jpeg': 'Ground Base Squat/Lunge - Functional lower body training',
    'IMG_2518.jpeg': 'ISO-Lateral Incline Press - Upper chest development',
    'IMG_2519.jpeg': 'Plate-Loaded Lat Pulldown - Vertical pulling movement',
    'IMG_2520.jpeg': 'ISO-Lateral Seated Row - Horizontal pulling with chest support',
    'IMG_2521.jpeg': 'Gripper - Functional pulling movements',
    'IMG_2524.jpeg': 'ISO-Lateral Wide Chest Press - Pectoral development',
    'IMG_8937.jpeg': 'Full Hammer Strength area overview'
  },
  'bodymaster-equipment': {
    'IMG_2461.jpeg': 'Decline/Sit-up Bench - Core and abdominal training station',
    'IMG_2463.jpeg': 'Leg Press - 45-degree sled-style leg press',
    'IMG_2464.jpeg': 'Hack Squat Machine - Quad-dominant lower body development',
    'IMG_2465.jpeg': 'Seated Leg Curl - Precision hamstring isolation',
    'IMG_2466.jpeg': 'Chest Press - Biomechanically optimized pressing movement',
    'IMG_2467.jpeg': 'Pec Fly/Rear Delt - Dual function chest/rear deltoid machine',
    'IMG_2468.jpeg': 'Leg Extension - Quadriceps isolation with cam resistance',
    'IMG_2469.jpeg': 'Shoulder Press - Overhead pressing with back support',
    'IMG_2470.jpeg': 'Seated Row - Cable-based horizontal pulling',
    'IMG_2471.jpeg': 'Lat Pulldown - Wide and narrow grip options',
    'IMG_2473.jpeg': 'Standing Calf Raise - Gastrocnemius and soleus development',
    'IMG_2474.jpeg': 'Seated Calf Raise - Soleus emphasis',
    'IMG_2476.jpeg': 'Preacher Curl - Bicep isolation bench',
    'IMG_2477.jpeg': 'Tricep Extension - Overhead tricep development',
    'IMG_2478.jpeg': 'Cable Crossover Station - Versatile cable system'
  },
  'leg-equipment': {
    'IMG_2462.jpeg': 'Power Squat Machine - Leverage-based squat movement',
    'IMG_2464.jpeg': 'Linear Hack Squat - Guided squat pattern',
    'IMG_2465.jpeg': 'Seated Leg Curl - Hamstring isolation',
    'IMG_2467.jpeg': 'Lying Leg Curl - Prone hamstring development',
    'IMG_2468.jpeg': 'Leg Extension - Seated quadriceps isolation',
    'IMG_2470.jpeg': 'Standing Calf Raise - Full calf development',
    'IMG_2472.jpeg': 'Leg Press - High capacity plate-loaded',
    'IMG_2498.jpeg': '45-Degree Leg Press - Heavy duty construction',
    'IMG_2499.jpeg': 'Hack Squat/Leg Press Combo - Dual function machine',
    'IMG_2500.jpeg': 'Power Runner - Explosive leg drive training',
    'IMG_2501.jpeg': 'Single Leg Press - Unilateral leg training',
    'IMG_2502.jpeg': 'Pendulum Squat - Arc motion squat pattern',
    'IMG_2503.jpeg': 'Belt Squat - Spinal decompression squats',
    'IMG_2504.jpeg': 'Leg Adduction/Abduction - Inner/outer thigh'
  },
  'chest-equipment': {
    'IMG_2466.jpeg': 'Converging Chest Press - Natural pressing arc',
    'IMG_2469.jpeg': 'Incline Press - Upper pectoral emphasis',
    'IMG_2471.jpeg': 'Decline Press - Lower chest development',
    'IMG_2477.jpeg': 'Pec Deck - Chest fly isolation',
    'IMG_2478.jpeg': 'Cable Crossover - Versatile chest training',
    'IMG_2506.jpeg': 'Flat Bench Press Station - Free weight pressing',
    'IMG_2509.jpeg': 'Smith Machine - Guided barbell movements',
    'IMG_2519.jpeg': 'Plate-Loaded Chest Press - Heavy pressing',
    'IMG_2520.jpeg': 'ISO-Lateral Chest Press - Independent arms',
    'IMG_2524.jpeg': 'Wide Grip Chest Press - Outer pec emphasis',
    'IMG_2525.jpeg': 'Dip Station - Bodyweight chest/tricep work'
  },
  'back-equipment': {
    'IMG_2607.jpeg': 'T-Bar Row Platform - Heavy back thickness',
    'IMG_2608.jpeg': 'Seated Cable Row - Horizontal pulling',
    'IMG_2609.jpeg': 'Lat Pulldown Station - Vertical pulling',
    'IMG_2610.jpeg': 'Low Row Machine - Lower lat emphasis',
    'IMG_2611.jpeg': 'High Row - Upper back development',
    'IMG_2612.jpeg': 'Pull-up/Chin-up Station - Bodyweight training',
    'IMG_2613.jpeg': 'Deadlift Platform - Power development',
    'IMG_2614.jpeg': 'Back Extension Bench - Erector spinae',
    'IMG_2615.jpeg': 'Reverse Hyper - Posterior chain',
    'IMG_2616.jpeg': 'Cable Row Station - Multiple attachments',
    'IMG_2617.jpeg': 'ISO-Row Machine - Unilateral rowing',
    'IMG_2618.jpeg': 'Pendulum Row - Unique arc motion',
    'IMG_2619.jpeg': 'Chest-Supported Row - Strict form rowing',
    'IMG_2620.jpeg': 'Wide Grip Pulldown - Lat width',
    'IMG_2621.jpeg': 'Close Grip Row - Mid-back thickness'
  }
};

// Function to analyze equipment distribution
function analyzeEquipment() {
  const equipmentDir = path.join(__dirname, 'public', 'images', 'equipment');
  const analysis = {};
  
  const folders = fs.readdirSync(equipmentDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);
    
  folders.forEach(folder => {
    const folderPath = path.join(equipmentDir, folder);
    const files = fs.readdirSync(folderPath)
      .filter(file => ['.jpg', '.jpeg', '.png'].includes(path.extname(file).toLowerCase()));
    
    analysis[folder] = {
      totalImages: files.length,
      brandInfo: brandInfo[folder] || {},
      specificEquipment: files.map(file => ({
        filename: file,
        description: equipmentDescriptions[folder]?.[file] || 'Professional strength training equipment'
      }))
    };
  });
  
  return analysis;
}

// Generate enhanced equipment data
function generateEnhancedData() {
  const analysis = analyzeEquipment();
  
  console.log('🏋️  Culture Gym Equipment Analysis');
  console.log('===================================\n');
  
  Object.entries(analysis).forEach(([category, data]) => {
    console.log(`📁 ${category.toUpperCase()}`);
    console.log(`   Total Equipment: ${data.totalImages} pieces`);
    
    if (data.brandInfo.brand) {
      console.log(`   Brand: ${data.brandInfo.brand}`);
      console.log(`   Founded: ${data.brandInfo.founded}`);
      console.log(`   ${data.brandInfo.description}\n`);
    }
    
    console.log('   Equipment List:');
    data.specificEquipment.forEach(eq => {
      console.log(`   - ${eq.filename}: ${eq.description}`);
    });
    console.log('\n');
  });
  
  return analysis;
}

// Generate the data
const enhancedData = generateEnhancedData();

// Export for use in the website
module.exports = { brandInfo, equipmentDescriptions, enhancedData };