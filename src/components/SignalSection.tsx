import React, { useState, useEffect, useRef } from 'react';
import { Activity, Radio, BarChart3, Wifi, Zap, RefreshCw } from 'lucide-react';
import { soundEngine } from '../audio/soundEngine';

interface SignalSectionProps {
  turbulence: number;
  onUpdateTurbulence: (val: number) => void;
  onShockwave: () => void;
}

export const SignalSection: React.FC<SignalSectionProps> = ({
  turbulence,
  onUpdateTurbulence,
  onShockwave,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dataRate, setDataRate] = useState(148.4);
  const [entropy, setEntropy] = useState(0.842);
  const [activeFrequency, setActiveFrequency] = useState('432.08 Hz');

  // Procedural Oscilloscope / Signal Waveform simulation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId = 0;
    let t = 0;

    const draw = () => {
      t += 0.04;
      const w = canvas.width;
      const h = canvas.height;

      ctx.fillStyle = 'rgba(5, 5, 9, 0.25)';
      ctx.fillRect(0, 0, w, h);

      // Grid lines
      ctx.strokeStyle = 'rgba(0, 242, 254, 0.08)';
      ctx.lineWidth = 1;
      for (let x = 0; x < w; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += 20) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Draw primary cyan sine waveform
      ctx.beginPath();
      ctx.strokeStyle = '#00f2fe';
      ctx.lineWidth = 2;
      for (let x = 0; x < w; x++) {
        const normX = x / w;
        const y = h * 0.5 +
          Math.sin(normX * 12.0 + t * 2.0) * (20 + turbulence * 8) +
          Math.sin(normX * 32.0 - t * 3.5) * 8;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Draw secondary pink harmonic wave
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(255, 0, 122, 0.7)';
      ctx.lineWidth = 1.5;
      for (let x = 0; x < w; x++) {
        const normX = x / w;
        const y = h * 0.5 +
          Math.cos(normX * 8.0 - t * 1.5) * (15 + turbulence * 6) +
          Math.sin(normX * 24.0 + t * 4.0) * 5;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => cancelAnimationFrame(animId);
  }, [turbulence]);

  // Periodic telemetry variation
  useEffect(() => {
    const interval = setInterval(() => {
      setDataRate(parseFloat((140 + Math.random() * 25).toFixed(1)));
      setEntropy(parseFloat((0.8 + Math.random() * 0.15).toFixed(3)));
      setActiveFrequency(`${(430 + Math.random() * 5).toFixed(2)} Hz`);
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen w-full flex flex-col justify-center p-6 md:p-12 lg:p-16 pointer-events-none select-none">
      <div className="max-w-6xl mx-auto w-full py-16">
        {/* Header Tag */}
        <div className="flex items-center gap-3 font-mono text-xs tracking-[0.3em] uppercase text-cyan-400 mb-4">
          <span>05 // FLUX & PARTICULES</span>
          <div className="h-[1px] w-16 bg-cyan-400/40" />
          <span className="text-neutral-500">VISUALISATION DE DONNÉES EN TEMPS RÉEL</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-8">
          <div className="lg:col-span-7">
            <h2 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl uppercase tracking-tight text-white mb-4">
              CHAMP GRAVITATIONNEL DU SIGNAL
            </h2>
            <p className="text-neutral-300 text-sm md:text-base leading-relaxed font-light max-w-xl">
              Plus de 4 000 particules orbitent en temps réel selon les équations du modèle de Lorentz.
              Chaque particule transmet sa position et son décalage Doppler au synthétiseur spatial.
            </p>
          </div>

          {/* Quick Metrics Cards */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-3 pointer-events-auto">
            <div className="border border-white/10 bg-[#0a0714]/80 p-4 backdrop-blur-sm">
              <div className="flex items-center justify-between text-neutral-400 text-[10px] font-mono uppercase mb-1">
                <span>Débit Flux</span>
                <Wifi className="w-3 h-3 text-cyan-400" />
              </div>
              <div className="font-display font-bold text-2xl text-cyan-300">
                {dataRate} <span className="text-xs font-mono font-normal">MB/s</span>
              </div>
            </div>

            <div className="border border-white/10 bg-[#0a0714]/80 p-4 backdrop-blur-sm">
              <div className="flex items-center justify-between text-neutral-400 text-[10px] font-mono uppercase mb-1">
                <span>Entropie</span>
                <Activity className="w-3 h-3 text-[#ff007a]" />
              </div>
              <div className="font-display font-bold text-2xl text-[#ff007a]">
                {entropy}
              </div>
            </div>

            <div className="border border-white/10 bg-[#0a0714]/80 p-4 backdrop-blur-sm">
              <div className="flex items-center justify-between text-neutral-400 text-[10px] font-mono uppercase mb-1">
                <span>Fréquence</span>
                <Radio className="w-3 h-3 text-violet-400" />
              </div>
              <div className="font-display font-bold text-xl text-violet-300">
                {activeFrequency}
              </div>
            </div>

            <div className="border border-white/10 bg-[#0a0714]/80 p-4 backdrop-blur-sm">
              <div className="flex items-center justify-between text-neutral-400 text-[10px] font-mono uppercase mb-1">
                <span>Particules</span>
                <Zap className="w-3 h-3 text-white" />
              </div>
              <div className="font-display font-bold text-xl text-white">
                4,200 <span className="text-xs font-mono font-normal">PTS</span>
              </div>
            </div>
          </div>
        </div>

        {/* Real-time Oscilloscope Waveform & Vortex Controller */}
        <div className="pointer-events-auto bg-[#0a0714]/90 border border-white/10 p-6 backdrop-blur-md">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-white/10 mb-4 font-mono text-xs text-neutral-300 uppercase">
            <span className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-cyan-400" />
              OSCILLOSCOPE DE PHASE & SPECTRE FFT SIMULÉ
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  onUpdateTurbulence(turbulence > 2.0 ? 0.8 : 2.6);
                  soundEngine.playChime(turbulence > 2.0 ? 440 : 880);
                }}
                className="px-3 py-1 border border-cyan-400/40 text-[10px] text-cyan-300 hover:bg-cyan-950/40 transition-colors cursor-pointer"
              >
                {turbulence > 2.0 ? 'Calmer le Vortex' : 'Accélérer la Gravitation'}
              </button>
              <button
                onClick={() => {
                  onShockwave();
                  soundEngine.playShockwave();
                }}
                className="px-3 py-1 border border-[#ff007a]/40 text-[10px] text-pink-300 hover:bg-[#ff007a]/20 transition-colors cursor-pointer"
              >
                Détonation Particulaire
              </button>
            </div>
          </div>

          <div className="relative w-full h-36 bg-[#050508] border border-white/10 overflow-hidden">
            <canvas
              ref={canvasRef}
              width={800}
              height={144}
              className="w-full h-full block"
            />
            <div className="absolute top-2 left-3 font-mono text-[9px] text-cyan-400/60 uppercase">
              CHANNEL A: SINE FRACTAL // 60 FPS
            </div>
            <div className="absolute bottom-2 right-3 font-mono text-[9px] text-[#ff007a]/70 uppercase">
              CHANNEL B: CHROMATIC DISPERSION
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
