import { useInView } from '../../hooks/useInView';
import { Flame, Leaf, Gift } from 'lucide-react';

const reasons = [
  {
    icon: Flame,
    title: 'Handcrafted with Love',
    description: 'Every candle is hand-poured in small batches, with care and intention baked into each one.',
  },
  {
    icon: Leaf,
    title: 'Natural Ingredients',
    description: 'We use natural waxes, skin-safe fragrance oils & cotton wicks — good for you and the planet.',
  },
  {
    icon: Gift,
    title: 'Fully Customizable',
    description: 'From scent to packaging to personal notes — every detail can be tailored to your vision.',
  },
];

export default function WhySeren() {
  const { ref, isInView } = useInView(0.1);

  return (
    <section className="py-24 md:py-36" style={{ background: '#F5F0E8' }}>
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16" ref={ref}>
          <div className={`section-fade ${isInView ? 'visible' : ''}`}>
            <span className="font-sans text-xs tracking-[0.25em] uppercase text-sage">Why Choose Us</span>
            <h2 className="font-serif text-4xl md:text-5xl text-warm-mid mt-3">
              The Seren Difference
            </h2>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {reasons.map((reason, i) => (
            <ReasonCard key={reason.title} reason={reason} delay={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ReasonCard({ reason, delay }: { reason: typeof reasons[0]; delay: number }) {
  const { ref, isInView } = useInView(0.1);
  const Icon = reason.icon;

  return (
    <div
      ref={ref}
      className={`section-fade section-fade-delay-${delay + 1} ${isInView ? 'visible' : ''}`}
    >
      <div className="text-center p-8 rounded-3xl bg-[#FAF8F3] border border-[#E0D8C8] hover:shadow-md transition-all duration-300 hover:-translate-y-1 group">
        <div className="w-16 h-16 rounded-2xl bg-[#F0EBE0] flex items-center justify-center mx-auto mb-6 group-hover:bg-sage/10 transition-colors duration-300">
          <Icon size={26} className="text-sage" strokeWidth={1.5} />
        </div>
        <h3 className="font-serif text-xl text-warm-mid mb-3">{reason.title}</h3>
        <p className="font-sans text-sm text-warm-mid/60 leading-relaxed">{reason.description}</p>
      </div>
    </div>
  );
}
