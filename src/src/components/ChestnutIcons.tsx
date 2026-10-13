import React from "react";
import { motion } from "motion/react";

// --- Realistic Autumn Botanical Chestnut & Acorn SVGs ---

// 1. Glossy Chestnut (Glänzende Kastanie mit Nabel und Glanzpunkt)
export const ChestnutIcon: React.FC<{
  className?: string;
  style?: React.CSSProperties;
  idSuffix?: string;
}> = ({ className = "w-6 h-6", style, idSuffix = "def" }) => {
  const gradId = `chestnutGrad_${idSuffix}`;
  const nabelId = `chestnutNabel_${idSuffix}`;

  return (
    <svg
      viewBox="0 0 28 28"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id={gradId} cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#92400e" />
          <stop offset="25%" stopColor="#78350f" />
          <stop offset="65%" stopColor="#451a03" />
          <stop offset="100%" stopColor="#1c0a00" />
        </radialGradient>
        <linearGradient id={nabelId} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#f3e8cb" />
          <stop offset="60%" stopColor="#d4b98b" />
          <stop offset="100%" stopColor="#8d6b42" />
        </linearGradient>
      </defs>
      {/* Kastanienkörper mit samtigem Glanz */}
      <path
        d="M14 2.8 C19.5 2.8, 26 7.5, 26 15.5 C26 22.5, 20.5 26.5, 14 26.5 C7.5 26.5, 2 22.5, 2 15.5 C2 7.5, 8.5 2.8, 14 2.8 Z"
        fill={`url(#${gradId})`}
        filter="drop-shadow(0 2px 3px rgba(0,0,0,0.32))"
      />
      {/* Charakteristischer Nabel (Hilum) */}
      <ellipse cx="14" cy="20.5" rx="8.5" ry="4.5" fill={`url(#${nabelId})`} opacity="0.95" />
      <path d="M7 21 C10 18.5, 18 18.5, 21 21" stroke="#a47e52" strokeWidth="0.6" fill="none" opacity="0.6" />
      {/* Sanftes Glanzlicht auf der runden Kappe */}
      <ellipse cx="10" cy="8" rx="4" ry="2.2" fill="#ffffff" opacity="0.35" transform="rotate(-20 10 8)" />
      <circle cx="16" cy="7" r="1.2" fill="#ffffff" opacity="0.25" />
    </svg>
  );
};

// 2. Spiky Chestnut Husk (Stachelige Fruchtschale geöffnet mit Kastanie)
export const SpikyChestnutHuskIcon: React.FC<{
  className?: string;
  style?: React.CSSProperties;
  idSuffix?: string;
}> = ({ className = "w-7 h-7", style, idSuffix = "def" }) => {
  const huskGradId = `huskGrad_${idSuffix}`;
  const nutGradId = `innerNutGrad_${idSuffix}`;

  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id={huskGradId} cx="30%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#84cc16" />
          <stop offset="45%" stopColor="#4d7c0f" />
          <stop offset="100%" stopColor="#365314" />
        </radialGradient>
        <radialGradient id={nutGradId} cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#92400e" />
          <stop offset="70%" stopColor="#451a03" />
          <stop offset="100%" stopColor="#220c02" />
        </radialGradient>
      </defs>
      {/* Stachelige Schale */}
      <path
        d="M16 2 L17.5 6 L21 3.5 L20.5 8 L25 7 L23 11 L28 12 L24.5 15.5 L29.5 18 L24.5 20 L27.5 24 L22.5 23.5 L23.5 28 L19 25.5 L17.5 29.5 L15.5 25.5 L12 28.5 L12.5 24 L7.5 24.5 L10.5 20.5 L5 19 L9.5 16 L5 13 L10 12 L8 7.5 L12.5 8.5 L12 4 L15 6 Z"
        fill={`url(#${huskGradId})`}
        filter="drop-shadow(0 2px 4px rgba(0,0,0,0.28))"
      />
      {/* Sichtbare glänzende Kastanie im Inneren */}
      <ellipse cx="16" cy="16.5" rx="7" ry="6.5" fill={`url(#${nutGradId})`} />
      <ellipse cx="16" cy="19.5" rx="4" ry="2" fill="#d4b98b" opacity="0.85" />
      <ellipse cx="14" cy="13.5" rx="2.5" ry="1.2" fill="#ffffff" opacity="0.38" transform="rotate(-15 14 13.5)" />
    </svg>
  );
};

