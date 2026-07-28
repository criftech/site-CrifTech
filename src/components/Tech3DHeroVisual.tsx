import React, { useRef, useEffect } from 'react';
import { Play, Sparkles, Cpu, ShieldCheck, Zap } from 'lucide-react';

export const Tech3DHeroVisual: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Canvas 3D particle orbit overlay animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let angle = 0;

    const resizeCanvas = () => {
      canvas.width = canvas.parentElement?.clientWidth || 400;
      canvas.height = canvas.parentElement?.clientHeight || 400;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const particles = Array.from({ length: 32 }, (_, i) => ({
      orbitRadius: 110 + (i % 3) * 35,
      speed: (0.008 + (i % 4) * 0.004) * (i % 2 === 0 ? 1 : -1),
      angle: (i * Math.PI * 2) / 32,
      size: 1.5 + (i % 3),
      color: i % 2 === 0 ? 'rgba(0, 102, 255, ' : 'rgba(6, 182, 212, '
    }));

    const render = () => {
      const { width, height } = canvas;
      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      // Draw glowing 3D perspective orbit ellipses
      [110, 145, 180].forEach((r, idx) => {
        ctx.beginPath();
        ctx.ellipse(cx, cy, r, r * 0.45, (idx * Math.PI) / 6, 0, Math.PI * 2);
        ctx.strokeStyle = idx === 0 ? 'rgba(0, 102, 255, 0.25)' : 'rgba(6, 182, 212, 0.18)';
        ctx.lineWidth = 1;
        ctx.setLineDash([6, 8]);
        ctx.stroke();
        ctx.setLineDash([]);
      });

      // Draw orbiting 3D particles
      angle += 0.01;
      particles.forEach((p) => {
        p.angle += p.speed;
        const rx = p.orbitRadius;
        const ry = p.orbitRadius * 0.45;

        const x = cx + Math.cos(p.angle) * rx;
        const y = cy + Math.sin(p.angle) * ry;

        // Depth scale based on Y position
        const depth = (y - cy + ry) / (ry * 2);
        const alpha = 0.3 + depth * 0.7;
        const currentSize = p.size * (0.8 + depth * 0.5);

        ctx.beginPath();
        ctx.arc(x, y, currentSize, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${alpha})`;
        ctx.fill();

        // Subtle glowing tail for front particles
        if (depth > 0.6) {
          ctx.beginPath();
          ctx.arc(x, y, currentSize * 2.2, 0, Math.PI * 2);
          ctx.fillStyle = `${p.color}${alpha * 0.25})`;
          ctx.fill();
        }
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <div className="relative w-full max-w-lg mx-auto py-4 flex items-center justify-center select-none">
      
      {/* 3D Background Ambient Radial Glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#0066FF]/20 via-cyan-500/15 to-indigo-600/20 rounded-full blur-3xl pointer-events-none scale-125" />

      {/* 3D CSS Rotating Orbit Ring Layer 1 */}
      <div 
        className="absolute w-[360px] h-[360px] sm:w-[420px] sm:h-[420px] rounded-full border border-blue-500/20 animate-spin-slow pointer-events-none"
        style={{
          transform: 'rotateX(65deg) rotateY(-15deg)',
          boxShadow: '0 0 40px rgba(0, 102, 255, 0.15)'
        }}
      />

      {/* 3D CSS Rotating Orbit Ring Layer 2 (Reverse) */}
      <div 
        className="absolute w-[320px] h-[320px] sm:w-[380px] sm:h-[380px] rounded-full border border-cyan-400/30 pointer-events-none"
        style={{
          transform: 'rotateX(55deg) rotateY(25deg)',
          animation: 'spin 18s linear infinite reverse',
          boxShadow: '0 0 30px rgba(6, 182, 212, 0.2)'
        }}
      />

      {/* HTML5 Canvas 3D Orbit Node Particle Layer */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
      />

      {/* Floating 3D Geometric Nodes */}
      <div className="absolute -top-4 left-4 p-2.5 rounded-2xl bg-slate-900/90 border border-blue-500/40 shadow-xl backdrop-blur-md flex items-center gap-2 text-[11px] font-bold text-blue-300 z-20 animate-bounce-slow">
        <Cpu className="w-3.5 h-3.5 text-[#0066FF]" />
        <span>3D Engine Active</span>
      </div>

      <div className="absolute -bottom-2 right-4 p-2.5 rounded-2xl bg-slate-900/90 border border-cyan-500/40 shadow-xl backdrop-blur-md flex items-center gap-2 text-[11px] font-bold text-cyan-300 z-20">
        <Zap className="w-3.5 h-3.5 text-cyan-400" />
        <span>60 FPS Animation</span>
      </div>

      {/* Main 3D Glass Frame containing the Company Logo Animator Video */}
      <div className="relative z-20 w-72 h-72 sm:w-88 sm:h-88 rounded-3xl p-1.5 bg-gradient-to-br from-blue-500/40 via-cyan-500/20 to-slate-800/80 shadow-2xl border border-white/10 backdrop-blur-xl transition-all duration-500 hover:scale-105 group">
        
        {/* Cybernetic Bezel Corner Accents */}
        <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-[#0066FF] rounded-tl-xl" />
        <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-cyan-400 rounded-tr-xl" />
        <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-cyan-400 rounded-bl-xl" />
        <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-[#0066FF] rounded-br-xl" />

        {/* Video Container Inner Viewport */}
        <div className="w-full h-full rounded-[20px] overflow-hidden bg-slate-950 relative border border-slate-800 flex items-center justify-center group-hover:border-[#0066FF]/60 transition-colors">
          
          {/* Company Logo 3D Video Stream */}
          <video
            ref={videoRef}
            src="/video/criftech_3d_logo.mp4"
            poster="/CrifTech1.png"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover transform scale-105 group-hover:scale-110 transition-transform duration-700 brightness-110 contrast-105"
          />

          {/* Holographic Video Overlay HUD */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/40 pointer-events-none" />

          {/* Top Live Badge */}
          <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md border border-emerald-500/40 text-emerald-400 text-[10px] font-extrabold flex items-center gap-1.5 shadow-md">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>3D LOGO ANIMATION</span>
          </div>

          {/* Bottom Brand Watermark Badge */}
          <div className="absolute bottom-3 left-3 right-3 p-3 rounded-2xl bg-slate-950/80 backdrop-blur-md border border-slate-800 flex items-center justify-between text-white">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#0066FF]" />
              <div>
                <div className="text-xs font-extrabold font-heading text-white tracking-wide">CrifTech Studios</div>
                <div className="text-[10px] text-slate-400">Official Brand Animator</div>
              </div>
            </div>
            <div className="px-2 py-0.5 rounded-md bg-blue-500/20 text-blue-400 text-[10px] font-bold border border-blue-500/30">
              HD Video
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
