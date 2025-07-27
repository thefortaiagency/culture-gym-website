#!/bin/bash

# Equipment Image Browser Script
# This will open all Google Drive images in your browser for easy downloading

echo "🚀 Opening all equipment images in your browser..."
echo "📁 Please save each image to: public/images/equipment/"
echo ""

# Create the equipment directory
mkdir -p public/images/equipment

# Array of images with names and URLs
declare -a images=(
  "shoulder-equipment.jpg|https://drive.google.com/file/d/1212LEMYRaL9Po3EfKyg0LUi_XNaUSqflpA/view"
  "rogue-dynabody.jpg|https://drive.google.com/file/d/16lRJ6T69SVWqAQuxN-hxl9G_HTG/view"
  "bench-press.jpg|https://drive.google.com/file/d/1AtcNIEDlqJWU-h37pFvPY3GpJlVau/view"
  "precore-icarian-paramount.jpg|https://drive.google.com/file/d/1Or0ySG8cBAUfUsacMNYQxe6Ulu--2m-/view"
  "powerlift-racks.jpg|https://drive.google.com/file/d/18PsvXjodeTaw0_K6WvgPOUAOW2/view"
  "leg-equipment.jpg|https://drive.google.com/file/d/1TuWlV-kOeEtOJhBGqJRpa87JdHOpDyT/view"
  "hammer-strength.jpg|https://drive.google.com/file/d/10C5HRtq_f9Hoc6hrwTrfNw01nHNl8Jn/view"
  "free-weights-room.jpg|https://drive.google.com/file/d/1PNsLIBfmHcM_Bd8o4cO_BiE2aJ-pL1_tsLaoKh2/view"
  "chest-equipment.jpg|https://drive.google.com/file/d/1fc6XPJifIVhGtynnqtqRFltvdiDsLZhULg3iMJ/view"
  "cardio-equipment.jpg|https://drive.google.com/file/d/CJUArDFpAcEHN5QT9DG_DGPfh/view"
  "camstar-equipment.jpg|https://drive.google.com/file/d/1Gte5JqM4PnxLVrnToIyChkYVUZ_oZI2/view"
  "bodymaster-equipment.jpg|https://drive.google.com/file/d/TVyDrJGDaCJbFOHCdkhlvlMo8JyBdnRy/view"
  "back-equipment.jpg|https://drive.google.com/file/d/16PcOdJCyoOC7mT-vS_V_8Ys/view"
)

# Open each image
count=1
for image in "${images[@]}"; do
  IFS='|' read -r filename url <<< "$image"
  echo "Opening ${count}/13: ${filename}"
  open "$url"
  sleep 1  # Small delay between opening tabs
  ((count++))
done

echo ""
echo "✅ All images opened in browser!"
echo ""
echo "📝 Instructions:"
echo "1. Click the download button on each Google Drive page"
echo "2. Save each image with these exact names:"
echo ""

# List all filenames
for image in "${images[@]}"; do
  IFS='|' read -r filename url <<< "$image"
  echo "   - ${filename}"
done

echo ""
echo "3. Save all images to: $(pwd)/public/images/equipment/"
echo ""
echo "Press Enter when done downloading..."
read -r

# Check which images were downloaded
echo ""
echo "Checking downloaded images..."
echo ""

missing=0
for image in "${images[@]}"; do
  IFS='|' read -r filename url <<< "$image"
  if [ -f "public/images/equipment/${filename}" ]; then
    echo "✅ ${filename}"
  else
    echo "❌ ${filename} - Missing"
    ((missing++))
  fi
done

if [ $missing -eq 0 ]; then
  echo ""
  echo "🎉 All images downloaded successfully!"
else
  echo ""
  echo "⚠️  ${missing} images are missing. Please download them manually."
fi