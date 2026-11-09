import React from 'react';
import { ArrowDown, Zap, Shield, Radio, Terminal } from 'lucide-react';
import { soundEngine } from '../audio/soundEngine';

interface PortalSectionProps {
  onExplore: () => void;
  onJump: () => void;
}

export const PortalSection: React.FC<PortalSectionProps> = ({ onExplore, onJump }) => {
  return (
    <section className="relative min-h-screen w-full flex flex-col justify-between p-6 sm:p-10 lg:p-16 pointer-events-none select-none">
      {/* Top Cyber HUD Bar */}
      <div className="pt-20 flex flex-wrap items-center justify-between gap-4 font-mono text-[11px] text-cyan-400">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 bg-[#06B6D4] shadow-[0_0_8px_#06B6D4]" />
          <span className="tracking-[0.25em] uppercase font-bold text-white">
            SECTOR 01 // EVENT_HORIZON_PORTAL
          </span>
          <span className="hidden md:inline px-2 py-0.5 border border-cyan-500/40 bg-cyan-950/30 text-[9px]">
            SINGULARITY ACTIVE
          </span>
        </div>

        <div className="hidden sm:flex items-center gap-6 text-[10px] tracking-widest text-neutral-400">
          <span className="flex items-center gap-1.5 text-cyan-300">
            <Radio className="w-3 h-3 text-[#06B6D4]" />
            FREQ: 1420.405 MHz
          </span>
          <span className="text-[#F472B6]">WARP FLUX: 99.4%</span>
          <span className="text-white">TACHYON DRIVE: READY</span>
        </div>
      </div>

      {/* Center Monumental Headline */}
      <div className="my-auto py-10 max-w-6xl mx-auto w-full">
        <div className="space-y-6">
          {/* Cyberpunk Status Tag */}
          <div className="flex items-center gap-3 font-mono text-xs tracking-[0.35em] uppercase text-[#F472B6]">
            <span className="px-2 py-0.5 bg-[#F472B6]/10 border border-[#F472B6]/40">
              SYS.WARN // DIMENSIONAL BREACH DETECTED
            </span>
          </div>

          {/* Primary Monumental Title */}
          <div className="relative">
            <h1 className="font-orbitron font-black text-6xl sm:text-7xl md:text-8xl lg:text-[130px] leading-[0.88] tracking-tight uppercase text-white">
              DIMEN
              <span className="bg-gradient-to-r from-[#06B6D4] via-[#7C3AED] to-[#F472B6] bg-clip-text text-transparent">
                SION
              </span>
            </h1>
            <p className="font-orbitron font-bold text-2xl sm:text-3xl md:text-5xl text-cyan-300 tracking-wider uppercase mt-4 text-neon-cyan">
              ENTER THE UNKNOWN.
            </p>
          </div>

          <p className="font-sans text-sm sm:text-base text-neutral-300 font-light leading-relaxed max-w-xl">
            Une brèche spatio-temporelle s'ouvre au cœur du cyberespace. Un vortex gravitationnel 3D
            généré en temps réel par des shaders GLSL, projetant des particules volumétriques et distordant les lois euclidiennes.
          </p>

          {/* Futuristic CTAs */}
          <div className="pt-6 flex flex-wrap items-center gap-4 pointer-events-auto">
            <button
              onClick={() => {
                soundEngine.playShockwave();
                onJump();
              }}
              className="group px-7 py-4 border border-[#06B6D4] bg-[#030712]/90 hover:border-[#F472B6] text-white font-mono text-xs uppercase tracking-[0.2em] font-semibold transition-all duration-300 shadow-[0_0_24px_rgba(6,182,212,0.35)] hover:shadow-[0_0_30px_rgba(244,114,182,0.45)] cursor-pointer flex items-center gap-3 clip-chamfer"
            >
              <Zap className="w-4 h-4 text-[#06B6D4] group-hover:text-[#F472B6] transition-colors" />
              <span>FRANCHIR LE PORTAIL</span>
            </button>

            <button
              onClick={onExplore}
              className="px-6 py-4 border border-white/10 hover:border-white/30 text-neutral-300 hover:text-white font-mono text-xs uppercase tracking-widest transition-colors flex items-center gap-2 cursor-pointer bg-[#030712]/60 backdrop-blur-md"
            >
              <span>EXPLORER LES SECTEURS</span>
              <ArrowDown className="w-3.5 h-3.5 text-cyan-400 animate-bounce" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Telemetry HUD */}
      <div className="pb-4 flex flex-wrap items-center justify-between gap-4 font-mono text-[10px] tracking-widest text-neutral-400 uppercase border-t border-cyan-500/20 pt-6">
        <div className="flex items-center gap-2">
          <Terminal className="w-3.5 h-3.5 text-[#06B6D4]" />
          <span>CLIQUEZ SUR LE PORTAIL // ACCÉLÉRATION DU VORTEX</span>
        </div>
        <div className="hidden md:block text-[#F472B6]">
          SPATIAL DISTORTION: GLSL RELATIVISTIC ACCRETION
        </div>
      </div>
    </section>
  );
};
