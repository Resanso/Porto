import { motion, useMotionValue, useTransform } from "framer-motion";

const ProjectCard = ({ project }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [30, -30]);
  const rotateY = useTransform(x, [-100, 100], [-30, 30]);
  const glowX = useTransform(x, [-100, 100], [0, 255]);
  const glowY = useTransform(y, [-100, 100], [0, 255]);

  const handleMouse = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.x + rect.width / 2;
    const centerY = rect.y + rect.height / 2;
    x.set(event.clientX - centerX);
    y.set(event.clientY - centerY);
  };

  return (
    <motion.div
      onMouseMove={handleMouse}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="relative perspective-1000"
    >
      {/* Card content */}
    </motion.div>
  );
};
