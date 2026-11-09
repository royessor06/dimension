import React from 'react';
import { Sparkles, Sliders, Eye } from 'lucide-react';
import { soundEngine } from '../audio/soundEngine';

interface ManifestoSectionProps {
  deformIntensity: number;
  onUpdateDeform: (val: number) => void;
  onShockwave: () => void;
}

export const ManifestoSection: React.FC<ManifestoSectionProps> = ({
  deformIntensity,
  onUpdateDeform,
  onShockwave,
}) => {
  return (
    <section className="relative min-h-screen w-full flex flex-col justify-center p-8 sm:p-12 lg:p-20 pointer-events-none select-none">
      <div className="max-w-6xl mx-auto w-full py-20">
        {/* Section Index */}
        <div className="flex items-center gap-4 font-mono text-xs tracking-[0.3em] uppercase text-cyan-400 mb-8">
          <span>02 // MANIFESTO</span>
          <div className="h-[1px] w-12 bg-cyan-400/30" />
          <span className="text-neutral-400">NARRATION & MUTATION GÉOMÉTRIQUE</span>
        </div>

        {/* Narrative & Transformation Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-8 space-y-6">
            <h2 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight uppercase text-white">
              LE WEB N'EST PAS UNE PAGE,
              <span className="block text-neutral-400 font-light">
                C'EST UN ESPACE.
              </span>
              <span className="block bg-gradient-to-r from-violet-400 via-pink-400 to-cyan-300 bg-clip-text text-transparent">
                SCULPTÉ PAR LA LUMIÈRE.
              </span>
            </h2>

            <p className="font-sans text-base sm:text-lg text-neutral-300 font-light leading-relaxed max-w-2xl pt-4">
              Nous réfutons la banalité des gabarits uniformes. À l'intersection des mathématiques pures et de la direction artistique cinématographique, chaque pixel calcule la trajectoire de photons virtuels traversant la matière.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-8 border-t border-white/10 font-sans">
              <div>
                <h3 className="font-display font-semibold text-lg text-white uppercase tracking-wide mb-2">
                  01. Précision Optique
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed">
                  Calcul rigoureux de l'indice de réfraction de Snell-Descartes et dispersion chromatique pour un éclat sculptural authentique.
                </p>
              </div>

              <div>
                <h3 className="font-display font-semibold text-lg text-white uppercase tracking-wide mb-2">
                  02. Inertie Cinématique
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed">
                  Mouvements calculés par intégration de ressorts physiques, assurant une transition sans à-coups sur tous les écrans.
                </p>
              </div>
            </div>
          </div>

          {/* Interactive 3D Transformation Panel */}
          <div className="lg:col-span-4 pointer-events-auto">
            <div className="glass-panel p-6 sm:p-8 space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-white">
                  <Sliders className="w-3.5 h-3.5 text-cyan-400" />
                  <span>TRANSFORMATION 3D</span>
                </div>
                <span className="font-mono text-xs text-[#ff007a] font-semibold">
                  {deformIntensity.toFixed(2)}
                </span>
              </div>

              <p className="text-xs text-neutral-400 font-light leading-relaxed">
                Interagissez avec le coefficient de perturbation fractal pour observer la déconstruction en direct de la sculpture.
              </p>

              <div>
                <input
                  type="range"
                  min="0.1"
                  max="2.0"
                  step="0.05"
                  value={deformIntensity}
                  onChange={(e) => {
                    const val = parseFloat(e.target.value);
                    onUpdateDeform(val);
                    soundEngine.modulateAtmosphere(val);
                  }}
                  className="w-full accent-cyan-400 cursor-pointer h-1.5 bg-neutral-800 rounded-none"
                />
                <div className="flex justify-between text-[10px] font-mono text-neutral-400 mt-2 uppercase">
                  <span>Harmonie</span>
                  <span>Fragmentation</span>
                </div>
              </div>

              <button
                onClick={() => {
                  onShockwave();
                  soundEngine.playShockwave();
                }}
                className="w-full py-3 border border-white/20 bg-white/5 hover:border-[#ff007a]/80 text-white font-mono text-xs uppercase tracking-widest transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#ff007a]" />
                <span>Onde de choc</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
