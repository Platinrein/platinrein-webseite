import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import heroImage from "../assets/images/hero_luxury_building_1791206927412.jpg";

// Saisonaler Hinweis im Kopfbereich. Für eine neutrale Seite einfach auf null setzen.
const seasonNote: { badge: string; text: string } | null = {
  badge: "Winter 2026/27",
  text: "Nässe, Streusalz und kurze Tage: Wir halten Eingänge, Böden und Glasflächen auch im Winter sauber.",
};

export default function Hero() {
  return (
    <section id="top" className="relative min-h-[92vh] w-full flex flex-col pt-28 md:pt-36 px-6 md:px-20 pb-20 overflow-hidden bg-frost">
      <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
        <img
          src={heroImage}
          alt="Modernes Gebäude mit großen, sauberen Glasflächen"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-frost via-frost/90 to-frost/40 lg:via-frost/80 lg:to-transparent" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto my-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl"
        >
          <div className="mb-8 flex flex-wrap items-center gap-3">
            <span className="brand-name text-[11px] uppercase tracking-[0.25em] text-charcoal/60 font-semibold">
              Platinrein Gebäudeservice
            </span>
            {seasonNote && (
              <span className="text-[10px] uppercase tracking-widest px-2.5 py-0.5 border border-charcoal/15 text-charcoal/70">
                {seasonNote.badge}
              </span>
            )}
          </div>

          <h1 className="text-[2.6rem] sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-tight leading-[0.95] mb-8 text-charcoal">
            Gebäudereinigung <br />
            <span className="font-serif italic font-normal text-charcoal/40">in Iserlohn.</span>
          </h1>

          <p className="max-w-lg text-charcoal/70 text-base md:text-lg leading-relaxed">
            Unterhalts-, Fenster-, Treppenhaus- und Praxisreinigung für Gewerbe und Privat im Märkischen Kreis.
            Zuverlässig, gründlich und mit eigenem Material.
          </p>
          {seasonNote && (
            <p className="max-w-lg mt-4 text-charcoal/50 text-sm leading-relaxed">{seasonNote.text}</p>
          )}

          <div className="mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-8">
            <Link to="/#kontakt" className="group inline-flex items-center gap-4">
              <span className="w-12 h-12 bg-charcoal rounded-full flex items-center justify-center text-white transition-transform group-hover:translate-x-1">
                <ArrowRight size={20} />
              </span>
              <span className="flex flex-col">
                <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-charcoal">Angebot anfragen</span>
                <span className="text-[10px] uppercase tracking-[0.15em] text-charcoal/45">Kostenlose Besichtigung vor Ort</span>
              </span>
            </Link>
            <a
              href="#dienstleistungen"
              className="text-[11px] font-semibold uppercase tracking-[0.25em] text-charcoal/60 hover:text-charcoal border-b border-gold pb-1 transition-colors"
            >
              Leistungen ansehen
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
