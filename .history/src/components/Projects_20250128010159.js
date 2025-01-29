import { motion } from "framer-motion";
import { FiGithub, FiExternalLink, FiFolder } from "react-icons/fi";

const Projects = () => {
  const projects = [
    {
      title: "Advanced E-Commerce Platform",
      description:
        "Full-stack e-commerce solution with real-time inventory management, AI product recommendations, and secure payment processing.",
      tech: ["Next.js", "TypeScript", "Node.js", "PostgreSQL"],
      github: "https://github.com",
      live: "https://example.com",
      color: "#64ffda",
    },
    {
      title: "Project 1",
      description:
        "A comprehensive web application built with modern technologies. Features include real-time updates, user authentication, and responsive design.",
      image: "https://picsum.photos/800/600",
      tech: ["React", "Node.js", "MongoDB", "WebSocket"],
      github: "https://github.com",
      live: "https://example.com",
      featured: true,
    },
    {
      title: "Project 2",
      description:
        "Mobile-first social platform that allows users to share and discover new content. Implements modern UI/UX principles.",
      image: "https://picsum.photos/801/600",
      tech: ["React", "Firebase", "Tailwind", "Redux"],
      github: "https://github.com",
      live: "https://example.com",
      featured: true,
    },
    {
      title: "Project 3",
      description:
        "Full-stack e-commerce solution with advanced features like real-time inventory management and payment processing.",
      image: "https://picsum.photos/802/600",
      tech: ["Next.js", "TypeScript", "PostgreSQL", "Stripe"],
      github: "https://github.com",
      live: "https://example.com",
      featured: true,
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group relative"
            >
              {/* Glowing border effect */}
              <div
                className="absolute -inset-0.5 rounded-lg opacity-75 blur-sm transition-all duration-300 group-hover:opacity-100"
                style={{
                  background: `linear-gradient(45deg, ${project.color}20, transparent)`,
                }}
              />

              <div className="card-glass relative p-6 rounded-lg h-full flex flex-col justify-between">
                {/* Header */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-lg bg-neon-cyan/10 flex items-center justify-center">
                      <FiFolder className="w-5 h-5 text-neon-cyan" />
                    </div>
                    <div className="flex gap-4">
                      {project.github && (
                        <motion.a
                          whileHover={{ y: -2 }}
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-light-slate hover:text-neon-cyan"
                        >
                          <FiGithub size={18} />
                        </motion.a>
                      )}
                      {project.live && (
                        <motion.a
                          whileHover={{ y: -2 }}
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-light-slate hover:text-neon-cyan"
                        >
                          <FiExternalLink size={18} />
                        </motion.a>
                      )}
                    </div>
                  </div>

                  <h3 className="text-xl font-medium text-lightest-slate mb-2 group-hover:text-neon-cyan transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-slate text-sm mb-4">
                    {project.description}
                  </p>
                </div>

                {/* Tech stack */}
                <ul className="flex flex-wrap gap-2 mt-4">
                  {project.tech.map((tech, i) => (
                    <li key={i} className="text-xs font-mono text-slate">
                      {tech}
                      {i !== project.tech.length - 1 && (
                        <span className="ml-2 text-neon-cyan">·</span>
                      )}
                    </li>
                  ))}
                </ul>

                {/* Hover effect overlay */}
                <motion.div
                  initial={false}
                  animate={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="absolute inset-0 bg-gradient-to-t from-neon-cyan/10 to-transparent rounded-lg pointer-events-none"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
