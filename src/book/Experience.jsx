import { useRef, useEffect, Suspense } from "react";
import { Float, OrbitControls, ContactShadows } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useAtom } from "jotai";
import { Vector3 } from "three";
import { Book } from "./Book";
import { ModelShowcase } from "./ModelShowcase";
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
  const [page] = useAtom(pageAtom);
  const { size } = useThree();
  const framing = getBookFraming(size.width, size.height, viewMode, page);
  const reading = viewMode === 'reading';
  const controls = useRef();
  return (
    <>
      <CameraAnimator controls={controls} />

      {/* Book */}
      <Float
        rotation-x={reading ? -.035 : -.22}
        floatIntensity={reading ? 0 : .2}
        speed={1}
        rotationIntensity={reading ? 0 : .08}
      >
        <Book />
      </Float>

      {/* Optional decoration loads independently from book textures. */}
      <Suspense fallback={null}><ModelShowcase /></Suspense>

      {/* A gentle orbit keeps the page and its separate illustration in frame. */}
      <OrbitControls
        ref={controls}
        makeDefault
        minDistance={framing.distance}
        maxDistance={framing.distance * 1.6}
        enablePan={false}
        enableRotate={!reading}
        minAzimuthAngle={-.08}
        maxAzimuthAngle={.08}
        minPolarAngle={Math.PI / 2 - .18}
        maxPolarAngle={Math.PI / 2 + .10}
      />

      {/* Ambient environment — nhẹ hơn studio */}
      <ambientLight intensity={.95} color="#ffffff" />

      {/* Key Light — không castShadow (shadows đã tắt ở Canvas) */}
      <directionalLight
        position={[2, 5, 2]}
        intensity={1.1}
      />

      {/* Fill Light */}
      <directionalLight
        position={[-3, 2, -1]}
        intensity={0.4}
        color="#ffffff"
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
