import React, { useState, useEffect } from 'react';
import {
  ChevronDown,
  ChevronUp,
  Camera,
  Zap,
  Sliders,
  Volume2,
  VolumeX,
  Compass,
  Radio,
} from 'lucide-react';
import { soundEngine } from '../audio/soundEngine';

interface ControlDockProps {
  warpIntensity: number;
  onUpdateWarp: (val: number) => void;
  turbulence: number;
  onUpdateTurbulence: (val: number) => void;
  onJump: () => void;
}

export const ControlDock: React.FC<ControlDockProps> = ({
  warpIntensity,
  onUpdateWarp,
  turbulence,
  onUpdateTurbulence,
  onJump,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMuted, setIsMuted] = useState(soundEngine.getMuted());
  const [screenshotFlash, setScreenshotFlash] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'h' || e.key === 'H') {
        const tag = (e.target as HTMLElement).tagName;
        if (tag !== 'INPUT' && tag !== 'TEXTAREA' && tag !== 'SELECT') {
          setIsCollapsed((prev) => !prev);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleCaptureScreenshot = () => {
    const canvas = document.querySelector('canvas') as HTMLCanvasElement;
    if (!canvas) return;

    soundEngine.playChime(1046.5);
    setScreenshotFlash(true);
    setTimeout(() => setScreenshotFlash(false), 250);

    try {
      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `DIMENSION-CYBER-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
    } catch {
      // ignore
    }
  };

  const handleToggleAudio = () => {
    const active = soundEngine.toggleMute();
    setIsMuted(!active);
    if (active) soundEngine.playChime(587.33);
  };

  return (
    <>
      {screenshotFlash && (
        <div className="fixed inset-0 z-50 bg-cyan-400/40 pointer-events-none transition-opacity duration-200" />
      )}

      {/* Cyberpunk Unified Bottom Dock */}
      <div
        className={`fixed bottom-4 left-1/2 -translate-x-1/2 z-40 transition-transform duration-500 ease-out pointer-events-auto ${
          isCollapsed ? 'translate-y-[calc(100%-28px)]' : 'translate-y-0'
        }`}
        style={{ width: 'min(920px, 94vw)' }}
      >
        {/* Collapse / Expand Tab */}
        <div className="flex justify-center -mb-px">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="flex items-center gap-1.5 px-4 py-1 bg-[#030718]/95 border border-cyan-500/30 border-b-0 text-[10px] font-mono text-cyan-300 hover:text-white uppercase tracking-wider backdrop-blur-md cursor-pointer transition-colors"
          >
            {isCollapsed ? (
              <>
                <ChevronUp className="w-3.5 h-3.5 text-[#06B6D4]" />
                <span>PUPITRE CYBER-HUD [H]</span>
              </>
            ) : (
              <>
                <ChevronDown className="w-3.5 h-3.5 text-neutral-400" />
                <span>MASQUER CONSOLE [H]</span>
              </>
            )}
          </button>
        </div>

        {/* Main Dock Container */}
        <div className="hud-panel p-3 sm:p-4 bg-[#030718]/95 shadow-[0_10px_40px_rgba(3,7,24,0.9)] border border-cyan-500/30">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 font-mono">
            {/* Left Status */}
            <div className="flex items-center gap-3 text-xs w-full md:w-auto">
              <span className="text-[10px] uppercase tracking-widest text-[#F472B6] font-bold">
                CONTRÔLEUR DE PORTAIL :
              </span>
              <span className="text-[10px] text-cyan-300 bg-cyan-950/40 px-2 py-0.5 border border-cyan-500/30">
                TACHYON STABILIZED
              </span>
            </div>

            {/* Sliders: Warp Intensity & Turbulence */}
            <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
              <div className="flex items-center gap-2">
                <span className="text-[9px] uppercase tracking-widest text-neutral-400">
                  Déformation:
                </span>
                <input
                  type="range"
                  min="0.2"
                  max="2.5"
                  step="0.05"
                  value={warpIntensity}
                  onChange={(e) => onUpdateWarp(parseFloat(e.target.value))}
                  className="w-20 sm:w-24 accent-[#06B6D4] cursor-pointer h-1 bg-neutral-800"
                />
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[9px] uppercase tracking-widest text-neutral-400">
                  Particules:
                </span>
                <input
                  type="range"
                  min="0.2"
                  max="3.0"
                  step="0.1"
                  value={turbulence}
                  onChange={(e) => onUpdateTurbulence(parseFloat(e.target.value))}
                  className="w-20 sm:w-24 accent-[#F472B6] cursor-pointer h-1 bg-neutral-800"
                />
              </div>

              {/* Action tools: Shockwave jump, Screenshot, Sound */}
              <div className="flex items-center gap-1.5 border-l border-cyan-500/20 pl-3">
                <button
                  onClick={() => {
                    onJump();
                    soundEngine.playShockwave();
                  }}
                  className="p-1.5 border border-[#06B6D4]/50 text-cyan-300 hover:bg-[#06B6D4]/20 hover:border-[#06B6D4] transition-colors cursor-pointer"
                  title="Impulsion de distorsion"
                >
                  <Zap className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={handleCaptureScreenshot}
                  className="p-1.5 border border-white/15 text-neutral-400 hover:text-white hover:border-cyan-400 transition-colors cursor-pointer"
                  title="Capturer un screenshot (PNG)"
                >
                  <Camera className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={handleToggleAudio}
                  className={`p-1.5 border transition-colors cursor-pointer ${
                    !isMuted
                      ? 'border-cyan-400 text-cyan-300 bg-cyan-950/40'
                      : 'border-white/15 text-neutral-400 hover:text-white'
                  }`}
                  title={isMuted ? 'Activer le son' : 'Couper le son'}
                >
                  {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
