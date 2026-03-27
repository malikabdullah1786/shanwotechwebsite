'use client';

import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Float, Stars, MeshDistortMaterial, Text } from '@react-three/drei';
import * as THREE from 'three';

const AntiqueCompass = () => {
  return (
    <group rotation={[0.4, 0.2, 0]}>
      {/* Outer Case */}
      <mesh>
        <cylinderGeometry args={[2, 2.1, 0.4, 64]} />
        <meshStandardMaterial color="#C5A059" metalness={0.9} roughness={0.1} />
      </mesh>
      
      {/* Compass Face */}
      <mesh position={[0, 0.21, 0]}>
        <cylinderGeometry args={[1.8, 1.8, 0.05, 64]} />
        <meshStandardMaterial color="#fdf5e6" roughness={0.5} />
      </mesh>
      
      {/* Brass Rim */}
      <mesh position={[0, 0.25, 0]}>
        <torusGeometry args={[1.9, 0.05, 16, 100]} rotation={[Math.PI / 2, 0, 0]} />
        <meshStandardMaterial color="#C5A059" metalness={1} roughness={0.1} />
      </mesh>

      {/* Needle Pivot */}
      <mesh position={[0, 0.3, 0]}>
        <sphereGeometry args={[0.1, 32, 32]} />
        <meshStandardMaterial color="#C5A059" metalness={1} />
      </mesh>

      {/* Needle - North (Red/Gold) */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <group>
          <mesh position={[0, 0.3, -0.7]} rotation={[Math.PI / 2, 0, 0]}>
            <coneGeometry args={[0.15, 1.4, 4]} />
            <meshStandardMaterial color="#8b0000" metalness={0.5} />
          </mesh>
          {/* Needle - South (Brass) */}
          <mesh position={[0, 0.3, 0.7]} rotation={[-Math.PI / 2, 0, 0]}>
            <coneGeometry args={[0.15, 1.4, 4]} />
            <meshStandardMaterial color="#C5A059" metalness={0.8} />
          </mesh>
        </group>
      </Float>

      {/* Glass Cover */}
      <mesh position={[0, 0.35, 0]}>
        <cylinderGeometry args={[1.85, 1.85, 0.02, 64]} />
        <meshPhysicalMaterial 
          transparent 
          opacity={0.3} 
          roughness={0} 
          transmission={1} 
          thickness={0.5}
        />
      </mesh>
    </group>
  );
};

const Hero3D = () => {
  return (
    <div style={{ width: '100%', height: '500px', cursor: 'grab' }}>
      <Canvas shadows={{ type: THREE.PCFShadowMap }}>
        <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={50} />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        
        <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
          <AntiqueCompass />
        </Float>
        
        <OrbitControls enableZoom={false} makeDefault />
      </Canvas>
    </div>
  );
};

export default Hero3D;
