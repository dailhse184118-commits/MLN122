// Reserve a separate world-space region for the illustration; never place it over pages.
export function getBookFraming(width, height, mode = 'reading', page = 1) {
  const aspect = width / Math.max(1, height);
  const fov = 38;
  const reading = mode === 'reading';
  const open = page >= 1 && page <= 5;
  const wide = aspect >= 1.8;
  const spanX = open ? (wide ? (reading ? 5.0 : 6.25) : (reading ? 2.9 : 3.1)) : 1.75;
  const spanY = open ? (wide ? (reading ? 2.15 : 2.45) : (reading ? 3.4 : 3.65)) : 1.95;
  const halfFov = (fov * Math.PI / 180) / 2;
  const distance = Math.max(spanY / (2 * Math.tan(halfFov)), spanX / (2 * aspect * Math.tan(halfFov)));
  const centerX = page === 0 ? .64 : page === 6 ? -.64 : wide ? (reading ? .9 : .95) : 0;
  const centerY = open && !wide ? .6 : 0;
  const illustration = !open ? null : wide
    ? { position: [reading ? 2.5 : 2.6, -.16, reading ? -.65 : -.4], scale: reading ? .85 : 1.0, placement: 'side' }
    : { position: [0, 1.62, -.2], scale: .58, placement: 'above' };
  return { fov, distance, spanX, spanY, position: [centerX, centerY + (reading ? .15 : .5), distance], target: [centerX, centerY, 0], illustration };
}
