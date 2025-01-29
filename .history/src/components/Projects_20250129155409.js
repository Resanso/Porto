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
      title: "EzyBrain",
      description:
        "Learning platform with ai-powered content recommendations and progress tracking",
      image: "/assets/project2.png",
      tech: ["Flutter", "Firebase", "GetX"],
      github: "https://github.com/Resanso",
      live: "https://example.com",
      color: "#bd34fe",
    },
    {
      title: "Coming Soon",
      description: "stay tuned for more exciting projects",
      image: "https://picsum.photos/800/600?random=3",
      tech: [""],
      github: "https://github.com",
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
      className="py-20 md:py-32 bg-dark-blue relative overflow-hidden"
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
        <div className="md:hidden relative px-4">
          <div className="overflow-hidden">
            <motion.div
              animate={{ x: `-${currentIndex * 100}%` }}
              transition={{ type: "spring", damping: 20 }}
              className="flex"
            >
              {projects.map((project, index) => (
                <div key={index} className="w-full flex-shrink-0">
                  <div className="group relative h-[350px] perspective-1000 px-2">
                    {/* Background Image */}
                    <div
                      className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-40 transition-opacity duration-500 backdrop-blur-[2px]"
                      style={{
                        backgroundImage: `url(${project.image})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    />

                    {/* Card Content - Adjusted for mobile */}
                    <div className="card-glass h-full p-4 rounded-lg relative z-10 flex flex-col">
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <div
                            className="w-10 h-1 rounded-full"
                            style={{ backgroundColor: project.color }}
                          />
                          <div className="flex gap-3">
                            <motion.a
                              whileHover={{ y: -2 }}
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-light-slate hover:text-neon-cyan"
                            >
                              <FiGithub size={18} />
                            </motion.a>
                            <motion.a
                              whileHover={{ y: -2 }}
                              href={project.live}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-light-slate hover:text-neon-cyan"
                            >
                              <FiExternalLink size={18} />
                            </motion.a>
                          </div>
                        </div>

                        <h3 className="text-xl font-medium text-lightest-slate mb-2">
                          {project.title}
                        </h3>
                        <p className="text-sm text-slate leading-relaxed mb-4">
                          {project.description}
                        </p>
                      </div>

                      <div className="mt-auto">
                        <ul className="flex flex-wrap gap-2">
                          {project.tech.map((tech, i) => (
                            <li
                              key={i}
                              className="text-xs font-mono px-2 py-1 rounded-full bg-navy-light/50 text-neon-cyan"
                            >
                              {tech}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Navigation Buttons - Adjusted for mobile */}
          <button
            onClick={prevSlide}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-navy-light/80 p-2 rounded-full text-neon-cyan z-20"
          >
            <FiChevronLeft size={20} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-navy-light/80 p-2 rounded-full text-neon-cyan z-20"
          >
            <FiChevronRight size={20} />
          </button>

          {/* Dots Indicator - Adjusted for mobile */}
          <div className="flex justify-center gap-2 mt-4">
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
