import { motion } from "framer-motion";
import { FiGithub, FiExternalLink } from "react-icons/fi";

const ProjectCard = ({ project, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group relative h-[300px] sm:h-[350px] perspective-1000 w-full"
    >
      <div className="card-glass h-full rounded-lg p-5 sm:p-6">
        {/* Project Image */}
        <div className="relative h-32 sm:h-40 mb-4 overflow-hidden rounded-md">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover object-center transform 
            group-hover:scale-110 transition-transform duration-500"
          />
        </div>

        {/* Project Content */}
        <div className="space-y-2 sm:space-y-3">
          <h3 className="text-lg sm:text-xl font-bold text-lightest-slate">
            {project.title}
          </h3>
          <p className="text-sm sm:text-base text-slate line-clamp-2">
            {project.description}
          </p>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2 pt-2">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="text-xs sm:text-sm px-2 py-1 rounded-full 
                bg-navy-light text-neon-cyan/80"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Links */}
          <div className="flex gap-3 pt-2 sm:pt-3">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-light-slate hover:text-neon-cyan transition-colors"
              >
                <FiGithub className="w-5 h-5 sm:w-6 sm:h-6" />
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="text-light-slate hover:text-neon-cyan transition-colors"
              >
                <FiExternalLink className="w-5 h-5 sm:w-6 sm:h-6" />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
