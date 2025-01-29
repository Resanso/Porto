import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import NebulaBackground from "./components/NebulaBackground";
import LoadingScreen from "./components/LoadingScreen";

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulasi loading time
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-dark-blue relative overflow-x-hidden">
      {/* Deep space gradient */}
      <div className="fixed inset-0 bg-gradient-to-b from-[#0a192f] via-[#091c3c] to-[#0c1829]" />

      {/* Nebula effect */}
      <NebulaBackground />

      {/* Glass overlay */}
      <div className="fixed inset-0 backdrop-blur-[1px] bg-dark-blue/10" />

      {/* Content */}
      <div className="relative z-10">
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
        <main className="relative overflow-x-hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Hero />
            <Projects />
            <Skills />
            <Contact />
          </motion.div>
        </main>
      </div>
    </div>
  );
}

export default App;
