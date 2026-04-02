import React, { useMemo, useRef, useLayoutEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Text3D, OrbitControls, Center, Environment } from '@react-three/drei';
import * as THREE from 'three';

// --- CONFIGURATION ---
const FONT_PATH = '/fonts/helvetiker_bold.typeface.json';

const textSettings = {
    font: FONT_PATH,
    size: 1.5,
    height: 0.4,
    curveSegments: 12,
    bevelEnabled: true,
    bevelThickness: 0.04,
    bevelSize: 0.03,
    bevelOffset: 0,
    bevelSegments: 5,
};

// --- MATERIALS ---
const redMaterial = new THREE.MeshStandardMaterial({
    color: '#D92424',
    roughness: 0.3,
    metalness: 0.1,
});

const whiteMaterial = new THREE.MeshStandardMaterial({
    color: '#EFEFEF',
    roughness: 0.3,
    metalness: 0.1,
});

// --- SUB-COMPONENT: PROCEDURAL AUDIENCE ---
const Audience = () => {
    const meshRef = useRef();
    const dummy = useMemo(() => new THREE.Object3D(), []);

    const seatMaterial = useMemo(() => new THREE.MeshStandardMaterial({
        color: '#111111',
        roughness: 0.5,
        metalness: 0.5,
    }), []);

    useLayoutEffect(() => {
        if (!meshRef.current) return;

        let index = 0;
        const rows = 15;            
        const startRadius = 10;     
        const rowSpacing = 2.0;     

        for (let r = 0; r < rows; r++) {
            const radius = startRadius + (r * rowSpacing);
            const seatsInRow = 20 + (r * 3); 
            const arcAngle = Math.PI / 1.5; 

            for (let s = 0; s < seatsInRow; s++) {
                const angle = (Math.PI / 2) - (arcAngle / 2) + (s * (arcAngle / seatsInRow));
                
                const x = Math.cos(angle) * radius;
                const z = Math.sin(angle) * radius;
                const y = -3 + (r * 0.5); 

                dummy.position.set(x, y, z);
                dummy.lookAt(0, -1, 0); 
                dummy.updateMatrix();
                
                meshRef.current.setMatrixAt(index++, dummy.matrix);
            }
        }
        meshRef.current.count = index; 
        meshRef.current.instanceMatrix.needsUpdate = true;
    }, [dummy]);

    return (
        <instancedMesh ref={meshRef} args={[null, null, 600]} receiveShadow>
            <boxGeometry args={[1.2, 1.5, 1.2]} />
            <primitive object={seatMaterial} attach="material" />
        </instancedMesh>
    );
};


