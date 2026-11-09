import React, { useState } from 'react';
import { Send, CheckCircle2, RotateCcw, ArrowUp, Mail, MapPin } from 'lucide-react';
import { soundEngine } from '../audio/soundEngine';

interface CtaSectionProps {
  onResetToHero: () => void;
  onShockwave: () => void;
}

export const CtaSection: React.FC<CtaSectionProps> = ({ onResetToHero, onShockwave }) => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSent, setIsSent] = useState(false);
  const [transmissionCode, setTransmissionCode] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.email) return;

    const code = `DMN-LUX-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    setTransmissionCode(code);
    setIsSent(true);
    soundEngine.playShockwave();
    onShockwave();
  };

  return (
    <section className="relative min-h-screen w-full flex flex-col justify-center p-8 sm:p-12 lg:p-20 pointer-events-none select-none">
      <div className="max-w-6xl mx-auto w-full py-20 my-auto">
        {/* Section Header */}
        <div className="flex items-center gap-4 font-mono text-xs tracking-[0.3em] uppercase text-violet-400 mb-6">
          <span>06 // CTA</span>
          <div className="h-[1px] w-12 bg-violet-400/30" />
          <span className="text-neutral-400">RETOUR DE LA SCULPTURE CENTRALE</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-6 space-y-6">
            <h2 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl uppercase tracking-tight text-white leading-tight">
              DONNONS FORME À VOTRE PROCHAINE
              <span className="block bg-gradient-to-r from-cyan-400 via-[#7928ca] to-[#ff007a] bg-clip-text text-transparent">
                DIMENSION.
              </span>
            </h2>

            <p className="font-sans text-base sm:text-lg text-neutral-300 font-light leading-relaxed max-w-lg">
              Nous concevons des plateformes interactives exclusives pour des marques de luxe, institutions culturelles et créateurs visionnaires à travers le monde.
            </p>

            <div className="space-y-3 font-mono text-xs text-neutral-400 pointer-events-auto pt-4">
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-cyan-400" />
                <span>PARIS / GENÈVE / NEW YORK // EXP-STUDIO</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#ff007a]" />
                <span className="text-white hover:text-cyan-400 transition-colors cursor-pointer">
                  contact@dimension-experience.luxury
                </span>
              </div>
            </div>
          </div>

          {/* Minimalist Glass Consultation Card */}
          <div className="lg:col-span-6 pointer-events-auto">
            <div className="glass-panel p-8 sm:p-10 border border-white/15 backdrop-blur-xl">
              {!isSent ? (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <span className="font-mono text-xs text-cyan-300 uppercase tracking-widest font-medium">
                      INITIER UNE COLLABORATION
                    </span>
                    <span className="font-mono text-[10px] text-neutral-400 uppercase">
                      CONFIDENTIEL
                    </span>
                  </div>

                  <div>
                    <label className="block font-mono text-[10px] uppercase text-neutral-400 mb-2">
                      Votre Nom & Organisation
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Maison de Haute Horlogerie / Studio"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className="w-full bg-[#050510] border border-white/10 px-4 py-3 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-cyan-400 transition-colors font-sans"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-[10px] uppercase text-neutral-400 mb-2">
                      Adresse Électronique
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="direction@maison.com"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className="w-full bg-[#050510] border border-white/10 px-4 py-3 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-cyan-400 transition-colors font-sans"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-[10px] uppercase text-neutral-400 mb-2">
                      Vision ou Périmètre du Projet
                    </label>
                    <textarea
                      rows={3}
                      required
                      placeholder="Parlez-nous de vos ambitions esthétiques et technologiques..."
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      className="w-full bg-[#050510] border border-white/10 px-4 py-3 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-cyan-400 transition-colors resize-none font-sans"
                    />
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row gap-3">
                    <button
                      type="submit"
                      className="flex-1 py-3.5 bg-gradient-to-r from-cyan-400 via-[#7928ca] to-[#ff007a] text-white font-mono text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity cursor-pointer shadow-[0_0_20px_rgba(0,242,254,0.3)]"
                    >
                      <Send className="w-3.5 h-3.5" />
                      Transmettre le Projet
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        onResetToHero();
                        soundEngine.playChime(784);
                      }}
                      className="py-3.5 px-4 border border-white/15 hover:border-white/30 text-neutral-300 font-mono text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-colors cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Origine</span>
                    </button>
                  </div>
                </form>
              ) : (
                <div className="py-8 text-center space-y-4">
                  <CheckCircle2 className="w-12 h-12 text-cyan-400 mx-auto" />
                  <h3 className="font-display font-bold text-2xl uppercase text-white">
                    DEMANDE ENREGISTRÉE
                  </h3>
                  <p className="text-sm text-neutral-300 font-light max-w-sm mx-auto font-sans">
                    Votre transmission a été réceptionnée par notre Creative Director. Nous vous contacterons sous 24h ouvrées.
                  </p>
                  <div className="p-3 bg-black/40 border border-cyan-400/30 font-mono text-xs text-cyan-300">
                    <span className="text-[10px] text-neutral-500 uppercase block mb-1">
                      Code Dossier Exclusif
                    </span>
                    <code>{transmissionCode}</code>
                  </div>
                  <button
                    onClick={() => setIsSent(false)}
                    className="mt-4 px-4 py-2 border border-white/10 font-mono text-xs text-neutral-400 hover:text-white uppercase transition-colors cursor-pointer"
                  >
                    Nouvelle demande
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
