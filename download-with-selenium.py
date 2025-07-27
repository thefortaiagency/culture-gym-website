#!/usr/bin/env python3
"""
Equipment Image Downloader using Selenium
Attempts to automate Google Drive image downloads
"""

import os
import time
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

# Equipment links from Google Drive
equipment_links = {
    'shoulder-equipment': 'https://drive.google.com/file/d/1212LEMYRaL9Po3EfKyg0LUi_XNaUSqflpA/view',
    'rogue-dynabody': 'https://drive.google.com/file/d/16lRJ6T69SVWqAQuxN-hxl9G_HTG/view',
    'bench-press': 'https://drive.google.com/file/d/1AtcNIEDlqJWU-h37pFvPY3GpJlVau/view',
    'precore-icarian-paramount': 'https://drive.google.com/file/d/1Or0ySG8cBAUfUsacMNYQxe6Ulu--2m-/view',
    'powerlift-racks': 'https://drive.google.com/file/d/18PsvXjodeTaw0_K6WvgPOUAOW2/view',
    'leg-equipment': 'https://drive.google.com/file/d/1TuWlV-kOeEtOJhBGqJRpa87JdHOpDyT/view',
    'hammer-strength': 'https://drive.google.com/file/d/10C5HRtq_f9Hoc6hrwTrfNw01nHNl8Jn/view',
    'free-weights-room': 'https://drive.google.com/file/d/1PNsLIBfmHcM_Bd8o4cO_BiE2aJ-pL1_tsLaoKh2/view',
    'chest-equipment': 'https://drive.google.com/file/d/1fc6XPJifIVhGtynnqtqRFltvdiDsLZhULg3iMJ/view',
    'cardio-equipment': 'https://drive.google.com/file/d/CJUArDFpAcEHN5QT9DG_DGPfh/view',
    'camstar-equipment': 'https://drive.google.com/file/d/1Gte5JqM4PnxLVrnToIyChkYVUZ_oZI2/view',
    'bodymaster-equipment': 'https://drive.google.com/file/d/TVyDrJGDaCJbFOHCdkhlvlMo8JyBdnRy/view',
    'back-equipment': 'https://drive.google.com/file/d/16PcOdJCyoOC7mT-vS_V_8Ys/view'
}

def setup_chrome_driver():
    """Setup Chrome driver with download preferences"""
    chrome_options = Options()
    
    # Set download directory
    download_dir = os.path.join(os.getcwd(), 'downloads')
    os.makedirs(download_dir, exist_ok=True)
    
    prefs = {
        "download.default_directory": download_dir,
        "download.prompt_for_download": False,
        "download.directory_upgrade": True,
        "safebrowsing.enabled": True
    }
    
    chrome_options.add_experimental_option("prefs", prefs)
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--disable-dev-shm-usage")
    
    try:
        driver = webdriver.Chrome(options=chrome_options)
        return driver, download_dir
    except Exception as e:
        print(f"Error setting up Chrome driver: {e}")
        print("Please make sure Chrome and chromedriver are installed")
        return None, None

def download_equipment_images():
    """Download all equipment images"""
    driver, download_dir = setup_chrome_driver()
    
    if not driver:
        print("❌ Could not set up browser automation")
        return False
    
    print("🚀 Starting automated download process...")
    
    successful_downloads = 0
    
    try:
        for equipment_name, url in equipment_links.items():
            print(f"\n📥 Downloading: {equipment_name}")
            print(f"   URL: {url}")
            
            try:
                # Navigate to the Google Drive page
                driver.get(url)
                time.sleep(3)
                
                # Try to find and click download button
                download_selectors = [
                    '[aria-label*="Download"]',
                    '[data-tooltip*="Download"]',
                    'div[role="button"]:contains("Download")',
                    '.ndfHFb-c4YZDc-Bz112c-LgbsSe'  # Common Google Drive download button class
                ]
                
                download_clicked = False
                for selector in download_selectors:
                    try:
                        wait = WebDriverWait(driver, 5)
                        download_btn = wait.until(EC.element_to_be_clickable((By.CSS_SELECTOR, selector)))
                        download_btn.click()
                        download_clicked = True
                        print(f"   ✅ Download initiated for {equipment_name}")
                        break
                    except:
                        continue
                
                if not download_clicked:
                    print(f"   ⚠️  Could not find download button for {equipment_name}")
                    # Take a screenshot for debugging
                    driver.save_screenshot(f"debug_{equipment_name}.png")
                
                # Wait for download to complete
                time.sleep(5)
                successful_downloads += 1
                
            except Exception as e:
                print(f"   ❌ Error downloading {equipment_name}: {str(e)}")
        
    finally:
        driver.quit()
    
    print(f"\n📊 Download Summary:")
    print(f"   Attempted: {len(equipment_links)}")
    print(f"   Successful: {successful_downloads}")
    print(f"   Downloads saved to: {download_dir}")
    
    return successful_downloads > 0

if __name__ == "__main__":
    try:
        success = download_equipment_images()
        if success:
            print("\n🎉 Some downloads completed! Check the downloads folder.")
        else:
            print("\n❌ No downloads completed. You may need to download manually.")
    except ImportError:
        print("❌ Selenium not installed. Try: pip install selenium")
    except Exception as e:
        print(f"❌ Error: {e}")