#!/usr/bin/env python3
import os
import subprocess
import sys

# Equipment images with Google Drive file IDs
equipment_images = [
    {
        'name': 'shoulder-equipment.jpg',
        'title': 'Shoulder Equipment',
        'file_id': '1212LEMYRaL9Po3EfKyg0LUi_XNaUSqflpA'
    },
    {
        'name': 'rogue-dynabody.jpg',
        'title': 'Rogue-Dyna Body',
        'file_id': '16lRJ6T69SVWqAQuxN-hxl9G_HTG'
    },
    {
        'name': 'bench-press.jpg',
        'title': 'Bench Press',
        'file_id': '1AtcNIEDlqJWU-h37pFvPY3GpJlVau'
    },
    {
        'name': 'precore-icarian-paramount.jpg',
        'title': 'Precore-Icarian-Paramount Equipment',
        'file_id': '1Or0ySG8cBAUfUsacMNYQxe6Ulu--2m-'
    },
    {
        'name': 'powerlift-racks.jpg',
        'title': 'PowerLift Racks',
        'file_id': '18PsvXjodeTaw0_K6WvgPOUAOW2'
    },
    {
        'name': 'leg-equipment.jpg',
        'title': 'Leg Equipment',
        'file_id': '1TuWlV-kOeEtOJhBGqJRpa87JdHOpDyT'
    },
    {
        'name': 'hammer-strength.jpg',
        'title': 'Hammer Strength Equipment',
        'file_id': '10C5HRtq_f9Hoc6hrwTrfNw01nHNl8Jn'
    },
    {
        'name': 'free-weights-room.jpg',
        'title': 'Free Weights Room',
        'file_id': '1PNsLIBfmHcM_Bd8o4cO_BiE2aJ-pL1_tsLaoKh2'
    },
    {
        'name': 'chest-equipment.jpg',
        'title': 'Chest Equipment',
        'file_id': '1fc6XPJifIVhGtynnqtqRFltvdiDsLZhULg3iMJ'
    },
    {
        'name': 'cardio-equipment.jpg',
        'title': 'Cardio Equipment',
        'file_id': 'CJUArDFpAcEHN5QT9DG_DGPfh'
    },
    {
        'name': 'camstar-equipment.jpg',
        'title': 'Camstar Equipment',
        'file_id': '1Gte5JqM4PnxLVrnToIyChkYVUZ_oZI2'
    },
    {
        'name': 'bodymaster-equipment.jpg',
        'title': 'BodyMaster Equipment',
        'file_id': 'TVyDrJGDaCJbFOHCdkhlvlMo8JyBdnRy'
    },
    {
        'name': 'back-equipment.jpg',
        'title': 'Back Equipment',
        'file_id': '16PcOdJCyoOC7mT-vS_V_8Ys'
    }
]

def install_gdown():
    """Install gdown if not available"""
    try:
        import gdown
    except ImportError:
        print("Installing gdown...")
        subprocess.check_call([sys.executable, "-m", "pip", "install", "gdown"])
        print("gdown installed successfully!")

def download_images():
    """Download all equipment images from Google Drive"""
    import gdown
    
    # Create equipment directory
    equipment_dir = os.path.join('public', 'images', 'equipment')
    os.makedirs(equipment_dir, exist_ok=True)
    
    print("📥 Downloading equipment images from Google Drive...\n")
    
    success_count = 0
    for i, item in enumerate(equipment_images, 1):
        print(f"Downloading {i}/{len(equipment_images)}: {item['title']}...")
        
        output_path = os.path.join(equipment_dir, item['name'])
        url = f"https://drive.google.com/uc?id={item['file_id']}"
        
        try:
            gdown.download(url, output_path, quiet=False)
            print(f"✅ Downloaded: {item['title']}\n")
            success_count += 1
        except Exception as e:
            print(f"❌ Failed to download {item['title']}: {str(e)}\n")
    
    print(f"\n✨ Download complete! {success_count}/{len(equipment_images)} images downloaded")
    print(f"📁 Images saved to: {os.path.abspath(equipment_dir)}")

if __name__ == "__main__":
    install_gdown()
    download_images()