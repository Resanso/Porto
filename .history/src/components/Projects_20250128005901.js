import { motion } from "framer-motion";
import { FiGithub, FiExternalLink } from "react-icons/fi";

const Projects = () => {
  const projects = [
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

        <div className="space-y-32">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative group"
            >
              <div
                className={`grid md:grid-cols-12 gap-4 items-center ${
                  index % 2 === 0 ? "md:text-left" : "md:text-right"
                }`}
              >
                {/* Project Image */}
                <div
                  className={`md:col-span-7 relative ${
                    index % 2 === 1 ? "md:order-2" : ""
                  }`}
                >
                  <div className="relative group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-300">
                    {/* Image wrapper */}
                    <div className="relative overflow-hidden rounded-lg">
                      <div className="absolute inset-0 bg-neon-cyan/20 group-hover:opacity-0 transition-opacity duration-300 z-10" />
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full aspect-video object-cover filter brightness-75 group-hover:brightness-100 transition-all duration-300 transform group-hover:scale-105"
                      />
                    </div>
                  </div>
                </div>

                {/* Project Info */}
                <div
                  className={`md:col-span-5 ${
                    index % 2 === 1 ? "md:order-1 md:pr-8" : "md:pl-8"
                  }`}
                >
                  <p className="font-mono text-neon-cyan text-sm mb-2">
                    Featured Project
                  </p>
                  <h3 className="text-2xl font-bold text-lightest-slate mb-4">
                    {project.title}
                  </h3>

                  <div className="relative">
                    <div className="card-glass p-6 rounded-lg backdrop-blur-sm text-slate mb-4">
                      {project.description}
                    </div>
                  </div>

                  <ul
                    className={`flex flex-wrap gap-2 text-sm font-mono mb-4 ${
                      index % 2 === 1 ? "md:justify-end" : ""
                    }`}
                  >
                    {project.tech.map((tech, i) => (
                      <li
                        key={i}
                        className="px-3 py-1 bg-navy-light/50 text-neon-cyan rounded-full"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>

                  <div
                    className={`flex gap-4 ${
                      index % 2 === 1 ? "md:justify-end" : ""
                    }`}
                  >
                    <motion.a
                      whileHover={{ y: -2 }}
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-light-slate hover:text-neon-cyan transition-colors"
                    >
                      <FiGithub size={20} />
                    </motion.a>
                    <motion.a
                      whileHover={{ y: -2 }}
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-light-slate hover:text-neon-cyan transition-colors"
                    >
                      <FiExternalLink size={20} />
                    </motion.a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
