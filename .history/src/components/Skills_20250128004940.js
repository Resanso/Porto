import { motion, useMotionValue, useTransform } from "framer-motion";
import { FaReact, FaNodeJs, FaPython } from "react-icons/fa";
import { SiJavascript, SiTypescript, SiTailwindcss } from "react-icons/si";

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
  const skills = [
    { name: "React", level: 90, icon: FaReact, color: "#61DAFB" },
    { name: "JavaScript", level: 85, icon: SiJavascript, color: "#F7DF1E" },
    { name: "TypeScript", level: 75, icon: SiTypescript, color: "#3178C6" },
    { name: "Node.js", level: 70, icon: FaNodeJs, color: "#339933" },
    { name: "Python", level: 65, icon: FaPython, color: "#3776AB" },
    { name: "CSS/Tailwind", level: 80, icon: SiTailwindcss, color: "#06B6D4" },
  ];

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

        <div className="grid grid-cols-2 md:grid-cols-3 gap-12 max-w-4xl mx-auto">
          {skills.map((skill, index) => (
            <SkillCard key={index} skill={skill} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
