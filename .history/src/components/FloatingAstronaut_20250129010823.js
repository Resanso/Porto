import { useEffect, useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const FloatingAstronaut = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll();

  const y = useTransform(scrollYProgress, [0, 1], ["0vh", "100vh"]);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });

    const size = 800; // Increased from 500
    renderer.setSize(size, size);
    renderer.setClearColor(0x000000, 0);
    containerRef.current.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0x64ffda, 2);
    directionalLight.position.set(2, 2, 2);
    scene.add(directionalLight);

    const loader = new GLTFLoader();
    let model;

    loader.load("/astro.glb", (gltf) => {
      model = gltf.scene;

      const box = new THREE.Box3().setFromObject(model);
      const center = box.getCenter(new THREE.Vector3());
      model.position.sub(center);

      model.scale.setScalar(0.2); // Reduced from 1.8
      model.position.y = -1;
      scene.add(model);

      camera.position.z = 8; // Adjusted for better view in larger container
      camera.position.y = 0.5;
      camera.lookAt(0, 0, 0);

      const animate = () => {
        requestAnimationFrame(animate);

        if (model) {
          model.rotation.y += 0.003;
          model.position.y += Math.sin(Date.now() * 0.001) * 0.0015;
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
      style={{ y }}
      className="fixed right-10 w-[800px] h-[800px] z-20 pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div
        ref={containerRef}
        className="w-full h-full"
        style={{
          filter: "drop-shadow(0 0 20px rgba(100, 255, 218, 0.2))",
        }}
      />
    </motion.div>
  );
};

export default FloatingAstronaut;
