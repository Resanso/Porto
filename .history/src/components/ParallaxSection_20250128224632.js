import { Parallax } from "react-scroll-parallax";
import { motion } from "framer-motion";

const ParallaxSection = () => {
  return (
    <div className="fixed inset-0 pointer-events-none">
      {/* Floating orbs */}
      <Parallax translateY={[-20, 20]} className="absolute top-1/4 left-1/4">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-32 h-32 blur-2xl bg-neon-cyan/20 rounded-full"
        />
      </Parallax>

      <Parallax
        translateY={[20, -20]}
        className="absolute bottom-1/4 right-1/4"
      >
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-40 h-40 blur-2xl bg-neon-purple/20 rounded-full"
        />
      </Parallax>

      {/* Grid lines */}
      <Parallax translateY={[-10, 10]} className="absolute inset-0">
        <div className="grid grid-cols-6 h-full opacity-10">
          {Array(6)
            .fill(null)
            .map((_, i) => (
              <div key={i} className="border-r border-neon-cyan/20" />
            ))}
        </div>
      </Parallax>

      {/* Diagonal lines */}
      <Parallax translateY={[15, -15]} className="absolute inset-0">
        <svg className="w-full h-full opacity-10">
          <line
            x1="0"
            y1="100%"
            x2="100%"
            y2="0"
            stroke="#64ffda"
            strokeWidth="0.5"
          />
          <line
            x1="50%"
            y1="100%"
            x2="100%"
            y2="50%"
            stroke="#64ffda"
            strokeWidth="0.5"
          />
          <line
            x1="0"
            y1="50%"
            x2="50%"
            y2="0"
            stroke="#64ffda"
            strokeWidth="0.5"
          />
        </svg>
      </Parallax>
    </div>
  );
};

export default ParallaxSection;
