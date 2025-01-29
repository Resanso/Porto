import { motion, useMotionValue, useTransform } from "framer-motion";
import { FaHtml5, FaCss3Alt, FaReact } from "react-icons/fa";
import {
  SiJavascript,
  SiBootstrap,
  SiFlutter,
  SiFirebase,
  SiDart,
  SiHive,
} from "react-icons/si";
import { TbCode, TbApi } from "react-icons/tb";

const SkillCard = ({ category, skills, index }) => {
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
      transition={{ delay: index * 0.2 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="relative group perspective-1000"
    >
      {/* Background layers */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-neon-cyan/20 to-neon-purple/20 rounded-xl blur-md group-hover:blur-lg opacity-75 group-hover:opacity-100 transition duration-300" />
      <div className="absolute inset-0 bg-navy-light/90 rounded-xl backdrop-blur-xl" />

      {/* Main content */}
      <div className="relative p-8 rounded-xl bg-gradient-to-br from-white/5 to-transparent border border-white/10">
        {/* Category header */}
        <div className="relative mb-8 pb-4 border-b border-white/10">
          <h3 className="font-mono text-2xl text-white text-center">
            {category}
          </h3>
          <div className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-24 h-0.5 bg-gradient-to-r from-transparent via-neon-cyan to-transparent" />
          <div className="absolute -bottom-[3px] left-1/2 -translate-x-1/2 w-16 h-[2px] bg-neon-cyan/30 blur-sm" />
        </div>

        {/* Skills grid with hexagon layout */}
        <div className="grid grid-cols-3 gap-6 relative">
          {skills.map((skill, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="relative group/skill"
            >
              {/* Hexagon container */}
              <div className="relative flex flex-col items-center">
                {/* Hexagon background */}
                <div className="absolute inset-0 hexagon-bg bg-gradient-to-br from-navy-lighter to-navy-light transform scale-90 group-hover/skill:scale-100 transition-transform duration-300" />

                {/* Icon container */}
                <div className="relative z-10 p-4 transform group-hover/skill:-translate-y-1 transition-all duration-300">
                  {/* Glow effect */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover/skill:opacity-30 transition-opacity duration-300"
                    style={{ filter: `drop-shadow(0 0 8px ${skill.color})` }}
                  >
                    <skill.icon className="w-10 h-10" />
                  </div>

                  {/* Main icon */}
                  <skill.icon
                    className="w-10 h-10 relative z-10 transition-all duration-300"
                    style={{ color: skill.color }}
                  />
                </div>

                {/* Skill name with animated underline */}
                <div className="relative mt-2 text-center">
                  <span className="text-sm text-slate group-hover/skill:text-light-slate transition-colors duration-300">
                    {skill.name}
                  </span>
                  <div className="absolute -bottom-1 left-0 w-0 h-[1px] bg-neon-cyan group-hover/skill:w-full transition-all duration-300" />
                </div>
              </div>

              {/* Hover sparkles */}
              <div className="absolute -inset-2 opacity-0 group-hover/skill:opacity-100 transition-opacity duration-300">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-1 bg-neon-cyan/50 rounded-full"
                    style={{
                      left: `${50 + (i - 1) * 30}%`,
                      top: `${50 + Math.sin((i * Math.PI) / 2) * 30}%`,
                      animation: `sparkle ${1 + i * 0.2}s ease-in-out infinite`,
                    }}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const Skills = () => {
  const skillCategories = [
    {
      category: "Web Development",
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

  return (
    <section
      id="skills"
      className="py-32 bg-navy-light relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-circuit-pattern opacity-5" />
      <div className="max-w-6xl mx-auto px-4 relative">
        <h2 className="text-5xl font-mono text-light-slate mb-16 text-center">
          <span className="text-neon-cyan">03.</span> Skills & Expertise
        </h2>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {skillCategories.map((category, index) => (
            <SkillCard
              key={index}
              category={category.category}
              skills={category.skills}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
