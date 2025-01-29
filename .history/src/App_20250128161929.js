import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import ParticleBackground from "./components/ParticleBackground";
import LoadingScreen from "./components/LoadingScreen";
import AudioVisualizer from "./components/AudioVisualizer";
import PageTransition from "./components/PageTransition";
import ScrollAnimatedSection from "./components/ScrollAnimations";

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
    <div className="min-h-screen bg-dark-blue relative">
      <div className="fixed inset-0 bg-circuit-pattern opacity-5" />
      <div className="fixed inset-0 bg-gradient-to-b from-navy-lighter/20 via-dark-blue to-dark-blue/90" />
      <ParticleBackground />
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <PageTransition>
        <main className="relative z-10 overflow-hidden">
          <ScrollAnimatedSection>
            <Hero />
          </ScrollAnimatedSection>
          <ScrollAnimatedSection>
            <Projects />
          </ScrollAnimatedSection>
          <ScrollAnimatedSection>
            <Skills />
          </ScrollAnimatedSection>
          <ScrollAnimatedSection>
            <Contact />
          </ScrollAnimatedSection>
        </main>
      </PageTransition>
      <AudioVisualizer />
    </div>
  );
}

export default App;
