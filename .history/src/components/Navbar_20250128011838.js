import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect } from "react";

const Navbar = ({ darkMode, setDarkMode }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();
  const navBackground = useTransform(
    scrollY,
    [0, 100],
    ["rgba(10, 25, 47, 0)", "rgba(10, 25, 47, 0.85)"]
  );

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <motion.nav
      style={{ backgroundColor: navBackground }}
      className={`fixed w-full top-0 z-50 backdrop-blur-md transition-all duration-300 
        ${isScrolled ? "py-4 shadow-lg" : "py-6"}`}
    ></motion.nav>
      <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative group"
        >
          <div className="absolute -inset-2 bg-gradient-to-r from-neon-cyan to-neon-purple 
            rounded-lg blur-md opacity-25 group-hover:opacity-75 transition duration-300" />
          <a
            href="#home"
            className="relative font-mono text-2xl font-bold bg-gradient-to-r from-neon-cyan to-neon-purple 
              bg-clip-text text-transparent"
          >
            &#60;Dev/&#62;
          </a>
        </motion.div>

        {/* Navigation Items */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative group"
            >
              <a
                href={item.href}
                className="font-mono text-sm text-light-slate group-hover:text-neon-cyan 
                  transition-colors duration-300"
              >
                <span className="text-neon-cyan">{`0${index + 1}.`}</span>
                {` ${item.name}`}
              </a>
              {/* Animated underline */}
              <div className="absolute -bottom-2 left-0 w-full h-px">
                <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan to-neon-purple 
                  transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </div>
            </motion.div>
          ))}

          {/* Resume Button */}
          <motion.a
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="relative px-4 py-2 overflow-hidden group rounded-md"
          >
            {/* Button background animation */}
            <div className="absolute inset-0 border border-neon-cyan rounded-md" />
            <div className="absolute inset-0 bg-neon-cyan/20 translate-y-full 
              group-hover:translate-y-0 transition-transform duration-300" />
            
            {/* Button text */}
            <span className="relative font-mono text-sm text-neon-cyan 
              group-hover:text-dark-blue transition-colors duration-300">
              Resume
            </span>
          </motion.a>
        </div>

        {/* Mobile Menu Button */}
        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="md:hidden relative w-10 h-10 flex items-center justify-center"
          onClick={() => {/* Add mobile menu logic */}}
        ></motion.button>
          <div className="flex flex-col gap-1.5">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="w-6 h-0.5 bg-neon-cyan"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: i * 0.1 }}
              />
            ))}
          </div>
        </motion.button>
      </div>
    </motion.nav>
  );
};

export default Navbar;
