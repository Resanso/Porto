import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { motion, useScroll, useTransform } from "framer-motion";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";

const FloatingAstro = () => {
  const containerRef = useRef(null);
  const lastScrollY = useRef(0);
  const scrollVelocity = useRef(0);
  const { scrollYProgress, scrollY } = useScroll();

  // Create multiple transform points for the entire page journey
  const xPosition = useTransform(
    scrollYProgress,
    [0, 0.3, 0.6, 0.9, 1], // scroll progress points
    ["-300%", "170%", "-70%", "170%", "500%"] // x positions throughout the page
  );

  const yPosition = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    ["-60%", "-60%", "0%", "-60%", "-60%"]
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

    // Enhance lighting for stronger glow
    const ambientLight = new THREE.AmbientLight(0xffffff, 2);
    scene.add(ambientLight);

    // Add multiple point lights for stronger glow effect
    const pointLight1 = new THREE.PointLight(0x64ffda, 2, 50);
    pointLight1.position.set(0, 0, 15);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x64ffda, 2, 50);
    pointLight2.position.set(15, 0, 0);
    scene.add(pointLight2);

    const pointLight3 = new THREE.PointLight(0x64ffda, 2, 50);
    pointLight3.position.set(-15, 0, 0);
    scene.add(pointLight3);

    // Add bloom post-processing
    const bloomPass = new THREE.UnrealBloomPass(
      new THREE.Vector2(800, 800),
      1.5, // bloom strength
      0.4, // bloom radius
      0.85 // bloom threshold
    );
    renderer.toneMappingExposure = 1.5;

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

        model.traverse((child) => {
          if (child.isMesh) {
            // Enhanced material properties for stronger glow
            child.material.transparent = true;
            child.material.opacity = 0.9;
            child.material.emissive = new THREE.Color(0x64ffda);
            child.material.emissiveIntensity = 0.5;

            // Add custom shader material for glow
            const glowMaterial = new THREE.ShaderMaterial({
              uniforms: {
                glowColor: { value: new THREE.Color(0x64ffda) },
                viewVector: { value: camera.position },
              },
              vertexShader: `
                varying vec3 vNormal;
                varying vec3 vPositionNormal;
                void main() {
                  vNormal = normalize(normalMatrix * normal);
                  vPositionNormal = normalize((modelViewMatrix * vec4(position, 1.0)).xyz);
                  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
              `,
              fragmentShader: `
                uniform vec3 glowColor;
                varying vec3 vNormal;
                varying vec3 vPositionNormal;
                void main() {
                  float intensity = pow(0.7 - dot(vNormal, vPositionNormal), 4.0);
                  gl_FragColor = vec4(glowColor, 1.0) * intensity;
                }
              `,
              side: THREE.FrontSide,
              blending: THREE.AdditiveBlending,
              transparent: true,
            });

            // Create glow mesh
            const glowMesh = new THREE.Mesh(
              child.geometry.clone(),
              glowMaterial
            );
            glowMesh.scale.multiplyScalar(1.1);
            child.add(glowMesh);
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
    <motion.div
      ref={containerRef}
      style={{
        x: xPosition,
        y: yPosition,
        position: "fixed",
        zIndex: 999, // Increase z-index to make it appear above all content
        opacity: 0.8, // Reduce container opacity
        filter: "drop-shadow(0 0 10px #64ffda) brightness(1.2)", // Add CSS glow effect
      }}
      // Increase container size to match renderer size
      className="w-[400px] h-[400px] pointer-events-none"
    />
  );
};

export default FloatingAstro;
