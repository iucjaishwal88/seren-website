import { useState } from 'react';
import { useInView } from '../../hooks/useInView';
import { MessageCircle, CheckCircle } from 'lucide-react';

const productOptions = [
  'Scented Candle',
  'Gift Hamper',
  'Custom Order',
  'Bulk Order (10+)',
];

const occasionOptions = [
  'Birthday',
  'Anniversary',
  'Self-care',
  'Corporate Gift',
  'Wedding Favor',
  'Just Because',
  'Other',
];

export default function CustomizeForm() {
  const { ref, isInView } = useInView(0.1);
  const [form, setForm] = useState({
    name: '',
    product: '',
    details: '',
    occasion: '',
    phone: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = encodeURIComponent(
      `Hi Seren! 🕯️\n\nName: ${form.name}\nProduct: ${form.product}\nOccasion: ${form.occasion}\nDetails: ${form.details}\nContact: ${form.phone}\n\nLooking forward to my custom order!`
    );
    window.open(`https://wa.me/918651205701?text=${msg}`, '_blank');
  };

  const isValid = form.name && form.product && form.phone;

  return (
    <section id="customize" className="py-24 md:py-36 relative overflow-hidden" style={{ background: '#FAF8F3' }}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #9E9882 0%, transparent 70%)' }} />
      </div>

      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-start" ref={ref}>
          <div className={`section-fade ${isInView ? 'visible' : ''}`}>
            <span className="font-sans text-xs tracking-[0.25em] uppercase text-sage">Custom Orders</span>
            <h2 className="font-serif text-4xl md:text-5xl text-warm-mid mt-3 mb-6 leading-tight">
              Make It<br />
              <em className="italic text-sage">Yours.</em>
            </h2>
            <p className="font-sans text-base text-warm-mid/60 leading-relaxed mb-10">
              Every Seren product is crafted just for you. Tell us what you have in mind — we'll make it happen.
            </p>

            <div className="space-y-5">
              {[
                'We reply within 1–2 hours',
                '100% personalized from scratch',
                'Free customization consultation',
                'Delivery across India',
              ].map((point) => (
                <div key={point} className="flex items-center gap-3">
                  <CheckCircle size={16} className="text-sage flex-shrink-0" />
                  <span className="font-sans text-sm text-warm-mid/70">{point}</span>
                </div>
              ))}
            </div>

            <div className="mt-12 p-6 rounded-2xl bg-[#2A2820]">
              <p className="font-sans text-xs text-warm-white/50 uppercase tracking-widest mb-2">WhatsApp First</p>
              <p className="font-serif text-xl text-warm-white leading-relaxed">
                "We believe every gift should feel like it was made for one person only."
              </p>
              <p className="font-sans text-xs text-sage mt-3">— The Seren Team</p>
            </div>
          </div>

          <div className={`section-fade section-fade-delay-2 ${isInView ? 'visible' : ''}`}>
            <form onSubmit={handleWhatsApp} className="space-y-5">
              <div className="p-6 md:p-8 rounded-3xl bg-white shadow-sm border border-[#E0D8C8] space-y-5">
                <div>
                  <label className="block font-sans text-xs text-warm-mid/60 uppercase tracking-wider mb-2">Your Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="What should we call you?"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-[#E0D8C8] bg-[#FAF8F3] font-sans text-sm text-warm-mid placeholder:text-warm-mid/30 focus:outline-none focus:ring-2 focus:ring-sage/30 focus:border-sage transition-all"
                  />
                </div>

                <div>
                  <label className="block font-sans text-xs text-warm-mid/60 uppercase tracking-wider mb-2">Product Type *</label>
                  <select
                    name="product"
                    value={form.product}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-[#E0D8C8] bg-[#FAF8F3] font-sans text-sm text-warm-mid focus:outline-none focus:ring-2 focus:ring-sage/30 focus:border-sage transition-all appearance-none cursor-pointer"
                  >
                    <option value="">Select a product</option>
                    {productOptions.map((o) => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block font-sans text-xs text-warm-mid/60 uppercase tracking-wider mb-2">Occasion</label>
                  <select
                    name="occasion"
                    value={form.occasion}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-[#E0D8C8] bg-[#FAF8F3] font-sans text-sm text-warm-mid focus:outline-none focus:ring-2 focus:ring-sage/30 focus:border-sage transition-all appearance-none cursor-pointer"
                  >
                    <option value="">What's the occasion?</option>
                    {occasionOptions.map((o) => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block font-sans text-xs text-warm-mid/60 uppercase tracking-wider mb-2">Customization Details</label>
                  <textarea
                    name="details"
                    value={form.details}
                    onChange={handleChange}
                    placeholder="Scent preferences, packaging ideas, personal message, quantity..."
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl border border-[#E0D8C8] bg-[#FAF8F3] font-sans text-sm text-warm-mid placeholder:text-warm-mid/30 focus:outline-none focus:ring-2 focus:ring-sage/30 focus:border-sage transition-all resize-none"
                  />
                </div>

                <div>
                  <label className="block font-sans text-xs text-warm-mid/60 uppercase tracking-wider mb-2">Contact Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-[#E0D8C8] bg-[#FAF8F3] font-sans text-sm text-warm-mid placeholder:text-warm-mid/30 focus:outline-none focus:ring-2 focus:ring-sage/30 focus:border-sage transition-all"
                  />
                </div>

                <button
                  type="submit"
                  disabled={!isValid}
                  className={`w-full btn-whatsapp transition-all duration-300 ${!isValid ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <MessageCircle size={16} />
                  Send Order on WhatsApp
                </button>

                <div className="flex justify-center gap-6 pt-1">
                  <span className="font-sans text-xs text-warm-mid/40">We reply within 1–2 hours</span>
                  <span className="font-sans text-xs text-warm-mid/40">100% personalized</span>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
