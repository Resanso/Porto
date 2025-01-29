import { motion } from "framer-motion";
import { FiGithub, FiExternalLink } from "react-icons/fi";
import { useRef } from "react";
import { useHasBeenViewed } from "../hooks/useHasBeenViewed";
import ProjectCard from "./ProjectCard";

const Projects = () => {
  const projects = [
    {
      title: "MotionShop",
      description:
        "Full-stack e-commerce solution with real-time inventory management and AI-powered recommendations",
      image: "https://picsum.photos/800/600?random=1",
      tech: ["Flutter", "GetX", "Firebase", "PostgreSQL"],
      github: "https://github.com",
      live: "https://example.com",
      color: "#64ffda",
    },
    {
      title: "EzyBrain",
      description:
        "Learning platform with ai-powered content recommendations and progress tracking",
      image: "https://picsum.photos/800/600?random=2",
      tech: ["Flutter", "Firebase", "GetX"],
      github: "https://github.com",
      live: "https://example.com",
      color: "#bd34fe",
    },
    {
      title: "AI Content Generator",
      description:
        "Machine learning powered platform for automated content generation and optimization",
      image: "https://picsum.photos/800/600?random=3",
      tech: ["Python", "TensorFlow", "FastAPI", "React"],
      github: "https://github.com",
      live: "https://example.com",
      color: "#61dafb",
    },
  ];

  const sectionRef = useRef(null);
  const hasBeenViewed = useHasBeenViewed(sectionRef);

  return (
    <section
      ref={sectionRef}
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

        <div className="grid md:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              project={project}
              index={index}
              shouldAnimate={hasBeenViewed}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
