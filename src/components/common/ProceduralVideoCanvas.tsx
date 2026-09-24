import React, { useEffect, useRef } from 'react';

interface ProceduralVideoCanvasProps {
  theme: 'cyberpunk-neon' | 'ai-stems' | 'retro-wave' | 'minimal-dark' | 'tokyo-street';
  isPlaying: boolean;
  className?: string;
  fallbackImage?: string;
}

export const ProceduralVideoCanvas: React.FC<ProceduralVideoCanvasProps> = ({
  theme,
  isPlaying,
  className = '',
  fallbackImage
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let t = 0;

    // Load background image if available
    let bgImg: HTMLImageElement | null = null;
    if (fallbackImage) {
      bgImg = new Image();
      bgImg.crossOrigin = 'anonymous';
      bgImg.src = fallbackImage;
    }

    const render = () => {
      const w = canvas.width;
      const h = canvas.height;

      // Draw background
      if (bgImg && bgImg.complete && bgImg.naturalWidth > 0) {
        // Cover fit
        const scale = Math.max(w / bgImg.width, h / bgImg.height);
        const nw = bgImg.width * scale;
        const nh = bgImg.height * scale;
        const ox = (w - nw) / 2;
        const oy = (h - nh) / 2;
        ctx.drawImage(bgImg, ox, oy, nw, nh);

        // Add subtle dynamic tint overlay
        ctx.fillStyle = 'rgba(7, 9, 19, 0.45)';
        ctx.fillRect(0, 0, w, h);
      } else {
        // Base dark gradient
        const bgGrad = ctx.createLinearGradient(0, 0, 0, h);
        bgGrad.addColorStop(0, '#0a0d1a');
        bgGrad.addColorStop(0.5, '#12182e');
        bgGrad.addColorStop(1, '#05070e');
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, w, h);
      }

      // Animated cyber elements if playing
      if (isPlaying) {
        t += 0.035;
      }

      // Neon floating orb / lighting overlay
      const gradOrb = ctx.createRadialGradient(
        w * 0.5 + Math.sin(t * 0.8) * (w * 0.15),
        h * 0.35 + Math.cos(t * 0.6) * (h * 0.08),
        10,
        w * 0.5,
        h * 0.35,
        w * 0.6
      );
      if (theme === 'cyberpunk-neon') {
        gradOrb.addColorStop(0, 'rgba(0, 229, 255, 0.22)');
        gradOrb.addColorStop(0.5, 'rgba(121, 40, 202, 0.18)');
        gradOrb.addColorStop(1, 'rgba(0, 0, 0, 0)');
      } else if (theme === 'ai-stems') {
        gradOrb.addColorStop(0, 'rgba(168, 85, 247, 0.25)');
        gradOrb.addColorStop(0.5, 'rgba(59, 130, 246, 0.15)');
        gradOrb.addColorStop(1, 'rgba(0, 0, 0, 0)');
      } else {
        gradOrb.addColorStop(0, 'rgba(236, 72, 153, 0.2)');
        gradOrb.addColorStop(0.5, 'rgba(99, 102, 241, 0.15)');
        gradOrb.addColorStop(1, 'rgba(0, 0, 0, 0)');
      }
      ctx.fillStyle = gradOrb;
      ctx.fillRect(0, 0, w, h);

      // Sound audio waveform bars at bottom
      const barsCount = 28;
      const barWidth = w / barsCount - 3;
      const baseY = h - 75;

      for (let i = 0; i < barsCount; i++) {
        const heightMultiplier = isPlaying
          ? Math.abs(Math.sin(t * 3.5 + i * 0.4) * Math.cos(t * 2 + i * 0.3))
          : Math.abs(Math.sin(i * 0.4) * 0.25);
        const barH = 8 + heightMultiplier * 55;
        const x = i * (barWidth + 3) + 6;
        const y = baseY - barH;

        const barGrad = ctx.createLinearGradient(0, y, 0, baseY);
        barGrad.addColorStop(0, '#00e5ff');
        barGrad.addColorStop(1, '#a855f7');
        ctx.fillStyle = barGrad;
        ctx.beginPath();
        ctx.roundRect(x, y, barWidth, barH, [3, 3, 0, 0]);
        ctx.fill();
      }

      // High-tech subtle grid scanlines
      ctx.fillStyle = 'rgba(255, 255, 255, 0.02)';
      for (let y = 0; y < h; y += 4) {
        ctx.fillRect(0, y, w, 1);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme, isPlaying, fallbackImage]);

  return (
    <canvas
      ref={canvasRef}
      width={450}
      height={800}
      className={`w-full h-full object-cover select-none ${className}`}
    />
  );
};
