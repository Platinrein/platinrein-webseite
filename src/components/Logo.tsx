import React from 'react';

interface LogoProps {
  className?: string;
  showText?: boolean;
}

export default function Logo({ className = "", showText = true }: LogoProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="relative w-10 h-10 flex items-center justify-center">
        {/* Subtle background glow/circle */}
        <div className="absolute inset-0 bg-charcoal/5 rounded-full scale-150 animate-pulse-slow"></div>
        
        {/* Stylized P / Platinum Icon */}
        <svg 
          viewBox="0 0 40 40" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full text-charcoal"
        >
          {/* Main "P" Shape - Geometric & Minimalist */}
          <path 
            d="M12 8V32M12 8H24C27.3137 8 30 10.6863 30 14C30 17.3137 27.3137 20 24 20H12" 
            stroke="currentColor" 
            strokeWidth="2.5" 
            strokeLinecap="square"
            strokeLinejoin="miter"
          />
          
          {/* The "Platin" Sparkle */}
          <path 
            d="M26 22L28 28L34 30L28 32L26 38L24 32L18 30L24 28L26 22Z" 
            fill="currentColor"
          />
          
          {/* Inner Clean Line */}
          <path 
            d="M16 14H22" 
            stroke="currentColor" 
            strokeWidth="1.5"
            strokeOpacity="0.3"
          />
        </svg>
      </div>
      
      {showText && (
        <div className="flex flex-col leading-none">
          <span className="text-xl font-bold tracking-[-0.05em] uppercase text-charcoal">
            Platinrein
          </span>
          <span className="text-[7px] uppercase tracking-[0.6em] text-charcoal/30 mt-1 font-bold">
            Gebäudeservice
          </span>
        </div>
      )}
    </div>
  );
}
