import { motion } from "framer-motion";
import { FiGithub, FiExternalLink } from "react-icons/fi";

export const ProjectCard = ({ project, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group relative h-[300px] sm:h-[400px] perspective-1000"
    >
      <div className="relative p-4 sm:p-6 h-full rounded-xl card-glass">
        <div className="absolute inset-0 rounded-xl overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover opacity-10 group-hover:opacity-20 transition-opacity duration-300"
          />
        </div>

        <div className="relative z-10 flex flex-col h-full">
          <h3 className="text-xl sm:text-2xl font-bold text-lightest-slate mb-2 sm:mb-4">
            {project.title}
          </h3>
          <p className="text-sm sm:text-base text-slate mb-4 sm:mb-6 line-clamp-3">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
            {project.technologies.map((tech, idx) => (
              <span
                key={idx}
                className="text-xs sm:text-sm px-2 py-1 rounded-full bg-navy-lighter text-neon-cyan"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="mt-auto flex gap-3">{/* ...existing links... */}</div>
        </div>
      </div>
    </motion.div>
  );
};
