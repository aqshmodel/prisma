import os
from PIL import Image

output_dir = "/Users/tsukadatakahiro/Python/app/prisma/public/images/blog"
os.makedirs(output_dir, exist_ok=True)

images_to_process = [
    ("/Users/tsukadatakahiro/.gemini/antigravity/brain/dd340361-644c-4a66-9cd5-a6550f84fa20/enneagram_type3_raw_1773556956214.png", "enneagram-type3-burnout-identity-crisis.webp", "center"),
    ("/Users/tsukadatakahiro/.gemini/antigravity/brain/dd340361-644c-4a66-9cd5-a6550f84fa20/enneagram_type1_raw_1773556970824.png", "enneagram-type1-perfectionism-exhaustion.webp", "center"),
    ("/Users/tsukadatakahiro/.gemini/antigravity/brain/dd340361-644c-4a66-9cd5-a6550f84fa20/ai_layoff_raw_1773556986457.png", "ai-layoff-survival-by-personality-type.webp", "center"),
    ("/Users/tsukadatakahiro/.gemini/antigravity/brain/dd340361-644c-4a66-9cd5-a6550f84fa20/four_day_workweek_raw_1773557002290.png", "four-day-workweek-personality-fit.webp", "center")
]

for img_path, out_filename, crop_pos in images_to_process:
    try:
        with Image.open(img_path) as img:
            out_path = os.path.join(output_dir, out_filename)
            
            width, height = img.size
            target_ratio = 16 / 9
            
            if width / height > target_ratio:
                new_width = int(height * target_ratio)
                left = (width - new_width) / 2
                right = left + new_width
                top = 0
                bottom = height
            else:
                new_height = int(width / target_ratio)
                left = 0
                right = width
                
                if crop_pos == "top":
                    top = 0
                    bottom = new_height
                else: # center
                    top = (height - new_height) / 2
                    bottom = top + new_height
                    
            img_cropped = img.crop((left, top, right, bottom))
            
            target_width = 1200
            target_height = int(1200 / target_ratio)
            img_resized = img_cropped.resize((target_width, target_height), Image.Resampling.LANCZOS)
            
            quality = 90
            while quality > 10:
                img_resized.save(out_path, "WEBP", quality=quality, method=6)
                if os.path.getsize(out_path) <= 100 * 1024:
                    break
                quality -= 5
                
            print(f"Processed: {out_filename} - Size: {os.path.getsize(out_path)/1024:.2f} KB")
            
    except Exception as e:
        print(f"Error processing {img_path}: {e}")
