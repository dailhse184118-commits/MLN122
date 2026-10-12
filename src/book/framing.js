// Fit the original book plus a side ornament into the available Canvas area.
export function getBookFraming(width, height, mode = 'reading', page = 1) {
  const aspect = width / Math.max(1, height);
  const fov = 38;
  const reading = mode === 'reading';
  const spanX = reading ? (page === 0 || page === 6 ? 1.8 : 2.8) : 4.5;
  const spanY = reading ? 2.2 : 3.0;
  const halfFov = (fov * Math.PI / 180) / 2;
  const distance = Math.max(spanY / (2 * Math.tan(halfFov)), spanX / (2 * aspect * Math.tan(halfFov)));
  const centerX = page === 0 ? .64 : page === 6 ? -.64 : 0;
  return { fov, distance, position: [centerX + (reading ? 0 : .15), reading ? .35 : .6, distance], target: [centerX, 0, 0] };
}
