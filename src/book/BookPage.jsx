import { Loader } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useState } from "react";
import { Experience } from "./Experience";
import { UI } from "./UI";
import { IntroScreen } from "./IntroScreen";
import { getBookFraming } from "./framing";

export const BookPage = ({ skipIntro = false, onEntered }) => {
  const [isStarted, setIsStarted] = useState(skipIntro);

  return (
    <>
      {!isStarted && <IntroScreen onEnter={() => { setIsStarted(true); onEntered?.(); }} />}

      <div className="book-page-shell" style={{ opacity: isStarted ? 1 : 0, transition: 'opacity 1s ease', width: '100%', overflow: 'hidden', pointerEvents: isStarted ? 'auto' : 'none' }}>
        <UI />
        <Loader containerStyles={{ background: 'rgba(245,240,232,.75)', pointerEvents: 'none' }} dataStyles={{ color: '#79272c' }} dataInterpolation={percent => `Đang tải tài nguyên sách ${Math.round(percent)}%`} />
        <Canvas
          shadows={false}
          dpr={[1, 2]}
          camera={{
            position: getBookFraming(window.innerWidth, Math.max(200, window.innerHeight - 270)).position,
            fov: 38,
          }}
          gl={{
            antialias: true,
            powerPreference: "high-performance",
          }}
          performance={{ min: 0.5 }}
        >
          <group position-y={0}>
            <Suspense fallback={null}>
              <Experience />
            </Suspense>
          </group>
        </Canvas>
      </div>
    </>
  );
};
