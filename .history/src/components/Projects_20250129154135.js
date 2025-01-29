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
    <section id="projects" className="py-16 sm:py-32 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl sm:text-5xl font-mono text-light-slate mb-8 sm:mb-16 text-center">
          <span className="text-neon-cyan">02.</span> Featured Projects
        </h2>

        {/* Project cards container */}
        <div className="grid md:grid-cols-2 gap-4 sm:gap-8">
          {projects.map((project, index) => (
            <div key={index} className="p-2 sm:p-4">
              <ProjectCard project={project} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