// --- MAIN COMPONENT ---
const PrismStage = () => {
    // 1. LIGHTING TARGETS 
    const leftTarget = useMemo(() => {
        const t = new THREE.Object3D();
        t.position.set(-8, 0, -2); 
        return t;
    }, []);

    const rightTarget = useMemo(() => {
        const t = new THREE.Object3D();
        t.position.set(6, 0, -4); 
        return t;
    }, []);

    const stageTarget = useMemo(() => {
        const t = new THREE.Object3D();
        t.position.set(0, -2, 5); 
        return t;
    }, []);

    const backdropTarget = useMemo(() => {
        const t = new THREE.Object3D();
        t.position.set(0, 5, -5); 
        return t;
    }, []);

    return (
        <Canvas 
            shadows 
            dpr={[1, 1.5]} 
            gl={{ antialias: true }} 
            camera={{ position: [0, 1, 24], fov: 45 }}
        >
            <color attach="background" args={['#050505']} />
            
            {/* Fog: Pushed further back to keep curtain visible */}
            <fog attach="fog" args={['#050505', 20, 60]} />

            {/* --- INVISIBLE TARGETS --- */}
            <primitive object={leftTarget} visible={false} />
            <primitive object={rightTarget} visible={false} />
            <primitive object={stageTarget} visible={false} />
            <primitive object={backdropTarget} visible={false} />

            {/* --- LIGHTING SETUP --- */}
            <ambientLight intensity={0.2} />

            <spotLight
                position={[-12, 15, 12]} 
                target={leftTarget}      
                angle={0.25}
                penumbra={0.4}
                intensity={1000}
                castShadow
                shadow-mapSize-width={1024}
                shadow-mapSize-height={1024}
                shadow-bias={-0.0001}
            />

            <spotLight
                position={[12, 15, 12]} 
                target={rightTarget}    
                angle={0.3}
                penumbra={0.4}
                intensity={1000}
                castShadow
                shadow-mapSize-width={1024}
                shadow-mapSize-height={1024}
                shadow-bias={-0.0001}
            />

            <spotLight
                position={[0, 10, 40]}   
                target={stageTarget}     
                angle={0.5}              
                penumbra={0.9}           
                intensity={800}          
                castShadow
                shadow-bias={-0.0001}
            />

            <spotLight
                position={[0, 10, -20]} 
                lookAt={() => new THREE.Vector3(0,0,0)}
                angle={2.0}
                intensity={300}
                penumbra={2}
                color="#ffffff"         
            />

            {/* --- BACKDROP LIGHT (Boosted & Widened) --- */}
            <spotLight
                position={[0, 15, 5]}   // Moved closer to stage center
                target={backdropTarget}     
                angle={1.8}             // Wider angle to hit the sides
                penumbra={0.5}           
                intensity={1000}        // Much brighter
                castShadow={false}
            />

            {/* --- TEXT CONTENT --- */}
            <Center position={[0, 0.75, -5]}>
                <group> 
                    <Text3D 
                        material={redMaterial} 
                        {...textSettings} 
                        position={[-10.2, 0, -5]} 
                        rotation={[0, 0.25, 0]} 
                    >
                        PRISM OF
                    </Text3D>

                    <Text3D 
                        material={whiteMaterial} 
                        {...textSettings} 
                        position={[1.2, 0, -7]} 
                        rotation={[0, -0.25, 0]}
                    >
                        PERSPECTIVES
                    </Text3D>
                </group>
            </Center>

            {/* --- STAGE GEOMETRY --- */}
            <group>
                {/* 1. Large Ground Floor */}
                <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.1, -2.65]} receiveShadow>
                    <planeGeometry args={[50, 50]} /> 
                    <meshStandardMaterial color="#050505" roughness={0.9} metalness={0.1} />
                </mesh>

                {/* 2. Main Stage Platform */}
                <mesh position={[0, -1.05, -5]} receiveShadow>
                    <boxGeometry args={[30, 2.1, 15]} /> 
                    <meshStandardMaterial color="#1a1a1a" roughness={0.9} metalness={0.2} />
                </mesh>

                {/* --- CURTAIN WALL (Adjusted) --- */}
                {/* Moved Forward to Z = -8 (Touching the stage back edge) */}
                {/* Radius increased to 28 to wrap around the stage width (30) */}
                <mesh position={[0, 8, 15]} rotation={[0, Math.PI, 0]} receiveShadow>
                    {/* Radius: 28, Height: 35, Arc: 160 degrees */}
                    <cylinderGeometry args={[28, 28, 35, 64, 1, true, -Math.PI / 2.2, Math.PI / 1.1]} />
                    <meshStandardMaterial 
                        color="#333333"  // Lighter Charcoal for visibility
                        roughness={0.9}  // Matte fabric look
                        metalness={0.1} 
                        side={THREE.DoubleSide} 
                    />
                </mesh>

                {/* --- ROUND MAT --- */}
                <mesh position={[0, 0.01, 0]} receiveShadow>
                    <cylinderGeometry args={[2, 2, 0.02, 64]} /> 
                    <meshStandardMaterial color="#D92424" roughness={0.8} metalness={0.1} />
                </mesh>

                {/* 3. Solid Stairs */}
                <mesh position={[0, -1.05, 2.9]} receiveShadow>
                    <boxGeometry args={[3.5, 2.1, 0.8]} /> 
                    <meshStandardMaterial color="#1a1a1a" roughness={0.9} metalness={0.1} />
                </mesh>
                <mesh position={[0, -1.225, 3.7]} receiveShadow>
                    <boxGeometry args={[3.5, 1.75, 0.6]} /> 
                    <meshStandardMaterial color="#1a1a1a" roughness={0.9} metalness={0.1} />
                </mesh>
                <mesh position={[0, -1.4, 4.5]} receiveShadow>
                    <boxGeometry args={[3.5, 1.4, 0.6]} /> 
                    <meshStandardMaterial color="#1a1a1a" roughness={0.9} metalness={0.1} />
                </mesh>
                <mesh position={[0, -1.575, 5.3]} receiveShadow>
                    <boxGeometry args={[3.5, 1.05, 0.6]} /> 
                    <meshStandardMaterial color="#1a1a1a" roughness={0.9} metalness={0.1} />
                </mesh>
                <mesh position={[0, -1.75, 6.1]} receiveShadow>
                    <boxGeometry args={[3.5, 0.7, 0.6]} /> 
                    <meshStandardMaterial color="#1a1a1a" roughness={0.9} metalness={0.1} />
                </mesh>
                <mesh position={[0, -1.925, 6.9]} receiveShadow>
                    <boxGeometry args={[3.5, 0.35, 0.6]} /> 
                    <meshStandardMaterial color="#1a1a1a" roughness={0.9} metalness={0.1} />
                </mesh>
            </group>

            {/* --- AUDIENCE --- */}
            <Audience />

            {/* --- CONTROLS --- */}
            <OrbitControls 
                makeDefault 
                enablePan={false}
                minPolarAngle={Math.PI / 2.4}
                maxPolarAngle={Math.PI / 2.1}
                minAzimuthAngle={-Math.PI / 2.2}
                maxAzimuthAngle={Math.PI / 2.2}
                maxDistance={25} 
                minDistance={15} 
            />
            <Environment preset="city" environmentIntensity={0.4} />
        </Canvas>
    );
};

export default PrismStage;