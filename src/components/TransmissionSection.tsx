import React, { useState } from 'react';
import { Radio, Terminal, Cpu, Zap, Lock, Unlock } from 'lucide-react';
import { soundEngine } from '../audio/soundEngine';

interface TransmissionSectionProps {
  warpIntensity: number;
  onUpdateWarp: (val: number) => void;
  onShockwave: () => void;
}

export const TransmissionSection: React.FC<TransmissionSectionProps> = ({
  warpIntensity,
  onUpdateWarp,
  onShockwave,
}) => {
  const [isDecrypted, setIsDecrypted] = useState(false);

  const handleDecrypt = () => {
    setIsDecrypted(true);
    onUpdateWarp(1.8);
    soundEngine.playShockwave();
    onShockwave();
  };

  return (
    <section className="relative min-h-screen w-full flex flex-col justify-center p-6 sm:p-10 lg:p-16 pointer-events-none select-none">
      <div className="max-w-6xl mx-auto w-full py-20">
        {/* Section Header */}
        <div className="flex items-center gap-4 font-mono text-xs tracking-[0.3em] uppercase text-[#7C3AED] mb-8">
          <span>02 // TRANSMISSION</span>
          <div className="h-[1px] w-12 bg-[#7C3AED]/40" />
          <span className="text-cyan-400">FLUX DE SIGNAL TACHYONIQUE</span>
        </div>

        {/* Narrative & Terminal Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-7 space-y-6">
            <h2 className="font-orbitron font-extrabold text-4xl sm:text-5xl md:text-6xl uppercase tracking-tight text-white leading-tight">
              INTERCEPTION D'UN SIGNAL
              <span className="block text-neon-cyan">
                EXTRA-DIMENSIONNEL.
              </span>
              <span className="block text-neutral-400 font-light text-2xl sm:text-3xl mt-2 font-display">
                ORIGINE : NOYAU CYBER-SYNTHÉTIQUE // AN 2099
              </span>
            </h2>

            <p className="font-sans text-sm sm:text-base text-neutral-300 font-light leading-relaxed max-w-xl">
              Des milliers de particules volumétriques chargées d'énergie tachyonique traversent l'horizon des événements.
              Chaque photon transporte un paquet de données crypté émis depuis les confins d'une cyber-réalité parallèle.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-cyan-500/20 font-mono text-xs">
              <div className="hud-panel p-5">
                <div className="flex items-center gap-2 text-cyan-400 uppercase tracking-wider mb-2 font-bold">
                  <Cpu className="w-3.5 h-3.5 text-[#06B6D4]" />
                  <span>DENSITÉ PARTICLE JET</span>
                </div>
                <div className="text-2xl font-orbitron font-bold text-white mb-1">
                  4,200 <span className="text-xs font-mono text-[#F472B6]">PTS</span>
                </div>
                <p className="text-[11px] text-neutral-400 font-sans leading-relaxed">
                  Émission continue le long de l'axe Z sous l'effet du gradient de Lorenz.
                </p>
              </div>

              <div className="hud-panel p-5">
                <div className="flex items-center gap-2 text-[#F472B6] uppercase tracking-wider mb-2 font-bold">
                  <Radio className="w-3.5 h-3.5 text-[#F472B6]" />
                  <span>DÉCALAGE DOPPLER</span>
                </div>
                <div className="text-2xl font-orbitron font-bold text-white mb-1">
                  +1.482 <span className="text-xs font-mono text-cyan-400">c</span>
                </div>
                <p className="text-[11px] text-neutral-400 font-sans leading-relaxed">
                  Vitesse supraluminique confirmée à la périphérie du trou noir virtuel.
                </p>
              </div>
            </div>
          </div>

          {/* Interactive Decryption Terminal Card */}
          <div className="lg:col-span-5 pointer-events-auto">
            <div className="hud-panel p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-cyan-500/20">
                <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-cyan-300">
                  <Terminal className="w-3.5 h-3.5 text-[#06B6D4]" />
                  <span>CONSOLE DE DÉCODAGE</span>
                </div>
                <span className="font-mono text-[10px] text-[#F472B6] uppercase tracking-wider">
                  CANAL #CYBER-94
                </span>
              </div>

              <div className="bg-[#020510] border border-cyan-500/30 p-4 font-mono text-xs space-y-2 text-cyan-300/90 overflow-x-auto">
                <div className="text-[10px] text-neutral-500">// BUFFER ENTRANT (HEX)</div>
                <div>0x7C 0x3A 0xED 0x06 0xB6 0xD4 0xF4 0x72</div>
                <div className="text-[#F472B6]">
                  {isDecrypted ? 'DECRYPT_SUCCESS: "DIMENSION_PORTAL_UNLOCKED"' : 'STATUS: ENCRYPTED_TACHYON_STREAM'}
                </div>
                <div className="text-neutral-400 text-[10px]">
                  {isDecrypted
                    ? 'ACCÉLÉRATEUR ENGAGÉ // WARP FACTOR 1.8'
                    : 'EN ATTENTE D\'IMPULSION POUR DÉVERROUILLER'}
                </div>
              </div>

              {/* Slider to alter warp intensity */}
              <div className="space-y-2">
                <div className="flex justify-between font-mono text-[10px] text-neutral-400 uppercase">
                  <span>Intensité de Déformation Spatiale</span>
                  <span className="text-cyan-400 font-bold">{warpIntensity.toFixed(2)}x</span>
                </div>
                <input
                  type="range"
                  min="0.2"
                  max="2.5"
                  step="0.05"
                  value={warpIntensity}
                  onChange={(e) => {
                    const val = parseFloat(e.target.value);
                    onUpdateWarp(val);
                    soundEngine.modulateAtmosphere(val);
                  }}
                  className="w-full accent-[#06B6D4] cursor-pointer h-1.5 bg-neutral-900 rounded-none"
                />
              </div>

              <button
                onClick={handleDecrypt}
                className="w-full py-3.5 border border-[#06B6D4] bg-[#06B6D4]/10 hover:bg-[#06B6D4]/20 text-cyan-300 font-mono text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-[0_0_15px_rgba(6,182,212,0.2)]"
              >
                {isDecrypted ? <Unlock className="w-3.5 h-3.5 text-cyan-400" /> : <Lock className="w-3.5 h-3.5 text-[#F472B6]" />}
                <span>{isDecrypted ? 'SURCADENCER LE SIGNAL' : 'DÉCODER LA TRANSMISSION'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
