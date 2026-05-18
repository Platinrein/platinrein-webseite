import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function Impressum() {
  return (
    <div className="min-h-screen bg-studio py-24 md:py-32 px-6 md:px-20 font-sans">
      <div className="max-w-4xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-3 text-charcoal/40 hover:text-charcoal transition-colors mb-12 md:mb-16 group">
          <ArrowLeft size={16} />
          <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Zurück zur Startseite</span>
        </Link>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-7xl font-light tracking-tighter text-charcoal mb-4">
            Impressum.
          </h1>
          <p className="text-charcoal/40 text-[10px] md:text-sm uppercase tracking-widest mb-16 md:mb-24">Gesetzliche Anbieterkennung</p>
        </motion.div>
        
        <div className="space-y-16 md:space-y-20 text-charcoal/70 font-light leading-relaxed">
          <section className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">
            <div className="md:col-span-4">
              <h2 className="text-charcoal text-[10px] font-bold uppercase tracking-[0.4em] md:sticky md:top-32">
                Betreiber
              </h2>
            </div>
            <div className="md:col-span-8 space-y-4">
              <p className="text-charcoal font-medium text-lg">Platinrein Gebäudeservice</p>
              <p>
                Inhaber: Resul Gündüz<br />
                Letmather Str. 13<br />
                58644 Iserlohn<br/>
                Deutschland
              </p>
            </div>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 border-t border-platinum pt-16">
            <div className="md:col-span-4">
              <h2 className="text-charcoal text-[10px] font-bold uppercase tracking-[0.4em] md:sticky md:top-32">
                Kontakt
              </h2>
            </div>
            <div className="md:col-span-8 space-y-6">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] uppercase tracking-widest text-charcoal/30 font-bold">Telefon</span>
                <p className="text-charcoal">+49 156 78332769</p>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[10px] uppercase tracking-widest text-charcoal/30 font-bold">E-Mail</span>
                <p className="text-charcoal">info@platinrein.de</p>
              </div>
            </div>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 border-t border-platinum pt-16">
            <div className="md:col-span-4">
              <h2 className="text-charcoal text-[10px] font-bold uppercase tracking-[0.4em] md:sticky md:top-32">
                Informationen
              </h2>
            </div>
            <div className="md:col-span-8 space-y-8">
              <div>
                <h3 className="text-charcoal font-medium mb-2 uppercase text-[10px] tracking-widest">Verantwortlich</h3>
                <p>Inhaltlich verantwortlich nach § 55 Abs. 2 RStV: Resul Gündüz</p>
              </div>
            </div>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 border-t border-platinum pt-16">
            <div className="md:col-span-4">
              <h2 className="text-charcoal text-[10px] font-bold uppercase tracking-[0.4em] md:sticky md:top-32">
                Schlichtung
              </h2>
            </div>
            <div className="md:col-span-8">
              <p>
                Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: 
                <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" className="text-charcoal hover:underline ml-1 font-medium">
                  ec.europa.eu/consumers/odr/
                </a>.<br/>
                Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
              </p>
            </div>
          </section>
          <section className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 border-t border-platinum pt-16">
            <div className="md:col-span-4">
              <h2 className="text-charcoal text-[10px] font-bold uppercase tracking-[0.4em] md:sticky md:top-32">
                Disclaimer
              </h2>
            </div>
            <div className="md:col-span-8 space-y-8">
              <div>
                <h3 className="text-charcoal font-medium mb-2 uppercase text-[10px] tracking-widest">Haftung für Inhalte</h3>
                <p className="text-sm">Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.</p>
              </div>
              <div>
                <h3 className="text-charcoal font-medium mb-2 uppercase text-[10px] tracking-widest">Urheberrecht</h3>
                <p className="text-sm">Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
