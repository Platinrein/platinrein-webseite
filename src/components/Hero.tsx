import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section id="top" className="relative min-h-[calc(100vh-6rem)] w-full flex items-center px-10 md:px-20 pb-20 overflow-hidden bg-studio">
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
          <span className="text-[10px] uppercase tracking-[0.5em] mb-6 block text-charcoal/30 font-bold">
            Pure Craftsmanship
          </span>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-light tracking-tighter leading-[0.85] mb-10 text-charcoal">
            Pure <br/>
            <span className="italic font-serif text-charcoal/20">Aesthetics.</span>
          </h1>
          
          <div className="mt-12 space-y-12">
            <p className="max-w-md text-charcoal/50 text-lg font-light leading-relaxed">
              Wir definieren Sauberkeit als Kunstform. 
              Platinrein bietet exklusiven Gebäudeservice für Räume, 
              die Perfektion atmen.
            </p>
            
            <div className="flex flex-col md:flex-row items-start md:items-center gap-12">
              <motion.div
                whileHover={{ scale: 1.05 }}
              >
                <Link
                  to="/#kontakt"
                  className="group flex items-center gap-4 cursor-pointer"
                >
                  <div className="w-12 h-12 bg-charcoal rounded-full flex items-center justify-center text-white transition-transform group-hover:rotate-45">
                    <ArrowRight size={20} />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-charcoal">Anfrage starten</span>
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="hidden lg:block lg:col-span-4"
        >
          <div className="aspect-[3/4] rounded-sm overflow-hidden shadow-2xl grayscale hover:grayscale-0 transition-all duration-1000">
            <img 
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2069" 
              className="w-full h-full object-cover" 
              alt="Architecture"
              referrerPolicy="no-referrer"
            />
          </div>
        </motion.div>
      </div>

      {/* Floating Indicators */}
      <div className="absolute bottom-8 left-10 md:left-20 flex items-center gap-8 text-[10px] font-bold uppercase tracking-[0.3em] text-charcoal/20">
        <span>Scrollexperience</span>
        <div className="w-20 h-[1px] bg-charcoal/10"></div>
      </div>
    </section>
  );
}
