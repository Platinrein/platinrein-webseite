import React from "react";
import { motion } from "motion/react";
import { useSeason } from "../context/SeasonContext";

// --- Realistic Autumn Botanical SVGs ---

// 1. Maple Leaf (Ahornblatt)
const MapleLeafIcon = ({ className = "w-6 h-6", color = "currentColor" }: { className?: string; color?: string }) => (
  <svg viewBox="0 0 24 24" fill={color} className={className} aria-hidden="true">
    <path d="M12 1.5L13.8 6.5L17.2 5.2L16.5 8.8L21 8.8L18.8 12.2L22 15L18.2 16.2L19.2 20L15.5 19L13.8 22.8L12.7 19L12 23.5H11.2L10.5 19L9.4 22.8L7.7 19L4 20L5 16.2L1.2 15L4.4 12.2L2.2 8.8L6.7 8.8L6 5.2L9.4 6.5L11.2 1.5H12Z" />
    <path d="M12 9V22" stroke="rgba(0,0,0,0.25)" strokeWidth="0.8" />
  </svg>
);

// 2. Oak Leaf (Eichenblatt)
const OakLeafIcon = ({ className = "w-6 h-6", color = "currentColor" }: { className?: string; color?: string }) => (
  <svg viewBox="0 0 24 24" fill={color} className={className} aria-hidden="true">
    <path d="M12 2C10.2 3.6 8.5 5.8 8.5 8.5C6.8 8 5.2 9.5 5.8 11.2C4.5 12.2 4.5 14.5 6 15.5C5 17 6.5 19 8.2 18.5C8.8 20.2 10.5 21.5 12 22.5C13.5 21.5 15.2 20.2 15.8 18.5C17.5 19 19 17 18 15.5C19.5 14.5 19.5 12.2 18.2 11.2C18.8 9.5 17.2 8 15.5 8.5C15.5 5.8 13.8 3.6 12 2Z" />
    <path d="M12 6V21" stroke="rgba(0,0,0,0.25)" strokeWidth="0.8" />
  </svg>
);

// 3. Birch Leaf (Birkenblatt)
const BirchLeafIcon = ({ className = "w-6 h-6", color = "currentColor" }: { className?: string; color?: string }) => (
  <svg viewBox="0 0 24 24" fill={color} className={className} aria-hidden="true">
    <path d="M12 2C12 2 19 8.5 19 14.5C19 18 16 21 12 22.5C8 21 5 18 5 14.5C5 8.5 12 2 12 2Z" />
    <path d="M12 7V21" stroke="rgba(0,0,0,0.22)" strokeWidth="0.8" />
  </svg>
);

// 4. Ginkgo Leaf (Ginkgoblatt)
const GinkgoLeafIcon = ({ className = "w-6 h-6", color = "currentColor" }: { className?: string; color?: string }) => (
  <svg viewBox="0 0 24 24" fill={color} className={className} aria-hidden="true">
    <path d="M12 21C12 18 11.5 14 11.5 14C6 13.5 2 9.5 2 6C2 5.5 2.5 5 3.5 5C6.5 5 9.5 8 11.5 9.5C11.8 7 12.2 7 12.5 9.5C14.5 8 17.5 5 20.5 5C21.5 5 22 5.5 22 6C22 9.5 18 13.5 12.5 14C12.5 14 12 18 12 21Z" />
  </svg>
);

