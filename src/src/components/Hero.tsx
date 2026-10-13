import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowRight, Sparkles, Droplets, Sun, Leaf } from "lucide-react";
import { useSeason } from "../context/SeasonContext";
import { ChestnutIcon } from "./ChestnutIcons";

export default function Hero() {
  const { season, seasonConfig } = useSeason();

  const floatingElements = [
    { Icon: Leaf, color: "text-amber-600/20" },
    { Icon: Sparkles, color: "text-amber-500/20" },
    { Icon: Sun, color: "text-amber-600/15" },
    { Icon: Droplets, color: "text-amber-700/15" },
    { Icon: Sparkles, color: "text-yellow-600/20" },
    { Icon: Leaf, color: "text-amber-700/20" },
  ];

  return (
    <section id="top" className="relative min-h-screen w-full flex flex-col pt-20 md:pt-32 px-6 md:px-20 pb-20 overflow-hidden bg-studio">
      
      {/* Full-Bleed Luxurious Seasonal Background Image */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
        <img 
          src={seasonConfig.heroImage} 
          alt="Modernes Luxusgebäude mit makellosen raumhohen Glasfronten im goldenen Herbst" 
          className="absolute inset-0 w-full h-full object-cover object-center scale-105 duration-1000 ease-in-out"
          referrerPolicy="no-referrer"
        />
        {/* Soft, professional gradient overlays ensuring both text readability and vibrant autumn imagery */}
        <div className="absolute inset-0 bg-gradient-to-r from-studio via-studio/85 to-studio/30 lg:hidden z-[1]"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-studio via-studio/65 md:via-studio/45 to-transparent hidden lg:block z-[1]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-studio/70 z-[1]"></div>
        
        {/* Warm autumn golden hour ambient glow on top-right */}
        {season === 'autumn' && (
          <div className="absolute top-0 right-0 w-full h-[65%] lg:w-[65%] bg-gradient-to-bl from-autumn-gold/25 via-autumn-amber/15 to-transparent mix-blend-screen z-[1]"></div>
        )}
      </div>

      {/* Floating Sparkles, Warm Sunbeams & Droplets */}
      {floatingElements.map((element, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: [0, 0.45, 0],
            y: [0, -80, 0],
            scale: [0.7, 1.25, 0.7],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            delay: i * 1.5,
            ease: "easeInOut"
          }}
          className={`absolute ${element.color} pointer-events-none hidden md:block z-[2]`}
          style={{
            top: `${20 + i * 10}%`,
            left: `${10 + (i * 20) % 65}%`,
          }}
        >
          <element.Icon size={20 + i * 4} strokeWidth={1} />
        </motion.div>
      ))}

      {/* Hero Layout */}
      <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 items-center gap-10 my-auto">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-8 p-0"
        >
          <div className="mb-6 md:mb-8 flex flex-wrap items-center gap-3">
            <span className="brand-name text-[11px] uppercase tracking-[0.25em] text-charcoal/60 font-bold inline-block whitespace-nowrap select-none">
              Platinrein Gebäudeservice
            </span>
            <span className="inline-flex items-center gap-1.5 text-[9px] uppercase tracking-widest px-2.5 py-0.5 bg-autumn-gold/15 text-autumn-deepbrown border border-autumn-amber/30 font-bold">
              {season === 'autumn' && <ChestnutIcon className="w-3.5 h-3.5 inline-block shrink-0" idSuffix="hero_badge" />}
              <span>{seasonConfig.accentBadge}</span>
            </span>
          </div>
          
          <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-light tracking-tighter leading-tight sm:leading-[0.85] mb-8 text-charcoal">
            {seasonConfig.headlineLead} <br/>
            <span className="italic font-serif text-charcoal/25">{seasonConfig.headlineAccent}</span>
          </h1>
          
          <div className="mt-8 md:mt-10 space-y-10">
            <p className="max-w-md text-charcoal/75 text-base md:text-lg font-light leading-relaxed">
              {seasonConfig.description}
            </p>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8 md:gap-12 pt-4">
              <Link
                to="/#kontakt"
                className="group flex items-center gap-4 cursor-pointer"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-14 h-14 bg-charcoal rounded-full flex items-center justify-center text-white shadow-lg shadow-charcoal/10"
                >
                  <motion.div
                    initial={{ rotate: 0 }}
                    animate={{ rotate: 0 }}
                    whileHover={{ rotate: 45 }}
                    whileTap={{ rotate: 45 }}
                    whileInView={{ rotate: 45 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  >
                    <ArrowRight size={22} />
                  </motion.div>
                </motion.div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-charcoal group-hover:text-charcoal/70 transition-colors">
                    Herbst-Anfrage starten
                  </span>
                  <span className="text-[9px] uppercase tracking-[0.2em] text-charcoal/40">
                    Kostenloses Erstgespräch & Vor-Ort-Check
                  </span>
                </div>
              </Link>

              <a
                href="#dienstleistungen"
                className="group flex items-center gap-2 py-4 text-[10px] font-bold uppercase tracking-[0.35em] text-autumn-copper hover:text-charcoal transition-all relative font-medium"
              >
                <span>Leistungen entdecken</span>
                <span className="absolute bottom-3 left-0 w-0 h-[1.5px] bg-autumn-copper transition-all duration-500 group-hover:w-full"></span>
              </a>

              <div className="flex items-center gap-8 border-t sm:border-t-0 sm:border-l border-charcoal/20 pt-6 sm:pt-0 pl-0 sm:pl-10 text-charcoal w-full sm:w-auto mt-4 sm:mt-0">
                <div className="flex flex-col">
                  <span className="text-sm font-bold tracking-tight text-charcoal leading-none mb-1">100%</span>
                  <span className="text-[9px] uppercase tracking-[0.2em] font-extrabold text-charcoal/85">Diskretion</span>
                </div>
                <div className="flex flex-col border-l border-charcoal/25 pl-6">
                  <span className="text-sm font-bold tracking-tight text-charcoal leading-none mb-1">Lückenlos</span>
                  <span className="text-[9px] uppercase tracking-[0.2em] font-extrabold text-charcoal/85">Werterhalt</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Minimalist Seasonal Card on Right (Desktop only) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="hidden lg:flex lg:col-span-4 flex-col justify-end"
        >
          <div className="bg-white/80 backdrop-blur-md p-6 border border-white/60 shadow-xl self-end max-w-xs">
            <div className="flex items-center justify-between mb-3 border-b border-platinum/40 pb-2">
              <span className="text-[9px] uppercase tracking-widest text-amber-800 font-bold">
                🍂 Herbst-Atmosphäre
              </span>
              <span className="text-[9px] text-charcoal/40 font-mono">Iserlohn / NRW</span>
            </div>
            <p className="text-xs text-charcoal/80 font-light leading-relaxed mb-3">
              Goldenes Licht, kristallklare Glasflächen und meisterhafte Sauberkeit für anspruchsvolle Immobilien.
            </p>
            <a 
              href="#dienstleistungen" 
              className="text-[10px] font-bold uppercase tracking-wider text-charcoal hover:text-amber-800 transition-colors flex items-center gap-1.5"
            >
              <span>Zu den Leistungen</span>
              <ArrowRight size={12} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
