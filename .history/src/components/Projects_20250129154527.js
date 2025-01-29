import { motion } from "framer-motion";
import {
  FiGithub,
  FiExternalLink,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import { useState, useEffect } from "react";
import ProjectCard from "./ProjectCard";

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
    <section id="projects" className="py-16 sm:py-20 px-4 sm:px-6 relative">
      <div className="container mx-auto">
        {/* Section Header - Updated for mobile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-lightest-slate mb-4">
            Featured Projects
          </h2>
          <p className="text-sm sm:text-base text-slate max-w-xl mx-auto px-4">
            A collection of projects that showcase my skills and experience in
            building digital products.
          </p>
        </motion.div>

        {/* Projects Grid - Updated for mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
