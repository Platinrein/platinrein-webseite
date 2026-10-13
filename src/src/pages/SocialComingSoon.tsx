import React, { useState } from "react";
import { motion } from "motion/react";
import { Instagram, ArrowLeft, Copy, Check, Sparkles, ExternalLink, Calendar, Send } from "lucide-react";
import { Link } from "react-router-dom";

export default function SocialComingSoon() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const adImageSrc = "/src/assets/images/instagram_ad_platinrein_1781784035892.jpg";

  const captionTemplates = [
    {
      title: "1. Fokus: Ästhetik & Erstklassiger Eindruck",
      text: "Der erste Eindruck entscheidet. ✨\n\nStrahlend saubere Fenster und makellose Oberflächen stehen für Professionalität und Perfektion. Mit Platinrein Gebäudeservice erstrahlt Ihr Objekt im besten Licht – fachgerecht, diskret und absolut zuverlässig.\n\n📍 Iserlohn, Hemer, Menden & ganz NRW\n💡 Jetzt unverbindliches Angebot anfordern!\n\n#platinrein #gebäudeservice #glasreinigung #nrw #iserlohn #reinigungsservice #werterhalt #premiumservice"
    },
    {
      title: "2. Fokus: Werterhalt & Premium-Pflege",
      text: "Investieren Sie in den Werterhalt Ihrer Immobilie. 🏢💎\n\nUnsere exklusive Unterhalts- und Glasreinigung sichert das repräsentative Erscheinungsbild Ihrer Geschäfts- und Privatbauten. Handwerkliche Präzision trifft auf modernste Standards.\n\n✨ Platinrein Gebäudeservice – Ihr Partner für kompromisslose Reinheit.\n\n#immobilienpflege #gewerbereinigung #luxusliving #fensterputzen #menden #hemer #reinigungmitstil #qualität"
    }
  ];

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2500);
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] pt-28 pb-16 px-4 md:px-8 relative overflow-hidden">
      {/* Dynamic Background Accents */}
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#eaeaea]/40 rounded-full blur-3xl opacity-60"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#eaeaea]/30 rounded-full blur-3xl opacity-50"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Navigation & Header */}
        <div className="mb-10 flex flex-wrap justify-between items-center gap-4">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-500 hover:text-black transition-colors group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            Zurück zur Startseite
          </Link>
          
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.25em] text-charcoal/40 bg-zinc-100/80 px-3 py-1.5 rounded-none">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Instagram Asset Generator Aktiv
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center md:text-left mb-12 max-w-3xl"
        >
          <h1 className="text-3xl scale-y-95 md:text-4xl lg:text-5xl font-light text-black tracking-tight leading-none mb-4 uppercase">
            Instagram <span className="font-serif italic font-normal text-neutral-700 lowercase">werbekampagne</span>
          </h1>
          <p className="text-neutral-500 text-sm md:text-base font-normal max-w-2xl leading-relaxed">
            Platinrein steht für minimalistischen Luxus und höchste Präzision. Nutzen Sie dieses exklusive, marketingoptimierte Werbebild und die passenden Copywriting-Vorlagen für Ihren nächsten Social-Media-Beitrag.
          </p>
        </motion.div>

        {/* Dynamic Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: The Generated Ad Preview */}
          <div className="col-span-1 lg:col-span-5 space-y-4">
            <div className="bg-white border border-neutral-200/80 p-3 shadow-xs">
              <div className="aspect-square w-full relative bg-neutral-100 overflow-hidden border border-neutral-100/50">
                <img
                  src={adImageSrc}
                  alt="Platinrein Instagram Werbebild"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-all hover:scale-[1.02] duration-500"
                />
              </div>
              <div className="p-3 bg-white mt-2 flex justify-between items-center text-left">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-black block">Platinrein Ad Asset</span>
                  <span className="text-[9px] font-mono text-neutral-400 uppercase tracking-widest block">Format: 1:1 Feed Post</span>
                </div>
                <a 
                  href={adImageSrc} 
                  download="Platinrein_Instagram_Ad.jpg"
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-1.5 bg-black text-white text-[9px] font-bold uppercase tracking-widest hover:bg-neutral-800 transition-colors"
                >
                  Download Info
                </a>
              </div>
            </div>

            <div className="p-4 bg-zinc-50 border border-neutral-200/50 text-[10.5px] leading-relaxed text-neutral-600 text-left">
              💡 <strong>Praxistipp:</strong> Klicken Sie mit der rechten Maustaste auf das Werbebild oben und wählen Sie <strong>"Grafik speichern unter..."</strong>, um das Bild direkt in originaler Auflösung herunterzuladen. Teilen Sie es direkt als Feed-Post auf Ihrem Instagram-Account.
            </div>
          </div>

          {/* RIGHT COLUMN: Interactive Copywriting & Captions */}
          <div className="col-span-1 lg:col-span-7 space-y-6">
            <div className="bg-white border border-neutral-200/80 p-6 space-y-6">
              <div className="flex items-center gap-2 border-b border-neutral-100 pb-3">
                <Sparkles size={16} className="text-neutral-500 animate-pulse" />
                <h3 className="text-xs font-bold uppercase tracking-widest text-black">
                  Premium Text-Vorlagen (Copywriting)
                </h3>
              </div>

              <div className="space-y-6 divide-y divide-neutral-100">
                {captionTemplates.map((template, idx) => (
                  <div key={idx} className={idx > 0 ? "pt-6" : ""}>
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-xs font-bold text-neutral-900 tracking-tight">{template.title}</span>
                      <button
                        onClick={() => handleCopy(template.text, idx)}
                        className={`inline-flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-widest transition-all px-2.5 py-1 ${
                          copiedIndex === idx 
                          ? "bg-emerald-50 text-emerald-600" 
                          : "bg-neutral-100 text-neutral-600 hover:bg-black hover:text-white"
                        }`}
                      >
                        {copiedIndex === idx ? (
                          <>
                            <Check size={11} /> Copied!
                          </>
                        ) : (
                          <>
                            <Copy size={11} /> Kopiervorlage
                          </>
                        )}
                      </button>
                    </div>
                    <pre className="p-4 bg-neutral-50/90 border border-neutral-200 text-xs leading-relaxed font-sans text-neutral-800 text-left whitespace-pre-wrap rounded-none font-medium select-all">
                      {template.text}
                    </pre>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA directly to Instagram QR link */}
            <div className="p-6 bg-neutral-950 text-white rounded-none flex flex-col md:flex-row items-center justify-between gap-4 text-left">
              <div>
                <h4 className="text-xs font-extrabold uppercase tracking-widest text-white mb-1 flex items-center gap-2">
                  <Instagram size={14} /> LIVE AUF INSTAGRAM
                </h4>
                <p className="text-[10px] tracking-wide text-neutral-400 font-medium">
                  Verbinden Sie sich direkt mit Platinreins offiziellem Auftritt auf Instagram.
                </p>
              </div>
              <a
                href="https://www.instagram.com/platinrein?igsh=MXVmenJtbGdvYjBnOQ%3D%3D&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-white text-black hover:bg-neutral-200 text-[10px] font-bold uppercase tracking-widest transition-all flex items-center gap-2 inline-flex"
              >
                Profil aufrufen <ExternalLink size={12} />
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
