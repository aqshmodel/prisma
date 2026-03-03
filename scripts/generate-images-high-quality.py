import os
import json
import urllib.request
import base64
import subprocess
import time
from pathlib import Path

# Load .env.local manually
env_path = Path('.env.local')
if env_path.exists():
    for line in env_path.read_text().splitlines():
        if '=' in line and not line.startswith('#'):
            k, v = line.split('=', 1)
            os.environ[k.strip()] = v.strip().strip("'").strip('"')

api_key = os.environ.get('GEMINI_API_KEY')
if not api_key:
    print("GEMINI_API_KEY not found in .env.local")
    exit(1)

url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-3-pro-image-preview:generateContent"
headers = {
    'Content-Type': 'application/json',
    'x-goog-api-key': api_key
}

# 共通の強力なプロンプト制約
base_style = "CRITICAL RULE: DO NOT include any text, letters, words, or numbers in the image. High-end professional illustration, atmospheric, deeply emotional, natural and organic brush strokes, cinematic lighting, avoiding typical generic AI aesthetics. Wide horizontal format 16:9, perfect for a blog cover."

images = [
    {
        "slug": "infp-new-assignment-anxiety",
        "prompt": f"{base_style} Concept: A young Japanese business woman sitting in a modern corporate office, looking overwhelmed and melancholic, staring blankly ahead. She is isolated in her own thoughts while blurred colleagues work in the background. Soft pastel watercolor style, delicate and sensitive mood."
    },
    {
        "slug": "isfj-burnout-after-holidays",
        "prompt": f"{base_style} Concept: A young Japanese business woman slumped over her desk, completely exhausted and running out of energy. A subtle, metaphorical representation of her inner battery being completely depicted without using actual battery icons or numbers. Deeply touching, tired but beautiful, soft moody lighting."
    },
    {
        "slug": "human-strengths-in-ai-era-by-type",
        "prompt": f"{base_style} Concept: A conceptual art showing the warmth of human intuition contrasting with cold technology. A young Japanese woman creating something beautiful with her hands, emitting a warm glowing aura, while abstract futuristic digital elements float subtly in the background. Hopeful, inspiring, masterpiece."
    },
    {
        "slug": "intj-desire-for-independence",
        "prompt": f"{base_style} Concept: A brilliant young Japanese business woman standing near a large window in a rigid corporate office, looking outside towards a vast, open city landscape. She looks determined and strategic, planning her independent future. Cool tones, sharp and clean composition."
    },
    {
        "slug": "intp-stress-from-unreasonable-boss",
        "prompt": f"{base_style} Concept: A young Japanese business man standing calmly but looking extremely drained and emotionally detached. In the blurred background, a silhouette of a boss is angrily gesturing. The focus is on the young man's calm, logical, yet exhausted expression. Silent, melancholic, cinematic shadow."
    },
    {
        "slug": "estj-loneliness-of-competence",
        "prompt": f"{base_style} Concept: A highly competent and sharp young Japanese business woman sitting alone in a large, empty, sophisticated conference room after everyone has left. She looks successful but deeply lonely. Dramatic lighting, empty chairs around a long table, highlighting isolation in success."
    }
]

for item in images:
    slug = item["slug"]
    prompt = item["prompt"]
    print(f"Generating image for {slug}...")

    payload = {
        "contents": [{"parts": [{"text": prompt}]}]
    }
    
    req = urllib.request.Request(url, data=json.dumps(payload).encode('utf-8'), headers=headers, method='POST')
    try:
        with urllib.request.urlopen(req) as response:
            result = json.loads(response.read().decode('utf-8'))
            
            parts = result.get('candidates', [{}])[0].get('content', {}).get('parts', [])
            img_data = None
            for part in parts:
                if 'inlineData' in part and part['inlineData'].get('mimeType', '').startswith('image/'):
                    img_data = part['inlineData']['data']
                    break
            
            if img_data:
                img_path = f"public/images/blog/{slug}.jpg"
                with open(img_path, "wb") as fh:
                    fh.write(base64.b64decode(img_data))
                print(f"-> Saved: {img_path}")
                
                # Resize directly to ensure <100KB. 
                # formatOptions 20 for JPEG compression, -Z 1200 limits max dimension to 1200px.
                subprocess.run(['sips', '-s', 'format', 'jpeg', '-s', 'formatOptions', '20', '-Z', '1200', img_path, '--out', img_path])
                print(f"-> Resized: {img_path}")
            else:
                print(f"-> No image data found. Response: {result}")
                
        # API rate limit safety
        time.sleep(3)

    except urllib.error.HTTPError as e:
        print(f"HTTP Error {e.code}: {e.read().decode('utf-8')}")
    except Exception as e:
        print(f"Error: {e}")
