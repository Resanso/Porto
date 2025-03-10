import { motion } from "framer-motion";
import {
  FiGithub,
  FiExternalLink,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import { useState, useEffect } from "react";

const Projects = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Check if window width is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const projects = [
    {
      title: "MotionShop",
      description:
        "Full-stack e-commerce solution with real-time inventory management and AI-powered recommendations",
      image: "/assets/project1.png", // Updated to absolute path from public folder
      tech: ["Flutter", "GetX", "Firebase", "PostgreSQL"],
      github: "https://github.com/Resanso/StudyGroup-MP-MotionLab",
      live: "https://example.com",
      color: "#64ffda",
    },
    {
      title: "NutriApp",
      description: "track your daily nutrition intake",
      image: "/assets/homepagenutriapp.jpg",
      tech: ["Flutter", "Firebase", "GetX"],
      github: "https://github.com/Resanso/NutriApp",
      live: "https://example.com",
      color: "#bd34fe",
    },
    {
      title: "JimApp",
      description:
        "Fitness app with real-time workout tracking and exercise feature",
      image: "/assets/stats.jpg",
      tech: ["Flutter", "GetX", "Firebase"],
      github:
        "https://github.com/Mobile-Innovation-Laboratory/Flutter_ResanSo_JimApp",
      live: "https://example.com",
      color: "#61dafb",
    },
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

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

        {/* Desktop View */}
        <div className="hidden md:grid md:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group relative h-[400px] perspective-1000"
            >
              {/* Background Image */}
              <co
                className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-40 transition-opacity duration-500 backdrop-blur-[2px]"
                style={{
                  backgroundImage: `url(${project.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />

              {/* Card Content */}
              <div className="card-glass h-full p-6 rounded-lg relative z-10 flex flex-col backdrop-blur-[5px] group-hover:backdrop-blur-[3px] transition-all duration-300">
                {/* Header */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className="w-12 h-1 rounded-full"
                      style={{ backgroundColor: project.color }}
                    />
                    <div className="flex gap-4 relative z-50">
                      {" "}
                      {/* Tambahkan z-50 */}
                      <motion.a
                        whileHover={{ y: -2 }}
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-light-slate hover:text-neon-cyan cursor-pointer" // Tambahkan cursor-pointer
                        onClick={(e) => e.stopPropagation()} // Tambahkan stopPropagation
                      >
                        <FiGithub size={20} />
                      </motion.a>
                      <motion.a
                        whileHover={{ y: -2 }}
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-light-slate hover:text-neon-cyan cursor-pointer" // Tambahkan cursor-pointer
                        onClick={(e) => e.stopPropagation()} // Tambahkan stopPropagation
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

        {/* Mobile Carousel View */}
        <div className="md:hidden relative">
          <div className="overflow-hidden">
            <motion.div
              animate={{ x: `-${currentIndex * 100}%` }}
              transition={{ type: "spring", damping: 20 }}
              className="flex"
            >
              {projects.map((project, index) => (
                <div key={index} className="w-full flex-shrink-0">
                  <div className="group relative h-[400px] perspective-1000 px-2">
                    {/* Background Image */}
                    <div
                      className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-40 transition-opacity duration-500 backdrop-blur-[2px]"
                      style={{
                        backgroundImage: `url(${project.image})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    />

                    {/* Card Content */}
                    <div className="card-glass h-full p-6 rounded-lg relative z-10 flex flex-col backdrop-blur-[5px] group-hover:backdrop-blur-[3px] transition-all duration-300">
                      {/* ... existing card content ... */}
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <div
                            className="w-12 h-1 rounded-full"
                            style={{ backgroundColor: project.color }}
                          />
                          <div className="flex gap-4 relative z-50">
                            {" "}
                            {/* Tambahkan z-50 */}
                            <motion.a
                              whileHover={{ y: -2 }}
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-light-slate hover:text-neon-cyan cursor-pointer" // Tambahkan cursor-pointer
                              onClick={(e) => e.stopPropagation()} // Tambahkan stopPropagation
                            >
                              <FiGithub size={20} />
                            </motion.a>
                            <motion.a
                              whileHover={{ y: -2 }}
                              href={project.live}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-light-slate hover:text-neon-cyan cursor-pointer" // Tambahkan cursor-pointer
                              onClick={(e) => e.stopPropagation()} // Tambahkan stopPropagation
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
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 bg-navy-light/80 p-3 rounded-full text-neon-cyan z-20"
          >
            <FiChevronLeft size={24} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 bg-navy-light/80 p-3 rounded-full text-neon-cyan z-20"
          >
            <FiChevronRight size={24} />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  currentIndex === index ? "bg-neon-cyan w-4" : "bg-slate"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
