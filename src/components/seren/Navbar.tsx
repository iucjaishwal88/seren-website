import { useEffect, useState } from 'react';
import serenLogo from '../../assets/seren-logo.png';

const links = [
  { label: 'Home', href: '#home' },
  { label: 'Products', href: '#products' },
  { label: 'Customize', href: '#customize' },
  { label: 'About', href: '#about' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#FAF8F3]/95 backdrop-blur-md shadow-sm border-b border-[#E8E2D4]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8 flex items-center justify-between h-16 md:h-20">
        <a href="#home" className="flex items-center group">
          <img
            src={serenLogo}
            alt="Seren"
            className="h-10 md:h-[45px] w-auto transition-transform duration-300 group-hover:scale-105 mr-2"
          />
        </a>

        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-sans text-sm text-warm-mid/80 hover:text-warm-mid tracking-wide transition-colors duration-200 relative group"
            >
              {l.label}
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-sage group-hover:w-full transition-all duration-300" />
            </a>
          ))}
          <a href="#customize" className="btn-primary text-xs py-2.5 px-6">
            Order Now
          </a>
        </div>

        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-warm-mid transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-warm-mid transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-warm-mid transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-[#FAF8F3]/98 backdrop-blur-md border-t border-[#E8E2D4] px-6 py-6 flex flex-col gap-5">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-sans text-sm text-warm-mid tracking-wide"
              onClick={() => setMenuOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <a href="#customize" className="btn-primary text-center text-xs" onClick={() => setMenuOpen(false)}>
            Order Now
          </a>
        </div>
      )}
    </nav>
  );
}
