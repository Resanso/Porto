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
      <div className="fixed inset-0 bg-circuit-pattern opacity-[0.02]" />
      <div className="fixed inset-0 bg-gradient-to-b from-transparent via-dark-blue/50 to-dark-blue/90" />
      <InteractiveBackground />
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <main className="relative z-10 overflow-x-hidden">
        <Hero />
        <Projects />
        <Skills />
        <Contact />
      </main>
    </div>
  );
}

export default App;
