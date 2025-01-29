import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { FiInstagram, FiLinkedin } from "react-icons/fi";
import FloatingAstro from "./FloatingAstro";

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
      "/mafia.glb",
      (gltf) => {
        model = gltf.scene;
        model.scale.set(13, 13, 13);
        model.position.set(-2, -15, 8);
        scene.add(model);

        // Setup animation
        mixer = new THREE.AnimationMixer(model);
        const animations = gltf.animations;

        // Find and play the "scene" animation
        const sceneAnimation = animations.find(
          (anim) => anim.name === "Vinnie idle"
        );
        if (sceneAnimation) {
          const action = mixer.clipAction(sceneAnimation);
          action.play();
        }

        camera.position.z = 30;
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
    <section className="relative min-h-screen pt-16 sm:pt-20 lg:pt-0 px-4 sm:px-6">
      {/* Updated FloatingAstro position to top-left */}
      <div className="absolute top-24 left-10 sm:top-32 sm:left-20 z-10">
        <FloatingAstro />
      </div>

      {/* Floating elements dengan parallax effect - Mengurangi blur dan menyesuaikan opacity */}
      <motion.div
        animate={{
          y: [-20, 20, -20],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/3 left-1/4 w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 blur-xl bg-neon-cyan/20 rounded-full z-0"
      />
      <motion.div
        animate={{
          y: [20, -20, 20],
          rotate: [0, -5, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-1/4 right-1/4 w-32 md:w-40 h-32 md:h-40 blur-xl bg-neon-purple/30 rounded-full z-0"
      />

      {/* Content wrapper dengan z-index lebih tinggi */}
      <div className="relative z-10">
        <div className="absolute inset-0 bg-gradient-radial from-navy-lighter/20 to-transparent" />
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 items-center min-h-[calc(100vh-64px)] py-8 sm:py-12 lg:py-0">
            {/* Text Content - removed max-w-xl constraint */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center lg:text-left order-1 lg:pl-[10%] xl:pl-[15%] space-y-4 sm:space-y-6"
            >
              <motion.p className="text-neon-cyan font-mono text-sm sm:text-base tracking-wider">
                Hi, my name is
              </motion.p>

              <div className="relative inline-block name-container">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-lightest-slate"
                >
                  Resan So
                </motion.h1>

                {/* Updated Social Media Card with smaller size */}
                <div className="social-card p-2 sm:p-3 bg-navy-light rounded-lg shadow-xl border border-navy-lighter/50 backdrop-blur-sm">
                  <div className="flex gap-2 sm:gap-3">
                    <a
                      href="https://www.instagram.com/sanzoo.9?igsh=eTQ1aGJzc2c0Mjc1"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-link flex items-center gap-2 text-light-slate hover:text-neon-cyan px-3 py-1.5 rounded-md bg-glass"
                    >
                      <FiInstagram className="text-lg" />
                      <span className="text-sm">Instagram</span>
                    </a>
                    <a
                      href="https://www.linkedin.com/in/resan-so-8528102b7?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-link flex items-center gap-2 text-light-slate hover:text-neon-cyan px-3 py-1.5 rounded-md bg-glass"
                    >
                      <FiLinkedin className="text-lg" />
                      <span className="text-sm">LinkedIn</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Updated ticker container */}
              <div className="ticker-container w-full mb-2">
                <div className="ticker-wrapper">
                  {[
                    "Frontend Developer",
                    "UI/UX Designer",
                    "Problem Solver",
                  ].map((text, index) => (
                    <div
                      key={text}
                      className={`ticker-text ${index === 0 ? "active" : ""}`}
                    >
                      <span className="text-lg sm:text-xl lg:text-2xl text-slate/80 font-medium">
                        {text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-sm sm:text-base md:text-lg text-slate max-w-lg mx-auto lg:mx-0 leading-relaxed px-4 sm:px-0"
              >
                I'm a software engineer specializing in building exceptional
                digital experiences. Currently focused on creating accessible,
                human-centered products.
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-3 sm:gap-6 justify-center lg:justify-start px-4 sm:px-0"
              >
                <button
                  onClick={() => scrollToSection("projects")}
                  className="w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 bg-glass-gradient border border-neon-cyan/30 
                    text-neon-cyan text-sm sm:text-base font-mono rounded-lg hover:bg-neon-cyan/10 
                    transition-all duration-300 transform hover:scale-105"
                >
                  View My Work
                </button>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 text-lightest-slate 
                    text-sm sm:text-base font-mono rounded-lg hover:text-neon-cyan 
                    hover:bg-navy-light/30 transition-all duration-300 transform hover:scale-105"
                >
                  Contact Me
                </button>
              </motion.div>
            </motion.div>

            {/* Only modify the 3D Model Container */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="relative order-2 w-full hidden lg:flex justify-center items-center"
            >
              <div
                ref={modelRef}
                className="relative w-[800px] aspect-square model-container"
                style={{
                  transform: "scale(1.4)",
                  transformOrigin: "center center",
                  filter: "drop-shadow(0 0 30px rgba(100, 255, 218, 0.15))",
                }}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