// 5. Chestnut (Glänzende braune Kastanie mit charakteristischem hellem Nabel)
const ChestnutIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 28 28" className={className} aria-hidden="true">
    <defs>
      {/* Glänzender Kastanienbraun-Verlauf */}
      <radialGradient id="chestnutGrad" cx="35%" cy="30%" r="70%">
        <stop offset="0%" stopColor="#854d0e" />
        <stop offset="45%" stopColor="#451a03" />
        <stop offset="100%" stopColor="#1c0a00" />
      </radialGradient>
      {/* Heller samtiger Nabel (Hilum) */}
      <linearGradient id="chestnutNabel" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#e2d2a4" />
        <stop offset="60%" stopColor="#c5a880" />
        <stop offset="100%" stopColor="#8d6b42" />
      </linearGradient>
    </defs>
    {/* Kastanienkörper (abgerundet herzförmig / rundlich mit spitzerem Scheitel) */}
    <path 
      d="M14 2.8 C19.5 2.8, 26 7.5, 26 15.5 C26 22.5, 20.5 26.5, 14 26.5 C7.5 26.5, 2 22.5, 2 15.5 C2 7.5, 8.5 2.8, 14 2.8 Z" 
      fill="url(#chestnutGrad)" 
      filter="drop-shadow(0 2px 3px rgba(0,0,0,0.35))"
    />
    {/* Der typische helle Nabel / Abdruck der Kastanie an der Basis */}
    <ellipse cx="14" cy="20.5" rx="8.5" ry="4.5" fill="url(#chestnutNabel)" opacity="0.95" />
    <path d="M7 21 C10 18.5, 18 18.5, 21 21" stroke="#a47e52" strokeWidth="0.6" fill="none" opacity="0.6" />
    {/* Glanzlicht auf der runden Nusskappe */}
    <ellipse cx="10" cy="8" rx="4" ry="2.2" fill="#ffffff" opacity="0.32" transform="rotate(-20 10 8)" />
    <circle cx="16" cy="7" r="1.2" fill="#ffffff" opacity="0.25" />
  </svg>
);

// 6. Chestnut with prickly shell / husk (Kastanie mit aufplatzender stacheliger Fruchtschale)
const SpikyChestnutHuskIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
    <defs>
      <radialGradient id="huskGrad" cx="30%" cy="30%" r="70%">
        <stop offset="0%" stopColor="#65a30d" />
        <stop offset="60%" stopColor="#4d7c0f" />
        <stop offset="100%" stopColor="#365314" />
      </radialGradient>
      <radialGradient id="innerNutGrad" cx="35%" cy="30%" r="70%">
        <stop offset="0%" stopColor="#78350f" />
        <stop offset="100%" stopColor="#270c00" />
      </radialGradient>
    </defs>
    {/* Stachelige Schale mit Spitzen */}
    <path
      d="M16 2 L17.5 6 L21 3.5 L20.5 8 L25 7 L23 11 L28 12 L24.5 15.5 L29.5 18 L24.5 20 L27.5 24 L22.5 23.5 L23.5 28 L19 25.5 L17.5 29.5 L15.5 25.5 L12 28.5 L12.5 24 L7.5 24.5 L10.5 20.5 L5 19 L9.5 16 L5 13 L10 12 L8 7.5 L12.5 8.5 L12 4 L15 6 Z"
      fill="url(#huskGrad)"
      filter="drop-shadow(0 2px 4px rgba(0,0,0,0.3))"
    />
    {/* Geöffnete Schale zeigt die Nuss im Inneren */}
    <ellipse cx="16" cy="16.5" rx="7" ry="6.5" fill="url(#innerNutGrad)" />
    {/* Kleiner Nabel & Glanz */}
    <ellipse cx="16" cy="19.5" rx="4" ry="2" fill="#d4b98b" opacity="0.85" />
    <ellipse cx="14" cy="13.5" rx="2.5" ry="1.2" fill="#ffffff" opacity="0.35" transform="rotate(-15 14 13.5)" />
  </svg>
);

// 7. Acorn (Eichel mit braunem Hütchen)
const AcornIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <defs>
      <linearGradient id="acornCap" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#573315" />
        <stop offset="100%" stopColor="#3d210b" />
      </linearGradient>
      <radialGradient id="acornBody" cx="35%" cy="30%" r="70%">
        <stop offset="0%" stopColor="#a16207" />
        <stop offset="60%" stopColor="#713f12" />
        <stop offset="100%" stopColor="#451a03" />
      </radialGradient>
    </defs>
    {/* Stiel */}
    <path d="M12 2 C12 2, 13 4, 13.5 6" stroke="#3d210b" strokeWidth="1.6" strokeLinecap="round" fill="none" />
    {/* Schuppiges Hütchen */}
    <path d="M6 7 C6 5.5, 18 5.5, 18 7 C19 9, 17.5 11, 12 11 C6.5 11, 5 9, 6 7 Z" fill="url(#acornCap)" />
    {/* Eichel-Nuss */}
    <path d="M7 10.5 C7 16, 10 21.5, 12 22.5 C14 21.5, 17 16, 17 10.5 Z" fill="url(#acornBody)" />
    {/* Glanzlicht */}
    <ellipse cx="10" cy="14" rx="1.5" ry="3" fill="#ffffff" opacity="0.25" transform="rotate(-15 10 14)" />
  </svg>
);

