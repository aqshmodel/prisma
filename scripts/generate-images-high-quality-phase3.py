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
        "slug": "entp-boredom-in-relationships",
        "prompt": f"{base_style} Concept: A young Japanese woman looking bored and detached while sitting at a cafe table with her romantic partner (who is blurred out). She is looking away, seeking new intellectual stimulation and excitement elsewhere. Soft watercolor aesthetics, conveying a sense of sudden intellectual boredom."
    },
    {
        "slug": "isfp-loss-of-passion-at-work",
        "prompt": f"{base_style} Concept: A young Japanese woman sitting at a monotonous corporate office desk, holding a colorful paintbrush or flower, looking sad that her true colors and individuality are being suppressed by the gray, rigid environment. Emotive, soft pastel lighting, illustrating the loss of passion."
    },
    {
        "slug": "infj-empathy-fatigue-protection",
        "prompt": f"{base_style} Concept: A young Japanese woman standing in a crowded office, visually overwhelmed by floating dark clouds or heavy auras emanating from angry or stressed coworkers around her. She is trying to create a beautiful, glowing, transparent protective bubble around herself. Ethereal, empathetic, beautiful sadness."
    },
    {
        "slug": "intronverts-need-for-alone-time",
        "prompt": f"{base_style} Concept: A young Japanese man sitting peacefully alone in a cozy, dimly lit bedroom, reading a book or floating in deep thoughts. The room feels like a safe, quiet sanctuary, a 'charging station' for his soul, while outside the window, the chaotic, noisy city is visible but kept away. Calm, introverted beauty."
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
