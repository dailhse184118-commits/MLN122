// Editable typography source for the existing cream and burgundy back cover.
import { createCanvas } from '@napi-rs/canvas';
import { registerBookFonts, writeBookTexture } from './book-fonts.mjs';
registerBookFonts();
const canvas = createCanvas(1536, 2048), ctx = canvas.getContext('2d');
ctx.fillStyle = '#f3e5cb'; ctx.fillRect(0, 0, 1536, 2048);
ctx.fillStyle = '#79272c'; ctx.fillRect(0, 0, 1536, 30); ctx.fillRect(0, 1570, 1536, 478);
ctx.strokeStyle = '#b38c5c'; ctx.lineWidth = 4; ctx.strokeRect(58, 64, 1420, 1920);
ctx.lineWidth = 1.5; ctx.strokeRect(72, 78, 1392, 1892);
function text(value, y, size, color = '#79272c', serif = true) {
  ctx.font = `${serif ? 'bold' : ''} ${size}px ${serif ? 'BookSerif' : 'BookSans'}`;
  ctx.fillStyle = color; ctx.textAlign = 'center';
  if (ctx.measureText(value).width > 1300) throw new Error(`Back cover text overflows: ${value}`);
  ctx.fillText(value, 768, y);
}
text('KINH TẾ CHÍNH TRỊ', 350, 88); text('MÁC – LÊNIN', 470, 100);
ctx.strokeStyle = '#b38c5c'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(170, 530); ctx.lineTo(1366, 530); ctx.stroke();
text('LỢI ÍCH CÁ NHÂN', 720, 110, '#30251f');
text('& LỢI ÍCH XÃ HỘI', 860, 104, '#30251f');
text('KHÔNG LOẠI TRỪ NHAU', 1040, 70);
text('Cần hài hòa để cùng phát triển', 1300, 58, '#51443b', false);
text('MLN122 · CHƯƠNG 5 · 5.3.1', 1680, 48, '#fff5df', false);
text('CẢM ƠN ĐÃ THEO DÕI', 1850, 70, '#fff5df');
await writeBookTexture('public/textures/Coverpage_close.png', canvas.toBuffer('image/png'));
console.log('Generated back cover with bundled Vietnamese fonts, 1536 × 2048.');
