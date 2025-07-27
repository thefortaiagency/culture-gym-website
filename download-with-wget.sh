#!/bin/bash

# Create equipment directory
mkdir -p public/images/equipment
cd public/images/equipment

echo "📥 Downloading equipment images from Google Drive..."
echo ""

# Function to download from Google Drive
download_gdrive() {
  local FILE_ID=$1
  local FILENAME=$2
  local TITLE=$3
  
  echo "Downloading: $TITLE..."
  
  # First try the direct download URL
  wget --no-check-certificate \
       --quiet \
       --save-cookies /tmp/cookies.txt \
       --keep-session-cookies \
       "https://docs.google.com/uc?export=download&id=${FILE_ID}" \
       -O- | sed -rn 's/.*confirm=([0-9A-Za-z_]+).*/\1\n/p' > /tmp/confirm.txt
  
  CONFIRM=$(cat /tmp/confirm.txt)
  
  if [ -n "$CONFIRM" ]; then
    # Large file, needs confirmation
    wget --no-check-certificate \
         --load-cookies /tmp/cookies.txt \
         "https://docs.google.com/uc?export=download&confirm=${CONFIRM}&id=${FILE_ID}" \
         -O "$FILENAME"
  else
    # Small file, direct download
    wget --no-check-certificate \
         "https://docs.google.com/uc?export=download&id=${FILE_ID}" \
         -O "$FILENAME"
  fi
  
  # Check if download was successful
  if [ -f "$FILENAME" ] && [ -s "$FILENAME" ]; then
    # Check if it's actually an image
    if file "$FILENAME" | grep -E "image|JPEG|PNG|GIF" > /dev/null; then
      echo "✅ Downloaded: $TITLE"
    else
      echo "❌ Failed: $TITLE (not an image file)"
      rm -f "$FILENAME"
    fi
  else
    echo "❌ Failed: $TITLE"
  fi
  
  echo ""
}

# Download all images
download_gdrive "1212LEMYRaL9Po3EfKyg0LUi_XNaUSqflpA" "shoulder-equipment.jpg" "Shoulder Equipment"
download_gdrive "16lRJ6T69SVWqAQuxN-hxl9G_HTG" "rogue-dynabody.jpg" "Rogue-Dyna Body"
download_gdrive "1AtcNIEDlqJWU-h37pFvPY3GpJlVau" "bench-press.jpg" "Bench Press"
download_gdrive "1Or0ySG8cBAUfUsacMNYQxe6Ulu--2m-" "precore-icarian-paramount.jpg" "Precore-Icarian-Paramount Equipment"
download_gdrive "18PsvXjodeTaw0_K6WvgPOUAOW2" "powerlift-racks.jpg" "PowerLift Racks"
download_gdrive "1TuWlV-kOeEtOJhBGqJRpa87JdHOpDyT" "leg-equipment.jpg" "Leg Equipment"
download_gdrive "10C5HRtq_f9Hoc6hrwTrfNw01nHNl8Jn" "hammer-strength.jpg" "Hammer Strength Equipment"
download_gdrive "1PNsLIBfmHcM_Bd8o4cO_BiE2aJ-pL1_tsLaoKh2" "free-weights-room.jpg" "Free Weights Room"
download_gdrive "1fc6XPJifIVhGtynnqtqRFltvdiDsLZhULg3iMJ" "chest-equipment.jpg" "Chest Equipment"
download_gdrive "CJUArDFpAcEHN5QT9DG_DGPfh" "cardio-equipment.jpg" "Cardio Equipment"
download_gdrive "1Gte5JqM4PnxLVrnToIyChkYVUZ_oZI2" "camstar-equipment.jpg" "Camstar Equipment"
download_gdrive "TVyDrJGDaCJbFOHCdkhlvlMo8JyBdnRy" "bodymaster-equipment.jpg" "BodyMaster Equipment"
download_gdrive "16PcOdJCyoOC7mT-vS_V_8Ys" "back-equipment.jpg" "Back Equipment"

# Clean up temp files
rm -f /tmp/cookies.txt /tmp/confirm.txt

# Show results
echo "Download complete! Checking results..."
echo ""

SUCCESS_COUNT=$(ls -1 *.jpg 2>/dev/null | wc -l)
echo "✨ Successfully downloaded $SUCCESS_COUNT/13 images"

if [ $SUCCESS_COUNT -lt 13 ]; then
  echo ""
  echo "⚠️  Some images failed to download. This might be due to:"
  echo "   - Google Drive sharing restrictions"
  echo "   - Files requiring authentication"
  echo ""
  echo "Run ./open-equipment-images.sh to download them manually through your browser."
fi