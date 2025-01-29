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
      {/* Subtle glow effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-neon-cyan/10 via-neon-purple/10 to-neon-cyan/10 rounded-lg blur-md group-hover:blur-lg transition-all duration-300 opacity-50 group-hover:opacity-70" />

      {/* Card content */}
      <div className="card-glass relative p-8 rounded-lg backdrop-blur-sm border border-white/5">
        {/* Category heading with subtle underline */}
        <div className="relative mb-8">
          <h3 className="font-mono text-2xl text-white text-center">
            {category}
          </h3>
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-[1px] bg-neon-cyan/30" />
        </div>

        {/* Skills grid */}
        <div className="grid grid-cols-3 gap-6">
          {skills.map((skill, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="relative group/skill"
            >
              {/* Floating skill item */}
              <div className="flex flex-col items-center transform transition-transform duration-300 hover:translate-y-[-4px]">
                {/* Icon with subtle glow */}
                <div className="relative mb-3">
                  {/* Reduced glow effect */}
                  <div
                    className="absolute inset-0 animate-pulse opacity-30"
                    style={{ color: skill.color }}
                  >
                    <skill.icon className="w-10 h-10 filter blur-[1px]" />
                  </div>
                  {/* Main icon */}
                  <skill.icon
                    className="w-10 h-10 relative z-10 transition-all duration-300 transform group-hover/skill:scale-105"
                    style={{ color: skill.color }}
                  />
                </div>

                {/* Skill name with subtle hover effect */}
                <span className="text-sm text-slate text-center block transition-colors duration-300 group-hover/skill:text-light-slate">
                  {skill.name}
                </span>
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
