import React from 'react';
import { ArrowUp, Terminal, Radio, Shield, Cpu, Globe } from 'lucide-react';

interface TerminalSectionProps {
  onScrollToTop: () => void;
}

export const TerminalSection: React.FC<TerminalSectionProps> = ({ onScrollToTop }) => {
  return (
    <footer className="relative w-full border-t border-cyan-500/20 bg-[#02040c]/95 backdrop-blur-xl p-8 sm:p-12 lg:p-16 text-neutral-400 font-mono select-none z-30">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Top Terminal Status Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-cyan-500/20 text-xs">
          <div className="flex items-center gap-3">
            <Terminal className="w-4 h-4 text-[#06B6D4]" />
            <span className="font-orbitron font-bold text-white text-base tracking-widest">
              DIMENSION // TERMINAL v4.2
            </span>
          </div>

          <div className="flex items-center gap-4 text-[10px] text-cyan-300">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#06B6D4] inline-block shadow-[0_0_6px_#06B6D4]" />
              RÉSEAU SÉCURISÉ // ZERO-TRUST
            </span>
            <span className="hidden sm:inline text-neutral-500">|</span>
            <span className="hidden sm:inline text-[#F472B6]">PROTOCOLE TACHYON : V4.99</span>
          </div>
        </div>

        {/* 3 Columns Command Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 text-xs">
          <div className="md:col-span-5 space-y-3 font-sans">
            <div className="font-orbitron font-bold text-white uppercase tracking-wider text-sm">
              À PROPOS DE L'EXPÉRIENCE
            </div>
            <p className="text-neutral-400 font-light leading-relaxed text-xs">
              DIMENSION est un univers virtuel cybernétique calculé en profondeur 3D réelle sous WebGL2.
              Conçu pour repousser les frontières de l'interactivité numérique par le biais de shaders GLSL et de vortex gravitationnels.
            </p>
          </div>

          <div className="md:col-span-3 space-y-3 font-mono">
            <div className="font-orbitron font-bold text-white uppercase tracking-wider text-sm">
              NŒUDS DE RELAIS
            </div>
            <div className="space-y-1.5 text-[11px]">
              <div className="flex items-center justify-between">
                <span>NEO-TOKYO // SEC-09</span>
                <span className="text-cyan-400 font-bold">ONLINE</span>
              </div>
              <div className="flex items-center justify-between">
                <span>ORBITAL DYSON-1</span>
                <span className="text-cyan-400 font-bold">ONLINE</span>
              </div>
              <div className="flex items-center justify-between">
                <span>NEBULA ZERO</span>
                <span className="text-[#F472B6] font-bold">LOCKED</span>
              </div>
              <div className="flex items-center justify-between">
                <span>CYBERSPHERE NET</span>
                <span className="text-[#7C3AED] font-bold">SYNC</span>
              </div>
            </div>
          </div>

          <div className="md:col-span-4 space-y-3 font-mono">
            <div className="font-orbitron font-bold text-white uppercase tracking-wider text-sm">
              SPÉCIFICATIONS SYSTÈME
            </div>
            <div className="space-y-1.5 text-[11px] text-neutral-400">
              <div>MOTEUR : THREE.JS R160+ // WEBGL2</div>
              <div>SHADERS : GLSL EVENT HORIZON & ACCRETION</div>
              <div>PARTICULES : VOLUMETRIC VORTEX JET (4.2K PTS)</div>
              <div>POST-PROCESSING : UNREALBLOOM & FXAA</div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-[10px] uppercase tracking-widest text-neutral-500">
          <div>
            DIMENSION CYBERPUNK LAB © 2026 // ALL SYSTEMS FUNCTIONAL
          </div>

          <button
            onClick={onScrollToTop}
            className="flex items-center gap-2 text-cyan-400 hover:text-white transition-colors cursor-pointer group font-semibold"
          >
            <span>RETOUR AU PORTAIL</span>
            <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-1 transition-transform text-[#F472B6]" />
          </button>
        </div>
      </div>
    </footer>
  );
};
