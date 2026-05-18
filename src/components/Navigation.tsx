import { motion, useScroll, useTransform } from "motion/react";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import Logo from "./Logo";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const { scrollY } = useScroll();
  const location = useLocation();
  const isHome = location.pathname === "/";
  
  const backgroundColor = useTransform(
    scrollY,
    [0, 50],
    ["rgba(253, 253, 253, 0)", "rgba(253, 253, 253, 0.8)"]
  );
  
  const backdropBlur = useTransform(
    scrollY,
    [0, 50],
    ["blur(0px)", "blur(15px)"]
  );

  const navItems = [
    { name: "Leistungen", to: "/#dienstleistungen" },
    { name: "Über uns", to: "/#ueber-uns" },
    { name: "Kontakt", to: "/#kontakt" }
  ];

  return (
    <motion.nav
      style={{ backgroundColor, backdropBlur }}
      className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-6 md:py-8"
      id="main-nav"
    >
      <div className="max-w-[1900px] mx-auto flex items-center justify-between">
        <Link 
          to="/" 
          className="hover:opacity-70 transition-opacity"
          onClick={(e) => {
            if (location.pathname === "/") {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
        >
          <Logo />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-12">
          {navItems.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                to={item.to}
                className="text-[11px] font-bold uppercase tracking-[0.4em] text-charcoal opacity-40 hover:opacity-100 transition-all duration-500 relative group"
              >
                {item.name}
                <span className="absolute -bottom-2 left-0 w-0 h-[1.5px] bg-charcoal transition-all duration-500 group-hover:w-full"></span>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-charcoal opacity-60 hover:opacity-100 transition-opacity"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Menu"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-charcoal/20 backdrop-blur-sm z-[-1] md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Menu Box */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full left-0 right-0 bg-white border-b border-platinum/30 p-8 flex flex-col gap-8 md:hidden shadow-2xl"
        >
          {navItems.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                key={item.name}
                to={item.to}
                onClick={() => setIsOpen(false)}
                className="text-sm uppercase tracking-[0.4em] font-bold text-charcoal opacity-60 hover:opacity-100 transition-opacity flex items-center justify-between group"
              >
                {item.name}
                <X size={14} className="opacity-0 group-hover:opacity-20 transition-opacity rotate-45" />
              </Link>
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.nav>
  );
}
