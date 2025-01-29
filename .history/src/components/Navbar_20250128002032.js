import { motion } from "framer-motion";

const Navbar = ({ darkMode, setDarkMode }) => {
  return (
    <nav className="fixed w-full top-0 z-50 bg-glass backdrop-blur-md border-b border-neon-cyan/20">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xl font-mono text-neon-cyan"
        >
          Portfolio
        </motion.div>

        <div className="flex items-center gap-6">
          <nav className="hidden md:flex gap-6">
            {["Projects", "Skills", "Contact"].map((item) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="font-mono text-sm text-white/80 hover:text-neon-cyan transition-colors"
                whileHover={{ scale: 1.05 }}
              >
                {item}
              </motion.a>
            ))}
          </nav>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
