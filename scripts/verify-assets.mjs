import { readdirSync, readFileSync, statSync } from 'node:fs';
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
