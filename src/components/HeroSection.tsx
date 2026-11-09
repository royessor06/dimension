import React from 'react';
import { ArrowDown, Sparkles } from 'lucide-react';
import { soundEngine } from '../audio/soundEngine';

interface HeroSectionProps {
  onExplore: () => void;
  onShockwave: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExplore, onShockwave }) => {
  return (
    <section className="relative min-h-screen w-full flex flex-col justify-between p-8 sm:p-12 lg:p-20 pointer-events-none select-none">
      {/* Top minimal status marker */}
      <div className="pt-20 flex items-center justify-between font-mono text-[11px] tracking-[0.25em] text-neutral-400 uppercase">
        <div className="flex items-center gap-2.5">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 inline-block shadow-[0_0_8px_#00f2fe]" />
          <span className="text-white font-medium">DIMENSION — SCULPTURE 01</span>
        </div>
        <div className="hidden sm:flex items-center gap-4 text-neutral-400 text-[10px]">
          <span>WEBGL2 // SHADERS GLSL</span>
          <span>ESTHÉTIQUE CINÉMATIQUE</span>
        </div>
      </div>

      {/* Center Monumental Headline with Generous Negative Space */}
      <div className="my-auto py-12 max-w-6xl mx-auto w-full">
        <div className="space-y-6">
          <p className="font-mono text-xs sm:text-sm tracking-[0.35em] uppercase text-cyan-300 font-medium">
            STUDIO DE CRÉATION DIGITALE
          </p>

          <h1 className="font-display font-extrabold text-7xl sm:text-8xl md:text-9xl lg:text-[140px] leading-[0.88] tracking-tight uppercase text-white">
            DIMEN
            <span className="bg-gradient-to-r from-cyan-400 via-[#7928ca] to-[#ff007a] bg-clip-text text-transparent">
              SION
            </span>
          </h1>

          <p className="font-display font-light text-2xl sm:text-3xl md:text-4xl text-neutral-300 tracking-tight max-w-2xl leading-tight pt-2">
            L'expérience au-delà du web.
          </p>

          <p className="font-sans text-sm sm:text-base text-neutral-400 font-light leading-relaxed max-w-xl pt-2">
            Une exploration de formes organiques vivantes, de verre optique et de réfraction chromatique sculptées en temps réel par des shaders GLSL.
          </p>

          <div className="pt-6 flex flex-wrap items-center gap-4 pointer-events-auto">
            <button
              onClick={() => {
                soundEngine.playShockwave();
                onShockwave();
              }}
              className="group px-7 py-3.5 border border-white/20 bg-[#050510]/80 hover:border-cyan-400/80 text-white font-mono text-xs uppercase tracking-widest transition-all duration-300 hover:shadow-[0_0_24px_rgba(0,242,254,0.25)] cursor-pointer flex items-center gap-2.5 backdrop-blur-md"
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-400 group-hover:rotate-12 transition-transform" />
              <span>Interagir avec la matière</span>
            </button>

            <button
              onClick={onExplore}
              className="px-6 py-3.5 text-neutral-400 hover:text-white font-mono text-xs uppercase tracking-widest transition-colors flex items-center gap-2 cursor-pointer"
            >
              <span>Défiler</span>
              <ArrowDown className="w-3.5 h-3.5 text-neutral-500 animate-bounce" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Editorial Coordinates */}
      <div className="pb-4 flex flex-wrap items-center justify-between gap-4 font-mono text-[10px] tracking-widest text-neutral-400 uppercase border-t border-white/5 pt-6">
        <div>ORBITE TEMPS RÉEL // RÉACTION SOURIS & SCROLL</div>
        <div className="hidden md:block">EXPÉRIENCE WEBGL IMMERSIVE HAUTE FIDÉLITÉ</div>
      </div>
    </section>
  );
};
