#!/bin/bash

# Equipment Image Download Helper
# This script will open all Google Drive links and help you download them manually

echo "🏋️  Culture Gym Equipment Image Download Helper"
echo "=============================================="
echo ""
echo "This will open each Google Drive link for manual download."
echo "Please download each image and save it to the correct folder."
echo ""

# Equipment data
declare -A equipment_links=(
  ["shoulder-equipment"]="https://drive.google.com/file/d/1212LEMYRaL9Po3EfKyg0LUi_XNaUSqflpA"
  ["rogue-dynabody"]="https://drive.google.com/file/d/16lRJ6T69SVWqAQuxN-hxl9G_HTG"
  ["bench-press"]="https://drive.google.com/file/d/1AtcNIEDlqJWU-h37pFvPY3GpJlVau"
  ["precore-icarian-paramount"]="https://drive.google.com/file/d/1Or0ySG8cBAUfUsacMNYQxe6Ulu--2m-"
  ["powerlift-racks"]="https://drive.google.com/file/d/18PsvXjodeTaw0_K6WvgPOUAOW2"
  ["leg-equipment"]="https://drive.google.com/file/d/1TuWlV-kOeEtOJhBGqJRpa87JdHOpDyT"
  ["hammer-strength"]="https://drive.google.com/file/d/10C5HRtq_f9Hoc6hrwTrfNw01nHNl8Jn"
  ["free-weights-room"]="https://drive.google.com/file/d/1PNsLIBfmHcM_Bd8o4cO_BiE2aJ-pL1_tsLaoKh2"
  ["chest-equipment"]="https://drive.google.com/file/d/1fc6XPJifIVhGtynnqtqRFltvdiDsLZhULg3iMJ"
  ["cardio-equipment"]="https://drive.google.com/file/d/CJUArDFpAcEHN5QT9DG_DGPfh"
  ["camstar-equipment"]="https://drive.google.com/file/d/1Gte5JqM4PnxLVrnToIyChkYVUZ_oZI2"
  ["bodymaster-equipment"]="https://drive.google.com/file/d/TVyDrJGDaCJbFOHCdkhlvlMo8JyBdnRy"
  ["back-equipment"]="https://drive.google.com/file/d/16PcOdJCyoOC7mT-vS_V_8Ys"
)

echo "📁 Folders created for each equipment type:"
for equipment in "${!equipment_links[@]}"; do
  echo "  - public/images/equipment/$equipment/"
done
echo ""

read -p "Press Enter to start opening links..."

count=1
total=${#equipment_links[@]}

for equipment in "${!equipment_links[@]}"; do
  echo ""
  echo "🔗 Opening $count/$total: $equipment"
  echo "   URL: ${equipment_links[$equipment]}"
  echo "   Save to: public/images/equipment/$equipment/"
  
  # Open the link
  open "${equipment_links[$equipment]}"
  
  echo "   ⏳ Waiting for you to download..."
  read -p "   ✅ Press Enter when you've downloaded this image..."
  
  ((count++))
done

echo ""
echo "🎉 All links opened!"
echo ""
echo "📋 Summary:"
echo "- Download each image from Google Drive"
echo "- Save them as image1.jpg, image2.jpg, etc. in each folder"
echo "- The website will automatically pick them up"
echo ""

# Check what was downloaded
echo "🔍 Checking downloaded images..."
for equipment in "${!equipment_links[@]}"; do
  dir="public/images/equipment/$equipment"
  count=$(find "$dir" -name "*.jpg" -o -name "*.png" -o -name "*.jpeg" 2>/dev/null | wc -l)
  if [ $count -gt 0 ]; then
    echo "✅ $equipment: $count image(s)"
  else
    echo "❌ $equipment: No images found"
  fi
done