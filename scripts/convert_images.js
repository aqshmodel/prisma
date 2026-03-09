const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Determine if sharp is available, otherwise try using sips + cwebp
try {
  const sharp = require('sharp');
  
  const files = [
    { src: '/Users/tsukadatakahiro/.gemini/antigravity/brain/5635a485-363c-4ffa-9229-8d523fa56187/enneagram_type1_perfectionism_exhaustion_v2_1773037383539.png', dest: 'public/images/blog/enneagram-type1-perfectionism-exhaustion.webp' },
    { src: '/Users/tsukadatakahiro/.gemini/antigravity/brain/5635a485-363c-4ffa-9229-8d523fa56187/enneagram_type2_workplace_burnout_v2_1773037407420.png', dest: 'public/images/blog/enneagram-type2-workplace-burnout.webp' },
    { src: '/Users/tsukadatakahiro/.gemini/antigravity/brain/5635a485-363c-4ffa-9229-8d523fa56187/enneagram_type4_meaningless_work_v2_1773037432354.png', dest: 'public/images/blog/enneagram-type4-meaningless-work.webp' }
  ];

  async function processImages() {
    for (const file of files) {
      if (!fs.existsSync(file.src)) {
        console.error("Not found:", file.src);
        continue;
      }
      const metadata = await sharp(file.src).metadata();
      const targetWidth = 1200;
      const targetHeight = 675; // 16:9
      
      // Calculate crop
      let cropW = metadata.width;
      let cropH = Math.min(metadata.height, Math.round(metadata.width * 9 / 16));
      
      await sharp(file.src)
        .extract({
          left: 0,
          top: Math.round((metadata.height - cropH) / 2),
          width: cropW,
          height: cropH
        })
        .resize(targetWidth, targetHeight)
        .webp({ quality: 75 })
        .toFile(file.dest);
        
      console.log(`Processed: ${file.dest}`);
    }
  }
  processImages();
} catch (e) {
  console.log("sharp not found, please check.");
  console.error(e);
}
