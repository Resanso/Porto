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
    let mixer; // Animation mixer

    // Add mouse tracking variables
    let mouseX = 0;
    let mouseY = 0;
    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    // Add mouse move handler
    const handleMouseMove = (event) => {
      mouseX = (event.clientX - windowHalfX) / windowHalfX;
      mouseY = (event.clientY - windowHalfY) / windowHalfY;
    };

    document.addEventListener("mousemove", handleMouseMove);

    loader.load(
      "/bocil.glb",
      (gltf) => {
        model = gltf.scene;
        model.scale.set(15, 15, 15);
        model.position.set(0, -8.5, 0);
        scene.add(model);

        // Setup animation
        mixer = new THREE.AnimationMixer(model);
        const animations = gltf.animations;

        // Find and play the "scene" animation
        const sceneAnimation = animations.find((anim) => anim.name === "Scene");
        if (sceneAnimation) {
          const action = mixer.clipAction(sceneAnimation);
          action.play();
        }

        camera.position.z = 20;
        camera.position.y = 0;
        camera.lookAt(0, 0, 0);

        // Update animation loop
        const clock = new THREE.Clock();

        const animate = () => {
          requestAnimationFrame(animate);

          // Update animation mixer
          if (mixer) {
            const delta = clock.getDelta();
            mixer.update(delta);
          }

          if (model) {
            // Smooth head rotation following cursor
            model.rotation.y += (mouseX * 0.5 - model.rotation.y) * 0.05;
            model.rotation.x += (mouseY * 0.2 - model.rotation.x) * 0.05;
          }

          renderer.render(scene, camera);
        };

        animate();
      },
      undefined,
      (error) => console.error("Error loading model:", error)
    );

    return () => {
      // Add mouse move cleanup
      document.removeEventListener("mousemove", handleMouseMove);

      if (mixer) {
        mixer.stopAllAction();
      }
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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial from-navy-lighter/20 to-transparent" />
      <div className="container mx-auto px-4">
        {/* Reduced gap-8 to gap-4 and adjusted max-w-7xl to max-w-6xl for closer content */}
        <div className="grid lg:grid-cols-2 gap-8 items-center max-w-4xl mx-auto">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center lg:text-left order-2 lg:order-1"
          >
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-neon-cyan font-mono text-base mb-6 tracking-wider"
            >
              Hi, my name is
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl lg:text-6xl font-bold text-lightest-slate mb-2" // Reduced from mb-4
            >
              Resan So
            </motion.h1>

            {/* Animated text ticker with adjusted margins */}
            <div className="ticker-container">
              <div className="ticker-wrapper">
                {["Frontend Developer", "UI/UX Designer", "Problem Solver"].map(
                  (text) => (
                    <div key={text} className="ticker-text">
                      <span className="text-xl lg:text-2xl text-slate/80 font-medium">
                        {" "}
                        {/* Reduced text size */}
                        {text}
                      </span>
                    </div>
                  )
                )}
              </div>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-lg text-slate max-w-lg mx-auto lg:mx-0 mb-8 leading-relaxed" // Reduced from mb-10
            >
              I'm a software engineer specializing in building exceptional
              digital experiences. Currently focused on creating accessible,
              human-centered products.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex gap-6 justify-center lg:justify-start"
            >
              <button
                onClick={() => scrollToSection("projects")}
                className="px-8 py-4 bg-glass-gradient border border-neon-cyan/30 text-neon-cyan 
                  text-base font-mono rounded-lg hover:bg-neon-cyan/10 transition-all duration-300 
                  transform hover:scale-105"
              >
                View My Work
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="px-8 py-4 text-lightest-slate text-base font-mono rounded-lg 
                  hover:text-neon-cyan hover:bg-navy-light/30 transition-all duration-300 
                  transform hover:scale-105"
              >
                Contact Me
              </button>
            </motion.div>
          </motion.div>

          {/* 3D Model Container - Adjusted padding and max width */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="relative order-1 lg:order-2 w-full flex justify-center items-center lg:pl-2"
          >
            <div
              ref={modelRef}
              className="relative w-full max-w-[800px] aspect-square"
              style={{
                transform: "scale(1.1)", // Reduced scale from 1.2 to 1.1
                transformOrigin: "center center",
                filter: "drop-shadow(0 0 30px rgba(100, 255, 218, 0.15))",
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
