import { motion, useScroll, useTransform } from "motion/react";
import { Sparkles, Building2, Paintbrush, Bed, Droplets, Waves } from "lucide-react";
import { useRef } from "react";

const services = [
  {
    id: "01",
    title: "Unterhaltsreinigung",
    description: "Sorgfältig getaktete Reinigungsintervalle durch fest zugeteiltes, diskretes Stammpersonal. Repräsentative Sauberkeit für Kanzleien, Praxen und Premium-Gewerbeflächen.",
    image: "https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?auto=format&fit=crop&q=80&w=1200",
    Icon: Building2
  },
  {
    id: "02",
    title: "Bauendreinigung",
    description: "Einzugsfertige Übergabe nach Neubau oder Sanierung. Rückstandsfreie Tiefenreinigung von empfindlichen Parkettböden, anspruchsvollem Feinsteinzeug und feinstem Baustaub.",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=1200",
    Icon: Paintbrush
  },
  {
    id: "03",
    title: "Glas- & Fensterreinigung",
    description: "Streifenfreie Klarheit für Fenster, raumhohe Glasfronten und Wintergärten. Präzise Handarbeit kombiniert mit besonders materialschonenden, sorgfältig selektierten Premium-Reinigungsmitteln.",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80&w=1200",
    Icon: Sparkles
  },
  {
    id: "04",
    title: "Hotel & Hospitality",
    description: "Diskretes Housekeeping und verlässliche Zimmerpflege auf Fünf-Sterne-Niveau. Luxuriöser Komfort und makellose Reinheit für anspruchsvolle Gästestrukturen.",
    image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&q=80&w=1200",
    Icon: Bed
  },
  {
    id: "05",
    title: "Sonderreinigung",
    description: "Maßgeschneiderte Spezialpflege und intensive Grundreinigungen. Werterhaltende Tiefenpflege für sensible Materialien und außergewöhnliche Oberflächen mit perfekt abgestimmten Produkten.",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=1200",
    Icon: Droplets
  }
];

export default function Services() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 45]);
  const rotateNeg = useTransform(rotate, (v) => -v);
  const rotateHalf = useTransform(rotate, (v) => v * 0.5);

  return (
    <section 
      ref={containerRef}
      id="dienstleistungen" 
      className="py-32 px-6 md:px-20 bg-studio border-t border-platinum/30 relative overflow-hidden"
    >
      {/* Floating Background Decorations */}
      <motion.div 
        style={{ y: y1, rotate }}
        className="absolute top-20 md:top-40 right-[-15%] md:right-[-10%] text-charcoal/[0.03] pointer-events-none z-0 hidden md:block"
      >
        <Droplets className="w-64 h-64 md:w-[450px] md:h-[450px]" strokeWidth={0.5} />
      </motion.div>
      <motion.div 
        style={{ y: y2, rotate: rotateNeg }}
        className="absolute bottom-10 md:bottom-20 left-[-10%] md:left-[-5%] text-charcoal/[0.03] pointer-events-none z-0 hidden md:block"
      >
        <Waves className="w-64 h-64 md:w-[500px] md:h-[500px]" strokeWidth={0.5} />
      </motion.div>
      <motion.div 
        style={{ y: y1, rotate: rotateHalf }}
        className="absolute top-1/2 left-[10%] md:left-[15%] text-charcoal/[0.02] pointer-events-none z-0 hidden lg:block"
      >
        <Sparkles className="w-32 h-32 md:w-[250px] md:h-[250px]" strokeWidth={0.5} />
      </motion.div>

      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className="flex flex-col justify-center items-center mb-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <span className="text-[10px] uppercase tracking-[0.5em] text-charcoal/30 font-bold mb-4 block">
              Portfolio
            </span>
            <h2 className="text-4xl md:text-6xl font-light tracking-tighter leading-tight text-charcoal">
              Exzellenz in <br/>
              <span className="italic font-serif text-charcoal/20">jedem Detail.</span>
            </h2>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-platinum/20 border border-platinum/20 shadow-2xl">
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
              
              <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                {/* Responsive luxury image: Subtle elegant visibility, fading in with color on touch, tap or hover */}
                <img 
                  src={service.image} 
                  alt="" 
                  className="w-full h-full object-cover opacity-[0.08] group-hover:opacity-[0.30] group-active:opacity-[0.40] scale-105 group-hover:scale-100 group-active:scale-100 transition-all duration-[800ms] ease-out shadow-inner"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
              </div>

              <div className="relative z-10 pt-10 flex items-center justify-between">
                <div className="w-10 h-[1.5px] bg-platinum group-hover:w-[70%] transition-all duration-1000"></div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-charcoal opacity-0 group-hover:opacity-100 transition-all duration-700 translate-x-4 group-hover:translate-x-0">
                  EXKLUSIV
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
