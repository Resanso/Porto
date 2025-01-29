import { useEffect, useRef } from "react";
import * as THREE from "three";

const InteractiveBackground = () => {
  const containerRef = useRef();

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x0a192f, 0.5);
    containerRef.current.appendChild(renderer.domElement);

    // Create multiple flowing waves of particles
    const createWave = (count, yPos, size, color, speed) => {
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(count * 3);

      for (let i = 0; i < count * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 20; // x
        positions[i + 1] = yPos + (Math.random() - 0.5) * 5; // y
        positions[i + 2] = (Math.random() - 0.5) * 20; // z
      }

      geometry.setAttribute(
        "position",
        new THREE.BufferAttribute(positions, 3)
      );

      const material = new THREE.PointsMaterial({
        size,
        color,
        transparent: true,
        opacity: 0.4,
        blending: THREE.AdditiveBlending,
      });

      const points = new THREE.Points(geometry, material);
      points.userData = { speed, initialY: yPos };
      scene.add(points);
      return points;
    };

    // Create multiple waves with different properties
    const waves = [
      createWave(200, -5, 0.05, 0x64ffda, 0.02), // Cyan bottom wave
      createWave(150, 0, 0.03, 0x8892b0, 0.015), // Slate middle wave
      createWave(100, 5, 0.04, 0xbd34fe, 0.01), // Purple top wave
    ];

    camera.position.z = 15;

    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    const handleMouseMove = (event) => {
      mouseX = (event.clientX - windowHalfX) / windowHalfX;
      mouseY = (event.clientY - windowHalfY) / windowHalfY;
    };

    document.addEventListener("mousemove", handleMouseMove);

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);

      waves.forEach((wave) => {
        const positions = wave.geometry.attributes.position.array;

        for (let i = 0; i < positions.length; i += 3) {
          // Create flowing wave effect
          positions[i + 1] =
            wave.userData.initialY +
            Math.sin((Date.now() * wave.userData.speed + positions[i]) / 1000) *
              2;
        }

        wave.geometry.attributes.position.needsUpdate = true;
        wave.rotation.y += mouseX * 0.001;
        wave.rotation.x += mouseY * 0.001;
      });

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("mousemove", handleMouseMove);
      containerRef.current?.removeChild(renderer.domElement);
      waves.forEach((wave) => {
        wave.geometry.dispose();
        wave.material.dispose();
      });
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} className="fixed inset-0 -z-10" />;
};

export default InteractiveBackground;
