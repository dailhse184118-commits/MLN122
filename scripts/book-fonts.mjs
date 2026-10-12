import { GlobalFonts } from '@napi-rs/canvas';
import { existsSync } from 'node:fs';
import { writeFile, rename, rm } from 'node:fs/promises';
import { setTimeout } from 'node:timers/promises';

export async function writeBookTexture(file, bytes) {
  // Atomic replacement keeps Vite readers from seeing a partially written PNG.
  const temporary = `${file}.write-tmp`;
  await writeFile(temporary, bytes);
  try {
    for (let attempt = 0; ; attempt++) {
      try { await rename(temporary, file); break; }
      catch (error) {
        if (attempt >= 5 || !['UNKNOWN', 'EBUSY', 'EPERM', 'EACCES'].includes(error.code)) throw error;
        await setTimeout(100 * (attempt + 1));
      }
    }
  } finally { await rm(temporary, { force: true }); }
}

export function registerBookFonts() {
  const fonts = [
    ['assets/fonts/NotoSerif-Bold.ttf', { family: 'BookSerif', weight: 'bold' }],
    ['assets/fonts/BeVietnamPro-Regular.ttf', { family: 'BookSans', weight: 'normal' }],
    ['assets/fonts/BeVietnamPro-SemiBold.ttf', { family: 'BookSans', weight: '600' }],
  ];
  for (const [path, options] of fonts) {
    if (!existsSync(path)) throw new Error(`Missing bundled book font: ${path}`);
    if (!GlobalFonts.registerFromPath(path, options.family)) throw new Error(`Cannot register bundled book font: ${path}`);
  }
}
