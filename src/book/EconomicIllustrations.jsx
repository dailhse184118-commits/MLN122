import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Quaternion, Vector3 } from 'three';

const colors = { gold: '#b58c48', wine: '#79272c', paper: '#eee1c8', ink: '#312824', edge: '#655349' };
const Material = ({ color = colors.wine }) => <meshStandardMaterial color={color} roughness={.76} metalness={color === colors.gold ? .28 : 0} />;

function Rod({ from, to, radius = .018, color = colors.gold }) {
  const transform = useMemo(() => {
    const a = new Vector3(...from), b = new Vector3(...to);
    const direction = b.clone().sub(a);
    return { position: a.clone().add(b).multiplyScalar(.5), length: direction.length(), rotation: new Quaternion().setFromUnitVectors(new Vector3(0, 1, 0), direction.normalize()) };
  }, [from.join(','), to.join(',')]);
  return <mesh position={transform.position} quaternion={transform.rotation}><cylinderGeometry args={[radius, radius, transform.length, 10]} /><Material color={color} /></mesh>;
}

function Coin({ position = [0, 0, 0], radius = .15 }) {
  return <group position={position}>
    <mesh><cylinderGeometry args={[radius, radius, .055, 24]} /><Material color={colors.gold} /></mesh>
    <mesh position-y={.032} rotation-x={Math.PI / 2}><torusGeometry args={[radius * .73, .012, 6, 24]} /><Material color={colors.paper} /></mesh>
  </group>;
}

function Person({ position, color = colors.wine, scale = 1 }) {
  return <group position={position} scale={scale}>
    <mesh position-y={.19}><sphereGeometry args={[.075, 16, 12]} /><Material color={colors.paper} /></mesh>
    <mesh position-y={.045}><cylinderGeometry args={[.07, .11, .19, 16]} /><Material color={color} /></mesh>
  </group>;
}

function Income() {
  return <group name="illustration-income">
    {[[-.35, 3], [-.02, 5]].map(([x, count]) => <group key={x}>{Array.from({ length: count }, (_, i) => <Coin key={i} position={[x, -.25 + i * .055, .18]} />)}</group>)}
    {[.2, .38, .58].map((height, i) => <mesh key={height} position={[-.18 + i * .26, -.28 + height / 2, -.12]}><boxGeometry args={[.15, height, .14]} /><Material color={i === 2 ? colors.wine : colors.edge} /></mesh>)}
    <Rod from={[-.38, .12, -.05]} to={[.48, .65, -.05]} radius={.025} />
    <mesh position={[.49, .64, -.05]} rotation-z={-.6}><coneGeometry args={[.065, .16, 12]} /><Material color={colors.gold} /></mesh>
  </group>;
}

function Stakeholders() {
  const positions = [[-.48, -.22, .22], [.48, -.22, .22], [0, .3, -.15], [0, -.22, -.4]];
  return <group name="illustration-stakeholders">
    {positions.map((p, i) => <group key={i}><Rod from={[0, .1, 0]} to={[p[0], p[1] + .08, p[2]]} radius={.025} color={colors.gold} /><Person position={p} color={i % 2 ? colors.edge : colors.wine} /></group>)}
    <mesh position={[0, .1, 0]}><sphereGeometry args={[.1, 20, 16]} /><Material color={colors.gold} /></mesh>
  </group>;
}

function Balance({ reducedMotion }) {
  const beam = useRef();
  useFrame(({ clock }) => { if (beam.current) beam.current.rotation.z = reducedMotion ? 0 : Math.sin(clock.elapsedTime * .65) * .065; });
  return <group name="illustration-balance">
    <mesh position={[0, -.2, 0]}><boxGeometry args={[.52, .1, .28]} /><Material color={colors.wine} /></mesh>
    <Rod from={[0, -.15, 0]} to={[0, .58, 0]} radius={.035} />
    <mesh position-y={.58}><sphereGeometry args={[.07, 16, 12]} /><Material color={colors.gold} /></mesh>
    <group ref={beam} position-y={.52}>
      <Rod from={[-.53, 0, 0]} to={[.53, 0, 0]} radius={.026} />
      {[-.43, .43].map(x => <group key={x} position-x={x}>
        <Rod from={[0, 0, 0]} to={[-.14, -.32, 0]} radius={.012} /><Rod from={[0, 0, 0]} to={[.14, -.32, 0]} radius={.012} />
        <mesh position-y={-.34}><cylinderGeometry args={[.2, .12, .055, 20]} /><Material color={colors.paper} /></mesh>
        <Coin position={[0, -.28, 0]} radius={.12} />
      </group>)}
    </group>
  </group>;
}

