import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const Hero = () => {
  const modelRef = useRef(null);

  useEffect(() => {
    if (!modelRef.current) return;

    // Three.js setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });

    // Set renderer size
    renderer.setSize(600, 600); // Perbesar ukuran render
    renderer.setClearColor(0x000000, 0);
    modelRef.current.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0x64ffda, 2);
    directionalLight.position.set(2, 2, 2);
    scene.add(directionalLight);

    // Load 3D Model
    const loader = new GLTFLoader();
    let model;

    loader.load(
      "/profile.glb",
      (gltf) => {
        model = gltf.scene;

        // Sesuaikan skala dan posisi model
        model.scale.set(10, 10, 10);
        model.position.set(0, -25, 0); // Sesuaikan posisi agar lebih pas di tengah
        scene.add(model);

        // Sesuaikan posisi kamera untuk fokus ke bagian atas
        camera.position.z = 20; // Mundurkan kamera
        camera.position.y = 0; // Arahkan kamera sedikit ke atas
        camera.lookAt(0, 0, 0);

        // Animation dengan rotasi yang lebih halus
        const animate = () => {
          requestAnimationFrame(animate);

          if (model) {
            model.rotation.y += 0.001; // Rotasi lebih lambat
            // Hilangkan animasi floating untuk stabilitas tampilan
          }

          renderer.render(scene, camera);
        };

        animate();
      },
      undefined,
      (error) => console.error("Error loading model:", error)
    );

    return () => {
      if (modelRef.current?.contains(renderer.domElement)) {
        modelRef.current.removeChild(renderer.domElement);
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

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center py-12 px-4">
      <div className="absolute inset-0 bg-gradient-radial from-navy-lighter/20 to-transparent" />
      <div className="max-w-5xl mx-auto relative">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-neon-cyan font-mono text-sm mb-4 tracking-wider"
            >
              Hi, my name is
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-5xl font-bold text-lightest-slate mb-2"
            >
              Resan So
            </motion.h1>

            {/* Simplified text ticker */}
            <div className="h-8 mb-4 overflow-hidden">
              <div className="animate-text-slide">
                {["Frontend Developer", "UI/UX Designer", "Problem Solver"].map(
                  (text) => (
                    <div key={text} className="text-xl text-slate/80">
                      {text}
                    </div>
                  )
                )}
              </div>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-base text-slate max-w-md mx-auto mb-8 leading-relaxed"
            >
              I'm a software engineer specializing in building exceptional
              digital experiences.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex gap-4 justify-center"
            >
              <button
                onClick={() => scrollToSection("projects")}
                className="px-6 py-3 bg-glass-gradient border border-neon-cyan/30 text-neon-cyan text-sm font-mono rounded-lg 
                  hover:bg-neon-cyan/10 transition-colors"
              >
                View My Work
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="px-6 py-3 text-lightest-slate text-sm font-mono rounded-lg 
                  hover:text-neon-cyan hover:bg-navy-light/30 transition-colors"
              >
                Contact Me
              </button>
            </motion.div>
          </motion.div>

          {/* 3D Model Container */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="relative flex items-center justify-center overflow-visible"
          >
            {/* Gradient Mask Container */}
            <div className="relative">
              {/* Top Gradient */}
              <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-dark-blue to-transparent z-10" />

              {/* Bottom Gradient */}
              <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark-blue to-transparent z-10" />

              {/* Left Gradient */}
              <div className="absolute top-0 left-0 bottom-0 w-32 bg-gradient-to-r from-dark-blue to-transparent z-10" />

              {/* Right Gradient */}
              <div className="absolute top-0 right-0 bottom-0 w-32 bg-gradient-to-l from-dark-blue to-transparent z-10" />

              {/* Model Container */}
              <div
                ref={modelRef}
                className="relative w-[800px] h-[800px]" // Increase size further
                style={{
                  transform: "scale(1.2)",
                  transformOrigin: "center center",
                  filter: "drop-shadow(0 0 30px rgba(100, 255, 218, 0.15))",
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
