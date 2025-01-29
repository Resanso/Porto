import { motion } from "framer-motion";
import { useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import ProjectCard from "./ProjectCard";

const Projects = () => {
  const [activeIndex, setActiveIndex] = useState(0);

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
    setActiveIndex((prev) => (prev + 1) % projects.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  return (
    <section id="projects" className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <motion.h2
          className="text-2xl md:text-3xl lg:text-4xl font-bold text-lightest-slate mb-4 md:mb-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          Featured Projects
        </motion.h2>

        {/* Desktop Grid View */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {projects.map((project, index) => (
                <div key={index} className="w-full flex-shrink-0">
                  <ProjectCard project={project} index={0} />
                </div>
              ))}
            </div>
          </div>

          {/* Carousel Controls */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 p-2 bg-navy-light/80 rounded-full"
          >
            <FiChevronLeft className="text-xl text-neon-cyan" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 p-2 bg-navy-light/80 rounded-full"
          >
            <FiChevronRight className="text-xl text-neon-cyan" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-4">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === activeIndex ? "bg-neon-cyan" : "bg-navy-lighter"
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
