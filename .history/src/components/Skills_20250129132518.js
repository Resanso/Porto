import { motion, useMotionValue, useTransform } from "framer-motion";
import { FaHtml5, FaCss3Alt, FaReact } from "react-icons/fa";
import {
  SiJavascript,
  SiBootstrap,
  SiFlutter,
  SiFirebase,
  SiDart,
} from "react-icons/si";
import { TbBrandGetx } from "react-icons/tb";
import { AiOutlineApi } from "react-icons/ai";
import { VscDatabase } from "react-icons/vsc";

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
      <div className="card-glass relative p-8 rounded-lg backdrop-blur-sm border border-white/10">
        <h3 className="font-mono text-2xl mb-6 text-white text-center">
          {category}
        </h3>

        <div className="grid grid-cols-3 gap-4">
          {skills.map((skill, idx) => (
            <div key={idx} className="flex flex-col items-center group/skill">
              <div className="relative mb-2">
                <skill.icon
                  className="w-8 h-8 text-slate group-hover/skill:text-neon-cyan transition-colors duration-300"
                  style={{ color: skill.color }}
                />
              </div>
              <span className="text-sm text-slate group-hover/skill:text-light-slate transition-colors duration-300">
                {skill.name}
              </span>
            </div>
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
        { name: "React", icon: FaReact, color: "#61DAFB" },
      ],
    },
    {
      category: "Mobile Development",
      skills: [
        { name: "Dart", icon: SiDart, color: "#0175C2" },
        { name: "Flutter", icon: SiFlutter, color: "#02569B" },
        { name: "GetX", icon: TbBrandGetx, color: "#8E24AA" },
        { name: "Dio", icon: AiOutlineApi, color: "#64FFDA" },
        { name: "Hive", icon: VscDatabase, color: "#FFC107" },
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
