import os
from PIL import Image

output_dir = "/Users/tsukadatakahiro/Python/app/prisma/public/images/blog"
images = [
    "career-analysis.webp",
    "confirmation-bias.webp",
    "enneagram-engine.webp",
    "freelance-aptitude.webp",
    "hidden-stress.webp",
    "management-synergy.webp",
    "team-synergy.webp",
    "socionics-os.webp",
    "office-communication.webp"
]

for filename in images:
    filepath = os.path.join(output_dir, filename)
    if not os.path.exists(filepath):
        print(f"File not found: {filename}")
        continue
        
    try:
        with Image.open(filepath) as img:
            width, height = img.size
            target_ratio = 16 / 9
            
            # 既に16:9に近いならスキップ（許容誤差）
            current_ratio = width / height
            if abs(current_ratio - target_ratio) < 0.05:
                print(f"Skipping {filename}, already 16:9 (ratio: {current_ratio:.2f})")
                continue

            print(f"Processing {filename} (Original size: {width}x{height}, Ratio: {current_ratio:.2f})")

            # 16:9にクロップ
            if current_ratio < target_ratio:
                # 縦長すぎる場合 → 上下を削る
                new_width = width
                new_height = int(width / target_ratio)
                left = 0
                right = width
                # 顔が見切れないよう、やや上寄り(top)にクロップする設定にします（通常は y=0 や 20% 位置など）
                # 今回は上を基準にします
                top = 0
                bottom = top + new_height
            else:
                # 横長すぎる場合 → 左右を削る
                new_height = height
                new_width = int(height * target_ratio)
                left = (width - new_width) / 2
                right = left + new_width
                top = 0
                bottom = height
                
            img_cropped = img.crop((left, top, right, bottom))
            
            # リサイズ (1200x675)
            target_width = 1200
            target_height = int(1200 / target_ratio)
            img_resized = img_cropped.resize((target_width, target_height), Image.Resampling.LANCZOS)
            
            # WebPで上書き保存、100KB以下を目指す
            quality = 90
            while quality > 10:
                img_resized.save(filepath, "WEBP", quality=quality, method=6)
                if os.path.getsize(filepath) <= 100 * 1024:
                    break
                quality -= 5
                
            print(f"Successfully updated: {filename} - Final size: {os.path.getsize(filepath)/1024:.2f} KB, Size: 1200x675")
            
    except Exception as e:
        print(f"Error processing {filename}: {e}")
