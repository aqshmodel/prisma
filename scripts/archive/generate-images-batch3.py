import os
import json
import urllib.request
import base64
import subprocess
from pathlib import Path

# Load .env manually
env_path = Path('.env')
if env_path.exists():
    for line in env_path.read_text().splitlines():
        if '=' in line and not line.startswith('#'):
            k, v = line.split('=', 1)
            os.environ[k.strip()] = v.strip().strip("'").strip('"')

api_key = os.environ.get('GEMINI_API_KEY')
if not api_key:
    print("GEMINI_API_KEY not found in .env")
    exit(1)

url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-3-pro-image-preview:generateContent"
headers = {
    'Content-Type': 'application/json',
    'x-goog-api-key': api_key
}

images = [
    {
        "slug": "infp-new-assignment-anxiety",
        "prompt": "An artistic and conceptual illustration representing a young Japanese business woman feeling overwhelmed and melancholic in an office setting. She is an INFP personality type. Soft, pastel aesthetics, anime or watercolor style, melancholic but beautiful, wide shot 16:9."
    },
    {
        "slug": "isfj-burnout-after-holidays",
        "prompt": "An artistic and conceptual illustration representing a young Japanese business woman feeling extremely exhausted and burnt out. She is an ISFJ personality type. A sense of over-adaptation and running out of battery. Soft, pastel aesthetics, anime or watercolor style, melancholic but beautiful, wide shot 16:9."
    },
    {
        "slug": "human-strengths-in-ai-era-by-type",
        "prompt": "An artistic and conceptual illustration representing human intuition vs artificial intelligence. A young Japanese woman discovering her unique human strengths in a futuristic but warm setting. Soft, pastel aesthetics, anime or watercolor style, hopeful and beautiful, wide shot 16:9."
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
            
            # Check for inlineData
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
                
                # Resize safely using sips
                subprocess.run(['sips', '-s', 'format', 'jpeg', '-s', 'formatOptions', '40', '-Z', '1200', img_path, '--out', img_path])
                print(f"-> Resized: {img_path}")
            else:
                print(f"-> No image data found. Response: {result}")

    except urllib.error.HTTPError as e:
        print(f"HTTP Error {e.code}: {e.read().decode('utf-8')}")
    except Exception as e:
        print(f"Error: {e}")
