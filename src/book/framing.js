// Start close enough to read; keep a wider overview available for a full-scene orbit.
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
  const centerX = page === 0 ? .64 : page === 6 ? -.64 : wide ? (reading ? .9 : .8) : 0;
  const centerY = open && !wide ? .6 : 0;
  const illustration = !open ? null : wide
    ? { position: [reading ? 2.5 : 2.6, -.16, reading ? -.65 : -.4], scale: reading ? .85 : 1.0, placement: 'side' }
    : { position: [0, 1.62, -.2], scale: .58, placement: 'above' };
  let overviewDistance = distance;
  if (!reading) {
    // Enclose book and illustration in a sphere around the orbit target. A sphere
    // stays within the perspective frustum from every azimuth, including the back.
    const bookRadius = Math.hypot((open ? 1.3 : .7) + (open ? Math.abs(centerX) : 0), 1 + Math.abs(centerY), .35);
    const modelRadius = illustration ? Math.hypot(illustration.position[0] - centerX, illustration.position[1] - centerY, illustration.position[2]) + 1.2 * illustration.scale : 0;
    const horizontalHalfFov = Math.atan(Math.tan(halfFov) * aspect);
    overviewDistance = Math.max(distance, Math.max(bookRadius, modelRadius) * 1.04 / Math.sin(Math.min(halfFov, horizontalHalfFov)));
  }
  return { fov, distance, overviewDistance, spanX, spanY, position: [centerX, centerY + (reading ? .15 : .5), distance], target: [centerX, centerY, 0], illustration };
}

export function getBookOrbitOptions(framing, mode = 'reading') {
  const reading = mode === 'reading';
  return {
    // Overview is a zoom-out option, not the closest allowed viewing distance.
    minDistance: reading ? framing.distance : Math.max(1.4, framing.distance * .7),
    maxDistance: reading ? framing.distance * 1.6 : Math.max(framing.distance * 1.6, framing.overviewDistance * 1.15),
    enablePan: false,
    enableRotate: !reading,
    minAzimuthAngle: -Infinity,
    maxAzimuthAngle: Infinity,
    minPolarAngle: .08,
    maxPolarAngle: Math.PI - .08,
  };
}
