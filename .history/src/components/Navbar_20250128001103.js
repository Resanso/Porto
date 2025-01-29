import { motion } from "framer-motion";

const Navbar = ({ darkMode, setDarkMode }) => {
  return (
    <nav className="fixed w-full top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xl font-bold"
        >
          Portfolio
        </motion.div>

        <div className="flex items-center gap-6">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800"
          >
            {darkMode ? "🌞" : "🌙"}
          </button>

          <nav className="hidden md:flex gap-4">
            <a href="#projects">Projects</a>
            <a href="#skills">Skills</a>
            <a href="#contact">Contact</a>
          </nav>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
