import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export const ScrollAnimatedSection = ({ children }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const scale = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0.8, 1, 1, 0.8]
  );
  const y = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [100, 0, 0, -100]);

  return (
    <motion.div ref={ref} style={{ opacity, scale, y }} className="relative">
      {children}
    </motion.div>
  );
};

export default ScrollAnimatedSection;
