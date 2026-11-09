import React from 'react';
import { ArrowUp, Award, Compass, Radio } from 'lucide-react';

interface FooterSectionProps {
  onScrollToTop: () => void;
}

export const FooterSection: React.FC<FooterSectionProps> = ({ onScrollToTop }) => {
  return (
    <footer className="relative w-full border-t border-white/10 bg-[#04040d]/90 backdrop-blur-md p-8 sm:p-12 lg:p-20 text-neutral-400 font-sans select-none z-30">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-5 space-y-4">
            <div className="font-display font-extrabold text-2xl text-white tracking-widest flex items-center gap-3">
              <span>DIMENSION</span>
              <span className="text-[10px] font-mono tracking-normal text-cyan-400 border border-cyan-500/30 px-2 py-0.5">
                EXP.2026
              </span>
            </div>
            <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed max-w-sm">
              Laboratoire de design cinématique et d'ingénierie 3D en temps réel. Création d'expériences numériques de prestige récompensées à l'international.
            </p>
          </div>

          <div className="md:col-span-3 space-y-3 font-mono text-xs">
            <div className="text-white uppercase tracking-wider font-semibold">DISTINCTIONS</div>
            <div className="space-y-2 text-neutral-400 text-[11px]">
              <div className="flex items-center gap-2">
                <Award className="w-3.5 h-3.5 text-cyan-400" />
                <span>AWWWARDS // SITE OF THE DAY</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-3.5 h-3.5 text-[#ff007a]" />
                <span>FWA // OF THE DAY</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-3.5 h-3.5 text-violet-400" />
                <span>CSS DESIGN AWARDS // BEST UI/UX</span>
              </div>
            </div>
          </div>

          <div className="md:col-span-4 space-y-3 font-mono text-xs">
            <div className="text-white uppercase tracking-wider font-semibold">SPÉCIFICATIONS TECHNIQUES</div>
            <div className="space-y-1.5 text-[11px] text-neutral-400">
              <div>RENDU : THREE.JS R160+ // WEBGL2</div>
              <div>POST-PROCESSING : UNREALBLOOMPASS & FXAA</div>
              <div>ACCESSIBILITÉ : PREFERS-REDUCED-MOTION SUPPORTÉ</div>
              <div>TYPOGRAPHIE : SPACE GROTESK & INTER</div>
            </div>
          </div>
        </div>

        {/* Bottom Credits & Back to Top */}
        <div className="pt-8 border-t border-white/5 flex flex-wrap items-center justify-between gap-6 font-mono text-[10px] tracking-widest uppercase">
          <div>
            DIMENSION LUXURY DIGITAL © 2026 // TOUS DROITS RÉSERVÉS
          </div>

          <button
            onClick={onScrollToTop}
            className="flex items-center gap-2 text-neutral-300 hover:text-cyan-400 transition-colors cursor-pointer group"
          >
            <span>RETOUR AU SOMMET</span>
            <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-1 transition-transform text-cyan-400" />
          </button>
        </div>
      </div>
    </footer>
  );
};
