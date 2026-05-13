import { motion } from "motion/react";

export default function About() {
  return (
    <section id="ueber-uns" className="py-32 px-10 md:px-20 bg-studio">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-7">
          <span className="text-[10px] uppercase tracking-[0.5em] text-charcoal/30 font-bold mb-4 block">
            Vision
          </span>
          <h2 className="text-4xl md:text-6xl font-light tracking-tighter leading-tight text-charcoal mb-8">
            Ein Standard, <br/>
            <span className="italic font-serif text-charcoal/20">der bleibt.</span>
          </h2>
          <p className="text-lg text-charcoal/60 font-light leading-relaxed max-w-lg">
            Platinrein wurde mit einer klaren Mission gegründet: Gebäudeservice nicht nur als 
            Reinigung, sondern als Werterhalt mit höchster Diskretion zu begreifen. 
            Direkt aus Iserlohn agieren wir für Kunden, die keine Kompromisse eingehen.
          </p>
        </div>
        <div className="lg:col-span-5 flex items-center">
          <div className="grid grid-cols-1 gap-8 w-full">
            {[
              { label: "Anspruch", value: "100%" },
              { label: "Sorgfalt", value: "Maximal" },
              { label: "Standort", value: "Iserlohn" },
            ].map((stat, i) => (
              <div key={i} className="border-l border-platinum pl-6 py-2">
                <p className="text-3xl font-light text-charcoal mb-1">{stat.value}</p>
                <p className="text-[9px] uppercase tracking-widest text-charcoal/30 font-bold">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
