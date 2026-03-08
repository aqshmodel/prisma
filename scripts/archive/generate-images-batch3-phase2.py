import os
import json
import urllib.request
import base64
import subprocess
from pathlib import Path

# Load .env.local manually as requested
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

images = [
    {
        "slug": "intj-desire-for-independence",
        "prompt": "An artistic and conceptual illustration representing a highly intelligent young Japanese business woman, an INTj personality type, feeling detached and confined within a rigid corporate office. She dreams of independence and building her own logical systems outside the box. Soft, pastel aesthetics, anime or watercolor style, melancholic but beautiful, wide shot 16:9."
    },
    {
        "slug": "intp-stress-from-unreasonable-boss",
        "prompt": "An artistic and conceptual illustration representing a young Japanese business man, an INTp personality type, feeling extremely stressed and dead inside while a boss is yelling emotional and illogical complaints at him. Soft, pastel aesthetics, anime or watercolor style, melancholic but beautiful, wide shot 16:9."
    },
    {
        "slug": "estj-loneliness-of-competence",
        "prompt": "An artistic and conceptual illustration representing a highly competent young Japanese business woman, an ESTj personality type, standing alone at the top of a corporate ladder. She achieved perfect results but everyone else has left her because she was too strict and logical. Soft, pastel aesthetics, anime or watercolor style, lonely but beautiful, wide shot 16:9."
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
                
                # Resize safely using sips to directly ensure it's under 100KB (formatOptions 20 for JPEG)
                subprocess.run(['sips', '-s', 'format', 'jpeg', '-s', 'formatOptions', '20', '-Z', '1200', img_path, '--out', img_path])
                print(f"-> Resized: {img_path}")
            else:
                print(f"-> No image data found. Response: {result}")

    except urllib.error.HTTPError as e:
        print(f"HTTP Error {e.code}: {e.read().decode('utf-8')}")
    except Exception as e:
        print(f"Error: {e}")
