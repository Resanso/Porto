import { motion } from "framer-motion";
import { FiGithub, FiExternalLink } from "react-icons/fi";

const Projects = () => {
  const projects = [
    {
      title: "E-Commerce Platform",
      description:
        "Full-stack e-commerce solution with real-time inventory management and AI-powered recommendations",
      image: "https://picsum.photos/800/600?random=1",
      tech: ["Next.js", "TypeScript", "Node.js", "PostgreSQL"],
      github: "https://github.com",
      live: "https://example.com",
      color: "#64ffda",
    },
    {
      title: "Social Media Dashboard",
      description:
        "Real-time analytics dashboard for social media management with advanced data visualization",
      image: "https://picsum.photos/800/600?random=2",
      tech: ["React", "Firebase", "TailwindCSS", "Redux"],
      github: "https://github.com",
      live: "https://example.com",
      color: "#bd34fe",
    },
    {
      title: "AI Content Generator",
      description:
        "Machine learning powered platform for automated content generation and optimization",
      image: "https://picsum.photos/800/600?random=3",
      tech: ["Python", "TensorFlow", "FastAPI", "React"],
      github: "https://github.com",
      live: "https://example.com",
      color: "#61dafb",
    },
  ];

  return (
    <section
      id="projects"
      className="py-32 bg-dark-blue relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-circuit-pattern opacity-5" />
      <div className="absolute inset-0 bg-gradient-radial from-navy-lighter/20 to-transparent" />

      <div className="max-w-6xl mx-auto px-4 relative">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl font-mono text-lightest-slate mb-16 text-center"
        >
          <span className="text-neon-cyan font-normal">02.</span> Featured
          Projects
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group relative h-[400px] perspective-1000"
            >
              {/* Background Image */}
              <div
                className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                style={{
                  backgroundImage: `url(${project.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />

              {/* Card Content */}
              <div className="card-glass h-full p-6 rounded-lg relative z-10 flex flex-col">
                {/* Header */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className="w-12 h-1 rounded-full"
                      style={{ backgroundColor: project.color }}
                    />
                    <div className="flex gap-4">
                      <motion.a
                        whileHover={{ y: -2 }}
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-light-slate hover:text-neon-cyan"
                      >
                        <FiGithub size={20} />
                      </motion.a>
                      <motion.a
                        whileHover={{ y: -2 }}
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-light-slate hover:text-neon-cyan"
                      >
                        <FiExternalLink size={20} />
                      </motion.a>
                    </div>
                  </div>

                  <h3 className="text-2xl font-medium text-lightest-slate mb-3 group-hover:text-neon-cyan transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-slate text-sm leading-relaxed mb-6">
                    {project.description}
                  </p>
                </div>

                {/* Tech stack */}
                <div className="mt-auto">
                  <ul className="flex flex-wrap gap-3">
                    {project.tech.map((tech, i) => (
                      <li
                        key={i}
                        className="text-xs font-mono px-3 py-1 rounded-full bg-navy-light/50 text-neon-cyan"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Hover border effect */}
                <div className="absolute inset-0 border border-neon-cyan/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
