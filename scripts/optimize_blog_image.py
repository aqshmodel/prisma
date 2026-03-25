import os
import argparse
from PIL import Image

def optimize_image(input_path, output_name=None, output_dir=None, target_ratio=None, crop_y=0.5):
    """
    指定された画像をブログの標準規格にクロップし、100KB以下のWebPに変換する。
    """
    if not os.path.exists(input_path):
        print(f"Error: Input file not found: {input_path}")
        return False

    # デフォルト設定
    if output_dir is None:
        output_dir = "/Users/tsukadatakahiro/Python/app/prisma/public/images/blog"
    
    if target_ratio is None:
        # 1200x630 (OGP向け / 約1.9:1) をデフォルトとする
        target_ratio = 1200 / 630

    # 出力ファイル名の決定
    if output_name is None:
        # 拡張子を.webpに変更
        base_name = os.path.basename(input_path)
        name_without_ext = os.path.splitext(base_name)[0]
        output_name = f"{name_without_ext}.webp"
    elif not output_name.endswith('.webp'):
        output_name = f"{output_name}.webp"

    output_path = os.path.join(output_dir, output_name)
    os.makedirs(output_dir, exist_ok=True)

    try:
        with Image.open(input_path) as img:
            w, h = img.size
            current_ratio = w / h
            print(f"Original size: {w}x{h} (Ratio: {current_ratio:.2f})")

            # アスペクト比に合わせてクロップ
            if current_ratio < target_ratio:
                # 縦長すぎる場合 → 上下をクロップ（顔が入りやすいようやや上寄り）
                new_h = int(w / target_ratio)
                max_top = h - new_h
                # ユーザー指定のクロップ位置(デフォルト0.5=中央、0=上端)
                top = int(max_top * crop_y)
                bottom = top + new_h
                img = img.crop((0, top, w, bottom))
            else:
                # 横長すぎる場合 → 左右をクロップ（中央）
                new_w = int(h * target_ratio)
                max_left = w - new_w
                left = int(max_left * 0.5)
                right = left + new_w
                img = img.crop((left, 0, right, h))

            # リサイズ (長辺1200pxを基準、縮小の場合のみ)
            target_w = 1200
            target_h = int(1200 / target_ratio)
            img = img.resize((target_w, target_h), Image.Resampling.LANCZOS)

            # WebP保存 (100KB以下になるまで品質を下げる)
            q = 90
            while True:
                img.save(output_path, format="WEBP", quality=q, method=6)
                size_kb = os.path.getsize(output_path) / 1024
                if size_kb <= 100 or q <= 10:
                    break
                q -= 5
            
            print(f"✅ Success! Saved as {output_name}")
            print(f"   Size: {target_w}x{target_h}, File size: {size_kb:.2f}KB (Quality: {q})")
            return True

    except Exception as e:
        print(f"❌ Error processing image: {e}")
        return False

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="画像をブログ用にクロップ・WebP最適化（100KB以下）する")
    parser.add_argument("input", help="変換する入力画像のパス")
    parser.add_argument('--name', '-n', help="出力ファイル名（指定しない場合は入力の拡張子を.webpにしたもの）", default=None)
    parser.add_argument('--dir', '-d', help="出力先ディレクトリ（デフォルト: public/images/blog/）", default=None)
    parser.add_argument('--ratio_16_9', action='store_true', help="アスペクト比を16:9 (1200x675)にする（デフォルトは1.9:1 (1200x630)）")
    parser.add_argument('--crop_y', type=float, default=0.5, help="縦方向のクロップ位置 (0.0=上端, 0.5=中央, 1.0=下端)")
    
    args = parser.parse_args()
    
    target_ratio = 16 / 9 if args.ratio_16_9 else 1200 / 630
    
    optimize_image(args.input, args.name, args.dir, target_ratio, args.crop_y)
