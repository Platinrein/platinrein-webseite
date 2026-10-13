import React, { useState, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { useSeason } from "../context/SeasonContext";
import { ChestnutIcon, SpikyChestnutHuskIcon, AcornIcon } from "./ChestnutIcons";

// Realistic Autumn Leaf Shapes
interface LeafSvgProps {
  className?: string;
  color?: string;
  style?: React.CSSProperties;
}

// 1. Maple Leaf (Ahornblatt)
const MapleLeaf = ({ className = "w-6 h-6", color = "currentColor", style }: LeafSvgProps) => (
  <svg viewBox="0 0 24 24" fill={color} style={style} className={className} aria-hidden="true">
    <path d="M12 1.5L13.8 6.5L17.2 5.2L16.5 8.8L21 8.8L18.8 12.2L22 15L18.2 16.2L19.2 20L15.5 19L13.8 22.8L12.7 19L12 23.5H11.2L10.5 19L9.4 22.8L7.7 19L4 20L5 16.2L1.2 15L4.4 12.2L2.2 8.8L6.7 8.8L6 5.2L9.4 6.5L11.2 1.5H12Z" />
    <path d="M12 10V22" stroke="rgba(0,0,0,0.18)" strokeWidth="0.8" />
  </svg>
);

// 2. Oak Leaf (Eichenblatt)
const OakLeaf = ({ className = "w-6 h-6", color = "currentColor", style }: LeafSvgProps) => (
  <svg viewBox="0 0 24 24" fill={color} style={style} className={className} aria-hidden="true">
    <path d="M12 2C10.2 3.6 8.5 5.8 8.5 8.5C6.8 8 5.2 9.5 5.8 11.2C4.5 12.2 4.5 14.5 6 15.5C5 17 6.5 19 8.2 18.5C8.8 20.2 10.5 21.5 12 22.5C13.5 21.5 15.2 20.2 15.8 18.5C17.5 19 19 17 18 15.5C19.5 14.5 19.5 12.2 18.2 11.2C18.8 9.5 17.2 8 15.5 8.5C15.5 5.8 13.8 3.6 12 2Z" />
    <path d="M12 6V21" stroke="rgba(0,0,0,0.18)" strokeWidth="0.8" />
  </svg>
);

// 3. Birch / Beech Leaf (Birken-/Buchenblatt)
const BirchLeaf = ({ className = "w-6 h-6", color = "currentColor", style }: LeafSvgProps) => (
  <svg viewBox="0 0 24 24" fill={color} style={style} className={className} aria-hidden="true">
    <path d="M12 2C12 2 19 8.5 19 14.5C19 18 16 21 12 22.5C8 21 5 18 5 14.5C5 8.5 12 2 12 2Z" />
    <path d="M12 7V21" stroke="rgba(0,0,0,0.18)" strokeWidth="0.8" />
  </svg>
);

// 4. Ginkgo Leaf (Ginkgoblatt)
const GinkgoLeaf = ({ className = "w-6 h-6", color = "currentColor", style }: LeafSvgProps) => (
  <svg viewBox="0 0 24 24" fill={color} style={style} className={className} aria-hidden="true">
    <path d="M12 21C12 18 11.5 14 11.5 14C6 13.5 2 9.5 2 6C2 5.5 2.5 5 3.5 5C6.5 5 9.5 8 11.5 9.5C11.8 7 12.2 7 12.5 9.5C14.5 8 17.5 5 20.5 5C21.5 5 22 5.5 22 6C22 9.5 18 13.5 12.5 14C12.5 14 12 18 12 21Z" />
  </svg>
);

interface LeafData {
  id: number;
  type: 'maple' | 'oak' | 'birch' | 'ginkgo' | 'chestnut' | 'spiky_chestnut' | 'acorn';
  baseX: number;       // base position in pile (px relative to center)
  baseY: number;       // base position in pile (px relative to bottom)
  baseRotate: number;   // base resting rotation in pile (deg)
  color?: string;
  size: number;        // size in px
  // Natural multi-trajectory dispersion:
  // Instead of all leaves flying together at the exact same distance and direction in one uniform sweep,
  // individual leaves have organic stagger delays, unique horizontal spreads (some swirl 350px, others 1100px),
  // varying lift and dipping patterns, and flutter waypoints.
  startT: number;      // scroll progress threshold where this specific leaf gets dislodged
  midT: number;        // intermediate fluttering milestone
  endT: number;        // final settling/dispersion point
  midX: number;        // intermediate x offset
  midY: number;        // intermediate lift/dip
  finalX: number;      // dispersed x offset
  finalY: number;      // dispersed y offset
  rotMid: number;      // intermediate rotation
  rotFinal: number;    // final rotation
  zIndex: number;
}

// 42 natural autumn leaves forming a rich, organic pile.
// Configured for natural, staggered, organic dispersion across the page instead of a single synchronized sweep!
const LEAF_PILE_DATA: LeafData[] = [
  // --- LAYER 1: Top light flutterers (dislodged early at scroll 0.05-0.5, catch gust and float wide) ---
  {
    id: 27, type: 'maple', baseX: -30, baseY: 72, baseRotate: 14, color: '#ea580c', size: 44,
    startT: 0.04, midT: 0.35, endT: 0.85,
    midX: -420, midY: -80, finalX: -1150, finalY: -140,
    rotMid: 360, rotFinal: 740, zIndex: 12
  },
  {
    id: 28, type: 'birch', baseX: -5, baseY: 78, baseRotate: -28, color: '#f59e0b', size: 34,
    startT: 0.02, midT: 0.30, endT: 0.80,
    midX: -340, midY: -110, finalX: -980, finalY: -80,
    rotMid: -280, rotFinal: -620, zIndex: 13
  },
  {
    id: 29, type: 'ginkgo', baseX: 18, baseY: 80, baseRotate: 30, color: '#eab308', size: 36,
    startT: 0.06, midT: 0.38, endT: 0.88,
    midX: -480, midY: -95, finalX: -1220, finalY: -120,
    rotMid: 310, rotFinal: 660, zIndex: 13
  },
  {
    id: 41, type: 'ginkgo', baseX: -15, baseY: 68, baseRotate: -12, color: '#eab308', size: 34,
    startT: 0.08, midT: 0.42, endT: 0.90,
    midX: -390, midY: -65, finalX: -1060, finalY: -110,
    rotMid: 240, rotFinal: 510, zIndex: 11
  },
  {
    id: 42, type: 'birch', baseX: 12, baseY: 72, baseRotate: 18, color: '#f59e0b', size: 32,
    startT: 0.05, midT: 0.32, endT: 0.82,
    midX: -360, midY: -100, finalX: -920, finalY: -60,
    rotMid: -320, rotFinal: -590, zIndex: 11
  },
  {
    id: 30, type: 'oak', baseX: 40, baseY: 70, baseRotate: 20, color: '#d97706', size: 38,
    startT: 0.10, midT: 0.45, endT: 0.92,
    midX: -310, midY: -50, finalX: -840, finalY: -90,
    rotMid: 190, rotFinal: 430, zIndex: 10
  },

  // --- LAYER 2: Crest & Upper mound (dislodged progressively at scroll 0.12-0.65, tumbling and scattering) ---
  {
    id: 21, type: 'maple', baseX: -50, baseY: 50, baseRotate: 42, color: '#f59e0b', size: 48,
    startT: 0.12, midT: 0.48, endT: 0.94,
    midX: -460, midY: -75, finalX: -1180, finalY: -130,
    rotMid: 280, rotFinal: 620, zIndex: 8
  },
  {
    id: 22, type: 'birch', baseX: -25, baseY: 56, baseRotate: -20, color: '#d97706', size: 36,
    startT: 0.15, midT: 0.50, endT: 0.92,
    midX: -280, midY: 15, finalX: -760, finalY: -25,
    rotMid: -210, rotFinal: -440, zIndex: 9
  },
  {
    id: 23, type: 'ginkgo', baseX: 0, baseY: 60, baseRotate: 15, color: '#eab308', size: 38,
    startT: 0.14, midT: 0.46, endT: 0.88,
    midX: -510, midY: -85, finalX: -1140, finalY: -100,
    rotMid: 330, rotFinal: 580, zIndex: 9
  },
  {
    id: 24, type: 'maple', baseX: 25, baseY: 55, baseRotate: 22, color: '#b45309', size: 46,
    startT: 0.18, midT: 0.52, endT: 0.95,
    midX: -410, midY: -60, finalX: -1020, finalY: -115,
    rotMid: 260, rotFinal: 520, zIndex: 8
  },
  {
    id: 20, type: 'oak', baseX: -75, baseY: 44, baseRotate: -12, color: '#7c2d12', size: 40,
    startT: 0.16, midT: 0.54, endT: 0.96,
    midX: -370, midY: -40, finalX: -890, finalY: -70,
    rotMid: -180, rotFinal: -390, zIndex: 7
  },
  {
    id: 25, type: 'oak', baseX: 50, baseY: 48, baseRotate: -32, color: '#ea580c', size: 42,
    startT: 0.20, midT: 0.56, endT: 0.96,
    midX: -320, midY: 20, finalX: -810, finalY: -45,
    rotMid: -240, rotFinal: -470, zIndex: 7
  },
  {
    id: 26, type: 'birch', baseX: 75, baseY: 42, baseRotate: 26, color: '#f59e0b', size: 34,
    startT: 0.22, midT: 0.58, endT: 0.98,
    midX: -260, midY: -30, finalX: -710, finalY: -35,
    rotMid: 160, rotFinal: 350, zIndex: 6
  },
  {
    id: 35, type: 'maple', baseX: -60, baseY: 38, baseRotate: -10, color: '#ea580c', size: 42,
    startT: 0.17, midT: 0.50, endT: 0.92,
    midX: -440, midY: -70, finalX: -1080, finalY: -95,
    rotMid: -220, rotFinal: -490, zIndex: 5
  },
  {
    id: 36, type: 'oak', baseX: -5, baseY: 45, baseRotate: 35, color: '#b45309', size: 36,
    startT: 0.19, midT: 0.55, endT: 0.94,
    midX: -350, midY: -45, finalX: -860, finalY: -65,
    rotMid: 210, rotFinal: 460, zIndex: 6
  },

  // --- LAYER 3: Middle volume (dislodged at scroll 0.25-0.75, disperse horizontally at natural spread) ---
  {
    id: 11, type: 'maple', baseX: -95, baseY: 22, baseRotate: 35, color: '#d97706', size: 46,
    startT: 0.24, midT: 0.60, endT: 0.98,
    midX: -390, midY: -50, finalX: -990, finalY: -85,
    rotMid: 250, rotFinal: 540, zIndex: 4
  },
  {
    id: 12, type: 'birch', baseX: -70, baseY: 26, baseRotate: -22, color: '#f59e0b', size: 34,
    startT: 0.26, midT: 0.62, endT: 0.97,
    midX: -290, midY: 25, finalX: -740, finalY: 10,
    rotMid: -170, rotFinal: -360, zIndex: 3
  },
  {
    id: 13, type: 'oak', baseX: -45, baseY: 30, baseRotate: 50, color: '#ea580c', size: 40,
    startT: 0.25, midT: 0.58, endT: 0.96,
    midX: -430, midY: -60, finalX: -1040, finalY: -75,
    rotMid: 270, rotFinal: 580, zIndex: 5
  },
  {
    id: 14, type: 'ginkgo', baseX: -20, baseY: 34, baseRotate: -18, color: '#eab308', size: 36,
    startT: 0.22, midT: 0.55, endT: 0.93,
    midX: -380, midY: -40, finalX: -910, finalY: -55,
    rotMid: -210, rotFinal: -460, zIndex: 4
  },
  {
    id: 15, type: 'maple', baseX: 5, baseY: 36, baseRotate: -10, color: '#b45309', size: 48,
    startT: 0.20, midT: 0.52, endT: 0.95,
    midX: -470, midY: -80, finalX: -1100, finalY: -105,
    rotMid: -260, rotFinal: -510, zIndex: 6
  },
  {
    id: 16, type: 'birch', baseX: 30, baseY: 32, baseRotate: 28, color: '#d97706', size: 33,
    startT: 0.28, midT: 0.64, endT: 0.98,
    midX: -320, midY: -20, finalX: -790, finalY: -40,
    rotMid: 180, rotFinal: 390, zIndex: 4
  },
  {
    id: 17, type: 'oak', baseX: 55, baseY: 28, baseRotate: -38, color: '#7c2d12', size: 38,
    startT: 0.29, midT: 0.65, endT: 0.99,
    midX: -360, midY: -35, finalX: -870, finalY: -60,
    rotMid: -190, rotFinal: -410, zIndex: 5
  },
  {
    id: 18, type: 'maple', baseX: 80, baseY: 24, baseRotate: 18, color: '#ea580c', size: 42,
    startT: 0.30, midT: 0.66, endT: 0.99,
    midX: -400, midY: -55, finalX: -950, finalY: -80,
    rotMid: 220, rotFinal: 470, zIndex: 3
  },
  {
    id: 19, type: 'ginkgo', baseX: 105, baseY: 20, baseRotate: -25, color: '#f59e0b', size: 34,
    startT: 0.32, midT: 0.68, endT: 1.0,
    midX: -270, midY: 15, finalX: -680, finalY: -15,
    rotMid: -160, rotFinal: -330, zIndex: 2
  },
  {
    id: 39, type: 'oak', baseX: -30, baseY: 18, baseRotate: -40, color: '#991b1b', size: 35,
    startT: 0.27, midT: 0.63, endT: 0.98,
    midX: -370, midY: -25, finalX: -880, finalY: -45,
    rotMid: 190, rotFinal: 380, zIndex: 3
  },
  {
    id: 40, type: 'maple', baseX: 10, baseY: 22, baseRotate: 45, color: '#b91c1c', size: 40,
    startT: 0.26, midT: 0.61, endT: 0.97,
    midX: -420, midY: -45, finalX: -980, finalY: -70,
    rotMid: -210, rotFinal: -440, zIndex: 4
  },

  // --- LAYER 4: Base / Ground boundary (heavier, dislodged last at scroll 0.35-0.85, gently rolling & distributing) ---
  {
    id: 1, type: 'oak', baseX: -110, baseY: 6, baseRotate: -25, color: '#92400e', size: 36,
    startT: 0.35, midT: 0.70, endT: 1.0,
    midX: -250, midY: 15, finalX: -620, finalY: 20,
    rotMid: -120, rotFinal: -280, zIndex: 1
  },
  {
    id: 2, type: 'maple', baseX: -85, baseY: 10, baseRotate: 20, color: '#b45309', size: 42,
    startT: 0.32, midT: 0.68, endT: 0.99,
    midX: -340, midY: -30, finalX: -790, finalY: -40,
    rotMid: 180, rotFinal: 360, zIndex: 2
  },
  {
    id: 3, type: 'birch', baseX: -60, baseY: 4, baseRotate: -45, color: '#d97706', size: 30,
    startT: 0.38, midT: 0.73, endT: 1.0,
    midX: -220, midY: 30, finalX: -540, finalY: 25,
    rotMid: 110, rotFinal: 250, zIndex: 1
  },
  {
    id: 4, type: 'ginkgo', baseX: -35, baseY: 12, baseRotate: 15, color: '#eab308', size: 35,
    startT: 0.30, midT: 0.65, endT: 0.97,
    midX: -330, midY: -20, finalX: -750, finalY: -35,
    rotMid: -170, rotFinal: -350, zIndex: 2
  },
  {
    id: 5, type: 'oak', baseX: -10, baseY: 15, baseRotate: -15, color: '#7c2d12', size: 38,
    startT: 0.34, midT: 0.69, endT: 0.98,
    midX: -360, midY: -15, finalX: -820, finalY: -25,
    rotMid: 190, rotFinal: 390, zIndex: 2
  },
  {
    id: 6, type: 'maple', baseX: 15, baseY: 8, baseRotate: -30, color: '#ea580c', size: 44,
    startT: 0.36, midT: 0.72, endT: 1.0,
    midX: -310, midY: -25, finalX: -710, finalY: -30,
    rotMid: 210, rotFinal: 430, zIndex: 3
  },
  {
    id: 7, type: 'birch', baseX: 45, baseY: 12, baseRotate: 40, color: '#f59e0b', size: 32,
    startT: 0.40, midT: 0.75, endT: 1.0,
    midX: -230, midY: 20, finalX: -560, finalY: 15,
    rotMid: -140, rotFinal: -290, zIndex: 1
  },
  {
    id: 8, type: 'oak', baseX: 75, baseY: 9, baseRotate: -20, color: '#a16207', size: 36,
    startT: 0.37, midT: 0.72, endT: 1.0,
    midX: -280, midY: -10, finalX: -650, finalY: -20,
    rotMid: 170, rotFinal: 340, zIndex: 2
  },
  {
    id: 9, type: 'maple', baseX: 105, baseY: 14, baseRotate: 25, color: '#b45309', size: 40,
    startT: 0.35, midT: 0.70, endT: 0.99,
    midX: -320, midY: -30, finalX: -740, finalY: -45,
    rotMid: -180, rotFinal: -370, zIndex: 1
  },
  {
    id: 10, type: 'ginkgo', baseX: 130, baseY: 6, baseRotate: -10, color: '#ca8a04', size: 33,
    startT: 0.42, midT: 0.76, endT: 1.0,
    midX: -200, midY: 25, finalX: -490, finalY: 20,
    rotMid: 130, rotFinal: 280, zIndex: 1
  },

  // --- Fringe Scatter Outliers (extra dispersion variety across different ranges) ---
  {
    id: 31, type: 'birch', baseX: -125, baseY: 4, baseRotate: -55, color: '#b45309', size: 28,
    startT: 0.40, midT: 0.74, endT: 1.0,
    midX: -180, midY: 35, finalX: -430, finalY: 30,
    rotMid: -100, rotFinal: -220, zIndex: 1
  },
  {
    id: 32, type: 'maple', baseX: -108, baseY: 16, baseRotate: 48, color: '#7c2d12', size: 36,
    startT: 0.33, midT: 0.68, endT: 0.98,
    midX: -310, midY: -20, finalX: -720, finalY: -35,
    rotMid: 160, rotFinal: 330, zIndex: 2
  },
  {
    id: 33, type: 'ginkgo', baseX: 142, baseY: 5, baseRotate: 50, color: '#92400e', size: 32,
    startT: 0.44, midT: 0.78, endT: 1.0,
    midX: -170, midY: 30, finalX: -390, finalY: 25,
    rotMid: -120, rotFinal: -240, zIndex: 1
  },
  {
    id: 34, type: 'birch', baseX: 120, baseY: 18, baseRotate: -15, color: '#d97706', size: 30,
    startT: 0.38, midT: 0.73, endT: 1.0,
    midX: -240, midY: -10, finalX: -580, finalY: -15,
    rotMid: 150, rotFinal: 310, zIndex: 2
  },
  {
    id: 37, type: 'birch', baseX: -80, baseY: 12, baseRotate: -25, color: '#f59e0b', size: 31,
    startT: 0.36, midT: 0.71, endT: 0.99,
    midX: -270, midY: 10, finalX: -640, finalY: 5,
    rotMid: -140, rotFinal: -300, zIndex: 2
  },
  {
    id: 38, type: 'maple', baseX: 60, baseY: 16, baseRotate: -15, color: '#d97706', size: 38,
    startT: 0.34, midT: 0.69, endT: 0.98,
    midX: -330, midY: -25, finalX: -770, finalY: -35,
    rotMid: 200, rotFinal: 410, zIndex: 3
  },

  // --- Real Autumn Chestnuts, Spiky Husks & Acorns embedded in the pile ---
  {
    id: 50, type: 'chestnut', baseX: -22, baseY: 36, baseRotate: 14, size: 26,
    startT: 0.16, midT: 0.48, endT: 0.94,
    midX: -260, midY: 8, finalX: -640, finalY: 6,
    rotMid: -380, rotFinal: -820, zIndex: 9
  },
  {
    id: 51, type: 'spiky_chestnut', baseX: 45, baseY: 42, baseRotate: -15, size: 30,
    startT: 0.14, midT: 0.45, endT: 0.92,
    midX: -310, midY: -15, finalX: -760, finalY: -12,
    rotMid: 290, rotFinal: 620, zIndex: 10
  },
  {
    id: 52, type: 'chestnut', baseX: -68, baseY: 22, baseRotate: 24, size: 24,
    startT: 0.25, midT: 0.58, endT: 0.97,
    midX: -240, midY: 12, finalX: -580, finalY: 10,
    rotMid: -270, rotFinal: -660, zIndex: 7
  },
  {
    id: 53, type: 'chestnut', baseX: 16, baseY: 18, baseRotate: -8, size: 25,
    startT: 0.23, midT: 0.56, endT: 0.96,
    midX: -270, midY: 14, finalX: -660, finalY: 8,
    rotMid: -320, rotFinal: -730, zIndex: 6
  },
  {
    id: 54, type: 'acorn', baseX: 88, baseY: 18, baseRotate: 32, size: 23,
    startT: 0.30, midT: 0.65, endT: 1.0,
    midX: -210, midY: 16, finalX: -510, finalY: 12,
    rotMid: 230, rotFinal: 540, zIndex: 5
  },
  {
    id: 55, type: 'spiky_chestnut', baseX: -38, baseY: 52, baseRotate: 18, size: 28,
    startT: 0.11, midT: 0.42, endT: 0.89,
    midX: -350, midY: -30, finalX: -830, finalY: -22,
    rotMid: -340, rotFinal: -760, zIndex: 11
  },
  {
    id: 56, type: 'chestnut', baseX: 58, baseY: 10, baseRotate: -18, size: 23,
    startT: 0.34, midT: 0.69, endT: 1.0,
    midX: -220, midY: 18, finalX: -540, finalY: 14,
    rotMid: -290, rotFinal: -700, zIndex: 4
  },
  {
    id: 57, type: 'chestnut', baseX: -92, baseY: 8, baseRotate: 12, size: 22,
    startT: 0.37, midT: 0.71, endT: 1.0,
    midX: -190, midY: 20, finalX: -470, finalY: 16,
    rotMid: -250, rotFinal: -600, zIndex: 3
  },
  {
    id: 58, type: 'acorn', baseX: -6, baseY: 64, baseRotate: -16, size: 21,
    startT: 0.07, midT: 0.36, endT: 0.86,
    midX: -370, midY: -40, finalX: -900, finalY: -32,
    rotMid: 370, rotFinal: 810, zIndex: 12
  },
];

export default function LeafPileWind() {
  const { season } = useSeason();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [manualGust, setManualGust] = useState(false);
  const [gustCount, setGustCount] = useState(0);

  // Viewport scroll tracking with high sensitivity and fluid spring response
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 92%", "start 20%"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 22,
    restDelta: 0.001
  });

  // Lateral horizontal wind trail lines sweeping across from right to left
  const windTrailOpacity = useTransform(smoothProgress, [0.06, 0.32, 0.75, 0.98], [0, 0.75, 0.4, 0]);
  const windTrailX = useTransform(smoothProgress, [0, 1], [40, -450]);
  const groundShadowScale = useTransform(smoothProgress, [0, 0.45, 0.9], [1, 0.55, 0.08]);
  const groundShadowOpacity = useTransform(smoothProgress, [0, 0.35, 0.8], [0.35, 0.18, 0]);

  // Manual wind gust trigger
  const triggerWindGust = () => {
    setManualGust(true);
    setGustCount(prev => prev + 1);
    setTimeout(() => {
      setManualGust(false);
    }, 2800);
  };

  if (season !== 'autumn') {
    return null;
  }

  return (
    <section 
      ref={sectionRef}
      className="relative w-full overflow-hidden pointer-events-none z-20 select-none py-2 -mt-10 sm:-mt-14"
      aria-hidden="true"
    >
      {/* The Leaf Pile Arena */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-20 relative h-32 md:h-40">
        
        {/* Animated horizontal wind gust streak lines flowing sideways */}
        <motion.div 
          style={{ opacity: windTrailOpacity, x: windTrailX }}
          className="absolute right-8 sm:right-20 md:right-40 bottom-10 w-[480px] h-32 pointer-events-none"
        >
          <svg viewBox="0 0 480 120" fill="none" className="w-full h-full stroke-autumn-amber/35">
            {/* Streamlined horizontal wind gusts */}
            <path d="M 460 30 C 350 25, 200 45, 10 35" strokeWidth="2.5" strokeDasharray="14 8" strokeLinecap="round" />
            <path d="M 440 65 C 310 55, 180 75, 30 65" strokeWidth="2" strokeDasharray="10 6" strokeLinecap="round" />
            <path d="M 470 95 C 360 90, 220 100, 60 92" strokeWidth="1.6" strokeDasharray="16 10" strokeLinecap="round" />
          </svg>
        </motion.div>

        {/* Leaf Pile Mound Container positioned on the right */}
        <div 
          onClick={triggerWindGust}
          className="absolute right-4 sm:right-16 md:right-32 bottom-2 w-72 sm:w-80 h-28 pointer-events-auto cursor-pointer"
        >
          {/* Ground Contact Shadow beneath the pile */}
          <motion.div 
            style={{ scaleX: groundShadowScale, opacity: groundShadowOpacity }}
            className="absolute bottom-0 left-4 right-4 h-7 bg-autumn-deepbrown/40 rounded-full blur-md"
          />

          {/* Render all 42 individual leaves moving organically with distributed dispersion */}
          {LEAF_PILE_DATA.map((leaf) => (
            <LeafItem 
              key={`${leaf.id}-${gustCount}`}
              leaf={leaf}
              progress={smoothProgress}
              manualGust={manualGust}
            />
          ))}
        </div>

      </div>
    </section>
  );
}

