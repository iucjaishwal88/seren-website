import { createContext, useContext, useState, ReactNode, FormEvent } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { MessageCircle } from 'lucide-react';

const WHATSAPP_NUMBER = '918651205701';

type OrderContextType = {
  openOrder: (productLabel?: string) => void;
};

const OrderContext = createContext<OrderContextType | null>(null);

export function useOrderDialog() {
  const ctx = useContext(OrderContext);
  if (!ctx) throw new Error('useOrderDialog must be used within OrderDialogProvider');
  return ctx;
}

export function OrderDialogProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [productLabel, setProductLabel] = useState<string | undefined>(undefined);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const openOrder = (label?: string) => {
    setProductLabel(label);
    setOpen(true);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim().slice(0, 80);
    const trimmedPhone = phone.trim().slice(0, 20);
    if (!trimmedName || !trimmedPhone) return;

    const baseMsg = `Hi Seren! I'm ${trimmedName}, my number is ${trimmedPhone}. I'd like to place an order!`;
    const fullMsg = productLabel ? `${baseMsg}\n\nProduct: ${productLabel}` : baseMsg;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(fullMsg)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setOpen(false);
    setName('');
    setPhone('');
  };

  return (
    <OrderContext.Provider value={{ openOrder }}>
      {children}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className="sm:max-w-md border-0 rounded-3xl p-0 overflow-hidden"
          style={{ background: '#FAF8F3' }}
        >
          <div className="p-7 sm:p-8">
            <DialogHeader className="text-center sm:text-center mb-5">
              <DialogTitle className="font-serif text-2xl md:text-3xl text-warm-mid text-center">
                Almost There! 🕯️
              </DialogTitle>
              <DialogDescription className="font-sans text-sm text-warm-mid/60 text-center mt-2">
                Tell us who you are so we can personalise your order
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-sans text-xs tracking-wide uppercase text-warm-mid/60 mb-1.5">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  maxLength={80}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Ayushi"
                  className="w-full px-4 py-3 rounded-full bg-white border border-[#E0D8C8] font-sans text-sm text-warm-mid placeholder:text-warm-mid/30 focus:outline-none focus:border-sage transition-colors"
                />
              </div>

              <div>
                <label className="block font-sans text-xs tracking-wide uppercase text-warm-mid/60 mb-1.5">
                  Your Phone Number
                </label>
                <input
                  type="tel"
                  required
                  maxLength={20}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 ..."
                  className="w-full px-4 py-3 rounded-full bg-white border border-[#E0D8C8] font-sans text-sm text-warm-mid placeholder:text-warm-mid/30 focus:outline-none focus:border-sage transition-colors"
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full font-sans text-sm font-medium tracking-wide text-white hover:opacity-90 hover:shadow-md transition-all duration-300"
                style={{ background: '#9E9882' }}
              >
                <MessageCircle size={16} />
                Continue to WhatsApp
              </button>

              <button
                type="button"
                onClick={() => setOpen(false)}
                className="w-full text-center font-sans text-xs text-warm-mid/50 hover:text-warm-mid transition-colors py-1"
              >
                Cancel
              </button>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </OrderContext.Provider>
  );
}
