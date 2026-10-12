import { readdirSync, readFileSync, statSync } from 'node:fs';
import { createHash } from 'node:crypto';
import assert from 'node:assert/strict';
const base = process.argv[2] || 'http://127.0.0.1:5173';
const files = [];
function walk(dir) { for (const name of readdirSync(dir)) { const p = `${dir}/${name}`; if (statSync(p).isDirectory()) walk(p); else files.push(p); } }
walk('public');
let index = 0, count = 0;
await Promise.all(Array.from({ length: 4 }, async () => {
  while (index < files.length) {
    const file = files[index++];
    const result = await fetch(`${base}/${file.slice(7).split('/').map(encodeURIComponent).join('/')}`, { method: 'HEAD' });
    assert.equal(result.status, 200, file);
    assert.notEqual(result.headers.get('content-type')?.split(';')[0], 'text/html', `${file}: SPA fallback is not an asset`);
    count++;
  }
}));
const html = await (await fetch(base)).text();
assert.match(html, /MLN122/);
assert.doesNotMatch(html, /MLN111|Triết học/);
console.log(`HTTP verified: ${count} public assets and MLN122 HTML at ${base}`);
if (process.argv.includes('--production')) {
  const artifacts = readdirSync('dist/assets').map(name => `dist/assets/${name}`);
  for (const file of artifacts) {
    const result = await fetch(`${base}/${file.slice(5)}`);
    assert.equal(result.status, 200, file);
    const bytes = Buffer.from(await result.arrayBuffer());
    const hash = data => createHash('sha256').update(data).digest('hex');
    assert.equal(hash(bytes), hash(readFileSync(file)), `${file}: preview must serve the current build`);
  }
  for (const route of ['/book', '/ai']) assert.match(await (await fetch(`${base}${route}`)).text(), /MLN122/);
  assert.ok(!files.some(file => /\.glb$|\.ttf$/i.test(file)), 'Legacy GLB and TTF assets stay outside public');
  console.log(`Production verified: ${artifacts.length} exact build artifacts, /book and /ai SPA routes; no published GLB/TTF assets.`);
}
