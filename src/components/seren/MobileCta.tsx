import { useEffect, useState } from 'react';
import { MessageCircle } from 'lucide-react';

export default function MobileCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 300);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <div
      className={`fixed bottom-5 left-1/2 -translate-x-1/2 z-50 md:hidden transition-all duration-500 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
      }`}
    >
      <a
        href="https://wa.me/918651205701?text=Hi%20Seren!%20I%20want%20to%20place%20an%20order%20%F0%9F%95%AF%EF%B8%8F"
        target="_blank"
        rel="noopener noreferrer"
        className="btn-whatsapp shadow-2xl shadow-[#25D366]/30 text-xs px-6 py-3"
      >
        <MessageCircle size={15} />
        Order on WhatsApp
      </a>
    </div>
  );
}
