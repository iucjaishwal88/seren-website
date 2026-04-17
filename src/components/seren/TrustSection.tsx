import { useInView } from '../../hooks/useInView';
import { Heart, ShieldCheck, Sparkles } from 'lucide-react';

const pillars = [
  {
    icon: Heart,
    label: 'Loved by a growing community',
    sub: '500+ happy customers across India',
  },
  {
    icon: ShieldCheck,
    label: 'Handmade with care',
    sub: 'Small batches, big intentions',
  },
  {
    icon: Sparkles,
    label: 'Affordable luxury for everyday calm',
    sub: 'Premium quality at honest prices',
  },
];

export default function TrustSection() {
  const { ref, isInView } = useInView(0.1);

  return (
    <section className="py-20 md:py-28" style={{ background: '#2A2820' }}>
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 md:gap-12" ref={ref}>
          {pillars.map((p, i) => {
            const Icon = p.icon;
            return (
              <div
                key={p.label}
                className={`section-fade section-fade-delay-${i + 1} ${isInView ? 'visible' : ''} text-center`}
              >
                <div className="w-12 h-12 rounded-full border border-sage/30 flex items-center justify-center mx-auto mb-5">
                  <Icon size={18} className="text-sage" strokeWidth={1.5} />
                </div>
                <p className="font-serif text-lg text-warm-white mb-2">{p.label}</p>
                <p className="font-sans text-sm text-warm-white/40">{p.sub}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
