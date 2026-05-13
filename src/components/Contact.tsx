import React, { useState } from "react";
import { motion } from "motion/react";
import { Send, CheckCircle2, Instagram, Twitter, Music2 } from "lucide-react";
import { Link } from "react-router-dom";

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
    <section id="kontakt" className="py-32 px-10 md:px-20 bg-studio border-t border-platinum/30">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-5">
          <span className="text-[10px] uppercase tracking-[0.5em] text-charcoal/30 font-bold mb-4 block">
            Dialogue
          </span>
          <h2 className="text-4xl md:text-6xl font-light tracking-tighter leading-tight text-charcoal mb-12">
            Lassen Sie uns <br/>
            <span className="italic font-serif text-charcoal/20">beginnen.</span>
          </h2>
          
          <div className="space-y-8">
            <div>
              <p className="text-[9px] text-charcoal/30 uppercase tracking-[0.3em] font-bold mb-2">Digital</p>
              <p className="text-xl font-light text-charcoal hover:translate-x-2 transition-transform cursor-pointer">info@platinrein.de</p>
            </div>
            <div>
              <p className="text-[9px] text-charcoal/30 uppercase tracking-[0.3em] font-bold mb-2">Location</p>
              <p className="text-xl font-light text-charcoal hover:translate-x-2 transition-transform cursor-pointer">Letmather Str. 13, Iserlohn</p>
            </div>
            <div className="pt-4">
              <p className="text-[9px] text-charcoal/30 uppercase tracking-[0.3em] font-bold mb-4">Connect</p>
              <div className="flex gap-6">
                {[
                  { Icon: Instagram, to: "/social-bald" },
                  { Icon: Music2, to: "/social-bald" },
                  { Icon: Twitter, to: "/social-bald" }
                ].map((item, i) => (
                  <Link 
                    key={i} 
                    to={item.to} 
                    className="w-10 h-10 border border-platinum rounded-full flex items-center justify-center text-charcoal/30 hover:text-charcoal hover:border-charcoal transition-all"
                  >
                    <item.Icon size={16} />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 flex items-center">
          {status === "success" ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full text-center py-20 border border-platinum bg-white/50 backdrop-blur-sm"
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
            <form className="w-full space-y-8" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-transparent border-b border-platinum py-3 text-charcoal focus:border-charcoal outline-none transition-all placeholder:text-charcoal/10 font-light text-base"
                  placeholder="Name"
                />
                <input 
                  type="email" 
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-transparent border-b border-platinum py-3 text-charcoal focus:border-charcoal outline-none transition-all placeholder:text-charcoal/10 font-light text-base"
                  placeholder="Email"
                />
              </div>
              <textarea 
                rows={4}
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-transparent border-b border-platinum py-3 text-charcoal focus:border-charcoal outline-none transition-all resize-none placeholder:text-charcoal/10 font-light text-base"
                placeholder="Ihre Anforderungen"
              ></textarea>
              <div className="flex flex-col gap-4">
                <motion.button 
                  whileHover={{ x: 10 }}
                  disabled={status === "loading"}
                  className="flex items-center gap-4 group disabled:opacity-50"
                >
                  <div className="w-12 h-12 border border-platinum rounded-full flex items-center justify-center group-hover:bg-charcoal group-hover:text-white transition-all">
                    <Send size={16} />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em]">
                    {status === "loading" ? "Wird gesendet..." : "Nachricht senden"}
                  </span>
                </motion.button>
                {status === "error" && (
                  <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest">
                    {errorMessage}
                  </p>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
