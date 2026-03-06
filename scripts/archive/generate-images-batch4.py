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

base_style = "CRITICAL RULE: DO NOT include any text, letters, words, or numbers in the image. High-end professional illustration, atmospheric, deeply emotional, natural and organic brush strokes, cinematic lighting, avoiding typical generic AI aesthetics. Wide horizontal format 16:9, perfect for a blog cover."

images = [
    {
        "slug": "self-love-with-personality-type",
        "prompt": f"{base_style} Concept: A young Japanese woman sitting in a bright cafe, looking at a beautifully glowing, ethereal notebook. She is discovering her true talents and smiling with deep self-appreciation. Soft, warm sunlight, hopeful and positive mood."
    },
    {
        "slug": "f-type-empathy-as-a-charm",
        "prompt": f"{base_style} Concept: A young Japanese woman crying softly but beautifully, surrounded by warm, glowing light that seems to melt the coldness around her. Metaphoric representation of emotional empathy as a powerful, healing magic. Soft pink and gold hues."
    },
    {
        "slug": "t-type-logical-cool-aura",
        "prompt": f"{base_style} Concept: A sharp, intelligent young Japanese business woman standing confidently in a chaotic modern office, completely calm and collected. Cold, crisp blue tones contrasting with a warm aura of reliability. Cool protagonist vibes."
    },
    {
        "slug": "n-type-creative-genius",
        "prompt": f"{base_style} Concept: A young Japanese woman looking up at an abstract, glowing constellation of ideas floating in the air around her in a creative workspace. Avant-garde, visionary, and extremely beautifully detailed, showcasing explosive creativity."
    },
    {
        "slug": "s-type-beauty-of-routine",
        "prompt": f"{base_style} Concept: A deeply calming morning scene, a young Japanese woman carefully pouring coffee in a perfectly organized, beautiful minimalist room with morning sunlight streaming in. Represents the profound beauty and stability of daily routines. Earthy, soothing tones."
    },
    {
        "slug": "e-type-social-charm-power",
        "prompt": f"{base_style} Concept: A vibrant, energetic young Japanese woman at a social gathering, glowing like a warm sun at the center of the room. People around her are smiling and drawn to her light. Joyful, radiant, dynamic composition."
    },
    {
        "slug": "i-type-mysterious-charm",
        "prompt": f"{base_style} Concept: A young Japanese woman sitting alone by a window in a dimly lit, atmospheric vintage cafe reading a book. She exudes a deep, calm, and highly mysterious allure. Deep oceanic blues and purples, conveying a profound inner world."
    },
    {
        "slug": "j-type-reliability-in-love",
        "prompt": f"{base_style} Concept: A trustworthy, elegant young Japanese woman holding a beautifully structured planner, looking at a partner (not fully shown) with a warm, deeply reassuring smile. Depicts pure reliability and secure love. Soft, clear lighting, structured but tender."
    },
    {
        "slug": "p-type-flexibility-in-love",
        "prompt": f"{base_style} Concept: A carefree, joyful young Japanese woman running in a gentle rain with a clear umbrella, laughing and enjoying the sudden change of plans. Represents ultimate flexibility and irresistible chaotic charm. Dynamic, sparkling drops."
    },
    {
        "slug": "enneagram-aura-and-self-love",
        "prompt": f"{base_style} Concept: A young Japanese woman stepping into a brilliant, wide-open landscape, radiating an overwhelming, blinding beautiful aura from within. She has completely uncovered her true engine. Majestic, epic scale, blindingly beautiful dawn lighting."
    }
]

for item in images:
    slug = item["slug"]
    prompt = item["prompt"]
    img_path = f"public/images/blog/{slug}.jpg"
    
    # Skip if exists to save time/tokens if rerun
    if os.path.exists(img_path) and os.path.getsize(img_path) > 0:
        print(f"Skipping {slug}, already exists.")
        continue

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
                with open(img_path, "wb") as fh:
                    fh.write(base64.b64decode(img_data))
                print(f"-> Saved: {img_path}")
                
                # Resize directly to ensure <100KB.
                subprocess.run(['sips', '-s', 'format', 'jpeg', '-s', 'formatOptions', '20', '-Z', '1200', img_path, '--out', img_path])
                print(f"-> Resized: {img_path}")
            else:
                print(f"-> No image data found. Response: {result}")
                
        # API rate limit safety
        time.sleep(4)

    except urllib.error.HTTPError as e:
        print(f"HTTP Error {e.code}: {e.read().decode('utf-8')}")
    except Exception as e:
        print(f"Error: {e}")

print("Batch 4 Image Generation Completed.")
