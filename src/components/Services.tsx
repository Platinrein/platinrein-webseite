import { motion } from "motion/react";

const services = [
  {
    id: "01",
    title: "Unterhaltsreinigung",
    description: "Kontinuierliche Pflege für Büros und Gewerbeflächen auf höchstem Niveau.",
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=2000"
  },
  {
    id: "02",
    title: "Industrie-Service",
    description: "Spezialisierte Lösungen für anspruchsvolle Fertigungsumgebungen.",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=2000"
  }
];

export default function Services() {
  return (
    <section id="dienstleistungen" className="py-24 px-10 md:px-20 bg-studio border-t border-platinum/30">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col justify-center items-center mb-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <span className="text-[10px] uppercase tracking-[0.5em] text-charcoal/30 font-bold mb-4 block">
              Selection
            </span>
            <h2 className="text-4xl md:text-5xl font-light tracking-tighter leading-tight text-charcoal">
              Präzision & <br/>
              <span className="italic font-serif text-charcoal/20">Handwerkskunst.</span>
            </h2>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`lg:col-span-1 p-8 border border-platinum/30 flex flex-col justify-between aspect-[1.1] group hover:bg-charcoal transition-all duration-700`}
            >
              <div>
                <div className="text-charcoal/20 text-[9px] font-bold tracking-widest mb-10 group-hover:text-white/20 transition-colors uppercase">
                  Service {service.id}
                </div>
                <h3 className="text-2xl font-light tracking-tight text-charcoal group-hover:text-white group-hover:translate-x-3 transition-all duration-700">
                  {service.title}
                </h3>
                <p className="mt-4 text-charcoal/40 font-light text-xs leading-relaxed group-hover:text-white/60 transition-colors">
                  {service.description}
                </p>
              </div>
              
              <div className="relative h-24 overflow-hidden rounded-sm grayscale group-hover:grayscale-0 transition-all duration-1000 opacity-20 group-hover:opacity-100">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover scale-150 group-hover:scale-100 transition-transform duration-1000"
                  referrerPolicy="no-referrer"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
