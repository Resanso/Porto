import { motion, useMotionValue, useTransform } from "framer-motion";
import { FaHtml5, FaCss3Alt, FaReact } from "react-icons/fa";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi"; // Add this import
import {
  SiJavascript,
  SiBootstrap,
  SiFlutter,
  SiFirebase,
  SiDart,
  SiHive,
} from "react-icons/si";
import { TbCode, TbApi } from "react-icons/tb";
import { FiMonitor, FiSmartphone } from "react-icons/fi";
import { useState, useRef } from "react"; // Add this import

const SkillCard = ({ category, skills, index, icon: CategoryIcon }) => {
  // Add icon prop
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
    <div className="p-8">
      {" "}
      {/* Add outer padding container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.2 }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative group perspective-1000"
      >
        {/* Background layers with glow effect */}
        <div className="absolute -inset-4 bg-gradient-to-r from-neon-cyan/20 to-neon-purple/20 rounded-2xl opacity-0 group-hover:opacity-75 group-hover:blur-xl transition-all duration-300" />
        <div className="absolute inset-0 bg-navy-light/90 rounded-xl backdrop-blur-xl" />

        {/* Main content - adjusted padding for mobile */}
        <div className="relative p-4 sm:p-8 rounded-xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 group-hover:border-white/20 transition-colors duration-300">
          {/* Category header with adjusted sizes */}
          <div className="relative mb-4 sm:mb-8 pb-4 border-b border-white/10">
            <div className="flex items-center justify-center gap-2 sm:gap-3 mb-2">
              <CategoryIcon className="w-5 h-5 sm:w-6 sm:h-6 text-neon-cyan" />
              <h3 className="font-mono text-lg sm:text-2xl text-white">
                {category}
              </h3>
            </div>
            <div className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-16 sm:w-24 h-0.5 bg-gradient-to-r from-transparent via-neon-cyan to-transparent" />
          </div>

          {/* Skills grid - adjusted grid for mobile */}
          <div className="grid grid-cols-3 gap-2 sm:gap-6 relative">
            {skills.map((skill, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="relative group/skill"
              >
                {/* Simplified skill item */}
                <div className="flex flex-col items-center">
                  {/* Adjusted icon sizes */}
                  <div className="p-2 sm:p-4 transform group-hover/skill:-translate-y-1 transition-all duration-300">
                    <skill.icon
                      className="w-6 h-6 sm:w-10 sm:h-10 transition-transform duration-300 group-hover/skill:scale-110"
                      style={{ color: skill.color }}
                    />
                  </div>

                  {/* Adjusted text size */}
                  <div className="relative mt-1 sm:mt-2 text-center">
                    <span className="text-xs sm:text-sm text-slate group-hover/skill:text-light-slate transition-colors duration-300">
                      {skill.name}
                    </span>
                    <div className="absolute -bottom-1 left-0 w-0 h-[1px] bg-neon-cyan group-hover/skill:w-full transition-all duration-300" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const Skills = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);

  const skillCategories = [
    {
      category: "Web Development",
      icon: FiMonitor,
      skills: [
        { name: "HTML", icon: FaHtml5, color: "#E34F26" },
        { name: "CSS", icon: FaCss3Alt, color: "#1572B6" },
        { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
        { name: "Bootstrap", icon: SiBootstrap, color: "#7952B3" },
        { name: "React JS", icon: FaReact, color: "#61DAFB" },
      ],
    },
    {
      category: "Mobile Development",
      icon: FiSmartphone,
      skills: [
        { name: "Dart", icon: SiDart, color: "#0175C2" },
        { name: "Flutter", icon: SiFlutter, color: "#02569B" },
        { name: "GetX", icon: TbCode, color: "#8E24AA" }, // Using TbCode instead of TbBrandGetx
        { name: "Dio", icon: TbApi, color: "#64FFDA" },
        { name: "Hive", icon: SiHive, color: "#FFC107" },
        { name: "Firebase", icon: SiFirebase, color: "#FFCA28" },
      ],
    },
  ];

  const nextSlide = () => {
    if (currentIndex < skillCategories.length - 1) {
      setCurrentIndex(currentIndex + 1);
      carouselRef.current?.children[currentIndex + 1]?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "start",
      });
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      carouselRef.current?.children[currentIndex - 1]?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "start",
      });
    }
  };

  return (
    <section
      id="skills"
      className="py-16 sm:py-32 bg-navy-light relative overflow-visible" // Changed overflow-hidden to overflow-visible
    >
      <div className="absolute inset-0 bg-circuit-pattern opacity-5" />
      <div className="max-w-6xl mx-auto px-2 sm:px-4 relative">
        <h2 className="text-3xl sm:text-5xl font-mono text-light-slate mb-8 sm:mb-16 text-center">
          <span className="text-neon-cyan">03.</span> Skills & Expertise
        </h2>

        {/* Mobile Carousel Controls */}
        <div className="md:hidden flex justify-between items-center mb-4 px-2">
          <button
            onClick={prevSlide}
            disabled={currentIndex === 0}
            className={`p-1.5 rounded-full ${
              currentIndex === 0
                ? "text-slate/50"
                : "text-neon-cyan hover:bg-navy-lighter"
            }`}
          >
            <FiChevronLeft size={20} />
          </button>
          <div className="flex gap-2">
            {skillCategories.map((_, idx) => (
              <div
                key={idx}
                className={`w-2 h-2 rounded-full ${
                  idx === currentIndex ? "bg-neon-cyan" : "bg-slate/30"
                }`}
              />
            ))}
          </div>
          <button
            onClick={nextSlide}
            disabled={currentIndex === skillCategories.length - 1}
            className={`p-1.5 rounded-full ${
              currentIndex === skillCategories.length - 1
                ? "text-slate/50"
                : "text-neon-cyan hover:bg-navy-lighter"
            }`}
          >
            <FiChevronRight size={20} />
          </button>
        </div>

        {/* Skills Grid/Carousel */}
        <div
          ref={carouselRef}
          className="flex md:grid md:grid-cols-2 gap-0 sm:gap-0 max-w-5xl mx-auto overflow-x-auto snap-x snap-mandatory scrollbar-hide"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {skillCategories.map((category, index) => (
            <div key={index} className="min-w-full md:min-w-0 snap-start">
              <SkillCard
                category={category.category}
                skills={category.skills}
                icon={category.icon}
                index={index}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
