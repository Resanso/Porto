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
    <section id="projects" className="py-20 bg-dark-blue">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-mono text-neon-cyan mb-12">
          Featured Projects
        </h2>
        <motion.div
          className="flex overflow-x-auto space-x-6 pb-8 scrollbar-hide"
          drag="x"
          dragConstraints={{ left: -1000, right: 0 }}
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="flex-none w-80 bg-glass backdrop-blur-md border border-neon-cyan/20 rounded-lg overflow-hidden"
              whileHover={{ scale: 1.02, borderColor: "rgb(100, 255, 218)" }}
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-mono text-neon-cyan mb-2">
                  {project.title}
                </h3>
                <p className="text-white/70 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-dark-blue/50 border border-neon-cyan/30 rounded-full text-sm font-mono text-neon-cyan"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
