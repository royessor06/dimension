import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Maximize2, Minimize2, Radio, Terminal } from 'lucide-react';
import { soundEngine } from '../audio/soundEngine';

interface NavigationProps {
  currentSection: number;
  onSelectSection: (index: number) => void;
  sections: { id: string; title: string }[];
}

export const Navigation: React.FC<NavigationProps> = ({
  currentSection,
  onSelectSection,
  sections,
}) => {
  const [isAudioActive, setIsAudioActive] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [timeString, setTimeString] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const h = String(now.getHours()).padStart(2, '0');
      const m = String(now.getMinutes()).padStart(2, '0');
      const s = String(now.getSeconds()).padStart(2, '0');
      setTimeString(`${h}:${m}:${s}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 250);
    return () => clearInterval(interval);
  }, []);

  const handleToggleAudio = () => {
    const unmuted = soundEngine.toggleMute();
    setIsAudioActive(unmuted);
    if (unmuted) soundEngine.playChime(659.25);
  };

  const handleToggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 pointer-events-none px-5 py-4 md:px-8 md:py-5 flex items-center justify-between">
      {/* Brand logo & cyber status badge */}
      <div className="flex items-center gap-4 pointer-events-auto">
        <button
          onClick={() => onSelectSection(0)}
          className="group text-left flex items-center gap-3 cursor-pointer"
        >
          <div className="w-8 h-8 border border-cyan-500/40 bg-[#030712]/90 flex items-center justify-center transition-all duration-300 group-hover:border-[#F472B6] group-hover:shadow-[0_0_15px_rgba(244,114,182,0.4)] backdrop-blur-md">
            <div className="w-2.5 h-2.5 bg-gradient-to-tr from-[#06B6D4] via-[#7C3AED] to-[#F472B6] rotate-45 transition-transform duration-500 group-hover:rotate-180" />
          </div>
          <div>
            <div className="font-orbitron font-extrabold text-sm sm:text-base tracking-[0.2em] text-white flex items-center gap-2">
              DIMENSION
              <span className="text-[9px] font-mono font-normal tracking-normal text-cyan-400 px-1.5 py-0.5 border border-cyan-500/40 bg-cyan-950/30">
                CYBER_NET
              </span>
            </div>
            <div className="text-[8px] font-mono tracking-widest text-[#F472B6] uppercase">
              Quantum WebGL2 Portal
            </div>
          </div>
        </button>
      </div>

      {/* Central Section HUD Navigator */}
      <nav className="hidden xl:flex items-center gap-1 pointer-events-auto bg-[#030718]/85 border border-cyan-500/30 px-3 py-1.5 backdrop-blur-xl">
        {sections.map((sec, idx) => {
          const isActive = currentSection === idx;
          return (
            <button
              key={sec.id}
              onClick={() => onSelectSection(idx)}
              className={`px-3 py-1 text-[10px] font-mono uppercase tracking-widest transition-all duration-300 relative cursor-pointer ${
                isActive
                  ? 'text-cyan-300 font-bold bg-cyan-950/40'
                  : 'text-neutral-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <span className="mr-1 text-[8px] text-[#F472B6]">0{idx + 1}.</span>
              {sec.title}
              {isActive && (
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#06B6D4] via-[#7C3AED] to-[#F472B6]" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Right controls: Telemetry, Audio, Fullscreen */}
      <div className="flex items-center gap-3 pointer-events-auto">
        <div className="hidden sm:flex items-center gap-2 font-mono text-[10px] text-cyan-300 border border-cyan-500/30 bg-[#030712]/80 px-3 py-1.5 backdrop-blur-md">
          <Radio className="w-3 h-3 text-[#06B6D4]" />
          <span>{timeString}</span>
        </div>

        <button
          onClick={handleToggleAudio}
          className={`flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider px-3 py-1.5 border transition-all duration-300 cursor-pointer backdrop-blur-md ${
            isAudioActive
              ? 'border-cyan-400 text-cyan-300 bg-cyan-950/40 shadow-[0_0_12px_rgba(6,182,212,0.4)]'
              : 'border-white/15 text-neutral-400 bg-[#030712]/80 hover:border-white/30 hover:text-white'
          }`}
          title={isAudioActive ? 'Couper le son cybernétique' : 'Activer l’audio spatial'}
        >
          {isAudioActive ? <Volume2 className="w-3.5 h-3.5 text-cyan-400" /> : <VolumeX className="w-3.5 h-3.5" />}
          <span className="hidden md:inline">{isAudioActive ? 'AUDIO ON' : 'AUDIO OFF'}</span>
        </button>

        <button
          onClick={handleToggleFullscreen}
          className="p-1.5 border border-white/15 bg-[#030712]/80 text-neutral-400 hover:text-white hover:border-cyan-400 transition-all cursor-pointer backdrop-blur-md"
          title="Mode Plein Écran"
        >
          {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
        </button>
      </div>
    </header>
  );
};
