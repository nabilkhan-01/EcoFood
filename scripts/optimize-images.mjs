import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const projectRoot = process.cwd();
const publicDir = path.join(projectRoot, 'public');

const optimizeHeader = async () => {
  const inputPath = path.join(publicDir, 'header_img.png');
  const webpPath = path.join(publicDir, 'header_img.webp');
  const avifPath = path.join(publicDir, 'header_img.avif');

  await fs.access(inputPath);

  const image = sharp(inputPath, { limitInputPixels: false });

  await image
    .clone()
    .webp({ quality: 72, effort: 4 })
    .toFile(webpPath);

  await image
    .clone()
    .avif({ quality: 55, effort: 4 })
    .toFile(avifPath);

  return { inputPath, webpPath, avifPath };
};

try {
  const { inputPath, webpPath, avifPath } = await optimizeHeader();
  console.log('Optimized header image:');
  console.log('-', inputPath);
  console.log('-', webpPath);
  console.log('-', avifPath);
} catch (err) {
  console.error('Image optimization failed:', err?.message || err);
  process.exitCode = 1;
}
