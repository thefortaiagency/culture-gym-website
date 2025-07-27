const fs = require('fs');
const path = require('path');

// Scan equipment folders and generate updated equipment data
function scanEquipmentImages() {
  const equipmentDir = path.join(__dirname, 'public', 'images', 'equipment');
  const results = {};

  try {
    const folders = fs.readdirSync(equipmentDir, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);

    console.log('🔍 Scanning equipment folders...\n');

    folders.forEach(folder => {
      const folderPath = path.join(equipmentDir, folder);
      const images = [];

      try {
        const files = fs.readdirSync(folderPath);
        
        // Filter for image files
        const imageFiles = files.filter(file => {
          const ext = path.extname(file).toLowerCase();
          return ['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext);
        });

        // Create paths for web use
        imageFiles.forEach(file => {
          images.push(`/images/equipment/${folder}/${file}`);
        });

        results[folder] = {
          folder: folder,
          imageCount: images.length,
          images: images
        };

        console.log(`📁 ${folder}: ${images.length} image(s)`);
        if (images.length > 0) {
          images.forEach((img, idx) => {
            console.log(`   ${idx + 1}. ${img}`);
          });
        }
        console.log('');

      } catch (error) {
        console.error(`❌ Error reading folder ${folder}:`, error.message);
      }
    });

    return results;

  } catch (error) {
    console.error('❌ Error scanning equipment directory:', error.message);
    return {};
  }
}

// Generate updated equipment data
function generateEquipmentData(scanResults) {
  const equipmentInfo = {
    'shoulder-equipment': {
      title: 'Shoulder Equipment',
      category: 'strength',
      description: 'Professional-grade shoulder training equipment designed for complete deltoid development and maximum muscle activation.',
      features: [
        'Multiple shoulder press stations',
        'Lateral raise machines',
        'Rear deltoid equipment',
        'Cable attachments for shoulder work',
        'Olympic shoulder press platforms'
      ]
    },
    'rogue-dynabody': {
      title: 'Rogue-Dynabody',
      category: 'cardio',
      description: 'Elite Rogue Fitness cardiovascular equipment combined with Dynabody strength systems for total body conditioning.',
      features: [
        'Rogue Echo bikes',
        'Assault bikes',
        'Concept2 rowers',
        'SkiErg machines',
        'Air runners and treadmills'
      ]
    },
    'bench-press': {
      title: 'Bench Press Stations',
      category: 'strength',
      description: 'Competition-grade bench press stations for serious strength training and powerlifting.',
      features: [
        'Competition flat benches',
        'Adjustable incline benches',
        'Decline bench stations',
        'Safety racks and spotting platforms',
        'Olympic bar storage systems'
      ]
    },
    'precore-icarian-paramount': {
      title: 'Precor-Icarian-Paramount Equipment',
      category: 'strength',
      description: 'Premium commercial equipment from industry leaders Precor, Icarian, and Paramount for biomechanically optimized training.',
      features: [
        'Precor strength lines',
        'Icarian plate-loaded equipment',
        'Paramount multi-stations',
        'Biomechanically optimized designs',
        'Commercial-grade durability'
      ]
    },
    'powerlift-racks': {
      title: 'PowerLift Racks',
      category: 'strength',
      description: 'Professional powerlifting platforms and racks for serious strength athletes and competitive training.',
      features: [
        'Competition power racks',
        'Monolift attachments',
        'Calibrated competition plates',
        'Competition bars',
        'Band and chain attachments'
      ]
    },
    'leg-equipment': {
      title: 'Leg Training Equipment',
      category: 'strength',
      description: 'Complete leg training equipment for building powerful lower body strength and muscle development.',
      features: [
        'Multiple leg press machines',
        'Hack squat stations',
        'Leg extension and curl machines',
        'Calf raise equipment',
        'Bulgarian split squat stands'
      ]
    },
    'hammer-strength': {
      title: 'Hammer Strength Equipment',
      category: 'strength',
      description: 'The Culture Gym is a certified Hammer Strength training facility featuring the gold standard in plate-loaded equipment.',
      features: [
        'Plate-loaded machines',
        'ISO-lateral technology',
        'Ground Base equipment',
        'MTS (Motion Technology Selectorized)',
        'Full body machine selection'
      ]
    },
    'free-weights-room': {
      title: 'Free Weights Area',
      category: 'free-weights',
      description: 'Extensive free weights collection for functional training, strength building, and athletic development.',
      features: [
        'Dumbbells from 5-120 lbs',
        'Multiple Olympic barbell stations',
        'EZ-curl and specialty bars',
        'Kettlebells and medicine balls',
        'Functional training equipment'
      ]
    },
    'chest-equipment': {
      title: 'Chest Training Equipment',
      category: 'strength',
      description: 'Comprehensive chest training equipment for building a powerful upper body and complete pectoral development.',
      features: [
        'Multiple chest press angles',
        'Fly machines and pec decks',
        'Cable crossover stations',
        'Dip stations and parallettes',
        'Push-up and bodyweight platforms'
      ]
    },
    'cardio-equipment': {
      title: 'Cardio Equipment',
      category: 'cardio',
      description: 'State-of-the-art cardiovascular equipment for all fitness levels, featuring our unique 1/9 mile indoor track.',
      features: [
        '1/9 mile rubberized indoor track',
        'Treadmills with entertainment systems',
        'Elliptical machines',
        'Stationary and recumbent bikes',
        'Stair climbers and rowing machines'
      ]
    },
    'camstar-equipment': {
      title: 'Camstar Equipment',
      category: 'strength',
      description: 'Specialized Camstar strength training equipment featuring unique cam profiles for variable resistance training.',
      features: [
        'Variable resistance technology',
        'Smooth cam-based action',
        'Multiple exercise stations',
        'Adjustable range of motion',
        'Commercial durability and reliability'
      ]
    },
    'bodymaster-equipment': {
      title: 'BodyMaster Equipment',
      category: 'strength',
      description: 'BodyMaster commercial strength equipment for precise muscle targeting and biomechanically correct movement patterns.',
      features: [
        'Biomechanically correct movement patterns',
        'Heavy-duty commercial construction',
        'Easy adjustment systems',
        'Full body workout capability',
        'Suitable for all fitness levels'
      ]
    },
    'back-equipment': {
      title: 'Back Training Equipment',
      category: 'strength',
      description: 'Complete back training equipment for building a strong, defined back with width, thickness, and detail.',
      features: [
        'Multiple lat pulldown stations',
        'Cable row machines',
        'T-bar row platforms',
        'Pull-up and chin-up stations',
        'Back extension benches'
      ]
    }
  };

  const equipmentData = [];
  let id = 1;

  Object.keys(scanResults).forEach(slug => {
    const scan = scanResults[slug];
    const info = equipmentInfo[slug];

    if (info && scan.images.length > 0) {
      equipmentData.push({
        id: id.toString(),
        title: info.title,
        slug: slug,
        category: info.category,
        description: info.description,
        features: info.features,
        images: scan.images,
        googleDriveLinks: [] // Keep for reference
      });
      id++;
    }
  });

  return equipmentData;
}

// Main execution
console.log('🏋️  Culture Gym Equipment Image Scanner');
console.log('=====================================\n');

const scanResults = scanEquipmentImages();
const equipmentData = generateEquipmentData(scanResults);

console.log('\n📊 Summary:');
console.log(`   Total equipment types: ${Object.keys(scanResults).length}`);
console.log(`   Equipment with images: ${equipmentData.length}`);
console.log(`   Total images found: ${Object.values(scanResults).reduce((sum, item) => sum + item.imageCount, 0)}`);

// Generate the updated equipment data file
const dataFileContent = `export interface EquipmentItem {
  id: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  features: string[];
  images: string[];
  googleDriveLinks: string[];
}

export const equipmentData: EquipmentItem[] = ${JSON.stringify(equipmentData, null, 2)};`;

fs.writeFileSync('lib/equipment-data.ts', dataFileContent);

console.log('\n✅ Updated lib/equipment-data.ts with all discovered images!');
console.log('\n🎯 Next steps:');
console.log('   1. Check the updated equipment data');
console.log('   2. Test the equipment pages');
console.log('   3. All images should now display properly!');

module.exports = { scanResults, equipmentData };