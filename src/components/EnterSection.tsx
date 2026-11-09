import React, { useState } from 'react';
import { Send, CheckCircle2, RotateCcw, Zap, Terminal, Shield } from 'lucide-react';
import { soundEngine } from '../audio/soundEngine';

interface EnterSectionProps {
  onResetToPortal: () => void;
  onShockwave: () => void;
}

export const EnterSection: React.FC<EnterSectionProps> = ({ onResetToPortal, onShockwave }) => {
  const [form, setForm] = useState({
    callsign: '',
    frequency: 'SECTOR_09',
    coordinates: 'CYBER-KEY-77',
  });
  const [authorized, setAuthorized] = useState(false);
  const [clearanceToken, setClearanceToken] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.callsign) return;

    const token = `WARP-${Math.random().toString(36).substring(2, 8).toUpperCase()}-${Date.now().toString(36).toUpperCase()}`;
    setClearanceToken(token);
    setAuthorized(true);
    soundEngine.playShockwave();
    onShockwave();
  };

  return (
    <section className="relative min-h-screen w-full flex flex-col justify-center p-6 sm:p-10 lg:p-16 pointer-events-none select-none">
      <div className="max-w-6xl mx-auto w-full py-20 my-auto">
        {/* Section Header */}
        <div className="flex items-center gap-4 font-mono text-xs tracking-[0.3em] uppercase text-[#7C3AED] mb-6">
          <span>06 // ENTER</span>
          <div className="h-[1px] w-12 bg-[#7C3AED]/40" />
          <span className="text-cyan-400">SAUT QUANTIQUE & ACCÈS RÉSEAU</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-6">
            <h2 className="font-orbitron font-extrabold text-4xl sm:text-5xl md:text-6xl uppercase tracking-tight text-white leading-tight">
              FRANCHISSEZ L'HORIZON
              <span className="block text-neon-rose">
                DES ÉVÉNEMENTS.
              </span>
            </h2>

            <p className="font-sans text-base text-neutral-300 font-light leading-relaxed max-w-lg">
              La brèche dimensionnelle est stabilisée. Enregistrez votre signature quantique pour obtenir une autorisation de saut instantané vers les cyber-mondes de DIMENSION.
            </p>

            <div className="space-y-3 font-mono text-xs text-neutral-400 pointer-events-auto pt-2">
              <div className="flex items-center gap-3">
                <Shield className="w-4 h-4 text-[#06B6D4]" />
                <span>PROTOCOLE DE SÉCURITÉ : TACHYON-ENCRYPTED 4096-BIT</span>
              </div>
              <div className="flex items-center gap-3">
                <Terminal className="w-4 h-4 text-[#F472B6]" />
                <span>PASSERELLE ACTIVE : PORTAIL PRINCIPAL (LATENCE 0.4ms)</span>
              </div>
            </div>
          </div>

          {/* Futuristic Terminal Card */}
          <div className="lg:col-span-6 pointer-events-auto">
            <div className="hud-panel p-8 sm:p-10 bg-[#030718]/90">
              {!authorized ? (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="flex items-center justify-between pb-3 border-b border-cyan-500/20 font-mono text-xs text-cyan-300 uppercase tracking-widest">
                    <span>DEMANDE DE CLAIRANCE HYPERSPACE</span>
                    <span className="text-[#F472B6]">NIVEAU 5</span>
                  </div>

                  <div>
                    <label className="block font-mono text-[10px] uppercase text-neutral-400 mb-2">
                      Callsign Netrunner / Organisation
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="ex. CYBER_NOMAD_09"
                      value={form.callsign}
                      onChange={(e) => setForm({ ...form, callsign: e.target.value })}
                      className="w-full bg-[#02040c] border border-cyan-500/30 px-4 py-3 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-cyan-400 transition-colors font-mono"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-[10px] uppercase text-neutral-400 mb-2">
                      Destination Dimensionnelle
                    </label>
                    <select
                      value={form.frequency}
                      onChange={(e) => setForm({ ...form, frequency: e.target.value })}
                      className="w-full bg-[#02040c] border border-cyan-500/30 px-4 py-3 text-xs text-cyan-300 focus:outline-none focus:border-cyan-400 transition-colors font-mono"
                    >
                      <option value="SECTOR_09">NEO-TOKYO // SECTEUR 09</option>
                      <option value="DYSON_RING">SYNTHETIC HORIZON // DYSON-RING</option>
                      <option value="NEBULA_ZERO">NEBULA ZERO // DEEP VOID</option>
                      <option value="CYBERSPHERE">CYBERSPHERE // NET-4.0</option>
                    </select>
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row gap-3">
                    <button
                      type="submit"
                      className="flex-1 py-4 bg-gradient-to-r from-[#06B6D4] via-[#7C3AED] to-[#F472B6] text-white font-mono text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity cursor-pointer clip-chamfer shadow-[0_0_24px_rgba(6,182,212,0.4)]"
                    >
                      <Zap className="w-4 h-4 text-white" />
                      Engager la Traversée
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        onResetToPortal();
                        soundEngine.playChime(784);
                      }}
                      className="py-4 px-4 border border-white/20 hover:border-cyan-400 text-neutral-300 font-mono text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-colors cursor-pointer"
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>Portail</span>
                    </button>
                  </div>
                </form>
              ) : (
                <div className="py-8 text-center space-y-4">
                  <CheckCircle2 className="w-14 h-14 text-cyan-400 mx-auto animate-none" />
                  <h3 className="font-orbitron font-extrabold text-2xl uppercase text-white">
                    SAUT QUANTIQUE AUTORISÉ
                  </h3>
                  <p className="text-sm text-neutral-300 font-light max-w-sm mx-auto font-sans">
                    Les coordonnées ont été transmises à l'anneau de guidage du portail. Accélération tachyonique prête.
                  </p>
                  <div className="p-4 bg-[#02040c] border border-cyan-400/40 font-mono text-xs text-cyan-300">
                    <span className="text-[10px] text-neutral-500 uppercase block mb-1">
                      Token d'Accès Sécurisé
                    </span>
                    <code>{clearanceToken}</code>
                  </div>

                  <button
                    onClick={() => setAuthorized(false)}
                    className="mt-4 px-5 py-2.5 border border-white/20 font-mono text-xs text-neutral-400 hover:text-white uppercase transition-colors cursor-pointer"
                  >
                    Réinitialiser les coordonnées
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
