import { useState, useEffect, useCallback } from 'react';
import Scene3D from './components/Scene3D';
import LoadingScreen from './components/LoadingScreen';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import SkillsSection from './components/SkillsSection';
import ExperienceSection from './components/ExperienceSection';
import ProjectsSection from './components/ProjectsSection';
import StatsSection from './components/StatsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import { useSmoothScroll } from './hooks/useSmoothScroll';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  useSmoothScroll();

  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isLoading]);

  return (
    <div className="relative min-h-screen bg-void text-white">
      {/* 3D Background - always rendered */}
      <Scene3D />

      {/* Post-processing overlays */}
      <div className="scanline-overlay" />
      <div className="vignette-overlay" />
      <div className="noise-overlay" />

      {/* Loading Screen */}
      {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}

      {/* Main Content */}
      <main className="relative z-10">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ExperienceSection />
        <ProjectsSection />
        <StatsSection />
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}

export default App;
