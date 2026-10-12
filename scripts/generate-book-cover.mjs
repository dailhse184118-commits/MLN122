// Generate a text texture from layout instructions, not from a modified bitmap.
import { createCanvas, registerFont } from 'canvas';
import { writeFileSync, existsSync } from 'node:fs';
if (existsSync('C:/Windows/Fonts/timesbd.ttf')) registerFont('C:/Windows/Fonts/timesbd.ttf', { family: 'BookSerif', weight: 'bold' });
if (existsSync('C:/Windows/Fonts/arial.ttf')) registerFont('C:/Windows/Fonts/arial.ttf', { family: 'BookSans' });
const c = createCanvas(1536, 2048), ctx = c.getContext('2d');
ctx.fillStyle = '#f3e5cb'; ctx.fillRect(0, 0, c.width, c.height);
ctx.fillStyle = '#79272c'; ctx.fillRect(0, 0, c.width, 30); ctx.fillRect(0, 1570, c.width, 478);
ctx.strokeStyle = '#b38c5c'; ctx.lineWidth = 4; ctx.strokeRect(58, 64, 1420, 1920);
ctx.lineWidth = 1.5; ctx.strokeRect(72, 78, 1392, 1892);
function text(value, y, size, color = '#79272c', serif = true) {
  ctx.font = `${serif ? 'bold' : ''} ${size}px ${serif ? 'BookSerif' : 'BookSans'}`;
  ctx.fillStyle = color; ctx.textAlign = 'center'; ctx.fillText(value, 768, y);
}
text('MLN201 • KINH TẾ CHÍNH TRỊ', 220, 28, '#6b5549', false);
text('KINH TẾ CHÍNH TRỊ', 470, 68); text('MÁC – LÊNIN', 575, 88);
ctx.strokeStyle = '#b38c5c'; ctx.lineWidth = 3; ctx.beginPath();ctx.moveTo(230, 660);ctx.lineTo(1306, 660);ctx.stroke();
text('LỢI ÍCH KINH TẾ', 830, 64, '#40302a'); text('& QUAN HỆ LỢI ÍCH', 935, 62, '#40302a'); text('KINH TẾ Ở VIỆT NAM', 1040, 62, '#40302a');
text('Trong nền kinh tế thị trường', 1170, 34, '#6b5549', false);
text('định hướng xã hội chủ nghĩa', 1230, 34, '#6b5549', false);
// Same four-actor visual language as the supplied cover.
const points = [[768, 1360, 'NN'], [568, 1430, 'XH'], [968, 1430, 'DN'], [768, 1500, 'CN']];
ctx.strokeStyle = '#79272c'; ctx.lineWidth = 3;
for (const [x, y, label] of points) {
  ctx.beginPath();ctx.moveTo(768, 1430);ctx.lineTo(x, y);ctx.stroke();
  ctx.fillStyle = '#79272c';ctx.beginPath();ctx.arc(x, y, 30, 0, Math.PI*2);ctx.fill();
  ctx.fillStyle = '#fff5df';ctx.font = '22px BookSans';ctx.fillText(label,x,y+8);
}
ctx.fillStyle = '#f3e5cb';ctx.beginPath();ctx.arc(768,1430,46,0,Math.PI*2);ctx.fill();ctx.stroke();
text('LỢI ÍCH',1440,18);
text('CHƯƠNG 5 • MỤC 5.3.1',1700,42,'#fff5df',false);
text('MLN201 | SLOT 8',1780,30,'#fff5df',false);
text('TỪ ĐỘNG LỰC CÁ NHÂN',1870,30,'#fff5df');
text('ĐẾN PHÁT TRIỂN XÃ HỘI',1920,30,'#fff5df');
writeFileSync('public/textures/Coverpage_open.png', c.toBuffer('image/png'));
console.log('Generated cover 1536 × 2048');
