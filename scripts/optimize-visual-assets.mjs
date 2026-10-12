// Format/size optimization only; generated originals remain unchanged.
import { createCanvas, loadImage } from 'canvas';
import { mkdirSync, readFileSync, writeFileSync, statSync } from 'node:fs';
const generated = 'C:/Users/Admin/.codex/generated_images/01a12eb9-652b-7131-a9d5-b3cd1644feba';
const assets = [
  ['hero-hcmc-daylight', 'assets/images/hero-hcmc-daylight-source.png'],
  ['game-1-driver', 'exec-ab406a03-394a-4ff8-b718-f7889b3a7ef8.png'],
  ['game-2-platform-office', 'exec-79bdd305-f95f-43b8-866b-6a9bdf57cdb5.png'],
  ['game-3-customer', 'exec-e21e5eca-87a4-4f31-b050-0170cf252a2f.png'],
  ['game-4-student-startup', 'exec-a78c08ef-d7ce-4592-acae-6c533f0a16bf.png'],
];
mkdirSync('public/images/mln122', { recursive: true });
const records = [];
for (const [name, file] of assets) {
  const original = file.startsWith('assets/') ? file : `${generated}/${file}`;
  const img = await loadImage(original);
  // Center-crop the sub-pixel ratio difference to an exact 16:9 frame.
  const cropHeight = Math.min(img.height, img.width * 9 / 16);
  const cropWidth = cropHeight * 16 / 9;
  const sx = (img.width - cropWidth) / 2, sy = (img.height - cropHeight) / 2;
  const canvas = createCanvas(1600, 900), ctx = canvas.getContext('2d');
  ctx.drawImage(img, sx, sy, cropWidth, cropHeight, 0, 0, 1600, 900);
  const output = `public/images/mln122/${name}.jpg`;
  writeFileSync(output, canvas.toBuffer('image/jpeg', { quality: .86, progressive: true, chromaSubsampling: true }));
  const decoded = await loadImage(output);
  if (decoded.width !== 1600 || decoded.height !== 900) throw new Error(`Invalid asset dimensions: ${name}`);
  records.push({ name, original, sourceBytes: statSync(original).size, path: output, width: 1600, height: 900, bytes: statSync(output).size });
}
writeFileSync('qa/visual-assets-manifest.json', JSON.stringify(records, null, 2));
console.log(JSON.stringify(records.map(({ name, width, height, bytes, sourceBytes }) => ({ name, width, height, bytes, reductionPercent: Math.round((1 - bytes / sourceBytes) * 100) })), null, 2));
