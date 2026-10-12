// Deterministic typography repair for the existing book texture.
// The model, background, borders and all other wording are preserved.
import { createCanvas, loadImage, registerFont } from 'canvas';
import { readFileSync, writeFileSync } from 'node:fs';
import assert from 'node:assert/strict';

registerFont('C:/Windows/Fonts/arialbd.ttf', { family: 'BackCoverSans', weight: 'bold' });
const file = 'public/textures/Coverpage_close.png';
const source = await loadImage(readFileSync(file));
const canvas = createCanvas(source.width, source.height);
const ctx = canvas.getContext('2d');
ctx.drawImage(source, 0, 0);
const original = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
const region = { x: 430, y: 1628, width: 680, height: 47 };
// Copy each row's original burgundy background, including its faint rules.
for (let y = region.y; y < region.y + region.height; y++) {
  const i = (y * canvas.width + 110) * 4;
  ctx.fillStyle = `rgb(${original[i]},${original[i + 1]},${original[i + 2]})`;
  ctx.fillRect(region.x, y, region.width, 1);
}
ctx.font = 'bold 44px BackCoverSans';
ctx.fillStyle = '#fff5df';
ctx.textBaseline = 'alphabetic';
const label = 'MLN122 · CHƯƠNG 5 · 5.3.1';
const tracking = 3;
const totalWidth = [...label].reduce((sum, ch) => sum + ctx.measureText(ch).width, 0) + (label.length - 1) * tracking;
let x = (canvas.width - totalWidth) / 2;
for (const ch of label) {
  ctx.fillText(ch, x, 1668);
  x += ctx.measureText(ch).width + tracking;
}
const updated = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
let changedPixels = 0;
for (let y = 0; y < canvas.height; y++) for (let x = 0; x < canvas.width; x++) {
  const i = (y * canvas.width + x) * 4;
  const changed = original[i] !== updated[i] || original[i + 1] !== updated[i + 1] || original[i + 2] !== updated[i + 2] || original[i + 3] !== updated[i + 3];
  if (!changed) continue;
  changedPixels++;
  assert.ok(x >= region.x && x < region.x + region.width && y >= region.y && y < region.y + region.height, 'Back-cover pixels outside course-label area must remain unchanged');
}
writeFileSync(file, canvas.toBuffer('image/png'));
writeFileSync('qa/back-cover-course-label.json', JSON.stringify({ courseCode: 'MLN122', width: canvas.width, height: canvas.height, region, changedPixels, allPixelsOutsideLabelUnchanged: true }, null, 2));
console.log(`Back cover relabelled MLN122; ${changedPixels} changed pixels limited to course-code line.`);
