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

    // Create multiple particle layers
    const createParticleLayer = (count, size, color, speed) => {
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(count * 3);

      for (let i = 0; i < count * 3; i += 3) {
        positions[i] = Math.random() * 2000 - 1000;
        positions[i + 1] = Math.random() * 2000 - 1000;
        positions[i + 2] = Math.random() * 2000 - 1000;
      }

      geometry.setAttribute(
        "position",
        new THREE.BufferAttribute(positions, 3)
      );

      const material = new THREE.PointsMaterial({
        size,
        color,
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending,
      });

      const points = new THREE.Points(geometry, material);
      points.userData.speed = speed;
      scene.add(points);
      return points;
    };

    // Create multiple layers with different properties
    const layers = [
      createParticleLayer(1000, 0.8, 0x64ffda, 0.2), // Cyan particles
      createParticleLayer(800, 0.5, 0xbd34fe, 0.15), // Purple particles
      createParticleLayer(1200, 0.3, 0x8892b0, 0.1), // Slate particles
    ];

    camera.position.z = 1000;

    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    const onMouseMove = (event) => {
      mouseX = (event.clientX - windowHalfX) * 0.05;
      mouseY = (event.clientY - windowHalfY) * 0.05;
    };

    document.addEventListener("mousemove", onMouseMove);

    const animate = () => {
      requestAnimationFrame(animate);

      // Rotate and move particles
      layers.forEach((layer, i) => {
        layer.rotation.x += 0.0003 * layer.userData.speed;
        layer.rotation.y += 0.0005 * layer.userData.speed;
        layer.position.x +=
          (mouseX * layer.userData.speed - layer.position.x) * 0.02;
        layer.position.y +=
          (-mouseY * layer.userData.speed - layer.position.y) * 0.02;
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
      document.removeEventListener("mousemove", onMouseMove);
      containerRef.current?.removeChild(renderer.domElement);
      scene.clear();
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} className="fixed inset-0 -z-10" />;
};

export default InteractiveBackground;
