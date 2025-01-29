import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { motion, useScroll, useTransform } from "framer-motion";

const FloatingAstro = () => {
  const containerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [currentSection, setCurrentSection] = useState("hero");
  const lastScrollY = useRef(0);
  const scrollVelocity = useRef(0);
  const { scrollYProgress, scrollY } = useScroll();

  // Section messages
  const sectionMessages = {
    hero: "Hi there! 👋",
    projects: "Check out my work! 💼",
    skills: "These are my skills! 🚀",
    contact: "Let's connect! 📫",
  };

  // Detect current section
  useEffect(() => {
    const observerOptions = {
      threshold: 0.5,
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setCurrentSection(entry.target.id);
        }
      });
    }, observerOptions);

    const sections = document.querySelectorAll("section[id]");
    sections.forEach((section) => sectionObserver.observe(section));

    return () =>
      sections.forEach((section) => sectionObserver.unobserve(section));
  }, []);

  // Create multiple transform points for the entire page journey
  const xPosition = useTransform(
    scrollYProgress,
    [0, 0.3, 0.6, 0.9, 1], // scroll progress points
    ["-300%", "170%", "-70%", "170%", "500%"] // x positions throughout the page
  );

  const yPosition = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    ["-60%", "-60%", "0%", "-60%", "0%"]
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

    // Add scroll velocity tracking with decay
    const updateScrollVelocity = () => {
      const currentScrollY = window.scrollY;
      scrollVelocity.current = Math.abs(currentScrollY - lastScrollY.current);
      lastScrollY.current = currentScrollY;
      lastTime = Date.now(); // Reset decay timer when scrolling
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

        let rotationAngle = 0;
        let cartwheelRotation = 0;
        const animate = () => {
          requestAnimationFrame(animate);

          if (model) {
            // Base rotation
            rotationAngle += 0.01;
            model.rotation.y = rotationAngle;

            // Add velocity decay
            const currentTime = Date.now();
            const timeDiff = currentTime - lastTime;
            if (timeDiff > 100) {
              // If no scroll for 100ms, decay the velocity
              scrollVelocity.current *= 0.95; // Reduce velocity by 5%
            }

            // Cartwheel rotation only when scrolling
            const rotationSpeed = Math.min(scrollVelocity.current * 0.01, 0.5);
            if (scrollVelocity.current > 0.1) {
              // Only rotate if there's significant velocity
              cartwheelRotation += rotationSpeed;
              model.rotation.z = cartwheelRotation;
            }

            // Hitung skala berdasarkan rotasi
            // Gunakan fungsi cosinus untuk membuat skala dinamis
            // Ketika model menghadap kamera (0° atau 360°) skala maksimal
            // Ketika membelakangi kamera (180°) skala minimal
            const scaleMultiplier = Math.cos(rotationAngle) * 0.25 + 1.25; // 1.0 - 1.5 range
            model.scale.set(scaleMultiplier, scaleMultiplier, scaleMultiplier);

            // Animasi floating naik-turun
            model.position.y = Math.sin(Date.now() * 0.001) * 0.1;
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
    <div className="relative">
      <motion.div
        ref={containerRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          x: xPosition,
          y: yPosition,
          position: "fixed",
          zIndex: 999,
          opacity: 0.8, // Reduce container opacity
          filter: "blur(0.5px)", // Slight blur for ethereal effect
        }}
        // Increase container size to match renderer size
        className="w-[400px] h-[400px] pointer-events-none"
      />

      {/* Bubble Text */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 1 : 0.8,
          x: xPosition,
          y: yPosition,
        }}
        transition={{ duration: 0.2 }}
        className="fixed z-[1000] transform -translate-y-16 -translate-x-16"
      >
        <div className="relative">
          <div className="absolute w-4 h-4 bg-neon-cyan rotate-45 transform -translate-x-2 translate-y-[2.4rem]" />
          <div className="bg-neon-cyan text-dark-blue px-4 py-2 rounded-lg font-mono text-sm whitespace-nowrap">
            {sectionMessages[currentSection]}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default FloatingAstro;