// Sub-component for individual leaf animation
interface LeafItemProps {
  leaf: LeafData;
  progress: any;
  manualGust: boolean;
}

const LeafItem: React.FC<LeafItemProps> = ({ leaf, progress, manualGust }) => {
  // Individual leaf kinematics:
  // 1. Remains resting at baseX until its individual start threshold (startT)
  // 2. Lifts and flutters horizontally towards midX/midY at midT
  // 3. Widely disperses across the page towards finalX/finalY at endT
  // This breaks up any monolithic "block" motion and feels authentically like a gentle breeze scattering leaves across the landscape!
  const x = useTransform(
    progress,
    [0, leaf.startT, leaf.midT, leaf.endT],
    [leaf.baseX, leaf.baseX, leaf.baseX + leaf.midX, leaf.baseX + leaf.finalX]
  );

  const y = useTransform(
    progress,
    [0, leaf.startT, leaf.midT, leaf.endT],
    [-leaf.baseY, -leaf.baseY, -leaf.baseY + leaf.midY, -leaf.baseY + leaf.finalY]
  );

  const rotate = useTransform(
    progress,
    [0, leaf.startT, leaf.midT, leaf.endT],
    [leaf.baseRotate, leaf.baseRotate, leaf.baseRotate + leaf.rotMid, leaf.baseRotate + leaf.rotFinal]
  );

  const opacity = useTransform(
    progress,
    [0, leaf.endT * 0.75, leaf.endT * 0.92, leaf.endT],
    [0.95, 0.95, 0.55, 0.05]
  );

  const scale = useTransform(
    progress,
    [0, leaf.startT, leaf.midT, leaf.endT],
    [1, 1, 1.12, 0.82]
  );

  const renderContent = () => {
    if (leaf.type === 'chestnut') {
      return <ChestnutIcon className="w-full h-full" idSuffix={`pile_${leaf.id}`} />;
    }
    if (leaf.type === 'spiky_chestnut') {
      return <SpikyChestnutHuskIcon className="w-full h-full" idSuffix={`pile_husk_${leaf.id}`} />;
    }
    if (leaf.type === 'acorn') {
      return <AcornIcon className="w-full h-full" idSuffix={`pile_acorn_${leaf.id}`} />;
    }
    const LeafIcon = 
      leaf.type === 'maple' ? MapleLeaf : 
      leaf.type === 'oak' ? OakLeaf : 
      leaf.type === 'birch' ? BirchLeaf : GinkgoLeaf;
    return <LeafIcon color={leaf.color} className="w-full h-full" />;
  };

  // If manual gust is clicked, animate horizontally with organic staggered dispersion
  if (manualGust) {
    const delay = leaf.startT * 1.5;
    return (
      <motion.div
        className="absolute bottom-0 left-1/2 will-change-transform pointer-events-none drop-shadow-md"
        style={{ 
          zIndex: leaf.zIndex,
          width: leaf.size,
          height: leaf.size,
        }}
        initial={{
          x: leaf.baseX,
          y: -leaf.baseY,
          rotate: leaf.baseRotate,
          scale: 1,
          opacity: 0.95,
        }}
        animate={{
          x: [leaf.baseX, leaf.baseX + leaf.midX * 0.7, leaf.baseX + leaf.finalX, leaf.baseX],
          y: [-leaf.baseY, -leaf.baseY + leaf.midY, -leaf.baseY + leaf.finalY, -leaf.baseY],
          rotate: [leaf.baseRotate, leaf.baseRotate + leaf.rotMid * 0.7, leaf.baseRotate + leaf.rotFinal, leaf.baseRotate],
          opacity: [0.95, 1, 0.7, 0.95],
          scale: [1, 1.15, 0.85, 1],
        }}
        transition={{
          duration: 2.7,
          delay: delay,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {renderContent()}
      </motion.div>
    );
  }

  // Scroll-driven natural organic dispersion
  return (
    <motion.div
      className="absolute bottom-0 left-1/2 will-change-transform pointer-events-none drop-shadow-md hover:scale-110 transition-transform"
      style={{
        x,
        y,
        rotate,
        opacity,
        scale,
        zIndex: leaf.zIndex,
        width: leaf.size,
        height: leaf.size,
      }}
    >
      {renderContent()}
    </motion.div>
  );
};
