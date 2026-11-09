import React, { useState, useEffect } from 'react';
import { Zap, Activity, Flame, ShieldAlert, Cpu, RefreshCw } from 'lucide-react';
import { soundEngine } from '../audio/soundEngine';

interface EnergySectionProps {
  onParticleBurst: () => void;
}

export const EnergySection: React.FC<EnergySectionProps> = ({ onParticleBurst }) => {
  const [powerOutput, setPowerOutput] = useState(8.42);
  const [plasmaFlux, setPlasmaFlux] = useState(148.6);
  const [singularityIntegrity, setSingularityIntegrity] = useState(99.94);
  const [burstCount, setBurstCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPowerOutput(parseFloat((8.3 + Math.random() * 0.4).toFixed(2)));
      setPlasmaFlux(parseFloat((145 + Math.random() * 8).toFixed(1)));
      setSingularityIntegrity(parseFloat((99.85 + Math.random() * 0.12).toFixed(2)));
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  const handleBurst = () => {
    setBurstCount((prev) => prev + 1);
    soundEngine.playShockwave();
    onParticleBurst();
  };

  const metrics = [
    {
      title: 'PUISSANCE DU VORTEX',
      val: `${powerOutput} GW`,
      desc: 'Énergie de point zéro injectée dans la gorge d’Einstein-Rosen.',
      icon: Zap,
      color: 'text-cyan-400',
    },
    {
      title: 'DÉBIT DE PARTICULES',
      val: `${plasmaFlux} TB/s`,
      desc: 'Flux de photons et gravitons éjectés vers l’observateur.',
      icon: Flame,
      color: 'text-[#F472B6]',
    },
    {
      title: 'INTÉGRITÉ DU CONFINEMENT',
      val: `${singularityIntegrity}%`,
      desc: 'Champ magnétique supraconducteur empêchant l’effondrement.',
      icon: ShieldAlert,
      color: 'text-[#7C3AED]',
    },
    {
      title: 'FRÉQUENCE QUANTIQUE',
      val: '120.0 Hz',
      desc: 'Taux de rafraîchissement adaptatif synchronisé au GPU.',
      icon: Activity,
      color: 'text-white',
    },
  ];

  return (
    <section className="relative min-h-screen w-full flex flex-col justify-center p-6 sm:p-10 lg:p-16 pointer-events-none select-none">
      <div className="max-w-6xl mx-auto w-full py-20">
        {/* Section Header */}
        <div className="flex items-center gap-4 font-mono text-xs tracking-[0.3em] uppercase text-cyan-400 mb-6">
          <span>05 // ENERGY</span>
          <div className="h-[1px] w-12 bg-cyan-400/40" />
          <span className="text-neutral-400">STATISTIQUES & SURTENSION ÉNERGÉTIQUE</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h2 className="font-orbitron font-extrabold text-4xl sm:text-5xl md:text-6xl uppercase tracking-tight text-white">
              DYNAMIQUE DES PARTICULES
            </h2>
            <p className="mt-3 text-neutral-300 text-sm sm:text-base font-light max-w-xl font-sans">
              Visualisation des transferts de masse et de charge au centre du portail. Vous pouvez déclencher manuellement une explosion de particules dans le champ 3D.
            </p>
          </div>

          {/* Interactive Particle Burst Trigger */}
          <div className="pointer-events-auto">
            <button
              onClick={handleBurst}
              className="px-6 py-4 bg-gradient-to-r from-[#06B6D4] via-[#7C3AED] to-[#F472B6] text-white font-mono text-xs uppercase tracking-widest font-bold hover:opacity-90 transition-opacity cursor-pointer flex items-center gap-2.5 shadow-[0_0_30px_rgba(244,114,182,0.4)] clip-chamfer"
            >
              <Zap className="w-4 h-4 text-white" />
              <span>EXPLOSION DE PARTICULES ({burstCount})</span>
            </button>
          </div>
        </div>

        {/* 4 Cyber Energy Metrics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pointer-events-auto">
          {metrics.map((m, idx) => {
            const Icon = m.icon;
            return (
              <div
                key={idx}
                className="hud-panel p-6 sm:p-8 flex flex-col justify-between min-h-[250px]"
              >
                <div>
                  <div className="flex items-center justify-between text-neutral-400 mb-5 font-mono text-[10px] uppercase tracking-widest">
                    <span>CAPTEUR 0{idx + 1}</span>
                    <Icon className={`w-4 h-4 ${m.color}`} />
                  </div>

                  <div className={`font-orbitron font-bold text-3xl sm:text-4xl ${m.color} tracking-tight mb-2`}>
                    {m.val}
                  </div>

                  <div className="font-orbitron font-semibold text-xs text-white uppercase tracking-wider mb-2">
                    {m.title}
                  </div>
                </div>

                <p className="text-[11px] text-neutral-400 font-light leading-relaxed border-t border-cyan-500/20 pt-3 font-sans">
                  {m.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
