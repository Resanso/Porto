import { motion, useMotionValue, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const Hero = () => {
  const modelRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (!modelRef.current) return;

    // Three.js setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });

    renderer.setSize(400, 400);
    renderer.setClearColor(0x000000, 0);
    modelRef.current.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0x64ffda, 1);
    directionalLight.position.set(2, 2, 2);
    scene.add(directionalLight);

    // Load 3D Model
    const loader = new GLTFLoader();
    let head;

    loader.load(
      "/orangeBot.GLB", // Sesuaikan dengan nama file hasil konversi
      (gltf) => {
        head = gltf.scene;
        head.scale.set(2, 2, 2);
        scene.add(head);

        // Initial position
        camera.position.z = 5;

        // Animation
        const animate = () => {
          requestAnimationFrame(animate);

          if (head) {
            // Rotate head based on mouse position
            const targetRotationX =
              (mousePosition.y * 0.5 - head.rotation.x) * 0.05;
            const targetRotationY =
              (mousePosition.x * 0.5 - head.rotation.y) * 0.05;

            head.rotation.x += targetRotationX;
            head.rotation.y += targetRotationY;
          }

          renderer.render(scene, camera);
        };

        animate();
      },
      undefined,
      (error) => {
        console.error("An error occurred loading the 3D model:", error);
      }
    );

    // Mouse move handler
    const handleMouseMove = (e) => {
      const rect = modelRef.current.getBoundingClientRect();
      setMousePosition({
        x: ((e.clientX - rect.left) / rect.width) * 2 - 1,
        y: -((e.clientY - rect.top) / rect.height) * 2 + 1,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (modelRef.current) {
        modelRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

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
              className="text-base text-slate max-w-md mb-8 leading-relaxed"
            >
              I'm a software engineer specializing in building exceptional
              digital experiences.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex gap-4"
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

          {/* 3D Model Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="relative perspective-1000 max-w-sm mx-auto"
          >
            <div className="relative group">
              {/* Decorative Border */}
              <div
                className="absolute -inset-3 border border-neon-cyan/20 rounded-lg 
                transform translate-x-3 translate-y-3 group-hover:translate-x-2 
                group-hover:translate-y-2 transition-transform duration-300"
              />

              {/* 3D Model Container */}
              <div
                ref={modelRef}
                className="relative rounded-lg overflow-hidden bg-navy-light/50 backdrop-blur-sm aspect-square"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
