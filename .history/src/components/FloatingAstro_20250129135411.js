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
      // Tambahkan pengaturan untuk warna yang lebih akurat
      outputColorSpace: THREE.SRGBColorSpace,
      toneMapping: THREE.ACESFilmicToneMapping,
      toneMappingExposure: 1,
    });

    renderer.setSize(200, 200);
    renderer.setClearColor(0x000000, 0);
    containerRef.current.appendChild(renderer.domElement);

    // Sesuaikan pencahayaan
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8); // Kurangi intensitas
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 3); // Ganti warna ke putih
    directionalLight.position.set(2, 2, 2);
    scene.add(directionalLight);

    let model;
    const loader = new GLTFLoader();

    loader.load(
      "/astro.glb",
      (gltf) => {
        model = gltf.scene;

        // Tambahkan pengaturan material
        model.traverse((child) => {
          if (child.isMesh) {
            child.material.needsUpdate = true;
            // Pastikan material menggunakan color space yang benar
            child.material.colorSpace = THREE.SRGBColorSpace;
          }
        });

        model.scale.set(1.5, 1.5, 1.5);
        model.position.set(0, 0, 0);
        scene.add(model);

        camera.position.z = 10;

        let rotationAngle = 0;
        const animate = () => {
          requestAnimationFrame(animate);

          if (model) {
            // Rotasi model
            rotationAngle += 0.01;
            model.rotation.y = rotationAngle;

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
