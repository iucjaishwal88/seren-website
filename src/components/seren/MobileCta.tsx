import { useEffect, useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { useOrderDialog } from './OrderDialog';

export default function MobileCta() {
  const [visible, setVisible] = useState(false);
  const { openOrder } = useOrderDialog();

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
      <button
        type="button"
        onClick={() => openOrder()}
        className="btn-whatsapp shadow-2xl shadow-[#25D366]/30 text-xs px-6 py-3"
      >
        <MessageCircle size={15} />
        Order on WhatsApp
      </button>
    </div>
  );
}
