'use client';

import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Float, Stars } from '@react-three/drei';
import * as THREE from 'three';

/* ─── Code lines for the screen texture ─────────────────────────────── */
const CODE_LINES = [
  { text: "const api = new ShanwoAPI();",           color: "#9CDCFE" },
  { text: "await api.deploy({ cloud: true });",      color: "#DCDCAA" },
  { text: "function buildApp(config) {",             color: "#C586C0" },
  { text: "  return optimize(config);",              color: "#D4D4D4" },
  { text: "}",                                       color: "#D4D4D4" },
  { text: "const res = await fetch('/v1/ai');",      color: "#9CDCFE" },
  { text: "console.log('✓ Pipeline ready');",        color: "#4EC9B0" },
  { text: "import { motion } from 'framer-motion';", color: "#569CD6" },
  { text: "export default async function() {",       color: "#C586C0" },
  { text: "  const data = await db.query();",        color: "#D4D4D4" },
  { text: "  return data.json();",                   color: "#CE9178" },
  { text: "} // Shanwo Tech",                        color: "#6A9955" },
  { text: "npm run build && npm start",              color: "#CE9178" },
  { text: "✓ All tests passed (42/42)",              color: "#4EC9B0" },
  { text: "git commit -m 'feat: v2 launch'",         color: "#CE9178" },
  { text: "docker build -t shanwo/app .",            color: "#CE9178" },
  { text: "kubectl apply -f deploy.yaml",            color: "#CE9178" },
  { text: "const [state, setState] = useState(null);",color: "#9CDCFE" },
  { text: "useEffect(() => { init(); }, []);",       color: "#DCDCAA" },
  { text: "// ✨ Built by Shanwo Tech",              color: "#6A9955" },
];

