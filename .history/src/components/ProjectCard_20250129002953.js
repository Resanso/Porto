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
      {/* Glowing background effect */}
      <div
        className="absolute -inset-2 rounded-lg opacity-75 blur-xl transition-all duration-300 group-hover:opacity-100"
        style={{
          background:
            "linear-gradient(120deg, transparent, rgba(100, 255, 218, 0.1), transparent)",
          filter: "blur(20px)",
        }}
      />

      {/* Card Content */}
      <div className="card-glass h-full relative p-6 rounded-lg backdrop-blur-sm border border-white/10">
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-mono text-light-slate group-hover:text-neon-cyan transition-colors">
              {project.title}
            </h3>
            <div className="flex gap-4">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate hover:text-neon-cyan transition-colors"
                >
                  <FiGithub size={20} />
                </a>
              )}
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate hover:text-neon-cyan transition-colors"
                >
                  <FiExternalLink size={20} />
                </a>
              )}
            </div>
          </div>

          <p className="text-slate mb-4">{project.description}</p>

          <div className="mt-auto">
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, index) => (
                <span
                  key={index}
                  className="text-xs font-mono text-neon-cyan bg-navy-lighter px-2 py-1 rounded"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
