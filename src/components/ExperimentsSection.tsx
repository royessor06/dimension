import React from 'react';
import { Sliders, Zap, Disc, RefreshCw, Sparkles, Layers } from 'lucide-react';
import { soundEngine } from '../audio/soundEngine';

interface ExperimentsSectionProps {
  materialMode: number;
  onSelectMode: (mode: number) => void;
  noiseFrequency: number;
  onUpdateFrequency: (freq: number) => void;
  turbulence: number;
  onUpdateTurbulence: (turb: number) => void;
  wireframeBlend: number;
  onUpdateWireframe: (blend: number) => void;
  onShockwave: () => void;
}

export const ExperimentsSection: React.FC<ExperimentsSectionProps> = ({
  materialMode,
  onSelectMode,
  noiseFrequency,
  onUpdateFrequency,
  turbulence,
  onUpdateTurbulence,
  wireframeBlend,
  onUpdateWireframe,
  onShockwave,
}) => {
  const experiments = [
    {
      id: 0,
      code: 'EXP.01',
      title: 'CHROMATISME LIQUIDE',
      tag: 'DISPERSION PRISMATIQUE',
      desc: 'Décomposition du spectre lumineux via l’équation de Fresnel. Réagit aux angles rasants avec reflets cyan, violet et fuchsia.',
      accent: 'border-cyan-400 text-cyan-300',
    },
    {
      id: 1,
      code: 'EXP.02',
      title: 'MERCURE CHROME',
      tag: 'VISCOSITÉ SPÉCULAIRE',
      desc: 'Simule un métal liquide amorphe réfléchissant un environnement virtuel infini avec des reflets métalliques à haute fréquence.',
      accent: 'border-white text-white',
    },
    {
      id: 2,
      code: 'EXP.03',
      title: 'NÉO-BIOLUMINESCENCE',
      tag: 'ÉNERGIE QUANTIQUE',
      desc: 'Rayonnement intérieur émanant du cœur de la géométrie, pulsant au rythme des coordonnées cartésiennes.',
      accent: 'border-[#7928ca] text-violet-300',
    },
    {
      id: 3,
      code: 'EXP.04',
      title: 'MATRICE TOPOLOGIQUE',
      tag: 'ISOLIGNES DE NIVEAU',
      desc: 'Découpage vectoriel en courbes de niveau calculées en GLSL, révélant la structure algébrique sous-jacente.',
      accent: 'border-[#ff007a] text-[#ff007a]',
    },
  ];

  return (
    <section className="relative min-h-screen w-full flex flex-col justify-center p-6 md:p-12 lg:p-16 pointer-events-none select-none">
      <div className="max-w-6xl mx-auto w-full py-16">
        {/* Header Tag */}
        <div className="flex items-center gap-3 font-mono text-xs tracking-[0.3em] uppercase text-cyan-400 mb-4">
          <span>03 // LABORATOIRE ACTIF</span>
          <div className="h-[1px] w-16 bg-cyan-400/40" />
          <span className="text-neutral-500">OBJETS GÉOMÉTRIQUES INTERACTIFS</span>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div>
            <h2 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl uppercase tracking-tight text-white">
              ANOMALIES & ÉTATS DE MATIÈRE
            </h2>
            <p className="mt-2 text-neutral-400 text-sm max-w-xl font-light">
              Sélectionnez une formulation de shader et ajustez les variables d'ondes pour observer la transmutation instantanée dans le viewport 3D.
            </p>
          </div>

          <div className="pointer-events-auto">
            <button
              onClick={() => {
                onShockwave();
                soundEngine.playShockwave();
              }}
              className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest px-4 py-2.5 border border-cyan-400/50 bg-[#050508]/80 text-cyan-300 hover:border-[#ff007a] hover:text-[#ff007a] transition-colors cursor-pointer"
            >
              <Zap className="w-3.5 h-3.5" />
              Impulsion Énergétique
            </button>
          </div>
        </div>

        {/* 4 Experiment Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pointer-events-auto mb-10">
          {experiments.map((exp) => {
            const isSelected = materialMode === exp.id;
            return (
              <button
                key={exp.id}
                onClick={() => {
                  onSelectMode(exp.id);
                  soundEngine.playChime(500 + exp.id * 120);
                }}
                className={`text-left p-5 border transition-all duration-300 relative cursor-pointer ${
                  isSelected
                    ? `${exp.accent} bg-[#0a0714]/90 shadow-[0_0_20px_rgba(0,242,254,0.15)] ring-1 ring-cyan-400/30`
                    : 'border-white/10 bg-[#050508]/70 text-neutral-400 hover:border-white/30 hover:text-white'
                }`}
              >
                <div className="flex justify-between items-center mb-3">
                  <span className="font-mono text-[10px] tracking-widest text-cyan-400/80 uppercase">
                    {exp.code}
                  </span>
                  {isSelected && (
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-none inline-block shadow-[0_0_8px_#00f2fe]" />
                  )}
                </div>

                <h3 className="font-display font-bold text-sm tracking-wide text-white uppercase mb-1">
                  {exp.title}
                </h3>
                <span className="block font-mono text-[9px] text-[#ff007a] tracking-wider mb-2 uppercase">
                  {exp.tag}
                </span>

                <p className="text-[11px] text-neutral-400 leading-relaxed font-light">
                  {exp.desc}
                </p>
              </button>
            );
          })}
        </div>

        {/* Real-time GLSL Uniforms Panel */}
        <div className="pointer-events-auto bg-[#0a0714]/85 border border-white/10 p-6 backdrop-blur-md">
          <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-6">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-neutral-300">
              <Sliders className="w-3.5 h-3.5 text-cyan-400" />
              RÉGLAGES VECTORIELS EN TEMPS RÉEL (UNIFORMS GLSL)
            </div>
            <button
              onClick={() => {
                onUpdateFrequency(0.8);
                onUpdateTurbulence(1.0);
                onUpdateWireframe(0.0);
                soundEngine.playChime(550);
              }}
              className="font-mono text-[10px] text-neutral-400 hover:text-white flex items-center gap-1 uppercase transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3 h-3" />
              Réinitialiser
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Frequency */}
            <div>
              <div className="flex justify-between font-mono text-[10px] text-neutral-400 uppercase mb-2">
                <span>Fréquence du Bruit (Octaves)</span>
                <span className="text-cyan-400 font-bold">{noiseFrequency.toFixed(2)} rad</span>
              </div>
              <input
                type="range"
                min="0.2"
                max="2.5"
                step="0.05"
                value={noiseFrequency}
                onChange={(e) => onUpdateFrequency(parseFloat(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer h-1.5 bg-neutral-800 rounded-none"
              />
            </div>

            {/* Turbulence */}
            <div>
              <div className="flex justify-between font-mono text-[10px] text-neutral-400 uppercase mb-2">
                <span>Turbulence Particulaire (Cosmos)</span>
                <span className="text-violet-400 font-bold">{turbulence.toFixed(2)}x</span>
              </div>
              <input
                type="range"
                min="0.2"
                max="3.0"
                step="0.1"
                value={turbulence}
                onChange={(e) => onUpdateTurbulence(parseFloat(e.target.value))}
                className="w-full accent-violet-400 cursor-pointer h-1.5 bg-neutral-800 rounded-none"
              />
            </div>

            {/* Wireframe Blend */}
            <div>
              <div className="flex justify-between font-mono text-[10px] text-neutral-400 uppercase mb-2">
                <span>Opacité Maillage Isométrique</span>
                <span className="text-[#ff007a] font-bold">{(wireframeBlend * 100).toFixed(0)}%</span>
              </div>
              <input
                type="range"
                min="0.0"
                max="1.0"
                step="0.05"
                value={wireframeBlend}
                onChange={(e) => onUpdateWireframe(parseFloat(e.target.value))}
                className="w-full accent-[#ff007a] cursor-pointer h-1.5 bg-neutral-800 rounded-none"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
