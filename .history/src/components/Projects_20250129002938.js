import { motion } from "framer-motion";
import { FiGithub, FiExternalLink } from "react-icons/fi";
import { useRef } from "react";
import { useHasBeenViewed } from "../hooks/useHasBeenViewed";
import ProjectCard from "./ProjectCard";

const Projects = () => {
  const sectionRef = useRef(null);
  const hasBeenViewed = useHasBeenViewed(sectionRef);

  const projects = [
    {
      title: "Portfolio Website",
      description:
        "A personal portfolio website built with React and Tailwind CSS, featuring smooth animations and 3D elements.",
      technologies: ["React", "Tailwind CSS", "Three.js", "Framer Motion"],
      github: "https://github.com/yourusername/portfolio",
      live: "https://yourportfolio.com",
    },
    {
      title: "E-commerce Platform",
      description:
        "Full-stack e-commerce platform with authentication, payment processing, and inventory management.",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
      github: "https://github.com/yourusername/ecommerce",
      live: "https://yourecommerce.com",
    },
    // Add more projects as needed
  ];

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="py-32 bg-dark-blue relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-navy-lighter/40 to-transparent" />
      <div className="max-w-6xl mx-auto px-4 relative">
        <h2 className="text-5xl font-mono text-light-slate mb-16 text-center">
          <span className="text-neon-cyan">02.</span> Projects
        </h2>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
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
