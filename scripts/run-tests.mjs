import { build } from 'esbuild';
import { mkdirSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
mkdirSync('.qa-test-cache', { recursive: true });
await build({ entryPoints: ['tests/interactions.test.jsx', 'tests/book-scene.test.jsx'], bundle: true, jsx: 'automatic', platform: 'node', format: 'esm', packages: 'external', outdir: '.qa-test-cache', outExtension: { '.js': '.mjs' }, plugins: [{ name: 'numeric-scene-tests', setup(builder) {
  builder.onResolve({ filter: /^@react-three\/fiber$/ }, () => ({ path: fileURLToPath(new URL('../tests/fiber-stub.mjs', import.meta.url)) }));
  builder.onResolve({ filter: /^@react-three\/drei$/ }, () => ({ path: fileURLToPath(new URL('../tests/drei-stub.mjs', import.meta.url)) }));
} }] });
const run = spawnSync(process.execPath, ['--test', '.qa-test-cache/interactions.test.mjs', '.qa-test-cache/book-scene.test.mjs'], { stdio: 'inherit' });
process.exitCode = run.status ?? 1;
