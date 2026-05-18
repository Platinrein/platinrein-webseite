import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowRight, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section id="top" className="relative min-h-screen w-full flex flex-col pt-24 md:pt-40 px-6 md:px-20 pb-20 overflow-hidden bg-studio">
      {/* Floating Sparkles (Cleaning Vibe) */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: [0, 0.15, 0],
            y: [0, -40, 0],
            scale: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 5 + i * 2,
            repeat: Infinity,
            delay: i * 1.5,
            ease: "easeInOut"
          }}
          className="absolute text-charcoal pointer-events-none hidden md:block"
          style={{
            top: `${20 + i * 15}%`,
            left: `${10 + (i * 17) % 80}%`,
          }}
        >
          <Sparkles size={16 + i * 4} strokeWidth={1} />
        </motion.div>
      ))}

      {/* Background Decorative Blur */}
      <div className="absolute top-[-15%] right-[-10%] w-[800px] h-[800px] bg-platinum/30 rounded-full blur-[150px] pointer-events-none"></div>

      {/* Hero Layout */}
      <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 items-center gap-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-8"
        >
          <div className="mb-8">
            <span className="text-[10px] uppercase tracking-[0.5em] text-charcoal/30 font-bold flex items-center gap-3">
              <span className="w-8 h-[1px] bg-charcoal/10"></span>
              Platinrein Gebäudeservice
            </span>
          </div>
          
          <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-light tracking-tighter leading-[0.85] mb-10 text-charcoal">
            Pure <br/>
            <span className="italic font-serif text-charcoal/20">Ästhetik.</span>
          </h1>
          
          <div className="mt-12 space-y-12">
            <p className="max-w-md text-charcoal/50 text-lg md:text-xl font-light leading-relaxed">
              Wir definieren Sauberkeit als Kunstform. 
              Platinrein bietet exklusiven Gebäudeservice für Räume, 
              die Perfektion atmen.
            </p>
            
            <div className="flex flex-col sm:flex-row items-start md:items-center gap-12 pt-6">
              <Link
                to="/#kontakt"
                className="group flex items-center gap-4 cursor-pointer"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-14 h-14 bg-charcoal rounded-full flex items-center justify-center text-white"
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
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-charcoal">Anfrage starten</span>
                  <span className="text-[9px] uppercase tracking-[0.2em] text-charcoal/30">Kostenloses Erstgespräch</span>
                </div>
              </Link>

              <div className="flex items-center gap-4 opacity-30 grayscale pointer-events-none hidden sm:flex">
                <div className="flex flex-col border-l border-charcoal/20 pl-6">
                  <span className="text-xs font-bold leading-none mb-1">100%</span>
                  <span className="text-[8px] uppercase tracking-widest font-bold">Qualität</span>
                </div>
                <div className="flex flex-col border-l border-charcoal/20 pl-6">
                  <span className="text-xs font-bold leading-none mb-1">24/7</span>
                  <span className="text-[8px] uppercase tracking-widest font-bold">Support</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="hidden lg:block lg:col-span-4"
        >
          <div className="aspect-[3/4] rounded-sm overflow-hidden shadow-2xl grayscale hover:grayscale-0 transition-all duration-1000 relative">
            <img 
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2069" 
              className="w-full h-full object-cover" 
              alt="Architecture"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-charcoal/5 mix-blend-multiply"></div>
          </div>
        </motion.div>
      </div>

      {/* Floating Indicators */}
      <div className="absolute bottom-8 left-6 md:left-20 flex items-center gap-8 text-[10px] font-bold uppercase tracking-[0.3em] text-charcoal/20">
        <span>Scrollen zum Entdecken</span>
        <div className="w-20 h-[1px] bg-charcoal/10"></div>
      </div>
    </section>
  );
}
