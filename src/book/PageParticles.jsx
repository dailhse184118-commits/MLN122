import { useRef, useState, useEffect } from "react";
import { Sparkles } from "@react-three/drei";
import { useAtom } from "jotai";
import { pageAtom, viewModeAtom } from "./UI";

/**
 * PageParticles — burst of sparkles when page flips
 * Uses drei's Sparkles with conditional rendering
 */
export const PageParticles = () => {
  const [page] = useAtom(pageAtom);
  const [viewMode] = useAtom(viewModeAtom);
  const [showParticles, setShowParticles] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(() => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false);
  const prevPage = useRef(page);

  useEffect(() => {
    const media = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    if (!media) return;
    const update = () => setReducedMotion(media.matches);
    update(); media.addEventListener?.('change', update);
    return () => media.removeEventListener?.('change', update);
  }, []);

  useEffect(() => {
    if (prevPage.current !== page) {
      prevPage.current = page;
      setShowParticles(true);
      const timer = setTimeout(() => setShowParticles(false), 1800);
      return () => clearTimeout(timer);
    }
  }, [page]);

  if (reducedMotion || (!showParticles && viewMode !== 'showcase')) return null;

  return (
    <group position={[0, 0, 0.05]}>
      {viewMode === 'showcase' && <Sparkles count={24} scale={[3, 2.4, .8]} size={2.6} speed={.3} opacity={.3} color="#d4af68" />}
      {showParticles && <>
      {/* Main golden dust burst */}
      <Sparkles
        count={40}
        scale={[1.5, 2, 0.5]}
        size={3}
        speed={1.5}
        opacity={0.7}
        color="#d4ccc4"
      />
      {/* Accent red subtle sparkles */}
      <Sparkles
        count={12}
        scale={[1, 1.5, 0.3]}
        size={2}
        speed={2}
        opacity={0.4}
        color="#C5272D"
      />
      </>}
    </group>
  );
};
