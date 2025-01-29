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
    renderer.setClearColor(0x0a192f, 0.8);
    containerRef.current.appendChild(renderer.domElement);

    // Create multiple particle systems
    const particleGroups = [];
    const particleCounts = [2000, 1500, 1000];
    const particleSizes = [0.02, 0.015, 0.01];
    const particleColors = [0x64ffda, 0xbd34fe, 0x8892b0];

    particleCounts.forEach((count, index) => {
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(count * 3);
      const velocities = new Float32Array(count * 3);

      for (let i = 0; i < count * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 10;
        positions[i + 1] = (Math.random() - 0.5) * 10;
        positions[i + 2] = (Math.random() - 0.5) * 10;

        velocities[i] = (Math.random() - 0.5) * 0.01;
        velocities[i + 1] = (Math.random() - 0.5) * 0.01;
        velocities[i + 2] = (Math.random() - 0.5) * 0.01;
      }

      geometry.setAttribute(
        "position",
        new THREE.BufferAttribute(positions, 3)
      );

      const material = new THREE.PointsMaterial({
        size: particleSizes[index],
        color: particleColors[index],
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending,
      });

      const particles = new THREE.Points(geometry, material);
      scene.add(particles);
      particleGroups.push({ particles, velocities });
    });

    camera.position.z = 5;

    let mouseX = 0;
    let mouseY = 0;
    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    const handleMouseMove = (event) => {
      mouseX = (event.clientX - windowHalfX) / windowHalfX;
      mouseY = (event.clientY - windowHalfY) / windowHalfY;
    };

    document.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      requestAnimationFrame(animate);

      particleGroups.forEach(({ particles, velocities }) => {
        const positions = particles.geometry.attributes.position.array;

        for (let i = 0; i < positions.length; i += 3) {
          positions[i] += velocities[i];
          positions[i + 1] += velocities[i + 1];
          positions[i + 2] += velocities[i + 2];

          // Boundary check and reset
          if (Math.abs(positions[i]) > 5) velocities[i] *= -1;
          if (Math.abs(positions[i + 1]) > 5) velocities[i + 1] *= -1;
          if (Math.abs(positions[i + 2]) > 5) velocities[i + 2] *= -1;
        }

        particles.rotation.x += mouseY * 0.0005;
        particles.rotation.y += mouseX * 0.0005;
        particles.geometry.attributes.position.needsUpdate = true;
      });

      renderer.render(scene, camera);
    };

    animate();

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
      scene.clear();
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} className="fixed inset-0 -z-10" />;
};

export default InteractiveBackground;
