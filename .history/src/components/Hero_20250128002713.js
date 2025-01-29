import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center py-20">
      <div className="max-w-6xl mx-auto px-4">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-neon-cyan font-mono mb-6"
        >
          Hi, my name is
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-6xl md:text-7xl font-bold text-light-slate mb-4"
        >
          Your Name.
        </motion.h1>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-4xl md:text-5xl font-bold text-slate mb-8"
        >
          I build things for the web.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-slate max-w-xl mb-12"
        >
          I'm a software engineer specializing in building exceptional digital
          experiences. Currently, I'm focused on building accessible,
          human-centered products.
        </motion.p>
        <motion.a
          href="#projects"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="inline-block px-8 py-4 border-2 border-neon-cyan text-neon-cyan font-mono rounded hover:bg-neon-cyan/10 transition-colors"
        >
          Check out my work!
        </motion.a>
      </div>
    </section>
  );
};

export default Hero;
