import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const Hero = () => {
  const cardRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-300, 300], [15, -15]);
  const rotateY = useTransform(x, [-300, 300], [-15, 15]);

  const [particles, setParticles] = useState([]);

  const createParticleBurst = (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newParticles = Array.from({ length: 20 }).map((_, i) => ({
      id: Date.now() + i,
      x,
      y,
      angle: (Math.PI * 2 * i) / 20,
      velocity: 2 + Math.random() * 2,
    }));

    setParticles([...particles, ...newParticles]);
    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => !newParticles.includes(p)));
    }, 1000);
  };

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e) => {
      const rect = card.getBoundingClientRect();
      const centerX = rect.x + rect.width / 2;
      const centerY = rect.y + rect.height / 2;

      x.set(e.clientX - centerX);
      y.set(e.clientY - centerY);
    };

    card.addEventListener("mousemove", handleMouseMove);
    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
    };
  }, [x, y]);

  return (
    <section className="relative min-h-screen flex items-center justify-center py-20">
      <div className="absolute inset-0 bg-gradient-radial from-navy-lighter/20 to-transparent" />
      <div className="max-w-6xl mx-auto px-4 relative">
        <div className="grid md:grid-cols-5 gap-8 items-center">
          {/* Text Content - Takes 3 columns */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="md:col-span-3 relative"
          >
            <div className="absolute -top-20 -left-20 w-40 h-40 bg-neon-purple/20 rounded-full blur-3xl animate-pulse-slow" />

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
              transition={{ delay: 0.3 }}
              className="relative"
            >
              <span className="text-6xl md:text-7xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-light-slate/80 inline-block">
                Your Name
              </span>
              <div className="absolute -right-8 top-0 text-neon-cyan animate-bounce">
                ✧
              </div>
            </motion.h1>

            {/* Animated text ticker */}
            <div className="overflow-hidden h-12 my-4">
              <div className="animate-text-slide">
                <div className="text-2xl text-slate/80">Frontend Developer</div>
                <div className="text-2xl text-slate/80">UI/UX Designer</div>
                <div className="text-2xl text-slate/80">Problem Solver</div>
                <div className="text-2xl text-slate/80">Creative Thinker</div>
                <div className="text-2xl text-slate/80">Team Player</div>
                <div className="text-2xl text-slate/80">Frontend Developer</div>
              </div>
            </div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-4xl md:text-5xl font-bold text-slate/80 mb-8"
            >
              I craft digital experiences.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-lg text-slate max-w-xl mb-12 leading-relaxed"
            >
              I'm a software engineer specializing in building exceptional
              digital experiences.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex gap-4"
            >
              <motion.button
                onClick={createParticleBurst}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-glass-gradient border border-neon-cyan/30 text-neon-cyan font-mono rounded-lg 
                  hover:border-neon-cyan/60 transition-colors relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-neon-cyan/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <span className="relative">View My Work</span>
              </motion.button>
              <a
                href="#contact"
                className="px-8 py-4 text-lightest-slate font-mono rounded-lg hover:text-neon-cyan transition-colors"
              >
                Contact Me
              </a>
            </motion.div>
          </motion.div>

          {/* Photo Section - Takes 2 columns */}
          <motion.div
            ref={cardRef}
            style={{
              rotateX,
              rotateY,
              transformStyle: "preserve-3d",
            }}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="md:col-span-2 relative perspective-1000"
          >
            <div className="relative group">
              {/* Decorative Border */}
              <div className="absolute -inset-4 border-2 border-neon-cyan/20 rounded-lg transform translate-x-4 translate-y-4 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-300" />

              {/* Image Container */}
              <div className="relative rounded-lg overflow-hidden bg-navy-light/50 backdrop-blur-sm transform-gpu">
                <img
                  src="https://placehold.co/600x600"
                  alt="Profile Picture"
                  className="w-full aspect-square object-cover mix-blend-luminosity hover:mix-blend-normal transition-all duration-300 group-hover:scale-105"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-neon-cyan/20 group-hover:opacity-0 transition-opacity duration-300" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Particle burst effect */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          initial={{
            x: particle.x,
            y: particle.y,
            scale: 1,
            opacity: 1,
          }}
          animate={{
            x: particle.x + Math.cos(particle.angle) * 100 * particle.velocity,
            y: particle.y + Math.sin(particle.angle) * 100 * particle.velocity,
            scale: 0,
            opacity: 0,
          }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="absolute w-2 h-2 bg-neon-cyan rounded-full"
        />
      ))}
    </section>
  );
};

export default Hero;
