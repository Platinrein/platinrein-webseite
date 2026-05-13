import { Instagram, Twitter, Music2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="px-10 md:px-20 py-20 bg-studio border-t border-platinum/30">
      <div className="max-w-[1800px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-16">
        <div className="flex flex-col md:flex-row gap-20 md:gap-40">
          <div>
            <p className="text-[10px] uppercase tracking-[0.5em] text-charcoal/20 mb-6 font-bold">Standort Iserlohn</p>
            <p className="text-sm font-medium leading-relaxed text-charcoal/60">
              Inh. Resul Gündüz<br/>
              Letmather Str. 13<br/>
              58644 Iserlohn
            </p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.5em] text-charcoal/20 mb-6 font-bold">Connect</p>
            <div className="flex gap-8">
              {[
                { Icon: Instagram, to: "/social-bald" },
                { Icon: Music2, to: "/social-bald" }, // TikTok
                { Icon: Twitter, to: "/social-bald" }   // Twitter / X
              ].map((item, i) => (
                <Link 
                  key={i} 
                  to={item.to} 
                  className="text-charcoal/30 hover:text-charcoal transition-colors"
                  onClick={() => {
                    if (window.location.pathname === item.to) {
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }
                  }}
                >
                  <item.Icon size={18} />
                </Link>
              ))}
            </div>
          </div>
        </div>
        
        <div className="flex flex-col items-end">
          <Logo className="mb-16 opacity-30 hover:opacity-100 transition-opacity justify-end" />
          <div className="flex gap-16 text-[10px] uppercase tracking-[0.3em] font-bold text-charcoal/30">
            <Link to="/impressum" className="hover:text-charcoal transition-colors">Impressum</Link>
            <Link to="/datenschutz" className="hover:text-charcoal transition-colors">Datenschutz</Link>
          </div>
        </div>
      </div>
      
      <div className="max-w-[1800px] mx-auto mt-20 pt-8 border-t border-platinum/10 flex justify-between text-[9px] uppercase tracking-[0.4em] text-charcoal/20 font-bold">
        <span>© 2026 Platinrein Gebäudeservice</span>
        <span className="italic font-serif">A Studio for Excellence</span>
      </div>
    </footer>
  );
}
