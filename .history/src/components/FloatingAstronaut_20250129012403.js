import { useEffect, useRef } from "react";
import { useScroll, useTransform, motion, useSpring } from "framer-motion";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const FloatingAstronaut = () => {
  const containerRef = useRef(null);
  const { scrollY } = useScroll(); // Changed from scrollYProgress to scrollY

  // Create smoother animations with springs
  const springConfig = { damping: 15, stiffness: 100 };

  // Adjust movement ranges to keep astronaut visible
  const xMove = useSpring(
    useTransform(
      scrollY,
      [0, document.documentElement.scrollHeight],
      [-30, 30]
    ),
    { damping: 20, stiffness: 80 }
  );

  const yMove = useSpring(
    useTransform(
      scrollY,
      [0, document.documentElement.scrollHeight],
      [50, window.innerHeight - 400] // Adjust these values to control vertical movement range
    ),
    springConfig
  );

  const rotate = useSpring(
    useTransform(scrollY, [0, document.documentElement.scrollHeight], [0, 720]),
    springConfig
  );

  // Rest of the Three.js setup
  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });

    renderer.setSize(800, 800);
    renderer.setClearColor(0x000000, 0);
    renderer.outputEncoding = THREE.sRGBEncoding; // Better color reproduction
    renderer.toneMapping = THREE.ACESFilmicToneMapping; // Enhanced contrast
    renderer.toneMappingExposure = 1.5; // Brighter exposure
    containerRef.current.appendChild(renderer.domElement);

    // Enhanced lighting setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 2); // Increased intensity
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 3); // Brighter main light
    directionalLight.position.set(2, 2, 2);
    scene.add(directionalLight);

    // Add rim light for better edge definition
    const rimLight = new THREE.DirectionalLight(0x64ffda, 2);
    rimLight.position.set(-2, 2, -2);
    scene.add(rimLight);

    // Add fill light
    const fillLight = new THREE.DirectionalLight(0xffffff, 1.5);
    fillLight.position.set(0, -2, 4);
    scene.add(fillLight);

    const loader = new GLTFLoader();
    let model;

    loader.load("/astro.glb", (gltf) => {
      model = gltf.scene;
      model.scale.set(0.8, 0.8, 0.8);

      // Enhance materials if they exist
      model.traverse((child) => {
        if (child.isMesh) {
          if (child.material) {
            child.material.metalness = 0.3; // Reduce metalness for better diffuse
            child.material.roughness = 0.5; // Adjust for better light reflection
            child.material.envMapIntensity = 1.5; // Enhance environment reflection

            // Add emissive glow to suit materials
            if (
              child.material.name.includes("suit") ||
              child.material.name.includes("glass")
            ) {
              child.material.emissive = new THREE.Color(0x64ffda);
              child.material.emissiveIntensity = 0.3;
            }
          }
        }
      });

      scene.add(model);

      camera.position.z = 8;
      camera.position.y = 0.5;

      const animate = () => {
        requestAnimationFrame(animate);

        if (model) {
          // Add subtle floating movement
          model.position.y = Math.sin(Date.now() * 0.001) * 0.2;
          model.rotation.y += 0.002;
        }

        renderer.render(scene, camera);
      };

      animate();
    });

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (containerRef.current?.contains(renderer.domElement)) {
        containerRef.current.removeChild(renderer.domElement);
      }
      if (model) {
        scene.remove(model);
        model.traverse((child) => {
          if (child.geometry) child.geometry.dispose();
          if (child.material) {
            if (Array.isArray(child.material)) {
              child.material.forEach((m) => m.dispose());
            } else {
              child.material.dispose();
            }
          }
        });
      }
      renderer.dispose();
    };
  }, []);

  return (
    <motion.div
      style={{
        x: xMove,
        y: yMove,
        rotate: rotate,
      }}
      className="fixed right-10 w-[800px] h-[800px] z-20 pointer-events-none"
      initial={{ y: -100 }} // Start position from above viewport
    >
      <div
        ref={containerRef}
        className="w-full h-full"
        style={{
          filter: "brightness(1.2) contrast(1.1)", // Enhance overall brightness
        }}
      />
    </motion.div>
  );
};

export default FloatingAstronaut;
