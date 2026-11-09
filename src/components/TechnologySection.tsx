import React from 'react';
import { Cpu, Zap, Radio, ArrowRight, Shield, Layers } from 'lucide-react';
import { soundEngine } from '../audio/soundEngine';

interface TechnologySectionProps {
  selectedTechIndex: number;
  onSelectTech: (index: number) => void;
  onShockwave: () => void;
}

export const TechnologySection: React.FC<TechnologySectionProps> = ({
  selectedTechIndex,
  onSelectTech,
  onShockwave,
}) => {
  const artifacts = [
    {
      id: 0,
      code: 'TECH.01',
      name: 'Tesseract Quantique 4D',
      class: 'STRUCTURE HYPER-GÉOMÉTRIQUE',
      desc: 'Double cube imbriqué projetant des ombres tridimensionnelles. Les arêtes de laser cyan vibrent sous l’effet de superpositions quantiques.',
      specs: ['Dimensions : 4D Geodesic', 'Horloge : 1.2 THz', 'Matrice : Wireframe GLSL'],
      color: 'border-cyan-400 text-cyan-300',
    },
    {
      id: 1,
      code: 'TECH.02',
      name: 'Relais de Flux Tachyon',
      class: 'ACCÉLÉRATEUR DE SINGULARITÉ',
      desc: 'Tore supraconducteur en titane violet générant un confinement magnétique pour stabiliser le vortex du portail central.',
      specs: ['Champ : 45 Teslas', 'Alliage : Titane Violet', 'Confinement : Relativiste'],
      color: 'border-[#7C3AED] text-violet-300',
    },
    {
      id: 2,
      code: 'TECH.03',
      name: 'Matrice Neuro-Holographique',
      class: 'NOYAU D\'INTELLIGENCE SYNTHÉTIQUE',
      desc: 'Dodécaèdre photonique iridescent synchronisant les calculs de distorsion spatio-temporelle en temps réel.',
      specs: ['Topologie : Dodecahedron', 'Émission : Rose Néon', 'Clearcoat : 1.0 Optique'],
      color: 'border-[#F472B6] text-[#F472B6]',
    },
  ];

  return (
    <section className="relative min-h-screen w-full flex flex-col justify-center p-6 sm:p-10 lg:p-16 pointer-events-none select-none">
      <div className="max-w-6xl mx-auto w-full py-20">
        {/* Section Header */}
        <div className="flex items-center gap-4 font-mono text-xs tracking-[0.3em] uppercase text-cyan-400 mb-6">
          <span>03 // TECHNOLOGY</span>
          <div className="h-[1px] w-12 bg-cyan-400/40" />
          <span className="text-neutral-400">OBJETS 3D CYBERNÉTIQUES INTERACTIFS</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h2 className="font-orbitron font-extrabold text-4xl sm:text-5xl md:text-6xl uppercase tracking-tight text-white">
              INGÉNIERIE DE LA FAILLE
            </h2>
            <p className="mt-3 text-neutral-300 text-sm sm:text-base font-light max-w-xl font-sans">
              Trois artefacts cybernétiques modélisés en WebGL2. Cliquez sur un module pour orienter les caméras du lab et analyser sa géométrie en temps réel.
            </p>
          </div>
          <div className="font-mono text-[11px] text-[#F472B6] uppercase tracking-widest border border-[#F472B6]/30 px-3 py-1.5 bg-[#F472B6]/10 hidden lg:block">
            RAYCASTING ACTIF // GPU TRACKING
          </div>
        </div>

        {/* 3 Tech Artifact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pointer-events-auto">
          {artifacts.map((tech) => {
            const isSelected = selectedTechIndex === tech.id;
            return (
              <button
                key={tech.id}
                onClick={() => {
                  onSelectTech(tech.id);
                  soundEngine.playChime(540 + tech.id * 160);
                }}
                className={`text-left p-6 sm:p-8 transition-all duration-400 relative cursor-pointer hud-panel flex flex-col justify-between min-h-[340px] ${
                  isSelected
                    ? `${tech.color} bg-[#04081c]/90 shadow-[0_0_35px_rgba(6,182,212,0.25)] ring-1 ring-cyan-400/50`
                    : 'border-white/10 hover:border-white/30 text-neutral-400'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-widest mb-4">
                    <span className={isSelected ? 'text-cyan-300 font-bold' : 'text-neutral-400'}>
                      {tech.code}
                    </span>
                    {isSelected ? (
                      <span className="flex items-center gap-1.5 text-cyan-400 text-[9px] font-bold">
                        <span className="w-1.5 h-1.5 bg-cyan-400 inline-block shadow-[0_0_6px_#06B6D4]" />
                        CIBLE VERROUILLÉE
                      </span>
                    ) : (
                      <span className="text-neutral-400">EXAMINER</span>
                    )}
                  </div>

                  <h3 className="font-orbitron font-bold text-xl sm:text-2xl text-white uppercase tracking-wide mb-2">
                    {tech.name}
                  </h3>

                  <div className="font-mono text-[10px] text-[#F472B6] uppercase tracking-wider mb-4 font-semibold">
                    {tech.class}
                  </div>

                  <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed mb-6 font-sans">
                    {tech.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-cyan-500/20 flex items-center justify-between font-mono text-[10px]">
                  <div className="flex gap-1.5 flex-wrap">
                    {tech.specs.map((s) => (
                      <span key={s} className="px-2 py-0.5 bg-black/40 border border-white/10 text-neutral-400">
                        {s}
                      </span>
                    ))}
                  </div>
                  <ArrowRight className={`w-4 h-4 transition-transform ${isSelected ? 'text-cyan-400 translate-x-1' : 'text-neutral-500'}`} />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
