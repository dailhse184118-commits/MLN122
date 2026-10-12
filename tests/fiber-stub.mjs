// React interaction / geometry tests only; this is not a WebGL renderer.
export const sceneTest = { width: 1366, height: 430, frames: [], reset() { this.frames = []; } };
export function useThree() { return { size: { width: sceneTest.width, height: sceneTest.height } }; }
export function useFrame(callback) { sceneTest.frames.push(callback); }
