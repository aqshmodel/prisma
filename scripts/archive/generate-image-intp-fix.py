import os
import json
import urllib.request
import base64
import subprocess
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
base_style = "CRITICAL RULE: DO NOT include any text, letters, words, or numbers in the image. High-end professional illustration, natural and organic brush strokes, vibrant but balanced colors, avoiding typical generic AI aesthetics. Wide horizontal format 16:9, perfect for a blog cover."

# 画風を暗くしすぎず、状況（理不尽なストレス）を表現するプロンプト
prompt = f"{base_style} Concept: A young Japanese business man standing calmly but looking emotionally drained. In the background, a slightly blurred silhouette of a boss is angrily gesturing. The focus is on the young man's calm, logical, yet exhausted expression. The overall art style should be bright and modern (like contemporary anime or clean digital art), using bright office lighting (daylight from large windows) rather than dark cinematic shadows, letting the situation define the stress rather than dark colors."
slug = "intp-stress-from-unreasonable-boss"

print(f"Generating optimized image for {slug}...")

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
            subprocess.run(['sips', '-s', 'format', 'jpeg', '-s', 'formatOptions', '20', '-Z', '1200', img_path, '--out', img_path])
            print(f"-> Resized: {img_path}")
        else:
            print(f"-> No image data found. Response: {result}")

except urllib.error.HTTPError as e:
    print(f"HTTP Error {e.code}: {e.read().decode('utf-8')}")
except Exception as e:
    print(f"Error: {e}")
