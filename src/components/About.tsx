import { motion } from "motion/react";
import { useSeason } from "../context/SeasonContext";

export default function About() {
  const { seasonConfig } = useSeason();

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.25,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  return (
    <section id="ueber-uns" className="relative py-32 px-6 md:px-20 overflow-hidden bg-studio">
      
      {/* Full-Bleed High-End Architectural Background Image */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none">
        <img 
          src={seasonConfig.aboutImage} 
          alt="Exklusives modernes Architektur-Foyer mit poliertem Boden und Glas" 
          className="w-full h-full object-cover object-center scale-105 transition-all duration-1000"
          referrerPolicy="no-referrer"
        />
        {/* Luxuriöse weiche Schatten & Verläufe zur Gewährleistung bester Lesbarkeit */}
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/90 via-charcoal/70 to-charcoal/30 lg:hidden"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/85 to-transparent hidden lg:block"></div>
        {/* Darkening bottom shade */}
        <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-charcoal/40 to-transparent"></div>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className="relative z-10 max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 text-white"
      >
        <motion.div 
          variants={itemVariants}
          className="lg:col-span-7 bg-charcoal/75 border border-white/10 shadow-2xl backdrop-blur-md lg:bg-transparent lg:border-none lg:shadow-none lg:backdrop-blur-none p-8 sm:p-10 md:p-0 rounded-lg"
        >
          <span className="text-[10px] uppercase tracking-[0.5em] text-white/50 font-bold mb-4 block">
            Vision & Werte
          </span>
          <h2 className="text-4xl md:text-6xl font-light tracking-tighter leading-tight text-white mb-8">
            Ein Standard, <br/>
            <span className="italic font-serif text-white/30">der bleibt.</span>
          </h2>
          <p className="text-lg text-white/80 font-light leading-relaxed max-w-lg mb-4">
            <span className="brand-name font-medium text-white">Platinrein</span> wurde mit einer klaren Mission gegründet: Gebäudeservice nicht nur als 
            Reinigung, sondern als konsequenten Werterhalt mit höchster Diskretion zu begreifen. 
          </p>
          <p className="text-base text-white/60 font-light leading-relaxed max-w-lg">
            Direkt aus Iserlohn agieren wir flexibel im gesamten Raum Nordrhein-Westfalen für Kunden, die Perfektion schätzen und keine materiellen Kompromisse eingehen.
          </p>
        </motion.div>
        
        <div className="lg:col-span-1"></div>
        
        <motion.div 
          variants={itemVariants}
          className="lg:col-span-4 flex items-center"
        >
          <div className="grid grid-cols-1 gap-8 w-full bg-charcoal/55 backdrop-blur-md p-8 rounded-lg border border-white/10 shadow-xl">
            {[
              { label: "Werterhalt & Diskretion", value: "100%" },
              { label: "Sorgfalt", value: "Maximal" },
              { label: "Standort", value: "Iserlohn" },
            ].map((stat, i) => (
              <motion.div 
                key={i} 
                whileHover={{ x: 6 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="border-l border-white/20 pl-6 py-2 cursor-default"
              >
                <p className="text-3xl font-light text-white mb-1 tracking-tight">{stat.value}</p>
                <p className="text-[9px] uppercase tracking-widest text-white/50 font-bold">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
