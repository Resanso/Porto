import { motion, useMotionValue, useTransform } from "framer-motion";
import { FaFigma } from "react-icons/fa";
import {
  SiFlutter,
  SiBootstrap,
  SiReact,
  SiFirebase,
  SiGo,
} from "react-icons/si";
import { useState } from "react";
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
  const [activeIndex, setActiveIndex] = useState(0);
  const skillCategories = [
    { name: "Flutter", level: 90, icon: SiFlutter, color: "#02569B" },
    { name: "Bootstrap", level: 85, icon: SiBootstrap, color: "#7952B3" },
    { name: "React Native", level: 80, icon: SiReact, color: "#61DAFB" },
    { name: "Firebase", level: 85, icon: SiFirebase, color: "#FFCA28" },
    { name: "Figma", level: 75, icon: FaFigma, color: "#F24E1E" },
    { name: "Golang", level: 82, icon: SiGo, color: "#00ADD8" },
  ];

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % skillCategories.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + skillCategories.length) % skillCategories.length);
  };

  return (
    <section id="skills" className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <motion.h2 
          className="text-2xl md:text-3xl lg:text-4xl font-bold text-lightest-slate mb-4 md:mb-8 text-center"
          // ...existing animation props...
        >
          Skills & Technologies
        </motion.h2>

        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              className="card-glass p-6 rounded-lg"
              // ...existing animation props...
            >
              <h3 className="text-lg md:text-xl text-neon-cyan mb-4">{category.name}</h3>
              <div className="grid grid-cols-3 gap-4">
                {category.skills.map((skill, idx) => (
                  <div key={idx} className="flex flex-col items-center text-center">
                    <skill.icon className="text-2xl md:text-3xl text-light-slate mb-2" />
                    <span className="text-sm text-slate">{skill.name}</span>
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
                <div key={index} className="w-full flex-shrink-0">
                  <div className="card-glass p-4 rounded-lg mx-2">
                    <h3 className="text-lg text-neon-cyan mb-3">{category.name}</h3>
                    <div className="grid grid-cols-3 gap-3">
                      {category.skills.map((skill, idx) => (
                        <div key={idx} className="flex flex-col items-center text-center">
                          <skill.icon className="text-xl text-light-slate mb-1" />
                          <span className="text-xs text-slate">{skill.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Carousel Controls - sama seperti Projects */}
          <button 
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 p-2 bg-navy-light/80 rounded-full"
          ></button>
            <FiChevronLeft className="text-xl text-neon-cyan" />
          </button>
          <button 
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 p-2 bg-navy-light/80 rounded-full"
          >
            <FiChevronRight className="text-xl text-neon-cyan" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-4"></div>
            {skillCategories.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === activeIndex ? 'bg-neon-cyan' : 'bg-navy-lighter'
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
