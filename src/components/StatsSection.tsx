import React, { useState, useEffect } from 'react';
import { Activity, Cpu, ShieldCheck, Zap } from 'lucide-react';

export const StatsSection: React.FC = () => {
  const [latency, setLatency] = useState(0.42);
  const [throughput, setThroughput] = useState(120.0);

  useEffect(() => {
    const interval = setInterval(() => {
      setLatency(parseFloat((0.38 + Math.random() * 0.08).toFixed(2)));
      setThroughput(parseFloat((119.8 + Math.random() * 0.4).toFixed(1)));
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    {
      label: 'Fréquence de Rafraîchissement',
      value: `${throughput} Hz`,
      caption: 'Synchronisation GPU 60-120 FPS adaptative sans perte de trame.',
      icon: Activity,
      color: 'text-cyan-400',
    },
    {
      label: 'Latence Shader Pipeline',
      value: `${latency} ms`,
      caption: 'Exécution unifiée GLSL3 sur processeur graphique dédié.',
      icon: Zap,
      color: 'text-[#ff007a]',
    },
    {
      label: 'Précision de Déformation',
      value: '0.001 mm',
      caption: 'Échantillonnage fractal géodésique à double précision.',
      icon: Cpu,
      color: 'text-violet-400',
    },
    {
      label: 'Fidélité Spectrale ACES',
      value: '99.8 %',
      caption: 'Étalonnage colorimétrique cinématographique sRGB & DCI-P3.',
      icon: ShieldCheck,
      color: 'text-white',
    },
  ];

  return (
    <section className="relative min-h-screen w-full flex flex-col justify-center p-8 sm:p-12 lg:p-20 pointer-events-none select-none">
      <div className="max-w-6xl mx-auto w-full py-20">
        {/* Section Header */}
        <div className="flex items-center gap-4 font-mono text-xs tracking-[0.3em] uppercase text-cyan-400 mb-6">
          <span>05 // STATS</span>
          <div className="h-[1px] w-12 bg-cyan-400/30" />
          <span className="text-neutral-400">VISUALISATION DE DONNÉES DE CALCUL</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-14">
          <div className="lg:col-span-8">
            <h2 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl uppercase tracking-tight text-white">
              PERFORMANCE SANS COMPROMIS
            </h2>
            <p className="mt-3 text-neutral-400 text-sm sm:text-base font-light max-w-xl font-sans">
              L'excellence visuelle exige une rigueur mathématique sans faille. Chaque shader est optimisé pour préserver le CPU et exploiter les cœurs de calcul du GPU.
            </p>
          </div>
          <div className="lg:col-span-4 font-mono text-xs text-neutral-400 border border-white/10 p-3 bg-white/5 backdrop-blur-md">
            GPU MEMORY ALLOC: 42.8 MB // ZERO GC
          </div>
        </div>

        {/* 4 Minimalist Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pointer-events-auto">
          {stats.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={idx}
                className="glass-panel p-6 sm:p-8 flex flex-col justify-between min-h-[240px] border border-white/10 hover:border-white/20 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between text-neutral-400 mb-6 font-mono text-[10px] uppercase tracking-widest">
                    <span>MÉTRIQUE 0{idx + 1}</span>
                    <Icon className={`w-4 h-4 ${s.color}`} />
                  </div>

                  <div className={`font-display font-extrabold text-3xl sm:text-4xl ${s.color} tracking-tight mb-2`}>
                    {s.value}
                  </div>

                  <div className="font-sans font-medium text-xs text-white uppercase tracking-wider mb-2">
                    {s.label}
                  </div>
                </div>

                <p className="text-[11px] text-neutral-400 font-light leading-relaxed border-t border-white/10 pt-3 font-sans">
                  {s.caption}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
