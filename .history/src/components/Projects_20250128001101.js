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
    <section id="projects" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">
          Featured Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="bg-white dark:bg-gray-700 rounded-lg overflow-hidden shadow-lg"
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-blue-100 dark:bg-blue-900 rounded-full text-sm"
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
