import { useEffect, useRef } from "react";
import { useScroll, useTransform, motion, useSpring } from "framer-motion";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const FloatingAstronaut = ({ position = "right", offset = 0 }) => {
  const containerRef = useRef(null);
  const { scrollY } = useScroll();

  // Smooth spring physics for following scroll
  const springConfig = { damping: 15, mass: 0.1, stiffness: 100 };
  const yPos = useSpring(
    useTransform(
      scrollY,
      [0, document.documentElement.scrollHeight - window.innerHeight],
      [0, 300]
    ),
    springConfig
  );

  // Add rotation based on scroll
  const rotate = useSpring(
    useTransform(
      scrollY,
      [0, document.documentElement.scrollHeight - window.innerHeight],
      [0, 360]
    ),
    springConfig
  );

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

    // Enhanced lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0x64ffda, 1);
    directionalLight.position.set(2, 2, 2);
    scene.add(directionalLight);

    // Add point lights for better detail
    const pointLight1 = new THREE.PointLight(0x64ffda, 0.5);
    pointLight1.position.set(-2, 1, 1);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xffffff, 0.3);
    pointLight2.position.set(2, -1, 1);
    scene.add(pointLight2);

    // Load Astronaut Model
    const loader = new GLTFLoader();
    let model;

    loader.load("/astro.glb", (gltf) => {
      model = gltf.scene;
      model.scale.set(1.5, 1.5, 1.5);
      scene.add(model);

      camera.position.z = 5;

      // Animation loop with floating effect
      const animate = () => {
        requestAnimationFrame(animate);

        if (model) {
          // Add subtle floating movement
          model.position.y = Math.sin(Date.now() * 0.001) * 0.2;
          model.rotation.y += 0.005;

          // Add slight tilt based on position
          model.rotation.z = Math.sin(Date.now() * 0.0005) * 0.1;
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
        position: "fixed",
        [position]: "-100px",
        top: yPos,
        rotate,
      }}
      className="w-[200px] h-[200px] z-20"
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
