import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center py-20">
      <div className="absolute inset-0 bg-gradient-radial from-navy-lighter/20 to-transparent" />
      <div className="max-w-6xl mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <div className="absolute -top-20 -left-20 w-40 h-40 bg-neon-purple/20 rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-neon-cyan/20 rounded-full blur-3xl animate-pulse-slow" />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-neon-cyan font-mono mb-6 tracking-wider"
          >
            Hi, my name is
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-7xl md:text-8xl font-bold text-lightest-slate mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-light-slate/80"
          >
            Your Name.
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-5xl md:text-6xl font-bold text-slate/80 mb-8"
          >
            I craft digital experiences.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-lg text-slate max-w-xl mb-12 leading-relaxed"
          >
            I'm a software engineer specializing in building exceptional digital
            experiences. Currently crafting innovative solutions at the
            intersection of design and technology.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex gap-4"
          >
            <a
              href="#projects"
              className="group relative px-8 py-4 bg-glass-gradient border border-neon-cyan/30 text-neon-cyan font-mono rounded-lg overflow-hidden hover:border-neon-cyan/60 transition-colors"
            >
              <div className="absolute inset-0 bg-neon-cyan/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <span className="relative">View My Work</span>
            </a>

            <a
              href="#contact"
              className="px-8 py-4 text-lightest-slate font-mono rounded-lg hover:text-neon-cyan transition-colors"
            >
              Contact Me
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
