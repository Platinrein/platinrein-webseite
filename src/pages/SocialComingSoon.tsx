import React from "react";
import { motion } from "motion/react";
import { Instagram, Twitter, Music2, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function SocialComingSoon() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-8 relative overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-platinum/30 rounded-full blur-3xl opacity-50"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-platinum/30 rounded-full blur-3xl opacity-50"></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl w-full text-center relative z-10"
      >
        <div className="mb-12">
          <div className="w-20 h-20 bg-charcoal text-white rounded-full flex items-center justify-center mx-auto mb-8">
            <span className="text-2xl font-light tracking-tighter">PR</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-light text-charcoal mb-6 tracking-tight">
            Platinrein <span className="font-medium italic">Social Media</span>
          </h1>
          <p className="text-charcoal/60 text-lg max-w-md mx-auto font-light leading-relaxed">
            Wir bauen unsere digitale Präsenz gerade für Sie auf. Hier finden Sie bald exklusive Einblicke in unsere Projekte und Dienstleistungen.
          </p>
        </div>

        <div className="flex justify-center gap-8 mb-16">
          {[
            { Icon: Instagram, label: "Instagram" },
            { Icon: Twitter, label: "Twitter" },
            { Icon: Music2, label: "TikTok" }
          ].map((item, i) => (
            <Link 
              key={i}
              to="/social-bald"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex flex-col items-center gap-2 opacity-30 hover:opacity-60 transition-opacity grayscale hover:grayscale-0"
            >
              <item.Icon size={32} />
              <span className="text-[10px] uppercase tracking-widest font-bold">{item.label}</span>
            </Link>
          ))}
        </div>

        <div className="inline-block p-1 bg-platinum/20 rounded-full">
          <div className="px-6 py-2 border border-charcoal/10 rounded-full">
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-charcoal/40">In Bearbeitung</span>
          </div>
        </div>

        <div className="mt-20">
          <Link 
            to="/" 
            className="inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.4em] text-charcoal opacity-60 hover:opacity-100 transition-all group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Zurück zur Startseite
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
