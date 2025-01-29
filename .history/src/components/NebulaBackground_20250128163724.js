import { useEffect, useRef } from "react";
import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";

const NebulaBackground = () => {
  const containerRef = useRef();

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);

    // Nebula cloud
    const createNebula = () => {
      const geometry = new THREE.BufferGeometry();
      const particles = 15000;
      const positions = new Float32Array(particles * 3);
      const colors = new Float32Array(particles * 3);

      const colorPalette = [
        new THREE.Color(0x64ffda), // cyan
        new THREE.Color(0xbd34fe), // purple
        new THREE.Color(0x0a192f), // dark blue
      ];

      for (let i = 0; i < particles * 3; i += 3) {
        const radius = 5;
        const theta = THREE.MathUtils.randFloatSpread(360);
        const phi = THREE.MathUtils.randFloatSpread(360);

        positions[i] = radius * Math.sin(theta) * Math.cos(phi);
        positions[i + 1] = radius * Math.sin(theta) * Math.sin(phi);
        positions[i + 2] = radius * Math.cos(theta);

        const color =
          colorPalette[Math.floor(Math.random() * colorPalette.length)];
        colors[i] = color.r;
        colors[i + 1] = color.g;
        colors[i + 2] = color.b;
      }

      geometry.setAttribute(
        "position",
        new THREE.BufferAttribute(positions, 3)
      );
      geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

      const material = new THREE.PointsMaterial({
        size: 0.025,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending,
      });

      return {
        points: new THREE.Points(geometry, material),
        geometry,
        material,
      };
    };

    const { points, geometry, material } = createNebula();
    scene.add(points);

    // Post-processing
    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));

    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      1.5, // strength
      0.4, // radius
      0.85 // threshold
    );
    composer.addPass(bloomPass);

    camera.position.z = 8;

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      points.rotation.x += 0.0003;
      points.rotation.y += 0.0005;
      composer.render();
    };

    animate();

    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (event) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

      points.rotation.y += mouseX * 0.0005;
      points.rotation.x += mouseY * 0.0005;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      containerRef.current?.removeChild(renderer.domElement);
      scene.remove(points);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} className="fixed inset-0 -z-10" />;
};

export default NebulaBackground;
