import React, { useState } from 'react';
import { Globe, ArrowUpRight, Sparkles, X, Compass, ExternalLink } from 'lucide-react';
import { soundEngine } from '../audio/soundEngine';

interface WorldsSectionProps {
  onSelectWorld: (worldId: number) => void;
  onShockwave: () => void;
}

export const WorldsSection: React.FC<WorldsSectionProps> = ({ onSelectWorld, onShockwave }) => {
  const [activeWorld, setActiveWorld] = useState<number | null>(null);

  const worlds = [
    {
      id: 0,
      name: 'NEO-TOKYO // SECTEUR 09',
      timeline: 'AN 2099',
      climate: 'Pluie d\'acide & Réflexions de Néons',
      desc: 'Mégalopole hyper-connectée où les tours holographiques traversent la stratosphère. Centre névralgique de la recherche en physique quantique.',
      tags: ['Cyberpunk', 'Hologrammes', 'Néons'],
      coordinates: '35.6762° N, 139.6503° E // GRID_9',
    },
    {
      id: 1,
      name: 'SYNTHETIC HORIZON',
      timeline: 'AN 2142',
      climate: 'Apesanteur Artificielle',
      desc: 'Anneau orbital de Dyson capturant le rayonnement d’une naine blanche pour alimenter les portails interdimensionnels de DIMENSION.',
      tags: ['Dyson Ring', 'Tachyon', 'Apesanteur'],
      coordinates: 'L1 LAGRANGE POINT // ORBIT_4',
    },
    {
      id: 2,
      name: 'NEBULA ZERO',
      timeline: 'INTEMPOREL',
      climate: 'Vide Cosmique & Tempête d\'Antimatière',
      desc: 'Région de l\'espace lointain où les lois de la gravité s’inversent. Les particules de lumière s’y condensent en cristaux énergétiques violets.',
      tags: ['Antimatière', 'Vortex', 'Cosmos'],
      coordinates: 'NGC-6543 DEEP VOID',
    },
    {
      id: 3,
      name: 'CYBERSPHERE NET',
      timeline: 'SIMULATION 4.0',
      climate: 'Flux Vectoriel Pur',
      desc: 'Matrice computationnelle décentralisée où les consciences numérisées interagissent sous forme de maillages géométriques lumineux.',
      tags: ['Conscience', 'Wireframe', 'Matrice'],
      coordinates: 'IP_V6 ::7C3A:ED06:B6D4',
    },
  ];

  return (
    <section className="relative min-h-screen w-full flex flex-col justify-center p-6 sm:p-10 lg:p-16 pointer-events-none select-none">
      <div className="max-w-6xl mx-auto w-full py-20">
        {/* Section Header */}
        <div className="flex items-center gap-4 font-mono text-xs tracking-[0.3em] uppercase text-[#F472B6] mb-6">
          <span>04 // WORLDS</span>
          <div className="h-[1px] w-12 bg-[#F472B6]/40" />
          <span className="text-neutral-400">GALERIE DE MONDES VIRTUELS & RÉALITÉS PARALLÈLES</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h2 className="font-orbitron font-extrabold text-4xl sm:text-5xl md:text-6xl uppercase tracking-tight text-white">
              DESTINATIONS DE LA FAILLE
            </h2>
            <p className="mt-3 text-neutral-300 text-sm sm:text-base font-light max-w-xl font-sans">
              Le portail ouvre des brèches vers quatre cyber-dimensions majeures. Sélectionnez une réalité pour synchroniser les coordonnées 3D.
            </p>
          </div>
          <div className="font-mono text-xs text-cyan-400 border border-cyan-500/30 px-3 py-2 bg-cyan-950/20 hidden lg:block">
            4 NŒUDS DE TÉLÉPORTATION SYNCHRONISÉS
          </div>
        </div>

        {/* 4 Worlds Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pointer-events-auto">
          {worlds.map((w) => (
            <div
              key={w.id}
              onClick={() => {
                setActiveWorld(w.id);
                onSelectWorld(w.id);
                soundEngine.playChime(580 + w.id * 140);
              }}
              className="text-left p-6 sm:p-8 cursor-pointer hud-panel hover:border-cyan-400 transition-all duration-300 group flex flex-col justify-between min-h-[260px] relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-bl from-[#06B6D4]/15 via-transparent to-transparent pointer-events-none" />

              <div>
                <div className="flex items-center justify-between font-mono text-[10px] text-neutral-400 uppercase tracking-widest mb-3">
                  <span className="text-cyan-400">0{w.id + 1} // {w.timeline}</span>
                  <span className="border border-white/10 px-2 py-0.5 text-neutral-400">{w.climate}</span>
                </div>

                <h3 className="font-orbitron font-bold text-xl sm:text-2xl text-white group-hover:text-cyan-300 transition-colors uppercase tracking-wide mb-3 flex items-center justify-between">
                  <span>{w.name}</span>
                  <ArrowUpRight className="w-5 h-5 text-neutral-500 group-hover:text-cyan-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                </h3>

                <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed mb-6 font-sans">
                  {w.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-cyan-500/20 flex items-center justify-between font-mono text-[10px]">
                <div className="flex gap-1.5 flex-wrap">
                  {w.tags.map((t) => (
                    <span key={t} className="px-2 py-0.5 bg-[#030712] border border-white/10 text-neutral-400">
                      {t}
                    </span>
                  ))}
                </div>
                <span className="text-cyan-400 font-semibold group-hover:underline flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  SYNCHRONISER
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* World Inspection Modal */}
        {activeWorld !== null && (
          <div className="fixed inset-0 z-50 pointer-events-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-6">
            <div className="hud-panel max-w-xl w-full p-8 relative shadow-[0_0_60px_rgba(6,182,212,0.3)] bg-[#030718]">
              <button
                onClick={() => setActiveWorld(null)}
                className="absolute top-6 right-6 text-neutral-400 hover:text-white p-2 border border-white/10 hover:border-white/30 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="font-mono text-xs text-cyan-400 uppercase tracking-widest mb-2">
                COORDONNÉES TACHYONIQUES // {worlds[activeWorld].name}
              </div>

              <h3 className="font-orbitron font-extrabold text-2xl sm:text-3xl text-white uppercase mb-4 text-neon-cyan">
                {worlds[activeWorld].name}
              </h3>

              <p className="text-sm text-neutral-300 font-light leading-relaxed mb-6 font-sans">
                {worlds[activeWorld].desc}
              </p>

              <div className="p-4 bg-[#02040c] border border-cyan-500/30 font-mono text-xs text-pink-300 space-y-1 mb-6">
                <div className="text-[10px] text-neutral-400 uppercase">LOCALISATION VECTORIELLE :</div>
                <div>{worlds[activeWorld].coordinates}</div>
              </div>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => {
                    onSelectWorld(activeWorld);
                    onShockwave();
                    soundEngine.playShockwave();
                    setActiveWorld(null);
                  }}
                  className="px-6 py-3 bg-gradient-to-r from-[#06B6D4] to-[#7C3AED] text-white font-mono text-xs uppercase tracking-widest font-bold hover:opacity-90 transition-opacity cursor-pointer clip-chamfer"
                >
                  Engager le Saut Quantique
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
