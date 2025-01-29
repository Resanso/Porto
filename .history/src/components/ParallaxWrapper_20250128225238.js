import { Parallax } from "react-scroll-parallax";
import { motion } from "framer-motion";

const ParallaxWrapper = ({ children, className }) => {
  return (
    <div className={`relative ${className}`}>
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <Parallax translateY={[-20, 20]} className="absolute -top-1/4 left-1/4">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{ duration: 5, repeat: Infinity }}
            className="w-72 h-72 blur-[100px] bg-neon-cyan/20 rounded-full"
          />
        </Parallax>

        <Parallax
          translateY={[30, -30]}
          className="absolute -bottom-1/4 right-1/4"
        >
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{ duration: 7, repeat: Infinity }}
            className="w-96 h-96 blur-[100px] bg-neon-purple/20 rounded-full"
          />
        </Parallax>

        {/* Grid Lines */}
        <Parallax translateX={[-10, 10]} className="absolute inset-0">
          <div className="grid grid-cols-6 h-full opacity-5">
            {Array(6)
              .fill(null)
              .map((_, i) => (
                <div key={i} className="border-r border-neon-cyan/20" />
              ))}
          </div>
        </Parallax>
      </div>

      {/* Content with Parallax */}
      <Parallax translateY={[20, -20]} className="relative z-10">
        {children}
      </Parallax>
    </div>
  );
};

export default ParallaxWrapper;
