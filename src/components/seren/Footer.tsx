import { Flame, Instagram, MessageCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="py-16 md:py-20" style={{ background: '#1E1D18' }}>
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col items-center text-center mb-10">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-8 h-8 rounded-full bg-sage flex items-center justify-center">
              <Flame size={15} className="text-warm-white" fill="currentColor" />
            </div>
            <span
              className="font-serif font-semibold text-2xl tracking-[0.18em] text-warm-white"
            >
              SEREN
            </span>
          </div>
          <p className="font-serif italic text-lg text-warm-white/50 mb-8">
            Light your calm.
          </p>

          <div className="flex items-center gap-4">
            <a
              href="https://www.instagram.com/_seren.official"
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 rounded-full border border-warm-white/10 flex items-center justify-center text-warm-white/50 hover:text-sage hover:border-sage/40 transition-all duration-300"
              aria-label="Instagram @_seren.official"
            >
              <Instagram size={18} />
            </a>
            <a
              href="https://wa.me/918651205701"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#25D366]/10 border border-[#25D366]/20 text-[#25D366] hover:bg-[#25D366]/20 transition-all duration-300 font-sans text-sm font-medium"
            >
              <MessageCircle size={16} />
              Chat on WhatsApp
            </a>
          </div>
        </div>

        <div className="border-t border-warm-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-sans text-xs text-warm-white/25">
            © 2025 Seren. All rights reserved.
          </p>
          <p className="font-sans text-xs text-warm-white/25">
            Handmade with love in India
          </p>
        </div>
      </div>
    </footer>
  );
}
