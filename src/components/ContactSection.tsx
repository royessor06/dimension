import React, { useState } from 'react';
import { Send, CheckCircle2, RotateCcw, ArrowUp, Mail, Terminal, MapPin } from 'lucide-react';
import { soundEngine } from '../audio/soundEngine';

interface ContactSectionProps {
  onResetToHero: () => void;
  onShockwave: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  onResetToHero,
  onShockwave,
}) => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    project: '',
    frequency: 'EXP-432',
  });
  const [submitted, setSubmitted] = useState(false);
  const [receiptCode, setReceiptCode] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.email) return;

    const code = `DIM-${Math.random().toString(36).substring(2, 9).toUpperCase()}-${Date.now().toString(36).toUpperCase()}`;
    setReceiptCode(code);
    setSubmitted(true);
    soundEngine.playShockwave();
    onShockwave();
  };

  return (
    <section className="relative min-h-screen w-full flex flex-col justify-between p-6 md:p-12 lg:p-16 pointer-events-none select-none">
      <div className="max-w-6xl mx-auto w-full py-16 my-auto">
        {/* Header Tag */}
        <div className="flex items-center gap-3 font-mono text-xs tracking-[0.3em] uppercase text-[#ff007a] mb-4">
          <span>06 // CONVERGENCE FINALE</span>
          <div className="h-[1px] w-16 bg-[#ff007a]/40" />
          <span className="text-neutral-500">RETOUR À LA SINGULARITÉ INITIALE</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6">
            <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl uppercase tracking-tight text-white mb-4">
              COLLABORONS SUR LA PROCHAINE
              <span className="block bg-gradient-to-r from-cyan-400 via-[#7928ca] to-[#ff007a] bg-clip-text text-transparent">
                DIMENSION.
              </span>
            </h2>
            <p className="text-neutral-300 text-sm md:text-base leading-relaxed font-light mb-8 max-w-lg">
              Le laboratoire conçoit des expériences numériques hors normes, des installations interactives WebGL2
              et des identités de marque avant-gardistes pour des projets visionnaires.
            </p>

            <div className="space-y-4 font-mono text-xs text-neutral-400 pointer-events-auto">
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-cyan-400" />
                <span>PARIS / TOKYO / CYBERESPACE // STUDIO EXP-094</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#ff007a]" />
                <span className="text-white hover:underline cursor-pointer">lab@dimension-creative.io</span>
              </div>
              <div className="flex items-center gap-3">
                <Terminal className="w-4 h-4 text-violet-400" />
                <span>GPU PIPELINE: THREE.JS R160+ // GLSL3 // WEBGL2</span>
              </div>
            </div>
          </div>

          {/* Interactive Transmission Form Card */}
          <div className="lg:col-span-6 pointer-events-auto bg-[#0a0714]/90 border border-white/10 p-6 sm:p-8 backdrop-blur-md">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
                  <span className="font-mono text-xs text-cyan-300 uppercase tracking-widest">
                    TRANSMISSION DE SIGNAL
                  </span>
                  <span className="font-mono text-[10px] text-neutral-500 uppercase">
                    CANAL SÉCURISÉ
                  </span>
                </div>

                <div>
                  <label className="block font-mono text-[10px] uppercase text-neutral-400 mb-1.5">
                    Nom ou Studio
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="ex. Atelier Cybernétique"
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    className="w-full bg-[#050508] border border-white/10 px-3.5 py-2.5 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-cyan-400 transition-colors"
                  />
                </div>

                <div>
                  <label className="block font-mono text-[10px] uppercase text-neutral-400 mb-1.5">
                    Coordonnée Électronique (Email)
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="contact@visionnaire.art"
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    className="w-full bg-[#050508] border border-white/10 px-3.5 py-2.5 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-cyan-400 transition-colors"
                  />
                </div>

                <div>
                  <label className="block font-mono text-[10px] uppercase text-neutral-400 mb-1.5">
                    Nature du Projet / Vision Artistique
                  </label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Décrivez votre projet immersif, univers 3D ou expérience interactive..."
                    value={formState.project}
                    onChange={(e) => setFormState({ ...formState, project: e.target.value })}
                    className="w-full bg-[#050508] border border-white/10 px-3.5 py-2.5 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-cyan-400 transition-colors resize-none"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <button
                    type="submit"
                    className="flex-1 py-3 bg-gradient-to-r from-cyan-400 via-[#7928ca] to-[#ff007a] text-white font-mono text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    Émettre le Signal
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      onResetToHero();
                      soundEngine.playChime(784);
                    }}
                    className="py-3 px-4 border border-white/10 text-neutral-400 hover:text-white hover:border-white/30 font-mono text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-colors cursor-pointer"
                    title="Retourner à la naissance de la forme"
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
                  SIGNAL TRANSMIS AU LAB
                </h3>
                <p className="text-sm text-neutral-300 font-light max-w-sm mx-auto">
                  Votre transmission a été encodée dans le flux de données de DIMENSION.
                  Notre équipe de creative technologists vous répondra sous 24 heures.
                </p>
                <div className="p-3 bg-[#050508] border border-cyan-400/30 font-mono text-xs text-cyan-300">
                  <span className="text-[10px] text-neutral-500 uppercase block mb-1">
                    Hash Cryptographique de Réception
                  </span>
                  <code>{receiptCode}</code>
                </div>

                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-4 py-2 border border-white/10 font-mono text-xs text-neutral-400 hover:text-white uppercase transition-colors cursor-pointer"
                >
                  Envoyer une autre transmission
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer credits bar */}
      <footer className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 font-mono text-[10px] text-neutral-500">
        <div>
          DIMENSION © 2026 // CONÇU PAR DES CREATIVE DEVELOPERS SENIORS
        </div>
        <div className="flex items-center gap-6">
          <span className="hover:text-cyan-400 transition-colors cursor-pointer">AWWWARDS SOTD</span>
          <span className="hover:text-[#ff007a] transition-colors cursor-pointer">FWA OF THE DAY</span>
          <span className="hover:text-violet-400 transition-colors cursor-pointer">THREE.JS EXPERIMENT</span>
          <button
            onClick={onResetToHero}
            className="flex items-center gap-1.5 text-white hover:text-cyan-400 transition-colors cursor-pointer"
          >
            <ArrowUp className="w-3.5 h-3.5" />
            RETOUR EN HAUT
          </button>
        </div>
      </footer>
    </section>
  );
};
