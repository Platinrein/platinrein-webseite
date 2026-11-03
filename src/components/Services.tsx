import { motion } from "motion/react";
import { Sparkles, Building2, Droplets, Footprints, Stethoscope, Store } from "lucide-react";

const services = [
  {
    id: "01",
    title: "Unterhaltsreinigung",
    description: "Regelmäßige Reinigung von Büros, Praxen und Gewerbeflächen nach festem Plan. In der Regel reinigt bei Ihnen immer dieselbe Person.",
    Icon: Building2
  },
  {
    id: "02",
    title: "Fensterreinigung",
    description: "Streifenfreie Fenster, Schaufenster und Glasfronten, innen und außen, inklusive Rahmen. Einmalig oder im festen Rhythmus.",
    Icon: Sparkles
  },
  {
    id: "03",
    title: "Treppenhausreinigung",
    description: "Saubere Treppenhäuser, Eingänge und Briefkastenanlagen für Wohn- und Geschäftshäuser. Kontaktflächen wie Klingel und Türgriffe inklusive.",
    Icon: Footprints
  },
  {
    id: "04",
    title: "Praxisreinigung",
    description: "Gründliche Reinigung von Arzt- und Therapiepraxen mit Blick auf Hygiene und Kontaktflächen, außerhalb Ihrer Sprechzeiten.",
    Icon: Stethoscope
  },
  {
    id: "05",
    title: "Filialreinigung",
    description: "Verkaufsräume, Theken und Schaufenster von Läden und Filialen. Abgestimmt auf Ihre Öffnungszeiten.",
    Icon: Store
  },
  {
    id: "06",
    title: "Grund- & Sonderreinigung",
    description: "Intensive Grundreinigung, zum Beispiel nach Auszug, vor der Übergabe oder einmal im Jahr. Auch Böden und schwer erreichbare Flächen.",
    Icon: Droplets
  }
];

export default function Services() {
  return (
    <section 
      id="dienstleistungen" 
      className="py-32 px-6 md:px-20 bg-studio border-t border-platinum/30 relative overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className="flex flex-col justify-center items-center mb-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <span className="text-[10px] uppercase tracking-[0.5em] text-charcoal/30 font-bold mb-4 block">
              Leistungen
            </span>
            <h2 className="text-4xl md:text-6xl font-light tracking-tighter leading-tight text-charcoal">
              Unsere <br/>
              <span className="italic font-serif text-charcoal/40">Leistungen.</span>
            </h2>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-platinum/20 border border-platinum/20 ">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              viewport={{ once: true }}
              className="group bg-studio p-8 sm:p-10 md:p-14 flex flex-col justify-between aspect-auto sm:aspect-square min-h-[300px] transition-all duration-700 relative overflow-hidden cursor-pointer"
            >
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-12">
                  <div className="text-charcoal/20 text-[9px] font-bold tracking-widest transition-colors uppercase">
                    {service.id}
                  </div>
                  <service.Icon 
                    size={28} 
                    strokeWidth={1} 
                    className="text-charcoal/20 group-hover:text-charcoal group-hover:scale-110 transition-all duration-500" 
                  />
                </div>
                <h3 className="text-2xl md:text-3xl font-light tracking-tight text-charcoal group-hover:translate-x-3 transition-transform duration-700">
                  {service.title}
                </h3>
                <p className="mt-6 text-charcoal/50 font-light text-sm leading-relaxed max-w-xs transition-colors group-hover:text-charcoal/80">
                  {service.description}
                </p>
              </div>
              

              <div className="relative z-10 pt-10 flex items-center justify-between">
                <div className="w-10 h-[1.5px] bg-gold/60 group-hover:w-[70%] transition-all duration-1000"></div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-charcoal opacity-0 group-hover:opacity-100 transition-all duration-700 translate-x-4 group-hover:translate-x-0">
                  Anfragen
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
