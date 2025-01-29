import { motion } from "framer-motion";

const Projects = () => {
  const projects = [
    {
      title: "Project 1",
      description: "Description of project 1",
      image: "https://picsum.photos/300/200",
      tech: ["React", "Node.js", "MongoDB"],
    },
    {
      title: "Project 2",
      description: "Description of project 2",
      image: "https://picsum.photos/300/201",
      tech: ["React", "Firebase", "Tailwind"],
    },
    {
      title: "Project 3",
      description: "Description of project 3",
      image: "https://picsum.photos/300/202",
      tech: ["Next.js", "TypeScript", "PostgreSQL"],
    },
  ];

  return (
    <section
      id="projects"
      className="py-32 bg-dark-blue relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-radial from-navy-lighter/20 to-transparent" />

      <div className="max-w-6xl mx-auto px-4 relative">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-5xl font-mono text-lightest-slate mb-16 text-center"
        >
          <span className="text-neon-cyan font-normal">{"//"}</span> Featured
          Projects
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group relative bg-glass-gradient backdrop-blur-sm rounded-xl overflow-hidden border border-navy-lighter/50"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-dark-blue/90 to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />

              <img
                src={project.image}
                alt={project.title}
                className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
              />

              <div className="absolute inset-0 p-8 flex flex-col justify-end transform translate-y-8 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-2xl font-mono text-neon-cyan mb-3">
                  {project.title}
                </h3>
                <p className="text-light-slate mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-dark-blue/70 text-neon-cyan text-sm font-mono rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
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
