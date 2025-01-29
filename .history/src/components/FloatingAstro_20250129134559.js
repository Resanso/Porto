import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const FloatingAstro = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });

    renderer.setSize(200, 200);
    renderer.setClearColor(0x000000, 0);
    containerRef.current.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0x64ffda, 2);
    directionalLight.position.set(2, 2, 2);
    scene.add(directionalLight);

    let model;
    const loader = new GLTFLoader();

    loader.load(
      "/astro.glb",
      (gltf) => {
        model = gltf.scene;
        // Sesuaikan skala model agar tetap konsisten
        model.scale.set(1.5, 1.5, 1.5);
        // Posisikan model di tengah
        model.position.set(0, 0, 0);
        scene.add(model);

        // Posisikan kamera agar model terlihat penuh
        camera.position.z = 5;

        const animate = () => {
          requestAnimationFrame(animate);

          if (model) {
            // Animasi melayang naik turun dengan amplitudo kecil
            model.position.y = Math.sin(Date.now() * 0.001) * 0.1;
            // Rotasi di tempat dengan kecepatan lambat
            model.rotation.y += 0.01;
          }

          renderer.render(scene, camera);
        };

        animate();
      },
      undefined,
      (error) => console.error("Error loading astronaut model:", error)
    );

    return () => {
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
    <div
      ref={containerRef}
      className="w-[200px] h-[200px] pointer-events-none"
      style={{
        filter: "drop-shadow(0 0 10px rgba(100, 255, 218, 0.2))",
      }}
    />
  );
};

export default FloatingAstro;
