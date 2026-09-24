import React from 'react';

interface ZorvaLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  tagline?: boolean;
  className?: string;
  onClick?: () => void;
}

export const ZorvaLogo: React.FC<ZorvaLogoProps> = ({
  size = 'md',
  showText = true,
  tagline = false,
  className = '',
  onClick
}) => {
  const iconSizes = {
    sm: 'w-7 h-7 text-xs',
    md: 'w-9 h-9 text-sm',
    lg: 'w-12 h-12 text-base',
    xl: 'w-16 h-16 text-xl'
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-4xl'
  };

  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center gap-3 cursor-pointer select-none group ${className}`}
    >
      {/* Z Emblem Icon */}
      <div
        className={`${iconSizes[size]} relative rounded-xl flex items-center justify-center bg-gradient-to-br from-[#1a1236] via-[#0d1428] to-[#070b16] border border-cyan-500/30 shadow-[0_0_20px_rgba(0,229,255,0.25)] group-hover:shadow-[0_0_28px_rgba(168,85,247,0.45)] transition-all duration-300 overflow-hidden`}
      >
        {/* Ambient background glow */}
        <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/30 to-cyan-400/30 opacity-70 group-hover:opacity-100 transition-opacity" />

        {/* Modern Vector Digital Z */}
        <svg
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-3/5 h-3/5 relative z-10 filter drop-shadow-[0_2px_6px_rgba(0,229,255,0.7)]"
        >
          {/* Top horizontal neon bar */}
          <path
            d="M9 11C9 9.89543 9.89543 9 11 9H29C30.1046 9 31 9.89543 31 11V12.5C31 13.1979 30.6358 13.8427 30.0463 14.2023L16.2 22.65L30.1 22.65C31.15 22.65 32 23.5 32 24.55V28C32 29.1046 31.1046 30 30 30H10C8.89543 30 8 29.1046 8 28V26.5C8 25.8021 8.3642 25.1573 8.9537 24.7977L22.8 16.35L9.9 16.35C8.85 16.35 8 15.5 8 14.45V11C8 9.89543 8.89543 9 9 9Z"
            fill="url(#zorvaZGrad)"
          />
          <defs>
            <linearGradient id="zorvaZGrad" x1="8" y1="9" x2="32" y2="30" gradientUnits="userSpaceOnUse">
              <stop stopColor="#00E5FF" />
              <stop offset="0.55" stopColor="#A855F7" />
              <stop offset="1" stopColor="#EC4899" />
            </linearGradient>
          </defs>
        </svg>

        {/* High-tech pulsing dot */}
        <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#00e5ff] animate-ping" />
        <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-cyan-400" />
      </div>

      {/* Brand Text */}
      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 leading-none">
            <span
              className={`${textSizes[size]} font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-cyan-200 bg-clip-text text-transparent`}
            >
              Zorva
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_#00e5ff]" />
          </div>
          {tagline && (
            <span className="text-[10px] tracking-wider text-slate-400 font-semibold uppercase mt-0.5">
              Watch. Connect. Create. Grow.
            </span>
          )}
        </div>
      )}
    </div>
  );
};
