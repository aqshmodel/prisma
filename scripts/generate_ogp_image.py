#!/usr/bin/env python3
"""
OGP画像生成スクリプト (Nano Banana Pro / Gemini API)

Gemini APIで最初から16:9(1200x630相当)の横長画像を生成し、
WebPに変換・100KB以下に圧縮して public/images/blog/{slug}.webp へ保存する。

使い方:
  # 単体
  python scripts/generate_ogp_image.py --slug my-article-slug --prompt "日本の漫画テイストのデジタルイラスト。テーマ: ..."

  # 複数 (JSON)
  python scripts/generate_ogp_image.py --batch images.json

  images.json の形式:
  [
    {"slug": "article-slug-1", "prompt": "日本の漫画テイスト..."},
    {"slug": "article-slug-2", "prompt": "日本の漫画テイスト..."}
  ]

必要パッケージ: pip install google-genai Pillow python-dotenv
APIキー: .env.local の GEMINI_API_KEY
"""

import os
import sys
import json
import time
import argparse
import io
import base64
from pathlib import Path

from dotenv import load_dotenv
from PIL import Image

# .env.local からAPIキーを読み込む
script_dir = Path(__file__).resolve().parent
project_root = script_dir.parent

# Env読み込み
for env_file in [project_root / ".env.local", project_root / ".env"]:
    if env_file.exists():
        load_dotenv(env_file)
        break

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if not GEMINI_API_KEY:
    print("❌ Error: GEMINI_API_KEY が .env.local に設定されていません")
    sys.exit(1)

# --- デフォルト設定 ---
MODEL = "gemini-3.1-flash-image-preview"  # Nano Banana Pro
OUTPUT_DIR = project_root / "public" / "images" / "blog"
ASPECT_RATIO = "16:9"
TARGET_WIDTH = 1200
TARGET_HEIGHT = 630  # 1200 / (16/9) ≈ 675 だが OGP規格に合わせて630にクロップ

# 画像のプロンプトに追加するプレフィックス（ガイドライン準拠）
STYLE_PREFIX = (
    "Digital illustration in a Japanese manga aesthetic. "
    "No text or letters. "
    "Composition: main subject 60%, sub-elements 30%, other 10%. "
    "Center the main subject horizontally. "
    "Wide cinematic composition suitable for a blog cover image. "
)


def generate_image(prompt: str, slug: str, output_dir: Path = OUTPUT_DIR, model: str = MODEL) -> bool:
    """Gemini APIで16:9画像を生成し、WebP最適化して保存する"""
    try:
        from google import genai
        from google.genai import types
    except ImportError:
        print("❌ Error: google-genai パッケージが見つかりません。")
        print("   pip install google-genai を実行してください。")
        return False

    output_dir.mkdir(parents=True, exist_ok=True)
    output_path = output_dir / f"{slug}.webp"

    full_prompt = f"{STYLE_PREFIX}{prompt}"
    print(f"\n🎨 Generating: {slug}")
    print(f"   Prompt: {full_prompt[:80]}...")

    try:
        client = genai.Client(api_key=GEMINI_API_KEY)

        # SDK環境の違いによるImageConfigエラーを回避するため、configは指定しない。
        # 16:9はプロンプトの指示とPillowでの後処理（クロップ）で担保する。
        enhanced_prompt = f"Aspect Ratio: 16:9. {full_prompt}"
        response = client.models.generate_content(
            model=model,
            contents=[enhanced_prompt]
        )

        img = None
        
        # 生成された画像を抽出する（SDKバージョンの差異対応）
        try:
            # 1. response.candidates ツリーからの抽出
            if hasattr(response, 'candidates') and response.candidates:
                for candidate in response.candidates:
                    if hasattr(candidate, 'content') and hasattr(candidate.content, 'parts'):
                        for part in candidate.content.parts:
                            if hasattr(part, 'inline_data') and part.inline_data:
                                image_data = part.inline_data.data
                                if isinstance(image_data, str):
                                    image_data = base64.b64decode(image_data)
                                img = Image.open(io.BytesIO(image_data))
                                break
                    if img:
                        break
            
            # 2. フォールバック: response.generated_images からの抽出
            if img is None and hasattr(response, 'generated_images'):
                for gen_img in response.generated_images:
                    if hasattr(gen_img, 'image') and hasattr(gen_img.image, 'image_bytes'):
                        image_data = gen_img.image.image_bytes
                        img = Image.open(io.BytesIO(image_data))
                        break
                        
            # 3. フォールバック: response.parts からの直接抽出
            if img is None and hasattr(response, 'parts'):
                for part in response.parts:
                    if hasattr(part, 'as_image') and callable(part.as_image):
                        extracted_img = part.as_image()
                        if extracted_img:
                            img = extracted_img
                            break
                    elif hasattr(part, 'inline_data') and part.inline_data:
                        image_data = part.inline_data.data
                        if isinstance(image_data, str):
                            image_data = base64.b64decode(image_data)
                        img = Image.open(io.BytesIO(image_data))
                        break
        except Exception as e:
            print(f"   Debug Extract Error: {e}")

        if img is None:
            print(f"   ❌ Error: 画像が生成されませんでした")
            try:
                print(f"   Debug (dir): {dir(response)}")
                if hasattr(response, 'candidates') and response.candidates:
                    print(f"   Debug (candidates[0].content.parts): {response.candidates[0].content.parts}")
                if hasattr(response, 'text'):
                    print(f"   Debug (text): {response.text}")
            except Exception as e:
                print(f"   Debug Error: {e}")
            return False

        w, h = img.size
        print(f"   Generated: {w}x{h}")

        # 16:9 → OGP (1200x630) にクロップ・リサイズ
        # 16:9は約1.778:1, OGPは1200/630≈1.905:1なので微調整
        ogp_ratio = TARGET_WIDTH / TARGET_HEIGHT  # 1.905
        current_ratio = w / h

        if current_ratio < ogp_ratio:
            # 縦が足りない → 上下クロップ
            new_h = int(w / ogp_ratio)
            top = (h - new_h) // 2
            img = img.crop((0, top, w, top + new_h))
        elif current_ratio > ogp_ratio:
            # 横が足りない → 左右クロップ
            new_w = int(h * ogp_ratio)
            left = (w - new_w) // 2
            img = img.crop((left, 0, left + new_w, h))

        # 1200x630にリサイズ
        img = img.resize((TARGET_WIDTH, TARGET_HEIGHT), Image.Resampling.LANCZOS)

        # WebP保存（100KB以下になるまで品質を下げる）
        q = 90
        while True:
            img.save(str(output_path), format="WEBP", quality=q, method=6)
            size_kb = output_path.stat().st_size / 1024
            if size_kb <= 100 or q <= 10:
                break
            q -= 5

        print(f"   ✅ Saved: {output_path.name}")
        print(f"   Size: {TARGET_WIDTH}x{TARGET_HEIGHT}, File: {size_kb:.1f}KB (q={q})")
        return True

    except Exception as e:
        print(f"   ❌ Error: {e}")
        return False


