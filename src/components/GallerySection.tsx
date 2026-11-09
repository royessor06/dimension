import React, { useState } from 'react';
import { ArrowUpRight, X, Sparkles, Layers, Sliders } from 'lucide-react';
import { soundEngine } from '../audio/soundEngine';

interface GallerySectionProps {
  onSelectArtworkMode: (mode: number, deform: number) => void;
}

export const GallerySection: React.FC<GallerySectionProps> = ({ onSelectArtworkMode }) => {
  const [activeArtwork, setActiveArtwork] = useState<number | null>(null);

  const compositions = [
    {
      id: 0,
      title: 'Monolithe Prisme I',
      year: '2026',
      mode: 0,
      deform: 0.65,
      medium: 'Three.js WebGL2 // Shaders GLSL de Réfraction',
      details: 'Étude d’une géométrie amorphe à haute réfraction. La lumière incidente est décomposée en composantes RGB à travers les épaisseurs variables de la surface.',
      dimensions: '1800 x 2400 mm (Virtuel)',
    },
    {
      id: 1,
      title: 'Fluide Supraconducteur II',
      year: '2026',
      mode: 1,
      deform: 0.85,
      medium: 'Métal liquide amorphe // Réflectance Spéculaire 99.4%',
      details: 'Sculpture toroïdale en apesanteur reproduisant le comportement cinématique d’un alliage de mercure à l’état superfluide.',
      dimensions: '2200 x 2200 mm (Virtuel)',
    },
    {
      id: 2,
      title: 'Nébuleuse Quantique III',
      year: '2026',
      mode: 2,
      deform: 1.25,
      medium: 'Bioluminescence // Émission Photonique Volumétrique',
      details: 'Forme organique émettant un rayonnement électromagnétique de haute énergie dans le spectre visible cyan et violet profond.',
      dimensions: '2500 x 3000 mm (Virtuel)',
    },
  ];

  return (
    <section className="relative min-h-screen w-full flex flex-col justify-center p-8 sm:p-12 lg:p-20 pointer-events-none select-none">
      <div className="max-w-6xl mx-auto w-full py-20">
        {/* Section Header */}
        <div className="flex items-center gap-4 font-mono text-xs tracking-[0.3em] uppercase text-[#ff007a] mb-6">
          <span>04 // GALLERY</span>
          <div className="h-[1px] w-12 bg-[#ff007a]/30" />
          <span className="text-neutral-400">COMPOSITIONS FLOTTANTES</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h2 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl uppercase tracking-tight text-white">
              ÉCRINS DIGITAUX HAUTE FIDÉLITÉ
            </h2>
            <p className="mt-3 text-neutral-400 text-sm sm:text-base font-light max-w-xl">
              Une collection restreinte de pièces sculptées dans l'obscurité. Chaque composition flotte dans un repère spatial non-euclidien.
            </p>
          </div>
          <div className="font-mono text-[11px] text-neutral-400 uppercase tracking-widest hidden lg:block">
            ARCHIVES 2026 // ÉDITION LIMITÉE
          </div>
        </div>

        {/* Gallery Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pointer-events-auto">
          {compositions.map((comp) => (
            <div
              key={comp.id}
              onClick={() => {
                setActiveArtwork(comp.id);
                onSelectArtworkMode(comp.mode, comp.deform);
                soundEngine.playChime(600 + comp.id * 150);
              }}
              className="text-left p-6 sm:p-8 cursor-pointer glass-panel glass-panel-hover flex flex-col justify-between min-h-[340px] group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-bl from-cyan-400/10 via-transparent to-transparent pointer-events-none" />

              <div>
                <div className="flex items-center justify-between font-mono text-[10px] text-neutral-400 uppercase tracking-widest mb-4">
                  <span>0{comp.id + 1} / 03</span>
                  <span className="border border-white/10 px-2 py-0.5">{comp.year}</span>
                </div>

                <h3 className="font-display font-bold text-xl sm:text-2xl text-white group-hover:text-cyan-300 transition-colors uppercase tracking-wide mb-3 flex items-center justify-between">
                  <span>{comp.title}</span>
                  <ArrowUpRight className="w-4 h-4 text-neutral-500 group-hover:text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </h3>

                <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed mb-6 font-sans">
                  {comp.details}
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between font-mono text-[10px]">
                <span className="text-neutral-400">{comp.dimensions}</span>
                <span className="text-cyan-400 flex items-center gap-1 group-hover:underline">
                  <Sparkles className="w-3 h-3" />
                  PROJETER
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Inspector Modal */}
        {activeArtwork !== null && (
          <div className="fixed inset-0 z-50 pointer-events-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-6">
            <div className="bg-[#080816] border border-white/20 max-w-xl w-full p-8 relative shadow-[0_0_50px_rgba(0,0,0,0.8)]">
              <button
                onClick={() => setActiveArtwork(null)}
                className="absolute top-6 right-6 text-neutral-400 hover:text-white p-2 border border-white/10 hover:border-white/30 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="font-mono text-xs text-cyan-400 uppercase tracking-widest mb-2">
                FICHE D’ŒUVRE // {compositions[activeArtwork].title}
              </div>

              <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white uppercase mb-4">
                {compositions[activeArtwork].title}
              </h3>

              <p className="text-sm text-neutral-300 font-light leading-relaxed mb-6 font-sans">
                {compositions[activeArtwork].details}
              </p>

              <div className="grid grid-cols-2 gap-4 font-mono text-xs p-4 bg-white/5 border border-white/10 mb-6">
                <div>
                  <span className="text-neutral-500 block text-[10px] uppercase mb-1">Médium</span>
                  <span className="text-white">{compositions[activeArtwork].medium}</span>
                </div>
                <div>
                  <span className="text-neutral-500 block text-[10px] uppercase mb-1">Échelle</span>
                  <span className="text-cyan-400">{compositions[activeArtwork].dimensions}</span>
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => {
                    const c = compositions[activeArtwork];
                    onSelectArtworkMode(c.mode, c.deform);
                    soundEngine.playShockwave();
                    setActiveArtwork(null);
                  }}
                  className="px-6 py-3 bg-gradient-to-r from-cyan-400 to-[#7928ca] text-white font-mono text-xs uppercase tracking-widest hover:opacity-90 transition-opacity cursor-pointer"
                >
                  Focaliser dans le Viewport
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
