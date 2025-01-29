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

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
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
    <section className="relative min-h-screen flex items-center justify-center py-12 px-4">
      <div className="absolute inset-0 bg-gradient-radial from-navy-lighter/20 to-transparent" />
      <div className="max-w-5xl mx-auto relative">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-neon-cyan font-mono text-sm mb-4 tracking-wider"
            >
              Hi, my name is
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-5xl font-bold text-lightest-slate mb-2"
            >
              Your Name
            </motion.h1>

            {/* Simplified text ticker */}
            <div className="h-8 mb-4 overflow-hidden">
              <div className="animate-text-slide">
                {["Frontend Developer", "UI/UX Designer", "Problem Solver"].map(
                  (text) => (
                    <div key={text} className="text-xl text-slate/80">
                      {text}
                    </div>
                  )
                )}
              </div>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-base text-slate max-w-md mb-8 leading-relaxed"
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
              <button
                onClick={() => scrollToSection("projects")}
                className="px-6 py-3 bg-glass-gradient border border-neon-cyan/30 text-neon-cyan text-sm font-mono rounded-lg 
                  hover:bg-neon-cyan/10 transition-colors"
              >
                View My Work
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="px-6 py-3 text-lightest-slate text-sm font-mono rounded-lg 
                  hover:text-neon-cyan hover:bg-navy-light/30 transition-colors"
              >
                Contact Me
              </button>
            </motion.div>
          </motion.div>

          {/* Photo Section */}
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
            className="relative perspective-1000 max-w-sm mx-auto"
          >
            <div className="relative group">
              {/* Decorative Border */}
              <div
                className="absolute -inset-3 border border-neon-cyan/20 rounded-lg 
                transform translate-x-3 translate-y-3 group-hover:translate-x-2 
                group-hover:translate-y-2 transition-transform duration-300"
              />

              {/* Image Container */}
              <div className="relative rounded-lg overflow-hidden bg-navy-light/50 backdrop-blur-sm">
                <img
                  src="profil.png"
                  alt="Profile"
                  className="w-full aspect-square object-cover mix-blend-luminosity 
                    hover:mix-blend-normal transition-all duration-300 group-hover:scale-105"
                />
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