// 3. Acorn (Eichel)
export const AcornIcon: React.FC<{
  className?: string;
  style?: React.CSSProperties;
  idSuffix?: string;
}> = ({ className = "w-5 h-5", style, idSuffix = "def" }) => {
  const capId = `acornCap_${idSuffix}`;
  const bodyId = `acornBody_${idSuffix}`;

  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={capId} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#573315" />
          <stop offset="100%" stopColor="#3d210b" />
        </linearGradient>
        <radialGradient id={bodyId} cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#b45309" />
          <stop offset="60%" stopColor="#78350f" />
          <stop offset="100%" stopColor="#451a03" />
        </radialGradient>
      </defs>
      <path d="M12 2 C12 2, 13 4, 13.5 6" stroke="#3d210b" strokeWidth="1.6" strokeLinecap="round" fill="none" />
      <path d="M6 7 C6 5.5, 18 5.5, 18 7 C19 9, 17.5 11, 12 11 C6.5 11, 5 9, 6 7 Z" fill={`url(#${capId})`} />
      <path d="M7 10.5 C7 16, 10 21.5, 12 22.5 C14 21.5, 17 16, 17 10.5 Z" fill={`url(#${bodyId})`} />
      <ellipse cx="10" cy="14" rx="1.5" ry="3" fill="#ffffff" opacity="0.28" transform="rotate(-15 10 14)" />
    </svg>
  );
};

