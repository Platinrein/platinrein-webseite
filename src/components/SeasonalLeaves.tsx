import React, { useMemo } from "react";
import { motion } from "motion/react";
import { useSeason } from "../context/SeasonContext";
import { ChestnutIcon, SpikyChestnutHuskIcon, AcornIcon } from "./ChestnutIcons";

// Realistic Autumn Leaf Shapes for the whole page shower
const MapleLeafIcon = ({ className = "w-6 h-6", color = "currentColor" }: { className?: string; color?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill={color} 
    className={className}
    aria-hidden="true"
  >
    <path d="M12 1.5L13.8 6.5L17.2 5.2L16.5 8.8L21 8.8L18.8 12.2L22 15L18.2 16.2L19.2 20L15.5 19L13.8 22.8L12.7 19L12 23.5H11.2L10.5 19L9.4 22.8L7.7 19L4 20L5 16.2L1.2 15L4.4 12.2L2.2 8.8L6.7 8.8L6 5.2L9.4 6.5L11.2 1.5H12Z" />
    <path d="M12 9V22" stroke="rgba(0,0,0,0.18)" strokeWidth="0.8" />
  </svg>
);

const OakLeafIcon = ({ className = "w-6 h-6", color = "currentColor" }: { className?: string; color?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill={color} 
    className={className}
    aria-hidden="true"
  >
    <path d="M12 2C10.2 3.6 8.5 5.8 8.5 8.5C6.8 8 5.2 9.5 5.8 11.2C4.5 12.2 4.5 14.5 6 15.5C5 17 6.5 19 8.2 18.5C8.8 20.2 10.5 21.5 12 22.5C13.5 21.5 15.2 20.2 15.8 18.5C17.5 19 19 17 18 15.5C19.5 14.5 19.5 12.2 18.2 11.2C18.8 9.5 17.2 8 15.5 8.5C15.5 5.8 13.8 3.6 12 2Z" />
    <path d="M12 6V21" stroke="rgba(0,0,0,0.18)" strokeWidth="0.8" />
  </svg>
);

const BirchLeafIcon = ({ className = "w-6 h-6", color = "currentColor" }: { className?: string; color?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill={color} 
    className={className}
    aria-hidden="true"
  >
    <path d="M12 2C12 2 19 8.5 19 14.5C19 18 16 21 12 22.5C8 21 5 18 5 14.5C5 8.5 12 2 12 2Z" />
    <path d="M12 7V21" stroke="rgba(0,0,0,0.18)" strokeWidth="0.8" />
  </svg>
);

const GinkgoLeafIcon = ({ className = "w-6 h-6", color = "currentColor" }: { className?: string; color?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill={color} 
    className={className}
    aria-hidden="true"
  >
    <path d="M12 21C12 18 11.5 14 11.5 14C6 13.5 2 9.5 2 6C2 5.5 2.5 5 3.5 5C6.5 5 9.5 8 11.5 9.5C11.8 7 12.2 7 12.5 9.5C14.5 8 17.5 5 20.5 5C21.5 5 22 5.5 22 6C22 9.5 18 13.5 12.5 14C12.5 14 12 18 12 21Z" />
  </svg>
);

interface FallingItemConfig {
  id: number;
  type: 'maple' | 'oak' | 'birch' | 'ginkgo' | 'chestnut' | 'spiky_chestnut' | 'acorn';
  color?: string;
  size: number;
  left: string;
  delay: number;
  duration: number;
  swayX: number;
  maxRotate: number;
  baseOpacity: number;
}

export default function SeasonalLeaves() {
  const { season } = useSeason();

  // Natural distribution of falling leaves & tumbling chestnuts across the full width of the screen
  const items: FallingItemConfig[] = useMemo(() => [
    // Leaves
    { id: 1, type: 'maple', color: '#d97706', size: 26, left: "4%", delay: 0, duration: 17, swayX: 70, maxRotate: 240, baseOpacity: 0.55 },
    { id: 2, type: 'oak', color: '#c2410c', size: 22, left: "12%", delay: 4.5, duration: 21, swayX: -55, maxRotate: 190, baseOpacity: 0.45 },
    { id: 3, type: 'birch', color: '#e5a93b', size: 19, left: "21%", delay: 8, duration: 15, swayX: 65, maxRotate: 310, baseOpacity: 0.6 },
    { id: 4, type: 'ginkgo', color: '#eab308', size: 23, left: "31%", delay: 2, duration: 19, swayX: -60, maxRotate: 180, baseOpacity: 0.5 },
    { id: 5, type: 'maple', color: '#b45309', size: 28, left: "41%", delay: 11, duration: 23, swayX: 80, maxRotate: -270, baseOpacity: 0.4 },
    { id: 6, type: 'oak', color: '#ea580c', size: 24, left: "50%", delay: 3.5, duration: 18, swayX: -75, maxRotate: 220, baseOpacity: 0.5 },
    { id: 7, type: 'birch', color: '#d97706', size: 18, left: "59%", delay: 9.5, duration: 16, swayX: 50, maxRotate: 290, baseOpacity: 0.55 },
    { id: 8, type: 'ginkgo', color: '#ca8a04', size: 21, left: "68%", delay: 1.5, duration: 20, swayX: -65, maxRotate: -200, baseOpacity: 0.45 },
    { id: 9, type: 'maple', color: '#991b1b', size: 25, left: "77%", delay: 7, duration: 22, swayX: 70, maxRotate: 260, baseOpacity: 0.5 },
    { id: 10, type: 'oak', color: '#7c2d12', size: 22, left: "86%", delay: 12.5, duration: 19, swayX: -50, maxRotate: 180, baseOpacity: 0.4 },
    { id: 11, type: 'birch', color: '#e5a93b', size: 20, left: "94%", delay: 5.5, duration: 17, swayX: 60, maxRotate: 300, baseOpacity: 0.55 },
    { id: 12, type: 'maple', color: '#ea580c', size: 23, left: "16%", delay: 14, duration: 24, swayX: 85, maxRotate: 210, baseOpacity: 0.45 },
    { id: 13, type: 'ginkgo', color: '#eab308', size: 20, left: "46%", delay: 16, duration: 18, swayX: -70, maxRotate: -190, baseOpacity: 0.5 },
    { id: 14, type: 'oak', color: '#b45309', size: 24, left: "81%", delay: 13, duration: 20, swayX: 55, maxRotate: 250, baseOpacity: 0.45 },

    // Tumbling Chestnuts & Acorns falling across the full website!
    { id: 15, type: 'chestnut', size: 22, left: "8%", delay: 3, duration: 16, swayX: 35, maxRotate: 270, baseOpacity: 0.75 },
    { id: 16, type: 'spiky_chestnut', size: 26, left: "26%", delay: 10, duration: 18, swayX: -40, maxRotate: 190, baseOpacity: 0.70 },
    { id: 17, type: 'chestnut', size: 20, left: "37%", delay: 15, duration: 15, swayX: 30, maxRotate: -240, baseOpacity: 0.80 },
    { id: 18, type: 'acorn', size: 21, left: "54%", delay: 6.5, duration: 17, swayX: -35, maxRotate: 310, baseOpacity: 0.75 },
    { id: 19, type: 'chestnut', size: 23, left: "64%", delay: 1.2, duration: 16.5, swayX: 42, maxRotate: 220, baseOpacity: 0.78 },
    { id: 20, type: 'spiky_chestnut', size: 27, left: "74%", delay: 8.5, duration: 19, swayX: -45, maxRotate: -180, baseOpacity: 0.70 },
    { id: 21, type: 'chestnut', size: 19, left: "91%", delay: 12, duration: 14.5, swayX: 28, maxRotate: 340, baseOpacity: 0.82 },
  ], []);

  if (season !== 'autumn') {
    return null;
  }

  return (
    // Fixed viewport overlay covering the ENTIRE page smoothly while user scrolls
    <div 
      className="fixed inset-0 pointer-events-none overflow-hidden z-[15] select-none"
      aria-hidden="true"
    >
      {items.map((item) => {
        return (
          <motion.div
            key={item.id}
            initial={{ 
              y: "-10vh", 
              x: 0, 
              rotate: 0, 
              opacity: 0 
            }}
            animate={{
              y: ["-8vh", "112vh"],
              x: [
                0, 
                item.swayX * 0.7, 
                -item.swayX, 
                item.swayX * 1.1, 
                -item.swayX * 0.4, 
                item.swayX * 0.8
              ],
              rotate: [0, item.maxRotate * 0.35, -item.maxRotate * 0.25, item.maxRotate * 0.7, item.maxRotate],
              opacity: [
                0, 
                item.baseOpacity, 
                item.baseOpacity * 1.15, 
                item.baseOpacity, 
                item.baseOpacity * 0.7, 
                0
              ],
            }}
            transition={{
              duration: item.duration,
              repeat: Infinity,
              delay: item.delay,
              ease: "easeInOut",
            }}
            className="absolute will-change-transform drop-shadow-xs"
            style={{ 
              left: item.left,
              width: item.size,
              height: item.size,
            }}
          >
            {item.type === 'maple' && <MapleLeafIcon className="w-full h-full" color={item.color} />}
            {item.type === 'oak' && <OakLeafIcon className="w-full h-full" color={item.color} />}
            {item.type === 'birch' && <BirchLeafIcon className="w-full h-full" color={item.color} />}
            {item.type === 'ginkgo' && <GinkgoLeafIcon className="w-full h-full" color={item.color} />}
            {item.type === 'chestnut' && <ChestnutIcon className="w-full h-full" idSuffix={`fall_${item.id}`} />}
            {item.type === 'spiky_chestnut' && <SpikyChestnutHuskIcon className="w-full h-full" idSuffix={`fall_husk_${item.id}`} />}
            {item.type === 'acorn' && <AcornIcon className="w-full h-full" idSuffix={`fall_acorn_${item.id}`} />}
          </motion.div>
        );
      })}
    </div>
  );
}
