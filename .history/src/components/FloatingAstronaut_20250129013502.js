import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const FloatingAstronaut = () => {
  const containerRef = useRef(null);
  const [currentSection, setCurrentSection] = useState("hero");
  const { scrollYProgress } = useScroll();

  // Precise section positions
  const positions = {
    hero: { x: "5%", y: "20%" },
    projects: { x: "80%", y: "20%" },
    skills: { x: "5%", y: "20%" },
    contact: { x: "80%", y: "70%" },
  };

  useEffect(() => {
    // Create intersection observer for each section
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            setCurrentSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    // Observe all sections
    const sections = document.querySelectorAll(
      "#hero, #projects, #skills, #contact"
    );
    sections.forEach((section) => sectionObserver.observe(section));

    return () => {
      sections.forEach((section) => sectionObserver.unobserve(section));
    };
  }, []);

  // Rest of the Three.js setup
  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      preserveDrawingBuffer: true,
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

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // Brighter main light
    directionalLight.position.set(2, 2, 2);
    scene.add(directionalLight);

    // Add rim light for better edge definition
    const rimLight = new THREE.DirectionalLight(0x64ffda, 2);
    rimLight.position.set(-2, 2, -2);
    scene.add(rimLight);

    // Add fill light
    const fillLight = new THREE.DirectionalLight(0xffffff, 0.5); // Dimmer fill light
    fillLight.position.set(0, -2, 4);
    scene.add(fillLight);

    // Add point lights for better detail
    const pointLight1 = new THREE.PointLight(0x64ffda, 1);
    pointLight1.position.set(-2, 1, 4);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xffffff, 1);
    pointLight2.position.set(2, -1, 4);
    scene.add(pointLight2);

    const loader = new GLTFLoader();
    let model;

    loader.load("/astro.glb", (gltf) => {
      model = gltf.scene;
      model.scale.set(0.4, 0.4, 0.4);

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

            // Add environment map for reflections
            const pmremGenerator = new THREE.PMREMGenerator(renderer);
            const envTexture = pmremGenerator.fromScene(
              new THREE.Scene()
            ).texture;
            child.material.envMap = envTexture;

            // Enable shadows
            child.castShadow = true;
            child.receiveShadow = true;

            // If material has map (texture)
            if (child.material.map) {
              child.material.map.encoding = THREE.sRGBEncoding;
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
      initial={positions.hero}
      animate={positions[currentSection]}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 20,
        mass: 0.5,
      }}
      className="fixed w-[800px] h-[800px] z-20 pointer-events-none"
    >
      <motion.div
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
