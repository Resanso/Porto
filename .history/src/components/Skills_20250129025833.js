import { motion, useMotionValue, useTransform } from "framer-motion";
import { FaFigma } from "react-icons/fa";
import {
  SiFlutter,
  SiBootstrap,
  SiReact,
  SiFirebase,
  SiGo,
} from "react-icons/si";
import { useState, useEffect } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const SkillCard = ({ skill, index }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);

  const handleMouseMove = (event) => {
    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();
    const centerX = rect.x + rect.width / 2;
    const centerY = rect.y + rect.height / 2;

    x.set(event.clientX - centerX);
    y.set(event.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="relative group perspective-1000"
    >
      {/* Floating particles */}
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-neon-cyan rounded-full"
          animate={{
            x: [0, Math.random() * 40 - 20],
            y: [0, Math.random() * 40 - 20],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.2,
          }}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}

      {/* Glowing background effect */}
      <div
        className="absolute -inset-2 rounded-lg opacity-75 blur-xl transition-all duration-300 group-hover:opacity-100"
        style={{
          background: `linear-gradient(120deg, transparent, ${skill.color}20, transparent)`,
          filter: "blur(20px)",
        }}
      />

      {/* Card Content */}
      <div className="card-glass relative p-8 rounded-lg backdrop-blur-sm border border-white/10">
        {/* Skill Icon */}
        <div className="flex justify-center mb-6">
          <motion.div
            initial={{ scale: 0.5, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 12,
              delay: index * 0.1,
            }}
            className="relative"
          >
            {/* Glow rings */}
            <div
              className="absolute inset-0 animate-ping-slow opacity-20 scale-150"
              style={{ color: skill.color }}
            >
              <skill.icon className="w-12 h-12" />
            </div>
            <div
              className="absolute inset-0 animate-pulse opacity-40 scale-125"
              style={{ color: skill.color }}
            >
              <skill.icon className="w-12 h-12" />
            </div>
            {/* Main icon */}
            <skill.icon
              className="w-12 h-12 relative z-10 transition-transform duration-300 group-hover:scale-110"
              style={{ color: skill.color }}
            />
          </motion.div>
        </div>

        {/* Skill Info */}
        <div className="text-center relative z-10">
          <h3 className="font-mono text-xl mb-3 text-white group-hover:text-neon-cyan transition-colors">
            {skill.name}
          </h3>
          <div className="h-1.5 bg-navy-lighter rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${skill.level}%` }}
              transition={{ duration: 1, delay: index * 0.2 }}
              className="h-full relative"
              style={{
                backgroundColor: skill.color,
                boxShadow: `0 0 20px ${skill.color}`,
              }}
            >
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "loop",
                }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              />
            </motion.div>
          </div>
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: index * 0.3 }}
            className="text-sm text-slate mt-2 inline-block"
          >
            {skill.level}%
          </motion.span>
        </div>
      </div>
    </motion.div>
  );
};

const Skills = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const skillCategories = [
    {
      category: "Frontend",
      items: ["React", "Flutter", "HTML", "CSS", "JavaScript", "Tailwind"],
      icon: "🎨",
      color: "#61dafb",
    },
    {
      category: "Backend",
      items: ["Node.js", "Express", "Firebase", "PostgreSQL"],
      icon: "⚙️",
      color: "#68a063",
    },
    {
      category: "Tools",
      items: ["Git", "VS Code", "Figma", "Adobe XD"],
      icon: "🛠️",
      color: "#f05032",
    },
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % skillCategories.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + skillCategories.length) % skillCategories.length
    );
  };

  return (
    <section
      id="skills"
      className="py-32 bg-navy-light relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-navy-lighter/40 to-transparent" />
      <div className="max-w-6xl mx-auto px-4 relative">
        <h2 className="text-5xl font-mono text-light-slate mb-16 text-center">
          <span className="text-neon-cyan">03.</span> Skills & Expertise
        </h2>

        {/* Desktop View */}
        <div className="hidden md:grid md:grid-cols-3 gap-8">
          {skillCategories.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="card-glass p-6 rounded-lg group"
            >
              <div className="text-4xl mb-4">{skill.icon}</div>
              <h3 className="text-xl text-lightest-slate mb-4 font-medium">
                {skill.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {skill.items.map((item, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 text-sm bg-navy-light/50 text-neon-cyan rounded-full"
                  >
                    {item}
                  </span>
                ))}
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
              {skillCategories.map((skill, index) => (
                <div key={index} className="w-full flex-shrink-0 px-2">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="card-glass p-6 rounded-lg group"
                  >
                    <div className="text-4xl mb-4">{skill.icon}</div>
                    <h3 className="text-xl text-lightest-slate mb-4 font-medium">
                      {skill.category}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {skill.items.map((item, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 text-sm bg-navy-light/50 text-neon-cyan rounded-full"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </motion.div>
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
            {skillCategories.map((_, index) => (
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

export default Skills;
