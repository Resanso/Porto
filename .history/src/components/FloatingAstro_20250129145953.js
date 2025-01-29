import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const FloatingAstro = () => {
  const containerRef = useRef(null);
  const lastScrollY = useRef(0);
  const scrollVelocity = useRef(0);
  const { scrollYProgress, scrollY } = useScroll();

  // Create smoother x movement with useSpring
  const smoothXPosition = useSpring(
    useTransform(
      scrollYProgress,
      [0, 0.3, 0.6, 0.9, 1],
      ["-300%", "170%", "-70%", "170%", "500%"]
    ),
    {
      stiffness: 50,
      damping: 15,
      mass: 0.5,
    }
  );

  // Create smoother y movement with useSpring
  const smoothYPosition = useSpring(
    useTransform(
      scrollYProgress,
      [0, 0.25, 0.5, 0.75, 1],
      ["-60%", "-60%", "0%", "-60%", "0%"]
    ),
    {
      stiffness: 40,
      damping: 15,
      mass: 0.5,
    }
  );

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      outputColorSpace: THREE.SRGBColorSpace,
      toneMapping: THREE.ACESFilmicToneMapping,
      toneMappingExposure: 0.8, // Reduced exposure for softer look
    });

    // Increase render size to 400x400
    renderer.setSize(800, 800);
    renderer.setClearColor(0x000000, 0);
    containerRef.current.appendChild(renderer.domElement);

    // Adjust lighting for glow effect
    const ambientLight = new THREE.AmbientLight(0xffffff, 5); // Reduced intensity
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 100); // Ganti warna ke putih
    directionalLight.position.set(2, 2, 2);
    scene.add(directionalLight);

    // Add point light for glow effect
    const pointLight = new THREE.PointLight(0x64ffda, 1000, 100000);
    pointLight.position.set(0, 0, 10);
    scene.add(pointLight);

    let model;
    const loader = new GLTFLoader();
    let lastTime = Date.now();
    let velocityDecay = 0.95;
    let targetRotationZ = 0;
    let currentRotationZ = 0;

    // Improved scroll velocity tracking with smoothing
    const updateScrollVelocity = () => {
      const currentScrollY = window.scrollY;
      const newVelocity = (currentScrollY - lastScrollY.current) * 0.1;
      scrollVelocity.current = scrollVelocity.current * 0.8 + newVelocity * 0.2;
      lastScrollY.current = currentScrollY;
      lastTime = Date.now();
    };

    window.addEventListener("scroll", updateScrollVelocity, { passive: true });

    // Adjust camera position to accommodate larger size
    camera.position.z = 30;

    loader.load(
      "/astro.glb",
      (gltf) => {
        model = gltf.scene;

        // Tambahkan pengaturan material
        model.traverse((child) => {
          if (child.isMesh) {
            // Add emissive properties for glow
            child.material.transparent = true;
            child.material.opacity = 0.2; // Reduce overall opacity
            child.material.emissive = new THREE.Color(0x64ffda);
            child.material.emissiveIntensity = 0.2;
            child.material.needsUpdate = true;
            child.material.colorSpace = THREE.SRGBColorSpace;
          }
        });

        // Adjust initial scale for larger container
        model.scale.set(2, 2, 2);
        model.position.set(0, 0, 0);
        scene.add(model);

        let time = 0;
        const animate = () => {
          requestAnimationFrame(animate);
          time += 0.016; // Approximately 60fps

          if (model) {
            // Smooth base rotation
            const baseRotationSpeed = 0.3;
            model.rotation.y += baseRotationSpeed * 0.01;

            // Smooth floating motion using multiple sine waves
            const floatY =
              Math.sin(time * 1.5) * 0.1 + Math.sin(time * 2.3) * 0.05;
            const floatX =
              Math.cos(time * 1.2) * 0.05 + Math.cos(time * 1.8) * 0.03;

            model.position.y = floatY;
            model.position.x = floatX;

            // Smooth cartwheel rotation based on scroll velocity
            const scrollImpact = Math.min(
              Math.abs(scrollVelocity.current) * 0.1,
              0.5
            );
            targetRotationZ += scrollVelocity.current * 0.02;

            // Smooth rotation interpolation
            currentRotationZ = THREE.MathUtils.lerp(
              currentRotationZ,
              targetRotationZ,
              0.1
            );
            model.rotation.z = currentRotationZ;

            // Natural decay of rotation
            targetRotationZ *= 0.95;

            // Dynamic scale based on rotation with smoother interpolation
            const targetScale = Math.cos(model.rotation.y) * 0.15 + 1.35;
            model.scale.lerp(
              new THREE.Vector3(targetScale, targetScale, targetScale),
              0.1
            );

            // Add slight tilt based on movement
            model.rotation.x = floatY * 0.2;
          }

          renderer.render(scene, camera);
        };

        animate();
      },
      undefined,
      (error) => console.error("Error loading astronaut model:", error)
    );

    return () => {
      window.removeEventListener("scroll", updateScrollVelocity);
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
      ref={containerRef}
      style={{
        x: smoothXPosition,
        y: smoothYPosition,
        position: "fixed",
        zIndex: 999, // Increase z-index to make it appear above all content
        opacity: 0.8, // Reduce container opacity
        filter: "blur(0.5px)", // Slight blur for ethereal effect
      }}
      // Increase container size to match renderer size
      className="w-[400px] h-[400px] pointer-events-none"
    />
  );
};

export default FloatingAstro;
