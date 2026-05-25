import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowRight, Sparkles, Droplets, Sun } from "lucide-react";

export default function Hero() {
  const floatingElements = [
    { Icon: Sparkles, color: "text-amber-500/15" },
    { Icon: Droplets, color: "text-blue-500/15" },
    { Icon: Sun, color: "text-amber-500/10" },
    { Icon: Sparkles, color: "text-charcoal/5" },
    { Icon: Droplets, color: "text-cyan-500/15" },
    { Icon: Sun, color: "text-amber-500/10" },
  ];

  return (
    <section id="top" className="relative min-h-screen w-full flex flex-col pt-20 md:pt-32 px-6 md:px-20 pb-20 overflow-hidden bg-studio">
      
      {/* Full-Bleed Luxurious Background Image */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1513584684374-8bab748fbf90?auto=format&fit=crop&q=80&w=2200" 
          alt="Realistisches luxuriöses Wohnhaus im modernen Bauhausstil in Deutschland" 
          className="absolute inset-0 w-full h-full object-cover object-center scale-105 duration-1000 ease-in-out"
          referrerPolicy="no-referrer"
        />
        {/* Soft, professional gradient overlays to guarantee pristine dark-on-light text readability */}
        {/* Responsive layout: More prominent blend-overlay on mobile, perfectly fading to pure clarity on desktop */}
        <div className="absolute inset-0 bg-gradient-to-r from-studio via-studio/95 to-studio/40 lg:hidden z-[1]"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-studio via-studio/85 md:via-studio/60 to-transparent hidden lg:block z-[1]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-studio/50 via-transparent to-studio md:hidden z-[1]"></div>
        
        {/* Sunbeam ambient glow on top-right */}
        <div className="absolute top-0 right-0 w-full h-[60%] lg:w-[60%] bg-gradient-to-bl from-amber-300/10 via-transparent to-transparent mix-blend-screen z-[1]"></div>
      </div>

      {/* Floating Sparkles, Droplets and Sunbeams (Warm Fresh Vibe) */}
      {floatingElements.map((element, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: [0, 0.35, 0],
            y: [0, -80, 0],
            scale: [0.6, 1.3, 0.6],
          }}
          transition={{
            duration: 7 + i * 2,
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
          <element.Icon size={20 + i * 4} strokeWidth={0.8} />
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
          <div className="mb-6 md:mb-8">
            <span className="text-[10px] uppercase tracking-[0.5em] text-charcoal/40 font-bold flex items-center gap-3">
              <span className="w-8 h-[1px] bg-charcoal/20"></span>
              Platinrein Premium-Gebäudeservice
            </span>
          </div>
          
          <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-light tracking-tighter leading-tight sm:leading-[0.85] mb-8 text-charcoal">
            Pure <br/>
            <span className="italic font-serif text-charcoal/20">Ästhetik.</span>
          </h1>
          
          <div className="mt-8 md:mt-10 space-y-10">
            <p className="max-w-md text-charcoal/70 text-base md:text-lg font-light leading-relaxed">
              Wir definieren Sauberkeit als Wertschutz. Platinrein bietet diskreten, erstklassigen Gebäudeservice für anspruchsvolle Privathäuser, exklusive Bauprojekte und stilbewusste Gewerbeimmobilien.
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
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-charcoal group-hover:text-charcoal/70 transition-colors">Anfrage starten</span>
                  <span className="text-[9px] uppercase tracking-[0.2em] text-charcoal/30">Kostenloses Erstgespräch</span>
                </div>
              </Link>

              <a
                href="#dienstleistungen"
                className="group flex items-center gap-3 py-4 text-[10px] font-bold uppercase tracking-[0.4em] text-charcoal/50 hover:text-charcoal transition-all relative"
              >
                Als Standard definiert
                <span className="absolute bottom-3 left-0 w-0 h-[1.5px] bg-charcoal transition-all duration-500 group-hover:w-full"></span>
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
      </div>

      {/* Floating Indicators */}
      <div className="absolute bottom-8 left-6 md:left-20 flex items-center gap-8 text-[10px] font-bold uppercase tracking-[0.3em] text-charcoal/20 z-10 hidden sm:flex">
        <span>Präzision im Fokus</span>
        <div className="w-20 h-[1px] bg-charcoal/15 relative overflow-hidden">
          <motion.div 
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 left-0 w-1/2 h-full bg-charcoal/40"
          />
        </div>
      </div>
    </section>
  );
}
