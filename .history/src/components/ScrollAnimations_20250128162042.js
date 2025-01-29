import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export const ScrollAnimatedSection = ({ children }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Mengubah nilai transform untuk memastikan konten tetap terlihat
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, 100]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity }}
      className="relative min-h-screen w-full"
    >
      <motion.div style={{ y }}>{children}</motion.div>
    </motion.div>
  );
};

export default ScrollAnimatedSection;