interface BeddedItem {
  id: number;
  type: "maple" | "oak" | "birch" | "ginkgo" | "chestnut" | "spiky_chestnut" | "acorn";
  color?: string;
  left: string;      // horizontal position %
  bottom: string;    // height from footer base (px)
  rotate: number;    // rotation in degrees
  size: number;      // px
  opacity: number;
  zIndex: number;
  swayDelay: number;
}

// Sehr dichter, satter herbstlicher Teppich aus 88 Blättern, Kastanien, Eicheln und Schalen
// mit natürlicher Anhäufung an den Ecken und reichhaltiger Streuung über die gesamte Bodenkante
const BEDDED_AUTUMN_ITEMS: BeddedItem[] = [
  // ==========================================
  // LINKE ECKE: Dichte, natürliche Anhäufung (0% - 15%)
  // ==========================================
  { id: 1, type: "maple", color: "#9a3412", left: "0.5%", bottom: "-2px", rotate: -25, size: 36, opacity: 0.95, zIndex: 1, swayDelay: 0.2 },
  { id: 2, type: "oak", color: "#78350f", left: "2.5%", bottom: "2px", rotate: 34, size: 32, opacity: 0.9, zIndex: 2, swayDelay: 0.6 },
  { id: 3, type: "chestnut", left: "3.8%", bottom: "4px", rotate: 12, size: 24, opacity: 1, zIndex: 6, swayDelay: 0.1 },
  { id: 4, type: "spiky_chestnut", left: "1.2%", bottom: "16px", rotate: -18, size: 28, opacity: 0.95, zIndex: 7, swayDelay: 0.8 },
  { id: 5, type: "birch", color: "#d97706", left: "5.2%", bottom: "10px", rotate: -42, size: 26, opacity: 0.9, zIndex: 3, swayDelay: 0.4 },
  { id: 6, type: "ginkgo", color: "#ca8a04", left: "7.0%", bottom: "0px", rotate: 18, size: 28, opacity: 0.9, zIndex: 2, swayDelay: 1.1 },
  { id: 7, type: "chestnut", left: "6.5%", bottom: "18px", rotate: -8, size: 22, opacity: 1, zIndex: 8, swayDelay: 0.5 },
  { id: 8, type: "oak", color: "#92400e", left: "8.8%", bottom: "6px", rotate: 50, size: 30, opacity: 0.85, zIndex: 3, swayDelay: 0.9 },
  { id: 9, type: "acorn", left: "9.2%", bottom: "22px", rotate: 40, size: 22, opacity: 0.95, zIndex: 8, swayDelay: 0.3 },
  { id: 10, type: "maple", color: "#c2410c", left: "10.5%", bottom: "12px", rotate: -15, size: 34, opacity: 0.9, zIndex: 4, swayDelay: 1.4 },
  { id: 11, type: "birch", color: "#ea580c", left: "12.0%", bottom: "2px", rotate: 26, size: 24, opacity: 0.85, zIndex: 2, swayDelay: 0.7 },
  { id: 12, type: "chestnut", left: "12.8%", bottom: "16px", rotate: 25, size: 20, opacity: 1, zIndex: 7, swayDelay: 1.0 },
  { id: 13, type: "ginkgo", color: "#eab308", left: "14.2%", bottom: "22px", rotate: -30, size: 22, opacity: 0.85, zIndex: 5, swayDelay: 1.6 },
  { id: 14, type: "oak", color: "#713f12", left: "4.0%", bottom: "24px", rotate: -10, size: 28, opacity: 0.85, zIndex: 5, swayDelay: 1.2 },

  // ==========================================
  // HALB-LINKS: Gemischte Schicht (15% - 35%)
  // ==========================================
  { id: 15, type: "maple", color: "#b45309", left: "16.0%", bottom: "4px", rotate: 22, size: 30, opacity: 0.85, zIndex: 2, swayDelay: 0.3 },
  { id: 16, type: "spiky_chestnut", left: "17.5%", bottom: "14px", rotate: 15, size: 26, opacity: 0.95, zIndex: 6, swayDelay: 0.9 },
  { id: 17, type: "birch", color: "#f59e0b", left: "19.2%", bottom: "-1px", rotate: -35, size: 25, opacity: 0.85, zIndex: 1, swayDelay: 0.5 },
  { id: 18, type: "acorn", left: "20.8%", bottom: "12px", rotate: -22, size: 20, opacity: 0.95, zIndex: 7, swayDelay: 0.4 },
  { id: 19, type: "oak", color: "#7c2d12", left: "22.0%", bottom: "18px", rotate: 42, size: 32, opacity: 0.85, zIndex: 4, swayDelay: 1.0 },
  { id: 20, type: "chestnut", left: "23.5%", bottom: "2px", rotate: -5, size: 23, opacity: 1, zIndex: 5, swayDelay: 0.7 },
  { id: 21, type: "ginkgo", color: "#facc15", left: "25.0%", bottom: "10px", rotate: -18, size: 24, opacity: 0.85, zIndex: 3, swayDelay: 1.3 },
  { id: 22, type: "maple", color: "#ea580c", left: "27.2%", bottom: "3px", rotate: 30, size: 32, opacity: 0.85, zIndex: 2, swayDelay: 0.8 },
  { id: 23, type: "birch", color: "#d97706", left: "28.5%", bottom: "20px", rotate: -40, size: 22, opacity: 0.8, zIndex: 5, swayDelay: 1.5 },
  { id: 24, type: "spiky_chestnut", left: "30.0%", bottom: "6px", rotate: 35, size: 27, opacity: 0.95, zIndex: 6, swayDelay: 0.2 },
  { id: 25, type: "chestnut", left: "31.8%", bottom: "18px", rotate: 18, size: 21, opacity: 1, zIndex: 7, swayDelay: 1.1 },
  { id: 26, type: "oak", color: "#9a3412", left: "33.2%", bottom: "0px", rotate: -15, size: 29, opacity: 0.85, zIndex: 2, swayDelay: 0.6 },
  { id: 27, type: "acorn", left: "34.5%", bottom: "24px", rotate: 55, size: 21, opacity: 0.9, zIndex: 8, swayDelay: 1.3 },

  // ==========================================
  // ZENTRUM: Sanfter aber dichter Fluss (35% - 65%)
  // ==========================================
  { id: 28, type: "ginkgo", color: "#ca8a04", left: "36.2%", bottom: "8px", rotate: 25, size: 26, opacity: 0.85, zIndex: 3, swayDelay: 0.4 },
  { id: 29, type: "maple", color: "#c2410c", left: "38.0%", bottom: "1px", rotate: -32, size: 34, opacity: 0.85, zIndex: 2, swayDelay: 0.9 },
  { id: 30, type: "chestnut", left: "39.5%", bottom: "14px", rotate: -12, size: 24, opacity: 1, zIndex: 7, swayDelay: 0.5 },
  { id: 31, type: "birch", color: "#ea580c", left: "41.2%", bottom: "6px", rotate: 48, size: 24, opacity: 0.8, zIndex: 3, swayDelay: 1.2 },
  { id: 32, type: "oak", color: "#78350f", left: "43.0%", bottom: "18px", rotate: -22, size: 30, opacity: 0.85, zIndex: 4, swayDelay: 0.7 },
  { id: 33, type: "spiky_chestnut", left: "44.8%", bottom: "2px", rotate: 20, size: 28, opacity: 0.95, zIndex: 5, swayDelay: 1.0 },
  { id: 34, type: "ginkgo", color: "#eab308", left: "46.5%", bottom: "12px", rotate: -15, size: 25, opacity: 0.85, zIndex: 3, swayDelay: 0.3 },
  { id: 35, type: "chestnut", left: "48.2%", bottom: "22px", rotate: 8, size: 22, opacity: 1, zIndex: 8, swayDelay: 1.4 },
  { id: 36, type: "maple", color: "#9a3412", left: "50.0%", bottom: "0px", rotate: 35, size: 36, opacity: 0.9, zIndex: 2, swayDelay: 0.8 },
  { id: 37, type: "acorn", left: "51.5%", bottom: "14px", rotate: -35, size: 22, opacity: 0.95, zIndex: 7, swayDelay: 0.6 },
  { id: 38, type: "birch", color: "#f59e0b", left: "53.2%", bottom: "4px", rotate: -45, size: 23, opacity: 0.85, zIndex: 2, swayDelay: 1.1 },
  { id: 39, type: "oak", color: "#854d0e", left: "55.0%", bottom: "16px", rotate: 28, size: 31, opacity: 0.85, zIndex: 4, swayDelay: 0.5 },
  { id: 40, type: "chestnut", left: "56.8%", bottom: "2px", rotate: -20, size: 25, opacity: 1, zIndex: 6, swayDelay: 1.3 },
  { id: 41, type: "ginkgo", color: "#facc15", left: "58.5%", bottom: "20px", rotate: 38, size: 23, opacity: 0.85, zIndex: 5, swayDelay: 0.9 },
  { id: 42, type: "spiky_chestnut", left: "60.2%", bottom: "8px", rotate: -10, size: 26, opacity: 0.95, zIndex: 6, swayDelay: 0.4 },
  { id: 43, type: "maple", color: "#b45309", left: "62.0%", bottom: "0px", rotate: -24, size: 32, opacity: 0.85, zIndex: 2, swayDelay: 1.2 },
  { id: 44, type: "acorn", left: "63.5%", bottom: "18px", rotate: 25, size: 20, opacity: 0.9, zIndex: 7, swayDelay: 0.7 },

  // ==========================================
  // HALB-RECHTS: Natürlicher Übergang (65% - 85%)
  // ==========================================
  { id: 45, type: "oak", color: "#78350f", left: "65.0%", bottom: "6px", rotate: 40, size: 30, opacity: 0.85, zIndex: 3, swayDelay: 0.8 },
  { id: 46, type: "birch", color: "#ea580c", left: "66.8%", bottom: "14px", rotate: -30, size: 24, opacity: 0.85, zIndex: 4, swayDelay: 1.0 },
  { id: 47, type: "chestnut", left: "68.2%", bottom: "2px", rotate: 15, size: 24, opacity: 1, zIndex: 7, swayDelay: 0.2 },
  { id: 48, type: "maple", color: "#c2410c", left: "70.0%", bottom: "16px", rotate: -18, size: 34, opacity: 0.85, zIndex: 4, swayDelay: 1.5 },
  { id: 49, type: "ginkgo", color: "#ca8a04", left: "71.8%", bottom: "0px", rotate: 22, size: 27, opacity: 0.85, zIndex: 2, swayDelay: 0.5 },
  { id: 50, type: "spiky_chestnut", left: "73.2%", bottom: "12px", rotate: -28, size: 29, opacity: 0.95, zIndex: 6, swayDelay: 1.1 },
  { id: 51, type: "oak", color: "#92400e", left: "75.0%", bottom: "3px", rotate: 35, size: 31, opacity: 0.85, zIndex: 2, swayDelay: 0.9 },
  { id: 52, type: "chestnut", left: "76.5%", bottom: "20px", rotate: -8, size: 22, opacity: 1, zIndex: 8, swayDelay: 0.4 },
  { id: 53, type: "acorn", left: "78.0%", bottom: "8px", rotate: -45, size: 23, opacity: 0.95, zIndex: 6, swayDelay: 1.3 },
  { id: 54, type: "birch", color: "#d97706", left: "79.8%", bottom: "0px", rotate: 15, size: 25, opacity: 0.85, zIndex: 3, swayDelay: 0.6 },
  { id: 55, type: "maple", color: "#9a3412", left: "81.5%", bottom: "15px", rotate: -36, size: 33, opacity: 0.9, zIndex: 4, swayDelay: 1.4 },
  { id: 56, type: "chestnut", left: "83.0%", bottom: "4px", rotate: 22, size: 23, opacity: 1, zIndex: 7, swayDelay: 0.8 },
  { id: 57, type: "ginkgo", color: "#eab308", left: "84.5%", bottom: "22px", rotate: -12, size: 24, opacity: 0.85, zIndex: 5, swayDelay: 1.0 },

  // ==========================================
  // RECHTE ECKE: Sehr dichte, herbstliche Anhäufung (85% - 99.5%)
  // ==========================================
  { id: 58, type: "oak", color: "#78350f", left: "86.0%", bottom: "2px", rotate: 42, size: 32, opacity: 0.9, zIndex: 2, swayDelay: 0.3 },
  { id: 59, type: "spiky_chestnut", left: "87.5%", bottom: "16px", rotate: 18, size: 28, opacity: 0.95, zIndex: 6, swayDelay: 0.9 },
  { id: 60, type: "chestnut", left: "89.0%", bottom: "4px", rotate: -14, size: 26, opacity: 1, zIndex: 8, swayDelay: 0.5 },
  { id: 61, type: "maple", color: "#ea580c", left: "90.2%", bottom: "18px", rotate: -25, size: 35, opacity: 0.9, zIndex: 4, swayDelay: 1.2 },
  { id: 62, type: "birch", color: "#f59e0b", left: "91.8%", bottom: "0px", rotate: 30, size: 26, opacity: 0.9, zIndex: 2, swayDelay: 0.7 },
  { id: 63, type: "acorn", left: "92.8%", bottom: "24px", rotate: 38, size: 24, opacity: 0.95, zIndex: 9, swayDelay: 0.2 },
  { id: 64, type: "chestnut", left: "93.8%", bottom: "8px", rotate: 5, size: 24, opacity: 1, zIndex: 7, swayDelay: 1.0 },
  { id: 65, type: "oak", color: "#713f12", left: "94.8%", bottom: "22px", rotate: -40, size: 30, opacity: 0.9, zIndex: 5, swayDelay: 1.5 },
  { id: 66, type: "ginkgo", color: "#ca8a04", left: "95.8%", bottom: "2px", rotate: 15, size: 28, opacity: 0.9, zIndex: 3, swayDelay: 0.4 },
  { id: 67, type: "spiky_chestnut", left: "96.8%", bottom: "16px", rotate: -22, size: 29, opacity: 0.95, zIndex: 8, swayDelay: 0.8 },
  { id: 68, type: "maple", color: "#c2410c", left: "97.8%", bottom: "-2px", rotate: 20, size: 36, opacity: 0.95, zIndex: 2, swayDelay: 1.3 },
  { id: 69, type: "chestnut", left: "98.5%", bottom: "12px", rotate: -30, size: 22, opacity: 1, zIndex: 9, swayDelay: 0.6 },
  { id: 70, type: "birch", color: "#d97706", left: "96.2%", bottom: "28px", rotate: 45, size: 22, opacity: 0.85, zIndex: 6, swayDelay: 1.1 },

  // ==========================================
  // ZUSÄTZLICHE TIEFE & VOLUMEN-AKZENTE (Übergreifend)
  // ==========================================
  { id: 71, type: "chestnut", left: "1.8%", bottom: "28px", rotate: 20, size: 19, opacity: 0.95, zIndex: 9, swayDelay: 0.7 },
  { id: 72, type: "acorn", left: "6.0%", bottom: "30px", rotate: -25, size: 20, opacity: 0.95, zIndex: 9, swayDelay: 0.5 },
  { id: 73, type: "maple", color: "#78350f", left: "11.5%", bottom: "26px", rotate: 35, size: 28, opacity: 0.8, zIndex: 5, swayDelay: 1.0 },
  { id: 74, type: "birch", color: "#b45309", left: "24.0%", bottom: "26px", rotate: -15, size: 21, opacity: 0.8, zIndex: 6, swayDelay: 0.4 },
  { id: 75, type: "chestnut", left: "27.5%", bottom: "22px", rotate: -10, size: 22, opacity: 1, zIndex: 8, swayDelay: 1.2 },
  { id: 76, type: "oak", color: "#9a3412", left: "37.5%", bottom: "24px", rotate: 18, size: 27, opacity: 0.8, zIndex: 5, swayDelay: 0.9 },
  { id: 77, type: "spiky_chestnut", left: "42.5%", bottom: "24px", rotate: 30, size: 25, opacity: 0.9, zIndex: 7, swayDelay: 0.3 },
  { id: 78, type: "chestnut", left: "46.0%", bottom: "28px", rotate: -15, size: 21, opacity: 1, zIndex: 8, swayDelay: 1.1 },
  { id: 79, type: "maple", color: "#d97706", left: "49.0%", bottom: "26px", rotate: -28, size: 28, opacity: 0.85, zIndex: 6, swayDelay: 0.8 },
  { id: 80, type: "acorn", left: "54.5%", bottom: "28px", rotate: 15, size: 20, opacity: 0.9, zIndex: 8, swayDelay: 0.4 },
  { id: 81, type: "chestnut", left: "62.8%", bottom: "24px", rotate: -5, size: 22, opacity: 1, zIndex: 7, swayDelay: 1.3 },
  { id: 82, type: "birch", color: "#c2410c", left: "67.5%", bottom: "26px", rotate: 40, size: 22, opacity: 0.8, zIndex: 5, swayDelay: 0.6 },
  { id: 83, type: "chestnut", left: "74.5%", bottom: "26px", rotate: 25, size: 23, opacity: 1, zIndex: 8, swayDelay: 0.9 },
  { id: 84, type: "spiky_chestnut", left: "80.5%", bottom: "25px", rotate: -20, size: 26, opacity: 0.9, zIndex: 7, swayDelay: 1.0 },
  { id: 85, type: "maple", color: "#854d0e", left: "88.2%", bottom: "30px", rotate: 12, size: 29, opacity: 0.85, zIndex: 6, swayDelay: 0.7 },
  { id: 86, type: "chestnut", left: "91.0%", bottom: "32px", rotate: -18, size: 22, opacity: 1, zIndex: 9, swayDelay: 0.3 },
  { id: 87, type: "acorn", left: "95.0%", bottom: "34px", rotate: -30, size: 21, opacity: 0.95, zIndex: 9, swayDelay: 1.2 },
  { id: 88, type: "ginkgo", color: "#facc15", left: "99.0%", bottom: "26px", rotate: 20, size: 24, opacity: 0.85, zIndex: 7, swayDelay: 0.5 },
];

