import { useRef, useEffect, Suspense } from "react";
import { Float, OrbitControls, ContactShadows } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useAtom } from "jotai";
import { Vector3 } from "three";
import { Book } from "./Book";
import { ModelShowcase } from "./ModelShowcase";
import { PageParticles } from "./PageParticles";
import { pageAtom, viewModeAtom } from "./UI";
import { getBookFraming } from "./framing";

/* ── Camera target positions ── */
const CameraAnimator = ({ controls }) => {
  const { camera, size } = useThree();
  const [viewMode] = useAtom(viewModeAtom);
  const [page] = useAtom(pageAtom);
  const animating = useRef(false);
  const target = useRef(new Vector3());
  const lookAt = useRef(new Vector3());

  useEffect(() => {
    const framing = getBookFraming(size.width, size.height, viewMode, page);
    target.current.set(...framing.position);
    lookAt.current.set(...framing.target);
    camera.fov = framing.fov;
    camera.updateProjectionMatrix();
    animating.current = true;
  }, [viewMode, page, size.width, size.height, camera]);

  useFrame((_, delta) => {
    if (!animating.current) return;
    camera.position.lerp(target.current, Math.min(1, delta * 4));
    controls.current?.target.lerp(lookAt.current, Math.min(1, delta * 4));
    controls.current?.update();
    if (camera.position.distanceTo(target.current) < 0.01) {
      animating.current = false;
    }
  });

  return null;
};

export const Experience = () => {
  const [viewMode] = useAtom(viewModeAtom);
  const reading = viewMode === 'reading';
  const controls = useRef();
  return (
    <>
      <CameraAnimator controls={controls} />

      {/* Book */}
      <Float
        rotation-x={reading ? -.08 : -.3}
        floatIntensity={reading ? 0 : .6}
        speed={1}
        rotationIntensity={reading ? 0 : .08}
      >
        <Book />
        {!reading && <PageParticles />}
      </Float>

      {/* Optional decoration loads independently from book textures. */}
      <Suspense fallback={null}><ModelShowcase /></Suspense>

      {/* OrbitControls — xoay, zoom, kéo tự do */}
      <OrbitControls
        ref={controls}
        makeDefault
        minDistance={2.2}
        maxDistance={14}
        enablePan={false}
        maxPolarAngle={Math.PI * .8}
      />

      {/* Ambient environment — nhẹ hơn studio */}
      <ambientLight intensity={1.1} color="#fffaf3" />

      {/* Key Light — không castShadow (shadows đã tắt ở Canvas) */}
      <directionalLight
        position={[2, 5, 2]}
        intensity={2}
      />

      {/* Fill Light */}
      <directionalLight
        position={[-3, 2, -1]}
        intensity={0.5}
        color="#ffeedd"
      />

      {/* ContactShadows — bóng mềm baked (không cần shadow map) */}
      <ContactShadows
        position={[0, -1.48, 0]}
        opacity={0.2}
        scale={10}
        blur={2.5}
        far={4}
        color="#1a1008"
        frames={1}
      />
    </>
  );
};
