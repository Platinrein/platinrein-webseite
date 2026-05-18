import { motion, useScroll, useTransform } from "motion/react";
import { Sparkles, Building2, Factory, Bed, Droplets, Waves } from "lucide-react";
import { useRef } from "react";

const services = [
  {
    id: "01",
    title: "Unterhaltsreinigung",
    description: "Kontinuierliche Pflege für Büros und Gewerbeflächen auf höchstem Niveau.",
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=2000",
    Icon: Building2
  },
  {
    id: "02",
    title: "Industrie-Service",
    description: "Spezialisierte Lösungen für anspruchsvolle Fertigungsumgebungen.",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=2000",
    Icon: Factory
  },
  {
    id: "03",
    title: "Glasreinigung",
    description: "Streifenfreier Glanz für Fensterflächen und Glasfronten jeder Dimension.",
    image: "https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?auto=format&fit=crop&q=80&w=2000",
    Icon: Sparkles
  },
  {
    id: "04",
    title: "Hotel & Hospitality",
    description: "Exzellenter Reinigungsservice für die gehobene Hotellerie.",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=2000",
    Icon: Bed
  },
  {
    id: "05",
    title: "Sonderreinigung",
    description: "Individuelle Konzepte für außergewöhnliche und herausfordernde Verschmutzungen.",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=2000",
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
              className="group bg-studio p-8 md:p-14 flex flex-col justify-between aspect-square transition-all duration-700 relative overflow-hidden"
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
                <p className="mt-6 text-charcoal/40 font-light text-sm leading-relaxed max-w-xs transition-colors group-hover:text-charcoal/60">
                  {service.description}
                </p>
              </div>
              
              <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                {/* Mobile: Completely static, simple image to prevent flickering */}
                <img 
                  src={service.image} 
                  alt="" 
                  className="w-full h-full object-cover opacity-[0.07] block md:hidden"
                  referrerPolicy="no-referrer"
                  loading="eager"
                />
                {/* Desktop: Smooth hover interactions */}
                <img 
                  src={service.image} 
                  alt="" 
                  className="w-full h-full object-cover hidden md:block opacity-0 group-hover:opacity-[0.1] grayscale group-hover:grayscale-0 scale-110 group-hover:scale-100 transition-all duration-[1500ms] ease-out shadow-inner"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="relative z-10 pt-10">
                <div className="w-10 h-[1px] bg-platinum group-hover:w-full transition-all duration-1000"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
