import { motion } from "framer-motion";

const LoadingScreen = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-dark-blue z-50 flex items-center justify-center"
    >
      <div className="relative">
        {/* Hexagon shape dengan glow effect */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 360],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
          className="w-24 h-24 hexagon-bg bg-neon-cyan relative"
          style={{
            filter: "drop-shadow(0 0 20px #64ffda)",
          }}
        />

        {/* Loading text dengan typing effect */}
        <motion.p
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="absolute top-full mt-4 text-neon-cyan font-mono"
        >
          Loading...
        </motion.p>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
