import { Parallax } from "react-scroll-parallax";
import { motion } from "framer-motion";

const ParallaxSection = () => {
  return (
    <div className="fixed inset-0 pointer-events-none">
      {/* Background grid */}
      <Parallax translateY={[-20, 20]} className="absolute inset-0">
        <div className="w-full h-full opacity-[0.02] grid grid-cols-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="border-r border-neon-cyan" />
          ))}
        </div>
      </Parallax>

      {/* Floating elements */}
      <Parallax translateY={[-40, 40]} className="absolute top-1/4 left-1/4">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-32 h-32 blur-[100px] bg-neon-cyan rounded-full"
        />
      </Parallax>

      <Parallax
        translateY={[40, -40]}
        className="absolute bottom-1/4 right-1/4"
      >
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-40 h-40 blur-[100px] bg-neon-purple rounded-full"
        />
      </Parallax>

      {/* Geometric shapes */}
      <Parallax rotate={[0, 360]} className="absolute top-1/3 right-1/3">
        <div className="w-24 h-24 border border-neon-cyan/20 rotate-45" />
      </Parallax>

      <Parallax scale={[0.8, 1.2]} className="absolute bottom-1/3 left-1/3">
        <div className="w-20 h-20 border border-neon-purple/20 rounded-full" />
      </Parallax>

      {/* Diagonal lines */}
      <Parallax translateX={[-20, 20]} className="absolute inset-0">
        <svg className="w-full h-full opacity-[0.02]">
          <line
            x1="0"
            y1="100%"
            x2="100%"
            y2="0"
            stroke="#64ffda"
            strokeWidth="1"
          />
          <line
            x1="50%"
            y1="100%"
            x2="100%"
            y2="50%"
            stroke="#64ffda"
            strokeWidth="1"
          />
          <line
            x1="0"
            y1="50%"
            x2="50%"
            y2="0"
            stroke="#64ffda"
            strokeWidth="1"
          />
        </svg>
      </Parallax>
    </div>
  );
};

export default ParallaxSection;
