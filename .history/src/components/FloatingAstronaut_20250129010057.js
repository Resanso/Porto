import { useEffect, useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const FloatingAstronaut = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll();

  const yPos = useTransform(scrollYProgress, [0, 1], ["0vh", "100vh"]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 720]);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });

    renderer.setSize(150, 150); // Ukuran lebih kecil
    renderer.setClearColor(0x000000, 0);
    containerRef.current.appendChild(renderer.domElement);

    // Lighting yang lebih terang
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0x64ffda, 2);
    directionalLight.position.set(2, 2, 2);
    scene.add(directionalLight);

    const loader = new GLTFLoader();
    let model;

    loader.load("/astro.glb", (gltf) => {
      model = gltf.scene;
      model.scale.set(1, 1, 1); // Skala normal
      model.position.set(0, 0, 0);
      scene.add(model);

      camera.position.z = 5;

      const animate = () => {
        requestAnimationFrame(animate);

        if (model) {
          model.rotation.y += 0.005;
          model.position.y = Math.sin(Date.now() * 0.001) * 0.2;
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
        y: yPos,
        rotate: rotate,
      }}
      className="fixed right-10 w-[150px] h-[150px] z-20 pointer-events-none"
    >
      <div
        ref={containerRef}
        className="w-full h-full"
        style={{
          filter: "drop-shadow(0 0 10px rgba(100, 255, 218, 0.3))",
        }}
      />
    </motion.div>
  );
};

export default FloatingAstronaut;
