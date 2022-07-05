import type { NextPage } from "next";
import styles from "./index.module.scss";
import { FC, useRef, useState } from "react";
import type { Mesh } from "three";
import { Vector3 } from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  PerspectiveCamera,
  OrbitControls,
  Image,
  useTexture,
} from "@react-three/drei";

const Home: NextPage = () => {
  return (
    <div
      className={styles.container}
      style={{ width: "100vw", height: "100vh" }}
    >
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <PerspectiveCamera makeDefault position={[0, 0, 10]} />
        <Box position={[-1.2, 1, 0]} />
        <Box position={[1.2, 1, 0]} />
        <SampleImage />
        <SampleImage position={[4, -2, -1.5]} />
        <SampleImage position={[10, -2, -1.5]} />
        <OrbitControls />
      </Canvas>
    </div>
  );
};

const Box: FC<{
  position: [number, number, number];
}> = (props) => {
  // This reference will give us direct access to the mesh
  const meshRef = useRef<Mesh>(null);
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += 0.01;
  });
  // Return view, these are regular three.js elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={meshRef}
      scale={active ? 1.5 : 1}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
    </mesh>
  );
};

const SampleImage: FC<any> = (props) => {
  const texture = useTexture("/assets/images/sample.jpeg");

  return (
    <Image
      texture={texture}
      scale={[4, 4, 1]}
      position={[-2, -2, -1.5]}
      {...props}
    />
  );
};

export default Home;
