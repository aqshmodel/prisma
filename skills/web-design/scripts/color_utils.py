#!/usr/bin/env python3
"""
Color Utils - Palette Generator and Contrast Checker
"""

import sys
import colorsys
import math

def hex_to_rgb(hex_color):
    hex_color = hex_color.lstrip('#')
    return tuple(int(hex_color[i:i+2], 16) for i in (0, 2, 4))

def rgb_to_hex(rgb):
    return '#{:02x}{:02x}{:02x}'.format(int(rgb[0]), int(rgb[1]), int(rgb[2]))

def luminance(rgb):
    """Calculate relative luminance for WCAG contrast."""
    a = [v / 255.0 for v in rgb]
    a = [(v / 12.92) if v <= 0.03928 else ((v + 0.055) / 1.055) ** 2.4 for v in a]
    return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2]

def contrast_ratio(rgb1, rgb2):
    """Calculate contrast ratio between two colors."""
    l1 = luminance(rgb1)
    l2 = luminance(rgb2)
    return (max(l1, l2) + 0.05) / (min(l1, l2) + 0.05)

def generate_palette(base_hex):
    """Generate a Tailwind-like palette from a base color."""
    base_rgb = hex_to_rgb(base_hex)
    h, l, s = colorsys.rgb_to_hls(*[x/255.0 for x in base_rgb])
    
    palette = {}
    steps = {
        50: 0.95, 100: 0.9, 200: 0.8, 300: 0.7, 400: 0.6,
        500: 0.5, # Base (approx)
        600: 0.4, 700: 0.3, 800: 0.2, 900: 0.1, 950: 0.05
    }
    
    # Adjust lightness strictly based on steps, keeping hue and saturation (mostly) constant
    # Real Tailwind is more complex, but this is a decent approximation
    
    for weight, target_l in steps.items():
        # Interpolate L: if base L is 0.5, we want 500 to be close to base.
        # Simple method: just set L to target_l
        new_rgb = colorsys.hls_to_rgb(h, target_l, s)
        palette[weight] = rgb_to_hex([x*255 for x in new_rgb])
        
    return palette

def main():
    if len(sys.argv) < 2:
        print("Usage:")
        print("  python color_utils.py palette <hex_color>")
        print("  python color_utils.py contrast <hex1> <hex2>")
        sys.exit(1)

    command = sys.argv[1]

    if command == "palette":
        base_hex = sys.argv[2]
        print(f"Generating palette for {base_hex}:")
        palette = generate_palette(base_hex)
        for stop, color in palette.items():
             print(f"  {stop}: {color}")
             
    elif command == "contrast":
        c1 = hex_to_rgb(sys.argv[2])
        c2 = hex_to_rgb(sys.argv[3])
        ratio = contrast_ratio(c1, c2)
        print(f"Contrast Ratio ({sys.argv[2]} vs {sys.argv[3]}): {ratio:.2f}")
        
        if ratio >= 7:
            print("  ✅ AAA (Normal Text)")
        elif ratio >= 4.5:
            print("  ✅ AA (Normal Text) / AAA (Large Text)")
        elif ratio >= 3:
            print("  ⚠️ AA (Large Text Only) / Fail (Normal Text)")
        else:
            print("  ❌ Fail")

if __name__ == "__main__":
    main()
