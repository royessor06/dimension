import React, { useState, useEffect, useRef, useCallback } from 'react';
import { DimensionCanvas } from './components/DimensionCanvas';
import { Navigation } from './components/Navigation';
import { PortalSection } from './components/PortalSection';
import { TransmissionSection } from './components/TransmissionSection';
import { TechnologySection } from './components/TechnologySection';
import { WorldsSection } from './components/WorldsSection';
import { EnergySection } from './components/EnergySection';
import { EnterSection } from './components/EnterSection';
import { TerminalSection } from './components/TerminalSection';
import { ControlDock } from './components/ControlDock';
import { CustomCursor } from './components/CustomCursor';
import { soundEngine } from './audio/soundEngine';

const SECTIONS = [
  { id: 'portal', title: 'PORTAL' },
  { id: 'transmission', title: 'TRANSMISSION' },
  { id: 'technology', title: 'TECHNOLOGY' },
  { id: 'worlds', title: 'WORLDS' },
  { id: 'energy', title: 'ENERGY' },
  { id: 'enter', title: 'ENTER' },
  { id: 'terminal', title: 'TERMINAL' },
];

export default function App() {
  const [currentSection, setCurrentSection] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  // 3D Controls
  const [warpIntensity, setWarpIntensity] = useState(1.0);
  const [turbulence, setTurbulence] = useState(1.0);
  const [selectedTechIndex, setSelectedTechIndex] = useState(1);

  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  // Scroll listener to update active section & camera
  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = totalHeight > 0 ? scrollY / totalHeight : 0;
    setScrollProgress(progress);

    const viewportMiddle = scrollY + window.innerHeight * 0.45;
    let activeIndex = 0;

    sectionRefs.current.forEach((el, index) => {
      if (!el) return;
      const top = el.offsetTop;
      const height = el.offsetHeight;
      if (viewportMiddle >= top && viewportMiddle < top + height) {
        activeIndex = index;
      }
    });

    setCurrentSection(activeIndex);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const scrollToSection = (index: number) => {
    const targetEl = sectionRefs.current[index];
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth' });
      soundEngine.playChime(500 + index * 60);
    }
  };

  const triggerPortalJump = () => {
    const canvas = document.querySelector('canvas');
    if (canvas) {
      canvas.dispatchEvent(new MouseEvent('click', { bubbles: true, clientX: window.innerWidth / 2, clientY: window.innerHeight / 2 }));
    }
  };

  return (
    <div className="relative min-h-screen bg-[#030712] text-[#e2e8f0] selection:bg-[#F472B6] selection:text-black">
      {/* Cyberpunk ambient grid & CRT scanlines */}
      <div className="fixed inset-0 pointer-events-none bg-cyber-grid opacity-70 z-10" />
      <div className="fixed inset-0 pointer-events-none bg-scanlines opacity-40 z-10" />

      {/* Futuristic Cyber Reticle Cursor */}
      <CustomCursor />

      {/* 3D WebGL Canvas Layer (Fixed full viewport with Portal & Particles) */}
      <DimensionCanvas
        currentSection={currentSection}
        scrollProgress={scrollProgress}
        selectedTechIndex={selectedTechIndex}
        warpIntensity={warpIntensity}
        onPortalClick={() => {
          soundEngine.playChime(880);
        }}
      />

      {/* Cyber Navigation HUD */}
      <Navigation
        currentSection={currentSection}
        onSelectSection={scrollToSection}
        sections={SECTIONS}
      />

      {/* Main 7 Sections Overlaid on 3D Space */}
      <main className="relative z-20">
        {/* 1. PORTAL — Entrée dans l'univers */}
        <div ref={(el) => { sectionRefs.current[0] = el; }}>
          <PortalSection
            onExplore={() => scrollToSection(1)}
            onJump={triggerPortalJump}
          />
        </div>

        {/* 2. TRANSMISSION — Narration avec particules */}
        <div ref={(el) => { sectionRefs.current[1] = el; }}>
          <TransmissionSection
            warpIntensity={warpIntensity}
            onUpdateWarp={setWarpIntensity}
            onShockwave={triggerPortalJump}
          />
        </div>

        {/* 3. TECHNOLOGY — Objets 3D interactifs */}
        <div ref={(el) => { sectionRefs.current[2] = el; }}>
          <TechnologySection
            selectedTechIndex={selectedTechIndex}
            onSelectTech={(idx) => setSelectedTechIndex(idx)}
            onShockwave={triggerPortalJump}
          />
        </div>

        {/* 4. WORLDS — Galerie de mondes virtuels */}
        <div ref={(el) => { sectionRefs.current[3] = el; }}>
          <WorldsSection
            onSelectWorld={(id) => {
              // Focus camera on worlds
            }}
            onShockwave={triggerPortalJump}
          />
        </div>

        {/* 5. ENERGY — Statistiques et explosions de particules */}
        <div ref={(el) => { sectionRefs.current[4] = el; }}>
          <EnergySection onParticleBurst={triggerPortalJump} />
        </div>

        {/* 6. ENTER — Appel à l'action immersif */}
        <div ref={(el) => { sectionRefs.current[5] = el; }}>
          <EnterSection
            onResetToPortal={() => scrollToSection(0)}
            onShockwave={triggerPortalJump}
          />
        </div>

        {/* 7. TERMINAL — Footer futuriste */}
        <div ref={(el) => { sectionRefs.current[6] = el; }}>
          <TerminalSection onScrollToTop={() => scrollToSection(0)} />
        </div>
      </main>

      {/* Collapsible Cyber HUD Bottom Deck */}
      <ControlDock
        warpIntensity={warpIntensity}
        onUpdateWarp={setWarpIntensity}
        turbulence={turbulence}
        onUpdateTurbulence={setTurbulence}
        onJump={triggerPortalJump}
      />
    </div>
  );
}
