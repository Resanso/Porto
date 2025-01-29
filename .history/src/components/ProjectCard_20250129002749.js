import { motion } from "framer-motion";
import { FiGithub, FiExternalLink } from "react-icons/fi";

const ProjectCard = ({ project, index, shouldAnimate }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={shouldAnimate ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1 }}
      className="group relative h-[400px] perspective-1000"
    >
      // ...existing card content...
    </motion.div>
  );
};

export default ProjectCard;
