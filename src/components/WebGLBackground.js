import { useEffect, useRef } from "react";
import * as THREE from "three";

const WebGLBackground = () => {
  const containerRef = useRef();

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ alpha: true });

    // Create animated gradient noise using shaders
    const fragmentShader = `
      uniform float time;
      uniform vec2 resolution;
      varying vec2 vUv;
      
      void main() {
        vec2 pos = vUv * 2.0 - 1.0;
        float noise = sin(pos.x * 10.0 + time) * sin(pos.y * 10.0 + time) * 0.5;
        gl_FragColor = vec4(vec3(noise + 0.5) * vec3(0.4, 1.0, 0.8), 1.0);
      }
    `;

    // Add animation loop and cleanup
  }, []);

  return <div ref={containerRef} className="fixed inset-0 -z-10" />;
};
