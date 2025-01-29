import { useState, useEffect, Suspense, lazy } from "react";
import Navbar from "./components/Navbar";
import LoadingScreen from "./components/LoadingScreen";
import FloatingAstronaut from "./components/FloatingAstronaut";

// Lazy load komponen berat
const Hero = lazy(() => import("./components/Hero"));
const Projects = lazy(() => import("./components/Projects"));
const Skills = lazy(() => import("./components/Skills"));
const Contact = lazy(() => import("./components/Contact"));
const ParticleBackground = lazy(() =>
  import("./components/ParticleBackground")
);

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-dark-blue relative overflow-x-hidden">
      <div className="fixed inset-0 bg-circuit-pattern opacity-5" />
      <div className="fixed inset-0 bg-gradient-to-b from-navy-lighter/20 via-dark-blue to-dark-blue/90" />

      {/* Astronaut will now track sections precisely */}
      <FloatingAstronaut />

      {/* Ensure each section has the correct ID */}
      <main className="relative z-10">
        <Suspense fallback={null}>
          {/* Add specific heights to ensure consistent scroll points */}
          <div id="hero" className="min-h-screen">
            <Hero />
          </div>
          <div id="projects" className="min-h-screen">
            <Projects />
          </div>
          <div id="skills" className="min-h-screen">
            <Skills />
          </div>
          <div id="contact" className="min-h-screen">
            <Contact />
          </div>
        </Suspense>
      </main>

      <Suspense fallback={null}>
        <ParticleBackground />
      </Suspense>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
    </div>
  );
}

export default App;
