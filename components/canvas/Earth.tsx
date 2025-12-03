import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Preload, Sphere } from '@react-three/drei';
import CanvasLoader from '../Loader/Loader';

function Earth() {
  return (
    <group>
      <Sphere args={[2.5, 64, 64]}>
        <meshStandardMaterial
          color="#2563eb"
          roughness={0.5}
          metalness={0.3}
          emissive="#1e40af"
          emissiveIntensity={0.2}
        />
      </Sphere>
      
      {/* Atmosphere glow effect */}
      <Sphere args={[2.7, 32, 32]}>
        <meshBasicMaterial
          color="#4f46e5"
          transparent
          opacity={0.1}
          side={2} // THREE.BackSide
        />
      </Sphere>
    </group>
  );
}

export default function EarthCanvas() {
  return (
    <Canvas
      shadows
      frameloop="demand"
      dpr={[1, 2]}
      gl={{ preserveDrawingBuffer: true }}
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
        position: [-4, 3, 6],
      }}
      className="w-full h-full"
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          autoRotate
          autoRotateSpeed={0.5}
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 3, 5]} intensity={2} />
        <pointLight position={[-5, -3, -5]} intensity={0.5} color="#915eff" />
        
        <Earth />

        <Preload all />
      </Suspense>
    </Canvas>
  );
}
