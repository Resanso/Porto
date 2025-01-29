import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import InteractiveBackground from "./components/InteractiveBackground";
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
      {/* Smooth gradient background */}
      <div className="fixed inset-0 bg-gradient-radial from-navy-lighter/20 via-dark-blue to-dark-blue/95" />

      {/* Subtle color overlay */}
      <div className="fixed inset-0 bg-gradient-to-b from-transparent via-dark-blue/30 to-dark-blue/80" />

      {/* Interactive background */}
      <InteractiveBackground />

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
