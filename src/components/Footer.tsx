import { Instagram, Music2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Logo from "./Logo";

const XIcon = ({ size = 18 }: { size?: number }) => (
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

export default function Footer() {
  return (
    <footer className="px-6 md:px-20 py-16 md:py-24 bg-studio border-t border-platinum/30">
      <div className="max-w-[1800px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-16 items-center mb-16 md:mb-24">
        {/* Column 1: Location */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left order-2 md:order-1">
          <p className="text-[10px] uppercase tracking-[0.5em] text-charcoal/20 mb-4 font-bold">Standort</p>
          <p className="text-sm font-medium leading-relaxed text-charcoal/60">
            Iserlohn / NRW
          </p>
        </div>

        {/* Column 2: Logo (Center) */}
        <div className="flex justify-center order-1 md:order-2">
          <Logo className="opacity-40 hover:opacity-100 transition-opacity scale-110" />
        </div>

        {/* Column 3: Social Media */}
        <div className="flex flex-col items-center md:items-end text-center md:text-right order-3 md:order-3">
          <p className="text-[10px] uppercase tracking-[0.5em] text-charcoal/20 mb-4 font-bold">Social Media</p>
          <div className="flex gap-8">
            {[
              { Icon: Instagram, to: "https://www.instagram.com/platinrein?igsh=MXVmenJtbGdvYjBnOQ%3D%3D&utm_source=qr", isExternal: true },
              { Icon: Music2, to: "/social-bald", isExternal: false }, // TikTok
              { Icon: XIcon, to: "/social-bald", isExternal: false }   // Twitter / X
            ].map((item, i) => 
              item.isExternal ? (
                <a
                  key={i}
                  href={item.to}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-charcoal/30 hover:text-charcoal transition-colors"
                >
                  <item.Icon size={18} />
                </a>
              ) : (
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
              )
            )}
          </div>
        </div>
      </div>
      
      <div className="max-w-[1800px] mx-auto pt-10 border-t border-platinum/10 flex flex-col md:flex-row justify-between items-center gap-10">
        <div className="flex gap-12 text-[10px] uppercase tracking-[0.4em] font-bold text-charcoal/30 order-2 md:order-1">
          <Link to="/impressum" className="hover:text-charcoal transition-colors">Impressum</Link>
          <Link to="/datenschutz" className="hover:text-charcoal transition-colors">Datenschutz</Link>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-4 text-[9px] uppercase tracking-[0.4em] text-charcoal/20 font-bold order-1 md:order-2 text-center">
          <span>© 2026 Platinrein Gebäudeservice</span>
        </div>
      </div>
    </footer>
  );
}
