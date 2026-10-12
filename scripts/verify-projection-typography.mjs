// Skia text metrics / static CSS audit, not a browser screenshot or DOM layout test.
import assert from 'node:assert/strict';
import { createCanvas, GlobalFonts } from '@napi-rs/canvas';
import { readFileSync, writeFileSync } from 'node:fs';
import { registerBookFonts } from './book-fonts.mjs';
import { build } from 'esbuild';
registerBookFonts();
await build({ entryPoints: ['src/content/mln122.js'], bundle: true, platform: 'node', format: 'esm', outfile: '.qa-test-cache/content.mjs' });
const { scenarios } = await import('../.qa-test-cache/content.mjs');
const canvas = createCanvas(1366, 1050), ctx = canvas.getContext('2d');
ctx.fillStyle = '#f3e5cb'; ctx.fillRect(0, 0, canvas.width, canvas.height);
const sample = 'ă â ê ô ơ ư đ Ă Â Ê Ô Ơ Ư Đ · ắ ằ ẳ ẵ ặ ấ ầ ẩ ẫ ậ ế ề ể ễ ệ ố ồ ổ ỗ ộ ớ ờ ở ỡ ợ ứ ừ ử ữ ự · THỐNG NHẤT & MÂU THUẪN';
const lineWrap = (text, width) => {
  const lines = []; let line = '';
  for (const word of text.split(' ')) { const next = line ? `${line} ${word}` : word; if (line && ctx.measureText(next).width > width) { lines.push(line); line = word; } else line = next; }
  if (line) lines.push(line); return lines;
};
const fontChecks = [];
let y = 55;
for (const [family, weight] of [['BookSans', 'normal'], ['BookSerif', 'bold']]) {
  assert.ok(GlobalFonts.has(family));
  for (const normalization of ['NFC', 'NFD']) {
    ctx.font = '24px BookSans'; ctx.fillStyle = '#79272c'; ctx.fillText(`${family} · ${normalization} · 40px`, 44, y); y += 60;
    ctx.font = `${weight} 40px ${family}`; ctx.fillStyle = '#251d18';
    const text = sample.normalize(normalization);
    const metrics = ctx.measureText(text);
    for (const line of lineWrap(text, 1278)) { const m = ctx.measureText(line); assert.ok(m.actualBoundingBoxAscent + m.actualBoundingBoxDescent < 64, 'Vietnamese marks fit the selected line height'); ctx.fillText(line, 44, y); y += 64; }
    fontChecks.push({ family, normalization, width: metrics.width, ascent: metrics.actualBoundingBoxAscent, descent: metrics.actualBoundingBoxDescent }); y += 30;
  }
}
for (const family of ['BookSans', 'BookSerif']) {
  const [nfc, nfd] = fontChecks.filter(c => c.family === family);
  assert.ok(Math.abs(nfc.width - nfd.width) < .1, `${family}: NFC / NFD glyph advances agree`);
}
writeFileSync('qa/vietnamese-font-specimen.png', canvas.toBuffer('image/png'));
const game = [];
for (const width of [1366, 1920, 2560, 820, 390]) {
  const questionSize = width <= 650 ? 24 : width <= 900 ? 25.5 : Math.max(27.5, Math.min(35.5, width * .0136 + 9.55));
  const answerSize = width <= 650 ? 18 : width <= 900 ? 19 : Math.max(20.5, Math.min(23.5, width * .0067 + 11.2));
  const outer = width <= 650 ? 32 : 56, gap = width >= 1800 ? 26 : width <= 900 ? 10 : 18;
  const side = width >= 1800 ? 180 : width <= 900 ? 70 : 90;
  const center = width <= 650 ? width - outer : Math.min(width - outer - side * 2 - gap * 2, width >= 1800 ? 1120 : 960);
  for (const scene of scenarios) {
    ctx.font = `${questionSize}px BookSans`;
    const questionLines = lineWrap(scene.dialogue, center - (width <= 650 ? 32 : 52)).length;
    ctx.font = `${answerSize}px BookSans`;
    const answerLines = scene.choices.map(choice => lineWrap(choice.text, center - (width <= 650 ? 32 : 52) - 50 - 36 - 12).length);
    game.push({ viewportWidth: width, scene: scene.id, questionSize, answerSize, centerWidth: center, questionLines, answerLines, estimatedContentHeight: Math.ceil(100 + 36 + 24 + 52 + 30 + 20 + questionLines * questionSize * 1.5 + answerLines.reduce((sum, lines) => sum + lines * answerSize * 1.55 + 32, 0) + (width <= 650 ? 180 : 0)), kind: 'text metrics estimate; CSS flow allows scrolling' });
  }
}
const css = readFileSync('src/styles/projection.css', 'utf8');
assert.match(css, /font-synthesis: none/); assert.match(css, /scroll-margin-top: var\(--nav-clearance\)/);
assert.match(css, /writing-mode: horizontal-tb/); assert.doesNotMatch(readFileSync('public/fonts/fonts.css', 'utf8'), /googleapis|gstatic|\.ttf/);
writeFileSync('qa/projection-typography-metrics.json', JSON.stringify({ kind: 'Skia text metrics and CSS source checks, not browser rendering', fontChecks, game }, null, 2));
console.log(`Verified bundled NFC / NFD shaping and measured ${game.length} game/viewport combinations.`);