/* ─── Canvas texture for the laptop screen ──────────────────────────── */
const useScreenTexture = () => {
  const canvasRef = useRef(document.createElement('canvas'));
  const textureRef = useRef(null);
  const lineIndexRef = useRef(0);
  const visibleLinesRef = useRef([]);

  const W = 800, H = 500;

  const canvas = canvasRef.current;
  canvas.width  = W;
  canvas.height = H;

  const redraw = () => {
    const ctx = canvas.getContext('2d');

    // Background
    ctx.fillStyle = '#0d0d1a';
    ctx.fillRect(0, 0, W, H);

    // Title bar
    ctx.fillStyle = '#1e1e1e';
    ctx.fillRect(0, 0, W, 36);

    // Traffic lights
    [['#FF5F57', 18], ['#FFBD2E', 44], ['#28C840', 70]].forEach(([color, x]) => {
      ctx.beginPath();
      ctx.arc(x, 18, 8, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
    });

    // Tab label
    ctx.font = '13px monospace';
    ctx.fillStyle = '#D4D4D4';
    ctx.fillText('index.js  ✕', 100, 23);

    // Line numbers column bg
    ctx.fillStyle = '#111827';
    ctx.fillRect(0, 36, 44, H - 36);

    // Code lines
    const lines = visibleLinesRef.current.slice(-12);
    lines.forEach((line, i) => {
      const y = 62 + i * 36;

      // Line number
      ctx.font = '13px monospace';
      ctx.fillStyle = '#555';
      ctx.fillText(String(i + 1), 8, y);

      // Code text
      ctx.fillStyle = line.color;
      ctx.fillText(line.text, 54, y);
    });

    // Blinking cursor
    const cursorY = 62 + lines.length * 36;
    if (cursorY < H - 10) {
      ctx.fillStyle = '#6C63FF';
      ctx.fillRect(54, cursorY - 16, 9, 18);
    }

    // Bottom status bar
    ctx.fillStyle = '#6C63FF';
    ctx.fillRect(0, H - 26, W, 26);
    ctx.fillStyle = '#fff';
    ctx.font = '12px monospace';
    ctx.fillText('  ✓ Shanwo Tech — TypeScript  UTF-8  LF ', 0, H - 8);

    if (textureRef.current) textureRef.current.needsUpdate = true;
  };

  useEffect(() => {
    const texture = new THREE.CanvasTexture(canvas);
    textureRef.current = texture;

    const interval = setInterval(() => {
      const next = CODE_LINES[lineIndexRef.current % CODE_LINES.length];
      visibleLinesRef.current = [...visibleLinesRef.current, next].slice(-12);
      lineIndexRef.current++;
      redraw();
    }, 650);

    redraw();
    return () => clearInterval(interval);
  }, []);

  return textureRef;
};

/* ─── Laptop Screen mesh ─────────────────────────────────────────────── */
const LaptopScreen = () => {
  const textureRef = useScreenTexture();
  const matRef = useRef();

  useFrame(() => {
    if (matRef.current && textureRef.current) {
      matRef.current.map = textureRef.current;
      matRef.current.needsUpdate = true;
    }
  });

  return (
    <mesh position={[0, 0, 0.07]}>
      <planeGeometry args={[3.5, 2.2]} />
      <meshStandardMaterial ref={matRef} />
    </mesh>
  );
};

/* ─── 3D Laptop ─────────────────────────────────────────────────────── */
const Laptop = () => {
  const groupRef = useRef();

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(clock.elapsedTime * 0.35) * 0.18;
    }
  });

  return (
    <group ref={groupRef} scale={1.05}>
      {/* ── Base ── */}
      <group position={[0, -0.82, 0]}>
        {/* Main body */}
        <mesh>
          <boxGeometry args={[4.2, 0.18, 2.9]} />
          <meshStandardMaterial color="#1c1c1e" metalness={0.9} roughness={0.15} />
        </mesh>
        {/* Keyboard deck */}
        <mesh position={[0, 0.1, 0.05]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[4.0, 2.7]} />
          <meshStandardMaterial color="#111" metalness={0.5} roughness={0.5} />
        </mesh>
        {/* Trackpad */}
        <mesh position={[0, 0.1, 0.75]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[1.1, 0.62]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.6} roughness={0.3} />
        </mesh>
        {/* Key rows */}
        {[-0.8, -0.44, -0.08, 0.28].map((z, ri) =>
          Array.from({ length: 11 }).map((_, ki) => (
            <mesh key={`${ri}-${ki}`} position={[-1.8 + ki * 0.36, 0.11, z - 0.1]} rotation={[-Math.PI / 2, 0, 0]}>
              <planeGeometry args={[0.28, 0.26]} />
              <meshStandardMaterial color="#1e1e1e" metalness={0.3} roughness={0.7} />
            </mesh>
          ))
        )}
        {/* Logo glow */}
        <mesh position={[0, -0.1, -0.2]} rotation={[Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.2, 32]} />
          <meshStandardMaterial color="#6C63FF" emissive="#6C63FF" emissiveIntensity={1.5} />
        </mesh>
      </group>

      {/* ── Lid ── */}
      <group position={[0, 0.12, -1.38]} rotation={[-0.28, 0, 0]}>
        {/* Shell */}
        <mesh>
          <boxGeometry args={[4.2, 2.75, 0.1]} />
          <meshStandardMaterial color="#1c1c1e" metalness={0.9} roughness={0.12} />
        </mesh>
        {/* Black bezel */}
        <mesh position={[0, 0, 0.056]}>
          <planeGeometry args={[4.0, 2.6]} />
          <meshStandardMaterial color="#080808" />
        </mesh>
        {/* Screen */}
        <LaptopScreen />
        {/* Screen glow lights */}
        <pointLight position={[0, 0, 0.6]} color="#6C63FF" intensity={1.5} distance={5} />
        <pointLight position={[0, 0, 0.6]} color="#00D4FF" intensity={0.6} distance={3} />
      </group>

      {/* Hinge */}
      <mesh position={[0, -0.74, -1.38]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.065, 0.065, 4.2, 24]} />
        <meshStandardMaterial color="#2a2a2e" metalness={1} roughness={0.1} />
      </mesh>
    </group>
  );
};

/* ─── Main Scene ─────────────────────────────────────────────────────── */
const Hero3D = () => (
  <div style={{ width: '100%', height: '520px', cursor: 'grab' }}>
    <Canvas shadows={{ type: THREE.PCFShadowMap }}>
      <PerspectiveCamera makeDefault position={[0, 1.8, 9.5]} fov={44} />
      <ambientLight intensity={0.3} />
      <spotLight position={[8, 10, 8]} angle={0.2} penumbra={1} intensity={1.4} castShadow />
      <pointLight position={[-8, -4, -4]} color="#6C63FF" intensity={0.9} />
      <pointLight position={[4,  4,  6]} color="#00D4FF"  intensity={0.5} />

      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={0.6} />

      <Float speed={0.9} rotationIntensity={0.12} floatIntensity={0.7}>
        <Laptop />
      </Float>

      <OrbitControls enableZoom={false} makeDefault maxPolarAngle={Math.PI / 1.9} />
    </Canvas>
  </div>
);

export default Hero3D;
