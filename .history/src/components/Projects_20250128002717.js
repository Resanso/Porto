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
    <section id="projects" className="py-32 bg-dark-blue">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-5xl font-mono text-light-slate mb-16 text-center">
          <span className="text-neon-cyan">02.</span> Featured Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="group relative bg-navy-light rounded-lg overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="absolute inset-0 bg-neon-cyan/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-56 object-cover brightness-90 group-hover:brightness-110 transition-all"
              />
              <div className="p-8">
                <h3 className="text-2xl font-mono text-neon-cyan mb-4">
                  {project.title}
                </h3>
                <p className="text-slate mb-6">{project.description}</p>
                <div className="flex flex-wrap gap-3">
                  {project.tech.map((tech, i) => (
                    <span
                      key={i}
                      className="px-4 py-1.5 bg-dark-blue/50 text-neon-cyan text-sm font-mono rounded-full"
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