// 4. Exquisite Autumn Nav Accent beside Logo
export const NavChestnutAccent: React.FC<{ className?: string }> = ({ className = "" }) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <motion.div
      className={`relative inline-flex items-center select-none group cursor-pointer ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      title="Herbst bei Platinrein 🍂"
    >
      {/* Warm ambient seasonal glow on hover */}
      <div className="absolute -inset-2 bg-gradient-to-r from-amber-500/15 via-orange-500/15 to-amber-600/10 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      {/* Main Botanical Composition */}
      <div className="relative flex items-center gap-1.5 sm:gap-2">
        <svg
          viewBox="0 0 70 38"
          className="w-13 h-7 sm:w-16 sm:h-9 overflow-visible filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.15)]"
          aria-hidden="true"
        >
          <defs>
            {/* Rich Radial Gradient for the main Chestnut */}
            <radialGradient id="nav_chestnut_body" cx="34%" cy="28%" r="72%">
              <stop offset="0%" stopColor="#a34710" />
              <stop offset="22%" stopColor="#7c2d12" />
              <stop offset="60%" stopColor="#451a03" />
              <stop offset="100%" stopColor="#1a0801" />
            </radialGradient>

            {/* Characteristic textured Hilum (Nabel) */}
            <linearGradient id="nav_chestnut_hilum" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fef3c7" />
              <stop offset="45%" stopColor="#dfbe8b" />
              <stop offset="100%" stopColor="#8c5828" />
            </linearGradient>

            {/* Golden-amber Autumn Maple Leaf */}
            <linearGradient id="nav_maple_grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fbbf24" />
              <stop offset="35%" stopColor="#f59e0b" />
              <stop offset="70%" stopColor="#d97706" />
              <stop offset="100%" stopColor="#991b1b" />
            </linearGradient>

            {/* Secondary warm Oak Leaf */}
            <linearGradient id="nav_oak_grad" x1="10%" y1="0%" x2="90%" y2="100%">
              <stop offset="0%" stopColor="#fcd34d" />
              <stop offset="50%" stopColor="#ea580c" />
              <stop offset="100%" stopColor="#78350f" />
            </linearGradient>

            {/* Spiky husk gradient */}
            <radialGradient id="nav_husk_grad" cx="40%" cy="40%" r="65%">
              <stop offset="0%" stopColor="#84cc16" />
              <stop offset="50%" stopColor="#4d7c0f" />
              <stop offset="100%" stopColor="#1a2e05" />
            </radialGradient>
          </defs>

          {/* 1. Curved Autumn Branch/Twig base */}
          <path
            d="M 4 28 C 14 26, 28 29, 44 26 C 54 24, 62 19, 66 14"
            stroke="#5c3818"
            strokeWidth="1.8"
            strokeLinecap="round"
            fill="none"
            opacity="0.85"
          />

          {/* 2. Golden-Red Maple Leaf fanning in the background */}
          <motion.g
            animate={{ rotate: [-2, 1.5, -2] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: "20px 24px" }}
          >
            <path
              d="M 19 24 C 15 21, 10 22, 6 18 C 9 17, 10 14, 8 11 C 12 13, 14 11, 15 7 C 17 10, 20 10, 22 6 C 24 9, 27 8, 28 11 C 27 14, 29 16, 32 17 C 28 21, 24 22, 19 24 Z"
              fill="url(#nav_maple_grad)"
              stroke="#78350f"
              strokeWidth="0.5"
              opacity="0.95"
            />
            {/* Delicate Leaf Veins */}
            <path
              d="M 19 23 L 20 10 M 19 19 L 10 14 M 19 17 L 27 13 M 19 21 L 11 19 M 19 20 L 27 18"
              stroke="#fef08a"
              strokeWidth="0.6"
              strokeLinecap="round"
              opacity="0.65"
            />
          </motion.g>

          {/* 3. Golden Oak Leaf nestled behind the chestnut */}
          <motion.g
            animate={{ rotate: [1.5, -2, 1.5] }}
            transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: "38px 26px" }}
          >
            <path
              d="M 36 26 C 40 24, 44 26, 48 23 C 46 20, 48 18, 52 16 C 50 14, 52 11, 56 10 C 53 8, 52 4, 48 3 C 44 5, 43 9, 39 10 C 41 13, 38 16, 36 17 C 38 20, 35 23, 36 26 Z"
              fill="url(#nav_oak_grad)"
              stroke="#78350f"
              strokeWidth="0.5"
              opacity="0.9"
            />
            {/* Oak veins */}
            <path
              d="M 37 24 L 49 7 M 40 20 L 46 17 M 43 15 L 48 13"
              stroke="#fef3c7"
              strokeWidth="0.5"
              strokeLinecap="round"
              opacity="0.55"
            />
          </motion.g>

          {/* 4. Open Spiky Husk resting at bottom left */}
          <g>
            <path
              d="M 23 27 L 22 32 L 25 30 L 26 34 L 29 31 L 31 35 L 33 30 L 37 33 L 36 28 L 33 26 C 30 26, 26 26, 23 27 Z"
              fill="url(#nav_husk_grad)"
              stroke="#2e4808"
              strokeWidth="0.5"
            />
            {/* Spiky tips highlight */}
            <circle cx="22" cy="32" r="0.6" fill="#facc15" />
            <circle cx="26" cy="34" r="0.6" fill="#facc15" />
            <circle cx="31" cy="35" r="0.6" fill="#facc15" />
            <circle cx="37" cy="33" r="0.6" fill="#facc15" />
          </g>

          {/* 5. The Star Feature: Glossy Chestnut Conker */}
          <motion.g
            animate={{ y: [0, -1, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          >
            {/* Chestnut Body with smooth organic curvature */}
            <path
              d="M 32 9 C 39 8.5, 46 13, 46 20.5 C 46 27.5, 40 31, 32 31 C 24 31, 18 27.5, 18 20.5 C 18 13, 25 8.5, 32 9 Z"
              fill="url(#nav_chestnut_body)"
              stroke="#260b02"
              strokeWidth="0.6"
            />

            {/* Characteristic Chestnut Nabel (Hilum) at the base */}
            <path
              d="M 21.5 25 C 24.5 22, 39.5 22, 42.5 25 C 40 29.5, 24 29.5, 21.5 25 Z"
              fill="url(#nav_chestnut_hilum)"
            />
            <path
              d="M 23 25 C 28 23.2, 36 23.2, 41 25"
              stroke="#7c471c"
              strokeWidth="0.5"
              fill="none"
              opacity="0.6"
            />

            {/* High-Gloss Curved Specular Reflection (der Glanz einer frischen Kastanie) */}
            <path
              d="M 26 12 C 30 11, 35 12, 37 14 C 36 15.5, 32 14.5, 27 14.5 C 25 14.5, 24.5 13.5, 26 12 Z"
              fill="#ffffff"
              opacity="0.45"
            />
            <ellipse
              cx="25"
              cy="16"
              rx="1.5"
              ry="3"
              fill="#ffffff"
              opacity="0.32"
              transform="rotate(-20 25 16)"
            />
            <circle cx="34" cy="12.5" r="0.9" fill="#ffffff" opacity="0.65" />
          </motion.g>

          {/* 6. Signature Platin Star Twinkle (Verbindung zur Marke Platinrein) */}
          <motion.g
            animate={{
              scale: isHovered ? [1, 1.45, 1] : [0.95, 1.2, 0.95],
              opacity: isHovered ? [0.9, 1, 0.9] : [0.75, 1, 0.75],
              rotate: [0, 90, 180, 270, 360],
            }}
            transition={{
              duration: isHovered ? 1.5 : 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{ transformOrigin: "47px 8px" }}
          >
            <path
              d="M 47 4 L 48.5 7 L 51.5 8.5 L 48.5 10 L 47 13 L 45.5 10 L 42.5 8.5 L 45.5 7 Z"
              fill="#f59e0b"
            />
            <circle cx="47" cy="8.5" r="1.2" fill="#ffffff" />
          </motion.g>
        </svg>

        {/* Refined Luxury Typography Badge next to Logo */}
        <div className="hidden sm:flex flex-col justify-center leading-none select-none">
          <div className="flex items-center gap-1.5">
            <span className="text-[9px] font-extrabold uppercase tracking-[0.22em] text-amber-950/90 group-hover:text-amber-900 transition-colors">
              Herbst
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 shadow-xs inline-block animate-pulse"></span>
          </div>
          <span className="text-[7px] uppercase tracking-[0.32em] text-amber-700/80 font-bold mt-0.5">
            Edition
          </span>
        </div>
      </div>

      {/* Floating Hover Card / Tooltip */}
      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-1.5 bg-neutral-900/95 text-white text-[10px] rounded-sm whitespace-nowrap shadow-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-200 translate-y-1 group-hover:translate-y-0 z-50 border border-amber-500/30">
        <div className="flex items-center gap-1.5 font-medium">
          <span className="text-amber-400">🍂</span>
          <span>Herbstzeit bei Platinrein: Laubservice & Intensivpflege</span>
        </div>
      </div>
    </motion.div>
  );
};
