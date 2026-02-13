import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Float } from '@react-three/drei';

// Rotating stars component
function RotatingStars() {
    const starsRef = useRef();

    useFrame(({ clock }) => {
        if (starsRef.current) {
            starsRef.current.rotation.y += 0.0005;
        }
    });

    return (
        <group ref={starsRef}>
            <Stars
                radius={100}
                depth={50}
                count={5000}
                factor={4}
                saturation={0}
                fade
            />
        </group>
    );
}

// Floating game controller component
function FloatingController({ position, color }) {
    return (
        <Float
            speed={1.5}
            rotationIntensity={0.5}
            floatIntensity={0.5}
            position={position}
        >
            <mesh>
                <boxGeometry args={[2, 1, 0.5]} />
                <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.2} />
                <mesh position={[0, 0.3, 0.25]}>
                    <sphereGeometry args={[0.2]} />
                    <meshStandardMaterial color="#ff0000" />
                </mesh>
                <mesh position={[0.6, 0.2, 0.25]}>
                    <boxGeometry args={[0.3, 0.1, 0.1]} />
                    <meshStandardMaterial color="#00ff00" />
                </mesh>
            </mesh>
        </Float>
    );
}

// Particle effect component
function Particles() {
    const particlesRef = useRef();
    const particlesCount = 100;

    const positions = useMemo(() => {
        const positions = new Float32Array(particlesCount * 3);
        for (let i = 0; i < particlesCount; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 30;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 30;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 30;
        }
        return positions;
    }, []);

    useFrame(({ clock }) => {
        if (particlesRef.current) {
            particlesRef.current.rotation.y += 0.0002;
        }
    });

    return (
        <points ref={particlesRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={particlesCount}
                    array={positions}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.05}
                color="#88ccff"
                transparent
                opacity={0.8}
                blending={2}
            />
        </points>
    );
}

// Main Three.js background component
export default function ThreeBackground({ children }) {
    return (
        <div style={{ position: 'relative', width: '100%', minHeight: '100vh' }}>
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: -1
            }}>
                <Canvas camera={{ position: [0, 0, 20] }}>
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} />

                    <RotatingStars />

                    <FloatingController position={[-5, 2, -5]} color="#ff3366" />
                    <FloatingController position={[5, -2, -5]} color="#33ff66" />
                    <FloatingController position={[0, 3, -10]} color="#3366ff" />

                    <Particles />
                </Canvas>
            </div>

            <div style={{ position: 'relative', zIndex: 1 }}>
                {children}
            </div>
        </div>
    );
}