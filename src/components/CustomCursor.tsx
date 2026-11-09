import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trailerPos, setTrailerPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let targetX = -100;
    let targetY = -100;
    let currentX = -100;
    let currentY = -100;
    let animId = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      setPos({ x: targetX, y: targetY });

      const target = e.target as HTMLElement;
      if (
        target.closest('button') ||
        target.closest('a') ||
        target.closest('input') ||
        target.closest('textarea') ||
        target.closest('select') ||
        target.closest('[role="button"]') ||
        target.classList.contains('cursor-pointer')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const render = () => {
      currentX += (targetX - currentX) * 0.22;
      currentY += (targetY - currentY) * 0.22;
      setTrailerPos({ x: currentX, y: currentY });
      animId = requestAnimationFrame(render);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div className="hidden md:block pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Precision Core Reticle Point */}
      <div
        className="fixed w-1.5 h-1.5 bg-[#06B6D4] -translate-x-1/2 -translate-y-1/2 shadow-[0_0_8px_#06B6D4]"
        style={{
          left: `${pos.x}px`,
          top: `${pos.y}px`,
          transform: `translate(-50%, -50%) scale(${isClicking ? 0.6 : 1})`,
        }}
      />

      {/* Futuristic Outer Crosshair Ring */}
      <div
        className={`fixed border transition-all duration-200 -translate-x-1/2 -translate-y-1/2 ${
          isHovered
            ? 'w-10 h-10 border-[#F472B6] rotate-45 scale-110 shadow-[0_0_15px_rgba(244,114,182,0.5)]'
            : 'w-7 h-7 border-cyan-400/50 rotate-0 scale-100'
        }`}
        style={{
          left: `${trailerPos.x}px`,
          top: `${trailerPos.y}px`,
          transform: `translate(-50%, -50%) rotate(${isHovered ? 45 : 0}deg) scale(${isClicking ? 0.8 : 1})`,
        }}
      >
        {/* Reticle ticks */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-0.5 bg-cyan-400" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-0.5 bg-cyan-400" />
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-1 bg-[#F472B6]" />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-0.5 h-1 bg-[#F472B6]" />
      </div>
    </div>
  );
};