def main():
    parser = argparse.ArgumentParser(
        description="Gemini API (Nano Banana Pro) で OGP画像(1200x630 WebP)を生成する"
    )
    parser.add_argument("--slug", "-s", help="記事のslug（出力ファイル名）")
    parser.add_argument("--prompt", "-p", help="画像生成プロンプト（日本語・英語可）")
    parser.add_argument(
        "--batch", "-b",
        help="バッチ処理用JSONファイルのパス（[{slug, prompt}, ...]形式）",
    )
    parser.add_argument(
        "--dir", "-d",
        help=f"出力先ディレクトリ（デフォルト: {OUTPUT_DIR}）",
        default=None,
    )
    parser.add_argument(
        "--model", "-m",
        help=f"使用するモデル（デフォルト: {MODEL}）",
        default=None,
    )
    parser.add_argument(
        "--delay",
        type=float,
        default=3.0,
        help="バッチ処理時のAPI呼び出し間隔（秒、デフォルト: 3）",
    )
    args = parser.parse_args()

    model = args.model if args.model else MODEL
    output_dir = Path(args.dir) if args.dir else OUTPUT_DIR

    if args.batch:
        # バッチモード
        batch_path = Path(args.batch)
        if not batch_path.exists():
            print(f"❌ Error: バッチファイルが見つかりません: {batch_path}")
            sys.exit(1)

        with open(batch_path) as f:
            items = json.load(f)

        print(f"📦 Batch mode: {len(items)} images")
        success = 0
        for i, item in enumerate(items, 1):
            slug = item.get("slug")
            prompt = item.get("prompt")
            if not slug or not prompt:
                print(f"   ⚠️ Skipping item {i}: slug or prompt missing")
                continue

            if generate_image(prompt, slug, output_dir, model):
                success += 1

            # レートリミット対策
            if i < len(items):
                time.sleep(args.delay)

        print(f"\n📊 Result: {success}/{len(items)} images generated successfully")

    elif args.slug and args.prompt:
        # 単体モード
        if not generate_image(args.prompt, args.slug, output_dir, model):
            sys.exit(1)

    else:
        parser.print_help()
        print("\n例:")
        print('  python3 scripts/generate_ogp_image.py -s my-article -p "デジタルイラスト。テーマ: 職場での孤立"')
        print('  python3 scripts/generate_ogp_image.py --batch images.json')
        sys.exit(1)


if __name__ == "__main__":
    main()
