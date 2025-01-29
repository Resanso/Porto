import { motion } from "framer-motion";
import { FiGithub, FiExternalLink } from "react-icons/fi";

const ProjectCard = ({ project, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group relative h-[280px] sm:h-[350px] perspective-1000"
    >
      <div className="card-glass h-full rounded-lg p-3 sm:p-5">
        {/* Project Image */}
        <div className="relative h-24 sm:h-32 mb-2 sm:mb-4 overflow-hidden rounded-md">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover object-center transform 
            group-hover:scale-110 transition-transform duration-500"
          />
        </div>

        {/* Project Content */}
        <div className="space-y-1.5 sm:space-y-3">
          <h3 className="text-base sm:text-xl font-bold text-lightest-slate">
            {project.title}
          </h3>
          <p className="text-xs sm:text-base text-slate line-clamp-2 leading-relaxed">
            {project.description}
          </p>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-1 sm:pt-2">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="text-[10px] sm:text-sm px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full 
                bg-navy-light text-neon-cyan/80"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Links */}
          <div className="flex gap-2 sm:gap-3 pt-1 sm:pt-2">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-light-slate hover:text-neon-cyan transition-colors"
              >
                <FiGithub className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="text-light-slate hover:text-neon-cyan transition-colors"
              >
                <FiExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
