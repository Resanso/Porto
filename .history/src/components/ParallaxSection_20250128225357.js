import { useScroll, useTransform, motion } from "framer-motion";

const ParallaxSection = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0]);

  return (
    <motion.div
      style={{ y, opacity }}
      className="fixed inset-0 pointer-events-none"
    >
      {/* Parallax content */}
    </motion.div>
  );
};

export default ParallaxSection;
