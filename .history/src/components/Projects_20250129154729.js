import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";
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
    <section id="projects" className="py-12 sm:py-16 px-3 sm:px-6 relative">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="text-xl sm:text-3xl md:text-4xl font-bold text-lightest-slate mb-2 sm:mb-4">
            Featured Projects
          </h2>
          <p className="text-xs sm:text-base text-slate max-w-xl mx-auto px-2 sm:px-4">
            A collection of projects that showcase my skills and experience
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
