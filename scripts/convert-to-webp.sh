#!/bin/bash
# 画像をWebP形式に変換するスクリプト
# 使用方法: bash scripts/convert-to-webp.sh
#
# 前提: cwebp コマンドが必要 (brew install webp)

set -euo pipefail

PROJECT_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
BLOG_DIR="$PROJECT_ROOT/public/images/blog"
PUBLIC_DIR="$PROJECT_ROOT/public"

# cwebp の存在確認
if ! command -v cwebp &> /dev/null; then
    echo "❌ cwebp コマンドが見つかりません。"
    echo "   brew install webp でインストールしてください。"
    exit 1
fi

echo "🔄 WebP変換を開始します..."

converted=0
skipped=0

# ブログ画像の変換 (JPG -> WebP)
if [ -d "$BLOG_DIR" ]; then
    echo ""
    echo "📁 ブログ画像 ($BLOG_DIR):"
    for img in "$BLOG_DIR"/*.jpg "$BLOG_DIR"/*.jpeg; do
        [ -f "$img" ] || continue
        webp_path="${img%.*}.webp"
        if [ -f "$webp_path" ] && [ "$webp_path" -nt "$img" ]; then
            skipped=$((skipped + 1))
            continue
        fi
        # 品質80でWebP変換（ブログサムネイル向け最適値）
        cwebp -q 80 -m 6 "$img" -o "$webp_path" -quiet
        original_size=$(stat -f%z "$img" 2>/dev/null || stat -c%s "$img" 2>/dev/null)
        webp_size=$(stat -f%z "$webp_path" 2>/dev/null || stat -c%s "$webp_path" 2>/dev/null)
        savings=$(( (original_size - webp_size) * 100 / original_size ))
        echo "  ✅ $(basename "$img") → $(basename "$webp_path") (${savings}% 削減)"
        converted=$((converted + 1))
    done
fi

# public直下の画像変換 (PNG -> WebP, OG画像・faviconは除外)
echo ""
echo "📁 パブリック画像 ($PUBLIC_DIR):"
for img in "$PUBLIC_DIR"/hero-image.png "$PUBLIC_DIR"/logo.png; do
    [ -f "$img" ] || continue
    webp_path="${img%.*}.webp"
    if [ -f "$webp_path" ] && [ "$webp_path" -nt "$img" ]; then
        skipped=$((skipped + 1))
        continue
    fi
    # PNG は品質90（ロスレスに近い品質を維持）
    cwebp -q 90 -m 6 "$img" -o "$webp_path" -quiet
    original_size=$(stat -f%z "$img" 2>/dev/null || stat -c%s "$img" 2>/dev/null)
    webp_size=$(stat -f%z "$webp_path" 2>/dev/null || stat -c%s "$webp_path" 2>/dev/null)
    savings=$(( (original_size - webp_size) * 100 / original_size ))
    echo "  ✅ $(basename "$img") → $(basename "$webp_path") (${savings}% 削減)"
    converted=$((converted + 1))
done

echo ""
echo "🎉 完了: ${converted}枚変換, ${skipped}枚スキップ（既に変換済み）"

# 元画像の合計サイズとWebP合計サイズを表示
if [ -d "$BLOG_DIR" ]; then
    orig_total=$(find "$BLOG_DIR" -name "*.jpg" -o -name "*.jpeg" | xargs stat -f%z 2>/dev/null | paste -sd+ - | bc 2>/dev/null || echo "?")
    webp_total=$(find "$BLOG_DIR" -name "*.webp" | xargs stat -f%z 2>/dev/null | paste -sd+ - | bc 2>/dev/null || echo "?")
    if [ "$orig_total" != "?" ] && [ "$webp_total" != "?" ]; then
        echo ""
        echo "📊 ブログ画像サイズ比較:"
        echo "   元画像合計: $(echo "scale=1; $orig_total / 1048576" | bc)MB"
        echo "   WebP合計:   $(echo "scale=1; $webp_total / 1048576" | bc)MB"
        echo "   合計削減:   $(echo "scale=0; ($orig_total - $webp_total) * 100 / $orig_total" | bc)%"
    fi
fi
