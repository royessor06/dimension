import React from 'react';
import { Sparkles, Eye, Layers, Compass, ArrowRight } from 'lucide-react';
import { soundEngine } from '../audio/soundEngine';

interface FeaturesSectionProps {
  selectedFeatureIndex: number;
  onSelectFeature: (index: number) => void;
  onShockwave: () => void;
}

export const FeaturesSection: React.FC<FeaturesSectionProps> = ({
  selectedFeatureIndex,
  onSelectFeature,
  onShockwave,
}) => {
  const features = [
    {
      id: 0,
      code: 'OBJ.01',
      title: 'Verre Optique & Transmission',
      tag: 'TRANSMISSION 0.88 // IOR 1.6',
      desc: 'Monolithe de silice de haute pureté calculant la réfraction interne et les réflexions de Fresnel à angles rasants.',
      specs: ['Verre de synthèse', 'Biseau optique', 'Transmission PBR'],
    },
    {
      id: 1,
      code: 'OBJ.02',
      title: 'Chrome Liquide Amorphe',
      tag: 'MÉTALLICITÉ 0.98 // ROUGHNESS 0.12',
      desc: 'Nœud toroïdal de mercure amorphe en sustentation gravitationnelle, reflétant l’espace virtuel infini.',
      specs: ['Alliage liquide', 'Topologie fermée', 'Spécularité extrême'],
    },
    {
      id: 2,
      code: 'OBJ.03',
      title: 'Prisme Iridescent',
      tag: 'DISPERSION SPECTRAL // CLEARCOAT 1.0',
      desc: 'Polyèdre géodésique diffractant le faisceau lumineux en franges violette, cyan et fuchsia selon l’angle de vue.',
      specs: ['Prisme de Newton', 'Anisotropie', 'Émission quantique'],
    },
  ];

  return (
    <section className="relative min-h-screen w-full flex flex-col justify-center p-8 sm:p-12 lg:p-20 pointer-events-none select-none">
      <div className="max-w-6xl mx-auto w-full py-20">
        {/* Section Header */}
        <div className="flex items-center gap-4 font-mono text-xs tracking-[0.3em] uppercase text-violet-400 mb-6">
          <span>03 // FEATURES</span>
          <div className="h-[1px] w-12 bg-violet-400/30" />
          <span className="text-neutral-400">TROIS OBJETS SCULPTURAUX</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h2 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl uppercase tracking-tight text-white">
              MATIÈRE, LUMIÈRE & FORME
            </h2>
            <p className="mt-3 text-neutral-400 text-sm sm:text-base font-light max-w-xl">
              Trois sculptures 3D indépendantes cohabitent dans le viewport. Cliquez sur une pièce pour focaliser la caméra et faire pivoter l'objet en direct.
            </p>
          </div>
          <div className="font-mono text-[11px] text-neutral-400 uppercase tracking-widest hidden lg:block">
            SÉLECTION DE CAMÉRA DYNAMIQUE
          </div>
        </div>

        {/* 3 Sculptural Objects Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pointer-events-auto">
          {features.map((feat) => {
            const isSelected = selectedFeatureIndex === feat.id;
            return (
              <button
                key={feat.id}
                onClick={() => {
                  onSelectFeature(feat.id);
                  soundEngine.playChime(520 + feat.id * 140);
                }}
                className={`text-left p-6 sm:p-8 transition-all duration-400 relative cursor-pointer glass-panel glass-panel-hover flex flex-col justify-between min-h-[320px] ${
                  isSelected
                    ? 'border-cyan-400/80 bg-[rgba(16,16,36,0.85)] shadow-[0_0_30px_rgba(0,242,254,0.18)]'
                    : 'border-white/10 hover:border-white/25'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-widest mb-4">
                    <span className={isSelected ? 'text-cyan-300 font-bold' : 'text-neutral-400'}>
                      {feat.code}
                    </span>
                    {isSelected ? (
                      <span className="flex items-center gap-1.5 text-cyan-400 text-[9px]">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 inline-block shadow-[0_0_6px_#00f2fe]" />
                        ACTIF EN 3D
                      </span>
                    ) : (
                      <span className="text-neutral-400">CLIQUER</span>
                    )}
                  </div>

                  <h3 className="font-display font-bold text-xl sm:text-2xl text-white uppercase tracking-wide mb-2">
                    {feat.title}
                  </h3>

                  <div className="font-mono text-[10px] text-[#ff007a] uppercase tracking-wider mb-4">
                    {feat.tag}
                  </div>

                  <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed mb-6 font-sans">
                    {feat.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between font-mono text-[10px] text-neutral-400">
                  <div className="flex gap-1.5 flex-wrap">
                    {feat.specs.map((s) => (
                      <span key={s} className="px-2 py-0.5 bg-white/5 border border-white/5">
                        {s}
                      </span>
                    ))}
                  </div>
                  <ArrowRight className={`w-3.5 h-3.5 transition-transform ${isSelected ? 'text-cyan-400 translate-x-1' : 'text-neutral-500'}`} />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
