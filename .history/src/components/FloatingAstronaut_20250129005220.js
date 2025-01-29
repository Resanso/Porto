import { useEffect, useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const FloatingAstronaut = ({ position = "right", offset = 0 }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll();

  const y = useTransform(scrollYProgress, [0, 1], [0, -100 + offset]);

  const rotation = useTransform(scrollYProgress, [0, 1], [0, 360]);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });

    renderer.setSize(200, 200);
    renderer.setClearColor(0x000000, 0);
    containerRef.current.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0x64ffda, 1);
    directionalLight.position.set(2, 2, 2);
    scene.add(directionalLight);

    // Load Astronaut Model
    const loader = new GLTFLoader();
    let model;

    loader.load("/astro.glb", (gltf) => {
      model = gltf.scene;
      model.scale.set(1.5, 1.5, 1.5);
      model.position.set(5, 5, 5);
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

    return () => {
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
        position: "absolute",
        [position]: "-100px",
        y,
        rotate: rotation,
      }}
      className="w-[200px] h-[200px] z-10"
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
