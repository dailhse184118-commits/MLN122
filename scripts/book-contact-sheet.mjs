// QA contact sheets of the exact textures, not website screenshots.
import { createCanvas, loadImage } from '@napi-rs/canvas';
import { writeFileSync } from 'node:fs';
import { registerBookFonts } from './book-fonts.mjs';
registerBookFonts();
const faces = ['Coverpage_open', 'Open 1', 'Open 2', '46_Page_1', '46_Page_2', '47_Page_1', '47_Page_2', '48_Page_1', '48_Page_2', 'Close 1', 'Close 2', 'Coverpage_close'];
for (let sheet = 0; sheet < 3; sheet++) {
  const canvas = createCanvas(1320, 1840), ctx = canvas.getContext('2d');
  ctx.fillStyle = '#ede8e1'; ctx.fillRect(0, 0, 1320, 1840);
  for (let cell = 0; cell < 4; cell++) {
    const face = faces[sheet * 4 + cell], texture = await loadImage(`public/textures/${face}.png`);
    const x = cell % 2 * 660 + 10, y = Math.floor(cell / 2) * 920;
    ctx.fillStyle = '#79272c'; ctx.font = '22px BookSans'; ctx.fillText(face, x, y + 30);
    ctx.drawImage(texture, x, y + 48, 640, 640 * 4 / 3);
  }
  writeFileSync(`qa/book-projection-${sheet + 1}.png`, canvas.toBuffer('image/png'));
}
console.log('Created three QA contact sheets containing all twelve book faces.');
