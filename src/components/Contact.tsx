import React, { useState } from "react";
import { motion } from "motion/react";
import { Send, CheckCircle2, Instagram, Music2 } from "lucide-react";
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
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
        setErrorMessage(data.error || "Ein Fehler ist aufgetreten.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setStatus("error");
      setErrorMessage("Netzwerkfehler. Bitte versuchen Sie es später erneut.");
    }
  };

  return (
    <section id="kontakt" className="relative py-24 md:py-32 px-6 md:px-20 overflow-hidden bg-studio border-t border-platinum/30">
      
      {/* Full-Bleed Elegant Architectural Background Image (Subtle watermark style) */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none opacity-[0.3] lg:opacity-[0.15]">
        <img 
          src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=80&w=2000" 
          alt="Modernes Premium-Architektur-Schattenbild" 
          className="w-full h-full object-cover object-center scale-102 filter brightness-[0.9] contrast-[1.1]"
          referrerPolicy="no-referrer"
        />
        {/* Ambient top-bottom gradient fade so text remains extremely readable */}
        <div className="absolute inset-0 bg-gradient-to-b from-studio via-studio/40 to-studio"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-5">
          <span className="text-[10px] uppercase tracking-[0.5em] text-charcoal/30 font-bold mb-4 block">
            Austausch
          </span>
          <h2 className="text-4xl md:text-6xl font-light tracking-tighter leading-tight text-charcoal mb-12">
            Lassen Sie uns <br/>
            <span className="italic font-serif text-charcoal/20">beginnen.</span>
          </h2>
          
          <div className="space-y-8">
            <div>
              <p className="text-[9px] text-charcoal/30 uppercase tracking-[0.3em] font-bold mb-2">Telefon</p>
              <p className="text-xl font-light text-charcoal hover:translate-x-2 transition-transform cursor-pointer">+49 156 78332769</p>
            </div>
            <div>
              <p className="text-[9px] text-charcoal/30 uppercase tracking-[0.3em] font-bold mb-2">E-Mail</p>
              <p className="text-xl font-light text-charcoal hover:translate-x-2 transition-transform cursor-pointer">info@platinrein.de</p>
            </div>
            <div>
              <p className="text-[9px] text-charcoal/30 uppercase tracking-[0.3em] font-bold mb-2">Standort</p>
              <p className="text-xl font-light text-charcoal hover:translate-x-2 transition-transform cursor-pointer tracking-tight">Iserlohn, NRW</p>
            </div>
            <div className="pt-4">
              <p className="text-[9px] text-charcoal/30 uppercase tracking-[0.3em] font-bold mb-4">Social Media</p>
              <div className="flex gap-6">
                {[
                  { Icon: Instagram, to: "https://www.instagram.com/platinrein?igsh=MXVmenJtbGdvYjBnOQ%3D%3D&utm_source=qr", isExternal: true },
                  { Icon: Music2, to: "/social-bald", isExternal: false },
                  { Icon: XIcon, to: "/social-bald", isExternal: false }
                ].map((item, i) => 
                  item.isExternal ? (
                    <a
                      key={i}
                      href={item.to}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 border border-platinum rounded-full flex items-center justify-center text-charcoal/30 hover:text-charcoal hover:border-charcoal transition-all"
                    >
                      <item.Icon size={16} />
                    </a>
                  ) : (
                    <Link 
                      key={i} 
                      to={item.to} 
                      className="w-10 h-10 border border-platinum rounded-full flex items-center justify-center text-charcoal/30 hover:text-charcoal hover:border-charcoal transition-all"
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
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full text-center py-20 border border-platinum bg-white/80 backdrop-blur-sm shadow-xl p-8 rounded-sm"
            >
              <CheckCircle2 size={48} className="mx-auto text-charcoal mb-6" />
              <h3 className="text-2xl font-light text-charcoal mb-4">Vielen Dank!</h3>
              <p className="text-charcoal/60 max-w-sm mx-auto">
                Ihre Nachricht wurde erfolgreich übermittelt. Wir werden uns umgehend bei Ihnen melden.
              </p>
              <button 
                onClick={() => setStatus("idle")}
                className="mt-8 text-[10px] font-bold uppercase tracking-[0.3em] text-charcoal/40 hover:text-charcoal transition-colors underline decoration-platinum underline-offset-8"
              >
                Weitere Nachricht senden
              </button>
            </motion.div>
          ) : (
            <div className="w-full bg-white/95 backdrop-blur-md p-8 sm:p-10 md:p-12 rounded-lg border border-platinum shadow-2xl">
              <form className="w-full space-y-8" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="flex flex-col gap-2">
                    <label className="text-[9px] font-bold uppercase tracking-[0.25em] text-charcoal/50">Name</label>
                    <input 
                      type="text" 
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-zinc-50 border border-charcoal/15 rounded-md px-4 py-4 text-charcoal focus:border-charcoal focus:bg-white focus:ring-1 focus:ring-charcoal/10 outline-none hover:border-charcoal/30 transition-all placeholder:text-charcoal/30 font-light text-sm shadow-sm"
                      placeholder="Ihr Name"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[9px] font-bold uppercase tracking-[0.25em] text-charcoal/50">E-Mail</label>
                    <input 
                      type="email" 
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-zinc-50 border border-charcoal/15 rounded-md px-4 py-4 text-charcoal focus:border-charcoal focus:bg-white focus:ring-1 focus:ring-charcoal/10 outline-none hover:border-charcoal/30 transition-all placeholder:text-charcoal/30 font-light text-sm shadow-sm"
                      placeholder="beispiel@adresse.de"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[9px] font-bold uppercase tracking-[0.25em] text-charcoal/50">Nachricht</label>
                  <textarea 
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-zinc-50 border border-charcoal/15 rounded-md px-4 py-4 text-charcoal focus:border-charcoal focus:bg-white focus:ring-1 focus:ring-charcoal/10 outline-none hover:border-charcoal/30 transition-all resize-none placeholder:text-charcoal/30 font-light text-sm shadow-sm"
                    placeholder="Wie können wir Ihnen helfen?"
                  ></textarea>
                </div>
                <div className="flex flex-col gap-4">
                  <motion.button 
                    whileHover={{ x: 3 }}
                    disabled={status === "loading"}
                    className="flex items-center gap-4 group disabled:opacity-50 mt-2 self-start cursor-pointer"
                  >
                    <div className="w-12 h-12 border border-platinum rounded-full flex items-center justify-center group-hover:bg-charcoal group-hover:text-white group-hover:border-charcoal transition-all">
                      <Send size={15} className="group-hover:translate-x-[2px] transition-transform" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-charcoal/80 group-hover:text-charcoal">
                      {status === "loading" ? "Wird gesendet..." : "Anfrage einreichen"}
                    </span>
                  </motion.button>
                  {status === "error" && (
                    <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest mt-2">
                      {errorMessage}
                    </p>
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
