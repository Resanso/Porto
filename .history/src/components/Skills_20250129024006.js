import { motion } from "framer-motion";
import { useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaNode,
  FaGitAlt,
  FaFigma,
  FaSass,
  FaBootstrap,
} from "react-icons/fa";
import {
  SiTailwindcss,
  SiTypescript,
  SiMongodb,
  SiFirebase,
  SiAdobexd,
  SiAdobephotoshop,
} from "react-icons/si";

const Skills = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const skillCategories = [
    {
      name: "Frontend Development",
      skills: [
        { name: "HTML5", icon: FaHtml5 },
        { name: "CSS3", icon: FaCss3Alt },
        { name: "JavaScript", icon: FaJs },
        { name: "React", icon: FaReact },
        { name: "TypeScript", icon: SiTypescript },
        { name: "Tailwind", icon: SiTailwindcss },
      ],
    },
    {
      name: "Backend & Tools",
      skills: [
        { name: "Node.js", icon: FaNode },
        { name: "MongoDB", icon: SiMongodb },
        { name: "Firebase", icon: SiFirebase },
        { name: "Git", icon: FaGitAlt },
        { name: "Sass", icon: FaSass },
        { name: "Bootstrap", icon: FaBootstrap },
      ],
    },
    {
      name: "Design Tools",
      skills: [
        { name: "Figma", icon: FaFigma },
        { name: "Adobe XD", icon: SiAdobexd },
        { name: "Photoshop", icon: SiAdobephotoshop },
      ],
    },
  ];

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % skillCategories.length);
  };

  const prevSlide = () => {
    setActiveIndex(
      (prev) => (prev - 1 + skillCategories.length) % skillCategories.length
    );
  };

  return (
    <section id="skills" className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl md:text-3xl lg:text-4xl font-bold text-lightest-slate mb-4 md:mb-8 text-center"
        >
          Skills & Technologies
        </motion.h2>

        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="card-glass p-6 rounded-lg"
            >
              <h3 className="text-lg md:text-xl text-neon-cyan mb-4">
                {category.name}
              </h3>
              <div className="grid grid-cols-3 gap-4">
                {category.skills.map((skill, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col items-center text-center group"
                  >
                    <skill.icon className="text-2xl md:text-3xl text-light-slate mb-2 transition-colors duration-200 group-hover:text-neon-cyan" />
                    <span className="text-sm text-slate group-hover:text-light-slate transition-colors duration-200">
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {skillCategories.map((category, index) => (
                <div key={index} className="w-full flex-shrink-0 px-2">
                  <div className="card-glass p-4 rounded-lg">
                    <h3 className="text-lg text-neon-cyan mb-3">
                      {category.name}
                    </h3>
                    <div className="grid grid-cols-3 gap-3">
                      {category.skills.map((skill, idx) => (
                        <div
                          key={idx}
                          className="flex flex-col items-center text-center group"
                        >
                          <skill.icon className="text-xl text-light-slate mb-1 transition-colors duration-200 group-hover:text-neon-cyan" />
                          <span className="text-xs text-slate group-hover:text-light-slate transition-colors duration-200">
                            {skill.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
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
            {skillCategories.map((_, index) => (
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

export default Skills;
