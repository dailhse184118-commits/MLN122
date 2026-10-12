import { useEffect, useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useAtom } from 'jotai';
import { pageAtom, viewModeAtom } from './UI';
import { getBookFraming } from './framing';
import { getIllustrationTheme } from './illustrationThemes';
import { EconomicIllustration } from './EconomicIllustrations';

export const ModelShowcase = () => {
  const [page] = useAtom(pageAtom);
  const [mode] = useAtom(viewModeAtom);
  const { size } = useThree();
  const root = useRef();
  const progress = useRef(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const theme = getIllustrationTheme(page);
  const layout = getBookFraming(size.width, size.height, mode, page).illustration;
  useEffect(() => {
    const media = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    if (!media) return;
    const update = () => setReducedMotion(media.matches);
    update(); media.addEventListener?.('change', update);
    return () => media.removeEventListener?.('change', update);
  }, []);
  useEffect(() => { progress.current = reducedMotion ? 1 : 0; }, [page, reducedMotion]);
  useFrame(({ clock }, delta) => {
    if (!root.current || !layout) return;
    progress.current += (1 - progress.current) * Math.min(1, delta * 5);
    root.current.scale.setScalar(layout.scale * progress.current);
    root.current.position.y = layout.position[1] + (reducedMotion ? 0 : Math.sin(clock.elapsedTime * .7) * .02);
  });
  if (!theme || !layout) return null;
  return <group key={theme.id} ref={root} name={`contextual-${theme.id}`} position={layout.position} rotation={[.06, -.14, 0]} scale={0}>
    <EconomicIllustration theme={theme.id} reducedMotion={reducedMotion} />
  </group>;
};
