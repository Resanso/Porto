import { motion } from "framer-motion";
import { FaReact, FaNodeJs, FaPython } from "react-icons/fa";
import { SiJavascript, SiTypescript, SiTailwindcss } from "react-icons/si";

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

        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="relative group"
            >
              {/* Hexagon Background */}
              <div className="hexagon-bg absolute inset-0 bg-dark-blue/50 -z-10" />

              <div className="p-8 backdrop-blur-sm relative">
                {/* Skill Icon */}
                <div className="flex justify-center mb-4">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: index * 0.1, type: "spring" }}
                    className="relative"
                  >
                    <div
                      className="absolute inset-0 animate-ping-slow rounded-full bg-[color:var(--skill-color)] opacity-20"
                      style={{ "--skill-color": skill.color }}
                    />
                    <skill.icon
                      className="w-12 h-12 relative z-10"
                      style={{ color: skill.color }}
                    />
                  </motion.div>
                </div>

                {/* Skill Name & Level */}
                <div className="text-center">
                  <h3 className="font-mono text-neon-cyan mb-2">
                    {skill.name}
                  </h3>
                  <div className="h-1.5 bg-navy-lighter rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      transition={{ duration: 1.5, delay: index * 0.1 }}
                      className="h-full relative"
                      style={{
                        backgroundColor: skill.color,
                        boxShadow: `0 0 10px ${skill.color}`,
                      }}
                    />
                  </div>
                  <span className="text-sm text-slate mt-1">
                    {skill.level}%
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
