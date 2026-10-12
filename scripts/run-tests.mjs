import { build } from 'esbuild';
import { mkdirSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
mkdirSync('.qa-test-cache', { recursive: true });
await build({ entryPoints: ['tests/interactions.test.jsx'], bundle: true, jsx: 'automatic', platform: 'node', format: 'esm', packages: 'external', outfile: '.qa-test-cache/interactions.test.mjs' });
const run = spawnSync(process.execPath, ['--test', '.qa-test-cache/interactions.test.mjs'], { stdio: 'inherit' });
process.exitCode = run.status ?? 1;
