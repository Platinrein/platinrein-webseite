import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import Logo from "./Logo";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Leistungen", to: "/#dienstleistungen" },
    { name: "Über uns", to: "/#ueber-uns" },
    { name: "Kontakt", to: "/#kontakt" }
  ];

  return (
    <motion.nav
      animate={{
        paddingTop: isScrolled ? "14px" : "24px",
        paddingBottom: isScrolled ? "14px" : "24px",
        backgroundColor: isScrolled ? "rgba(253, 253, 253, 0.92)" : "rgba(253, 253, 253, 0)",
        backdropBlur: isScrolled ? "15px" : "0px",
        borderBottomColor: isScrolled ? "rgba(229, 229, 229, 0.60)" : "rgba(229, 229, 229, 0)",
      }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      style={{
        backdropFilter: isScrolled ? "blur(15px)" : "none",
        WebkitBackdropFilter: isScrolled ? "blur(15px)" : "none",
      }}
      className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 border-b border-transparent"
      id="main-nav"
    >
      <div className="max-w-[1900px] mx-auto flex items-center justify-between">
        {/* Zone 1: Brand Wordmark */}
        <div className="flex items-center">
          <Link 
            to="/" 
            className="hover:opacity-90 transition-opacity flex items-center shrink-0"
            onClick={(e) => {
              if (location.pathname === "/") {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
          >
            <Logo />
          </Link>
        </div>

        {/* Zone 2: Desktop Menu Links */}
        <div className="hidden lg:flex items-center gap-10">
          {navItems.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <Link
                to={item.to}
                className="text-[11px] font-bold uppercase tracking-[0.35em] text-charcoal/60 hover:text-charcoal transition-all duration-300 relative group whitespace-nowrap"
              >
                {item.name}
                <span className="absolute -bottom-2 left-0 w-0 h-[1.5px] bg-charcoal transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Zone 3: Primary Action */}
        <div className="hidden md:flex items-center gap-6">
          <a
            href="tel:+4915678332769"
            className="text-[10px] font-bold uppercase tracking-[0.25em] text-charcoal/50 hover:text-charcoal transition-colors whitespace-nowrap hidden 2xl:block"
          >
            +49 156 78332769
          </a>
          <Link
            to="/#kontakt"
            className="px-5 py-2.5 bg-charcoal text-white text-[10px] font-bold uppercase tracking-[0.25em] hover:bg-neutral-800 transition-all whitespace-nowrap shadow-xs hover:shadow-md cursor-pointer"
          >
            Anfrage senden
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="lg:hidden text-charcoal opacity-70 hover:opacity-100 transition-opacity p-2"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Menü"
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-charcoal/30 backdrop-blur-xs z-[-1] lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Menu Box */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full left-0 right-0 bg-white border-b border-platinum/40 p-8 flex flex-col gap-6 lg:hidden shadow-2xl"
        >
          {navItems.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Link
                key={item.name}
                to={item.to}
                onClick={() => setIsOpen(false)}
                className="text-xs uppercase tracking-[0.35em] font-bold text-charcoal/80 hover:text-charcoal transition-colors flex items-center justify-between py-1 group"
              >
                {item.name}
                <X size={12} className="opacity-0 group-hover:opacity-30 transition-opacity rotate-45" />
              </Link>
            </motion.div>
          ))}
          <div className="pt-4 border-t border-platinum/50 flex flex-col gap-3">
            <Link
              to="/#kontakt"
              onClick={() => setIsOpen(false)}
              className="w-full text-center py-3 bg-charcoal text-white text-[10px] font-bold uppercase tracking-[0.25em]"
            >
              Anfrage starten
            </Link>
            <a
              href="tel:+4915678332769"
              className="text-center text-xs text-charcoal/60 font-medium py-1"
            >
              Direkt anrufen: +49 156 78332769
            </a>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}
