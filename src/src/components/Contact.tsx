import React, { useState } from "react";
import { motion } from "motion/react";
import { Send, CheckCircle2, Instagram, Music2, Phone, Mail, MapPin, ArrowUpRight, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";

const XIcon = ({ size = 16 }: { size?: number }) => (
  <svg 
    viewBox="0 0 24 24" 
    width={size} 
    height={size} 
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      let data: any = null;
      try {
        data = await response.json();
      } catch (parseError) {
        console.warn("Server responded with non-JSON format:", parseError);
      }

      if (response.ok && data?.success) {
        setStatus("success");
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        setStatus("error");
        setErrorMessage(
          data?.error || 
          "Die automatische Übermittlung konnte über diesen Browser nicht abgeschlossen werden. Bitte nutzen Sie den direkten E-Mail- oder WhatsApp-Button."
        );
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setStatus("error");
      setErrorMessage("Netzwerkverbindung unterbrochen. Bitte tippen Sie unten, um Ihre Nachricht direkt per Mail-App oder WhatsApp zu übermitteln.");
    }
  };

  const mailtoHref = `mailto:info@platinrein.de?subject=${encodeURIComponent(
    `Anfrage von ${formData.name || "Kunde"}`
  )}&body=${encodeURIComponent(
    `Name: ${formData.name}\nE-Mail: ${formData.email}\n${formData.phone ? `Telefon: ${formData.phone}\n` : ""}\nNachricht:\n${formData.message}`
  )}`;

  const whatsappHref = `https://wa.me/4915678332769?text=${encodeURIComponent(
    `Hallo Platinrein Gebäudeservice,\nmein Name ist ${formData.name || "Interessent"}.\n${formData.phone ? `Telefon: ${formData.phone}\n` : ""}${formData.email ? `E-Mail: ${formData.email}\n` : ""}\nNachricht:\n${formData.message || "Ich interessiere mich für Ihre Gebäudeservices und bitte um ein unverbindliches Angebot."}`
  )}`;

  return (
    <section id="kontakt" className="relative py-24 md:py-32 px-6 md:px-20 overflow-hidden bg-studio border-t border-platinum/30">
      
      {/* Full-Bleed Elegant Architectural Background Image */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none opacity-[0.25] lg:opacity-[0.14] overflow-hidden">
        <img 
          src="/src/assets/images/contact_exclusive_entrance_1791206947700.jpg" 
          alt="Modernes exklusives Gebäudeportal im Abendlicht" 
          className="w-full h-full object-cover object-center scale-102 filter brightness-[0.95] contrast-[1.05]"
          referrerPolicy="no-referrer"
        />
        {/* Ambient top-bottom gradient fade so text remains extremely readable */}
        <div className="absolute inset-0 bg-gradient-to-b from-studio via-studio/60 to-studio"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-5">
          <span className="text-[10px] uppercase tracking-[0.5em] text-charcoal/30 font-bold mb-4 block">
            Austausch & Beratung
          </span>
          <h2 className="text-4xl md:text-6xl font-light tracking-tighter leading-tight text-charcoal mb-12">
            Lassen Sie uns <br/>
            <span className="italic font-serif text-charcoal/20">beginnen.</span>
          </h2>
          
          <div className="space-y-8">
            <div>
              <p className="text-[9px] text-charcoal/30 uppercase tracking-[0.3em] font-bold mb-2 flex items-center gap-2">
                <Phone size={12} className="text-charcoal/40" /> Telefon
              </p>
              <a 
                href="tel:+4915678332769"
                className="text-xl font-light text-charcoal hover:translate-x-2 transition-transform inline-flex items-center gap-2 group cursor-pointer"
              >
                <span>+49 156 78332769</span>
                <ArrowUpRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity text-charcoal/50" />
              </a>
            </div>

            <div>
              <p className="text-[9px] text-charcoal/30 uppercase tracking-[0.3em] font-bold mb-2 flex items-center gap-2">
                <Mail size={12} className="text-charcoal/40" /> E-Mail
              </p>
              <a 
                href="mailto:info@platinrein.de"
                className="text-xl font-light text-charcoal hover:translate-x-2 transition-transform inline-flex items-center gap-2 group cursor-pointer"
              >
                <span>info@platinrein.de</span>
                <ArrowUpRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity text-charcoal/50" />
              </a>
            </div>

            <div>
              <p className="text-[9px] text-charcoal/30 uppercase tracking-[0.3em] font-bold mb-2 flex items-center gap-2">
                <MapPin size={12} className="text-charcoal/40" /> Standort & Einzugsgebiet
              </p>
              <p className="text-xl font-light text-charcoal tracking-tight">Iserlohn & ganz NRW</p>
              <p className="text-xs text-charcoal/40 font-light mt-1">Letmather Str. 13, 58644 Iserlohn</p>
            </div>

            <div className="pt-4 border-t border-platinum/40">
              <p className="text-[9px] text-charcoal/30 uppercase tracking-[0.3em] font-bold mb-4">Social Media</p>
              <div className="flex gap-4">
                {[
                  { Icon: Instagram, to: "https://www.instagram.com/platinrein?igsh=MXVmenJtbGdvYjBnOQ%3D%3D&utm_source=qr", isExternal: true, label: "Instagram" },
                  { Icon: Music2, to: "/social-bald", isExternal: false, label: "TikTok" },
                  { Icon: XIcon, to: "/social-bald", isExternal: false, label: "X" }
                ].map((item, i) => 
                  item.isExternal ? (
                    <a
                      key={i}
                      href={item.to}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={item.label}
                      className="w-10 h-10 border border-platinum rounded-full flex items-center justify-center text-charcoal/40 hover:text-charcoal hover:border-charcoal transition-all"
                    >
                      <item.Icon size={16} />
                    </a>
                  ) : (
                    <Link 
                      key={i} 
                      to={item.to} 
                      aria-label={item.label}
                      className="w-10 h-10 border border-platinum rounded-full flex items-center justify-center text-charcoal/40 hover:text-charcoal hover:border-charcoal transition-all"
                    >
                      <item.Icon size={16} />
                    </Link>
                  )
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 flex items-center">
          {status === "success" ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full text-center py-16 px-8 border border-platinum bg-white/90 backdrop-blur-md shadow-2xl rounded-sm"
            >
              <div className="w-16 h-16 bg-charcoal text-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-md">
                <CheckCircle2 size={32} />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-charcoal/40 block mb-2">Erfolgreich übermittelt</span>
              <h3 className="text-3xl font-light text-charcoal mb-4 tracking-tight">Vielen Dank für Ihre Anfrage.</h3>
              <p className="text-charcoal/70 max-w-md mx-auto text-sm leading-relaxed mb-8">
                Ihre Nachricht ist sicher bei uns eingegangen. Wir prüfen Ihre Angaben sorgfältig und setzen uns in Kürze mit einem maßgeschneiderten Angebot mit Ihnen in Verbindung.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="tel:+4915678332769"
                  className="px-6 py-3 bg-charcoal text-white text-[10px] font-bold uppercase tracking-[0.25em] hover:bg-neutral-800 transition-colors rounded-none"
                >
                  Dringend? Jetzt anrufen
                </a>
                <button 
                  onClick={() => setStatus("idle")}
                  className="text-[10px] font-bold uppercase tracking-[0.3em] text-charcoal/50 hover:text-charcoal transition-colors underline decoration-platinum underline-offset-8 px-4 py-2"
                >
                  Weiteres Anliegen senden
                </button>
              </div>
            </motion.div>
          ) : (
            <div className="w-full bg-white/95 backdrop-blur-md p-8 sm:p-10 md:p-12 rounded-lg border border-platinum shadow-2xl">
              <div className="mb-6 pb-4 border-b border-platinum/40 flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-light text-charcoal tracking-tight">Unverbindliche Anfrage</h3>
                  <p className="text-[11px] text-charcoal/50 font-light">Wir antworten verlässlich innerhalb von 24 Stunden.</p>
                </div>
                <span className="text-[9px] uppercase tracking-[0.2em] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 border border-emerald-200/50">
                  Online
                </span>
              </div>

              <form className="w-full space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-[9px] font-bold uppercase tracking-[0.25em] text-charcoal/60">
                      Name <span className="text-charcoal/30">*</span>
                    </label>
                    <input 
                      type="text" 
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-zinc-50 border border-charcoal/15 rounded-md px-4 py-3.5 text-charcoal focus:border-charcoal focus:bg-white focus:ring-1 focus:ring-charcoal/10 outline-none hover:border-charcoal/30 transition-all placeholder:text-charcoal/30 font-light text-sm shadow-xs"
                      placeholder="Ihr vollständiger Name"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[9px] font-bold uppercase tracking-[0.25em] text-charcoal/60">
                      E-Mail-Adresse <span className="text-charcoal/30">*</span>
                    </label>
                    <input 
                      type="email" 
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-zinc-50 border border-charcoal/15 rounded-md px-4 py-3.5 text-charcoal focus:border-charcoal focus:bg-white focus:ring-1 focus:ring-charcoal/10 outline-none hover:border-charcoal/30 transition-all placeholder:text-charcoal/30 font-light text-sm shadow-xs"
                      placeholder="name@unternehmen.de"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                    <label className="text-[9px] font-bold uppercase tracking-[0.25em] text-charcoal/60">
                      Telefonnummer
                    </label>
                    <span className="text-[9px] text-charcoal/30 uppercase tracking-widest">Optional für Rückruf</span>
                  </div>
                  <input 
                    type="tel" 
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-zinc-50 border border-charcoal/15 rounded-md px-4 py-3.5 text-charcoal focus:border-charcoal focus:bg-white focus:ring-1 focus:ring-charcoal/10 outline-none hover:border-charcoal/30 transition-all placeholder:text-charcoal/30 font-light text-sm shadow-xs"
                    placeholder="+49 ..."
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <label className="text-[9px] font-bold uppercase tracking-[0.25em] text-charcoal/60">
                      Nachricht oder Projektbeschreibung <span className="text-charcoal/30">*</span>
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                      {["🍂 Herbst-Glaspflege", "Unterhaltsreinigung", "Büro & Kanzlei"].map((tag) => (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => {
                            if (!formData.message.includes(tag)) {
                              setFormData({
                                ...formData,
                                message: formData.message ? `${formData.message} [${tag}]` : `Anfrage zu: ${tag}`
                              });
                            }
                          }}
                          className="text-[9px] px-2 py-0.5 bg-neutral-100 hover:bg-amber-100/70 border border-neutral-200 hover:border-amber-400 text-charcoal/70 transition-colors cursor-pointer"
                        >
                          + {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                  <textarea 
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-zinc-50 border border-charcoal/15 rounded-md px-4 py-3.5 text-charcoal focus:border-charcoal focus:bg-white focus:ring-1 focus:ring-charcoal/10 outline-none hover:border-charcoal/30 transition-all resize-none placeholder:text-charcoal/30 font-light text-sm shadow-xs"
                    placeholder="Beschreiben Sie kurz Ihr Objekt, den gewünschten Leistungsbereich oder besondere Anforderungen..."
                  ></textarea>
                </div>

                <div className="flex flex-col gap-4 pt-2">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <motion.button 
                      whileHover={{ x: 3 }}
                      type="submit"
                      disabled={status === "loading"}
                      className="flex items-center gap-4 group disabled:opacity-50 cursor-pointer"
                    >
                      <div className="w-12 h-12 border border-platinum bg-charcoal text-white rounded-full flex items-center justify-center group-hover:scale-105 transition-all shadow-md">
                        <Send size={15} className="group-hover:translate-x-[2px] transition-transform" />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-charcoal group-hover:text-black">
                        {status === "loading" ? "Wird sicher übertragen..." : "Anfrage einreichen"}
                      </span>
                    </motion.button>

                    <a 
                      href={mailtoHref}
                      className="text-[10px] uppercase tracking-wider text-charcoal/40 hover:text-charcoal transition-colors flex items-center gap-1 font-medium"
                    >
                      Lieber direkt per Mail? <ArrowUpRight size={12} />
                    </a>
                  </div>

                  {status === "error" && (
                    <div className="p-4 bg-red-50 border border-red-200/80 rounded-md text-red-800 text-xs space-y-2 mt-2">
                      <div className="flex items-center gap-2 font-bold uppercase tracking-wider text-[10px] text-red-700">
                        <AlertCircle size={14} /> Hinweis zum Versand
                      </div>
                      <p className="text-[11px] leading-relaxed text-red-700">
                        {errorMessage}
                      </p>
                      <div className="pt-2 flex flex-wrap gap-2.5">
                        <a 
                          href={mailtoHref}
                          className="inline-flex items-center gap-1.5 px-3 py-2 bg-charcoal text-white text-[10px] font-bold uppercase tracking-wider hover:bg-neutral-800 transition-colors rounded-none"
                        >
                          <Mail size={12} /> Per E-Mail senden
                        </a>
                        <a 
                          href={whatsappHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-2 bg-emerald-700 text-white text-[10px] font-bold uppercase tracking-wider hover:bg-emerald-800 transition-colors rounded-none"
                        >
                          Per WhatsApp senden
                        </a>
                        <a 
                          href="tel:+4915678332769"
                          className="inline-flex items-center gap-1.5 px-3 py-2 bg-white border border-charcoal/20 text-charcoal text-[10px] font-bold uppercase tracking-wider hover:bg-zinc-100 transition-colors rounded-none"
                        >
                          <Phone size={12} /> Direkt anrufen
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
