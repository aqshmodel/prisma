import os
from PIL import Image

TARGET_DIR = "/Users/tsukadatakahiro/Python/app/prisma/public/images/blog"
TARGET_FILES = [
    "infp-type4-struggle-to-find-identity.webp",
    "enfp-type7-boredom-cycle.webp",
    "enneagram-type5-workplace-social-stress.webp",
    "enneagram-type9-procrastination-work.webp",
    "boss-subordinate-compatibility-by-type.webp",
    "hiring-mismatch-prevention-by-type.webp",
    "nurse-personality-type-aptitude.webp",
    "engineer-burnout-personality-type.webp",
    "quiet-quitting-personality-type.webp",
    "mbti-socionics-key-differences.webp"
]

TARGET_ASPECT_RATIO = 1200 / 630 # 1.904...

for filename in TARGET_FILES:
    filepath = os.path.join(TARGET_DIR, filename)
    if os.path.exists(filepath):
        img = Image.open(filepath)
        w, h = img.size
        print(f"Original {filename}: {w}x{h}")
        
        # Calculate target dimensions for cropping
        # We want aspect ratio 1200:630
        current_aspect_ratio = w / h
        
        if current_aspect_ratio > TARGET_ASPECT_RATIO:
            # Image is too wide, need to crop width
            target_h = h
            target_w = int(h * TARGET_ASPECT_RATIO)
        else:
            # Image is too tall, need to crop height
            target_w = w
            target_h = int(w / TARGET_ASPECT_RATIO)
            
        left = (w - target_w) / 2
        top = (h - target_h) / 2
        right = (w + target_w) / 2
        bottom = (h + target_h) / 2
        
        img_cropped = img.crop((left, top, right, bottom))
        img_resized = img_cropped.resize((1200, 630), Image.LANCZOS)
        img_resized.save(filepath, format="WEBP")
        print(f"Cropped and Resized {filename}: {img_resized.size}\n")
    else:
        print(f"File not found: {filename}")