export default function FooterLeaves() {
  const { season } = useSeason();

  if (season !== "autumn") {
    return null;
  }

  return (
    <div 
      className="absolute bottom-0 left-0 right-0 h-28 md:h-32 pointer-events-none overflow-hidden select-none z-0"
      aria-hidden="true"
    >
      {/* Sanfter organischer Wald- & Humus-Bodenverlauf für realistische Tiefe */}
      <div className="absolute bottom-0 inset-x-0 h-10 bg-gradient-to-t from-autumn-deepbrown/30 via-autumn-amber/12 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-3 bg-autumn-deepbrown/20 blur-sm" />

      {/* Dichtes, herbstliches Arrangement aus Blättern, Kastanien und Eicheln am Boden */}
      {BEDDED_AUTUMN_ITEMS.map((item) => {
        const IconComponent = () => {
          switch (item.type) {
            case "chestnut":
              return <ChestnutIcon className="w-full h-full" />;
            case "spiky_chestnut":
              return <SpikyChestnutHuskIcon className="w-full h-full" />;
            case "acorn":
              return <AcornIcon className="w-full h-full" />;
            case "maple":
              return <MapleLeafIcon className="w-full h-full" color={item.color} />;
            case "oak":
              return <OakLeafIcon className="w-full h-full" color={item.color} />;
            case "birch":
              return <BirchLeafIcon className="w-full h-full" color={item.color} />;
            case "ginkgo":
              return <GinkgoLeafIcon className="w-full h-full" color={item.color} />;
          }
        };

        // Kastanien und Eicheln ruhen schwerer am Boden (minimale Mikro-Bewegung), Blätter schwingen sanft
        const isNut = item.type === "chestnut" || item.type === "spiky_chestnut" || item.type === "acorn";

        return (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ 
              opacity: item.opacity,
              y: isNut ? [0, -1, 0] : [0, -3, 0],
              rotate: isNut 
                ? [item.rotate, item.rotate + 1, item.rotate] 
                : [item.rotate, item.rotate + 3, item.rotate - 2, item.rotate],
            }}
            transition={{
              opacity: { duration: 1.2, delay: item.swayDelay * 0.15 },
              y: { 
                duration: isNut ? 6.5 + (item.id % 3) : 4.8 + (item.id % 4), 
                repeat: Infinity, 
                ease: "easeInOut", 
                delay: item.swayDelay 
              },
              rotate: { 
                duration: isNut ? 8.0 + (item.id % 3) : 6.2 + (item.id % 5), 
                repeat: Infinity, 
                ease: "easeInOut", 
                delay: item.swayDelay 
              },
            }}
            className="absolute drop-shadow-[0_2px_4px_rgba(0,0,0,0.28)] filter pointer-events-none"
            style={{
              left: item.left,
              bottom: item.bottom,
              width: item.size,
              height: item.size,
              zIndex: item.zIndex,
            }}
          >
            <IconComponent />
          </motion.div>
        );
      })}
    </div>
  );
}
