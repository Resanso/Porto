import { motion } from "framer-motion";

const Skills = () => {
  const skills = [
    { name: "React", level: 90 },
    { name: "JavaScript", level: 85 },
    { name: "TypeScript", level: 75 },
    { name: "Node.js", level: 70 },
    { name: "Python", level: 65 },
    { name: "CSS/Tailwind", level: 80 },
  ];

  return (
    <section id="skills" className="py-32 bg-navy-light">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-5xl font-mono text-light-slate mb-16 text-center">
          <span className="text-neon-cyan">03.</span> Skills & Expertise
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-dark-blue/50 p-6 rounded-lg hover:shadow-glow transition-shadow"
            >
              <div className="flex justify-between mb-3">
                <span className="font-mono text-neon-cyan">{skill.name}</span>
                <span className="text-slate">{skill.level}%</span>
              </div>
              <div className="h-2 bg-navy-light rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  transition={{ duration: 1.5, delay: index * 0.1 }}
                  className="h-full bg-neon-cyan/30 rounded-full relative"
                >
                  <div className="absolute inset-0 bg-neon-cyan/60 blur-sm" />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
