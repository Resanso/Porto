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

      {/* Add Floating Astronauts */}
      <FloatingAstronaut position="right" offset={0} />
      <FloatingAstronaut position="left" offset={-200} />
      <FloatingAstronaut position="right" offset={-400} />
      <FloatingAstronaut position="left" offset={-600} />

      <Suspense fallback={null}>
        <ParticleBackground />
      </Suspense>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <main className="relative z-10">
        <Suspense fallback={null}>
          <Hero />
          <Projects />
          <Skills />
          <Contact />
        </Suspense>
      </main>
    </div>
  );
}

export default App;