function Platform() {
  return <group name="illustration-platform">
    <group position={[-.2, -.1, .14]}>
      {[-.32, .28].map(x => <group key={x} position={[x, -.15, 0]}><mesh><torusGeometry args={[.14, .034, 8, 24]} /><Material color={colors.ink} /></mesh><mesh rotation-x={Math.PI / 2}><cylinderGeometry args={[.045, .045, .06, 12]} /><Material color={colors.gold} /></mesh></group>)}
      <Rod from={[-.32, -.15, 0]} to={[-.1, .14, 0]} radius={.04} color={colors.edge} />
      <Rod from={[-.1, .14, 0]} to={[.28, -.15, 0]} radius={.04} color={colors.wine} />
      <mesh position={[-.08, .14, 0]}><boxGeometry args={[.34, .085, .13]} /><Material color={colors.wine} /></mesh>
      <Rod from={[.28, -.15, 0]} to={[.18, .26, 0]} radius={.025} />
      <Rod from={[.18, .26, 0]} to={[.04, .27, 0]} radius={.018} />
    </group>
    <group position={[.43, .16, -.16]} rotation={[.08, -.16, 0]}>
      <mesh><boxGeometry args={[.28, .52, .045]} /><Material color={colors.ink} /></mesh>
      <mesh position-z={.026}><boxGeometry args={[.235, .43, .008]} /><Material color={colors.paper} /></mesh>
      <Rod from={[-.075, -.08, .034]} to={[.07, .11, .034]} radius={.018} color={colors.wine} />
      <mesh position={[.07, .11, .04]}><sphereGeometry args={[.026, 12, 8]} /><Material color={colors.gold} /></mesh>
    </group>
    <Rod from={[-.4, .47, -.14]} to={[.34, .47, -.14]} radius={.018} />
    {[-.4, -.1, .2].map((x, i) => <group key={x}><Rod from={[x, .47, -.14]} to={[x, .37 - i * .03, -.14]} radius={.012} /><Coin position={[x, .35 - i * .03, -.14]} radius={.07} /></group>)}
  </group>;
}

function Startup() {
  return <group name="illustration-startup">
    <mesh position={[0, -.16, .17]}><boxGeometry args={[.67, .045, .4]} /><Material color={colors.edge} /></mesh>
    <group position={[0, .06, -.04]} rotation-x={-.12}>
      <mesh><boxGeometry args={[.64, .42, .045]} /><Material color={colors.wine} /></mesh>
      <mesh position-z={.026}><boxGeometry args={[.55, .33, .01]} /><Material color={colors.paper} /></mesh>
      {[.08, .15, .23].map((h, i) => <mesh key={h} position={[-.15 + i * .14, -.11 + h / 2, .04]}><boxGeometry args={[.07, h, .01]} /><Material color={colors.gold} /></mesh>)}
    </group>
    <Person position={[-.48, -.2, .05]} scale={.85} /><Person position={[.48, -.2, .05]} color={colors.edge} scale={.85} />
    <Person position={[0, .33, -.27]} scale={.85} color={colors.gold} />
    <Rod from={[-.43, .05, .05]} to={[-.18, .04, 0]} radius={.016} /><Rod from={[.43, .05, .05]} to={[.18, .04, 0]} radius={.016} />
  </group>;
}

export function EconomicIllustration({ theme, reducedMotion }) {
  return <group>
    <mesh position-y={-.34}><cylinderGeometry args={[.7, .72, .05, 32]} /><Material color={colors.paper} /></mesh>
    {theme === 'income' && <Income />}
    {theme === 'stakeholders' && <Stakeholders />}
    {theme === 'balance' && <Balance reducedMotion={reducedMotion} />}
    {theme === 'platform' && <Platform />}
    {theme === 'startup' && <Startup />}
  </group>;
}
