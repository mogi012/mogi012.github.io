import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const ACCENT = "#b7ff5c";
const GRAY = "#3a3a40";

type FloaterSpec = {
  geometry: "icosahedron" | "torus" | "octahedron" | "box" | "torusKnot";
  position: [number, number, number];
  scale: number;
  color: string;
  speed: number;
  parallax: number;
};

const FLOATERS: FloaterSpec[] = [
  { geometry: "icosahedron", position: [4.5, 1.5, -4], scale: 1.4, color: ACCENT, speed: 0.25, parallax: 1.2 },
  { geometry: "torus", position: [-4.8, -1, -5], scale: 1.1, color: GRAY, speed: 0.18, parallax: 0.7 },
  { geometry: "octahedron", position: [-3.2, 2.4, -6], scale: 0.9, color: GRAY, speed: 0.32, parallax: 1.6 },
  { geometry: "box", position: [3.4, -2.6, -5.5], scale: 0.8, color: GRAY, speed: 0.22, parallax: 0.9 },
  { geometry: "torusKnot", position: [0.5, -3.4, -7], scale: 0.75, color: ACCENT, speed: 0.15, parallax: 1.4 },
  { geometry: "octahedron", position: [5.6, -0.8, -8], scale: 1.2, color: GRAY, speed: 0.2, parallax: 0.5 },
  { geometry: "icosahedron", position: [-5.8, 0.6, -9], scale: 1.6, color: GRAY, speed: 0.12, parallax: 0.8 },
];

function Floater({ spec, scroll, mouse }: {
  spec: FloaterSpec;
  scroll: React.RefObject<number>;
  mouse: React.RefObject<{ x: number; y: number }>;
}) {
  const ref = useRef<THREE.Mesh>(null);

  const geometry = useMemo(() => {
    switch (spec.geometry) {
      case "icosahedron":
        return new THREE.IcosahedronGeometry(1, 0);
      case "torus":
        return new THREE.TorusGeometry(1, 0.35, 8, 24);
      case "octahedron":
        return new THREE.OctahedronGeometry(1, 0);
      case "box":
        return new THREE.BoxGeometry(1.3, 1.3, 1.3);
      case "torusKnot":
        return new THREE.TorusKnotGeometry(0.8, 0.25, 64, 8);
    }
  }, [spec.geometry]);

  useFrame((state, delta) => {
    const mesh = ref.current;
    if (!mesh) return;

    mesh.rotation.x += delta * spec.speed;
    mesh.rotation.y += delta * spec.speed * 0.7;

    const t = state.clock.elapsedTime;
    const bobbing = Math.sin(t * spec.speed * 2 + spec.position[0]) * 0.3;

    // scroll parallax: shapes drift upward at different rates as the page scrolls
    const scrollOffset = (scroll.current ?? 0) * spec.parallax * 4;
    mesh.position.y = spec.position[1] + bobbing + scrollOffset;

    // subtle mouse parallax
    const m = mouse.current ?? { x: 0, y: 0 };
    mesh.position.x = THREE.MathUtils.lerp(
      mesh.position.x,
      spec.position[0] + m.x * spec.parallax * 0.4,
      0.05,
    );
    mesh.position.z = spec.position[2];
  });

  return (
    <mesh ref={ref} geometry={geometry} position={spec.position} scale={spec.scale}>
      <meshBasicMaterial
        color={spec.color}
        wireframe
        transparent
        opacity={spec.color === ACCENT ? 0.5 : 0.35}
      />
    </mesh>
  );
}

function Particles({ scroll }: { scroll: React.RefObject<number> }) {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const count = 350;
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 24;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 24;
      arr[i * 3 + 2] = -4 - Math.random() * 10;
    }
    return arr;
  }, []);

  useFrame((state) => {
    const points = ref.current;
    if (!points) return;
    points.rotation.y = state.clock.elapsedTime * 0.012;
    points.position.y = (scroll.current ?? 0) * 2.5;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#8a8a8e" size={0.02} transparent opacity={0.6} sizeAttenuation />
    </points>
  );
}

function Rig({ mouse }: { mouse: React.RefObject<{ x: number; y: number }> }) {
  useFrame((state) => {
    const m = mouse.current ?? { x: 0, y: 0 };
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, m.x * 0.5, 0.04);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, -m.y * 0.3, 0.04);
    state.camera.lookAt(0, 0, -6);
  });
  return null;
}

export default function Background3D() {
  const scroll = useRef(0);
  const mouse = useRef({ x: 0, y: 0 });

  return (
    <div
      style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}
      aria-hidden
    >
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 2], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);

          const onScroll = () => {
            const max = document.documentElement.scrollHeight - window.innerHeight;
            scroll.current = max > 0 ? window.scrollY / max : 0;
          };
          const onMove = (e: PointerEvent) => {
            mouse.current = {
              x: (e.clientX / window.innerWidth) * 2 - 1,
              y: (e.clientY / window.innerHeight) * 2 - 1,
            };
          };
          window.addEventListener("scroll", onScroll, { passive: true });
          window.addEventListener("pointermove", onMove, { passive: true });
          onScroll();
        }}
      >
        <Rig mouse={mouse} />
        {FLOATERS.map((spec, i) => (
          <Floater key={i} spec={spec} scroll={scroll} mouse={mouse} />
        ))}
        <Particles scroll={scroll} />
      </Canvas>
    </div>
  );
}
