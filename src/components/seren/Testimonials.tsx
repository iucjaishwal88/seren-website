import { useInView } from '../../hooks/useInView';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    quote: "Bahut sundar laga, note bhi bahut pyaara tha, aur complimentary flower bhi! Keep working hard — bahut aage jayega yeh business!",
    name: 'Nandini',
    location: 'India',
    stars: 5,
  },
  {
    quote: "Overall love the candle and packaging. Also loved the note. Thanks for the sunflower — such a sweet touch!",
    name: 'Pallavi',
    location: 'India',
    stars: 5,
  },
  {
    quote: "The candle smells too good! Love the candle, the lavender fragrance and the packaging too!",
    name: 'Aditya',
    location: 'India',
    stars: 5,
  },
  {
    quote: "Bahut zayda pasand aaya — itna sundar candle hum kahi dekhe hi nahi!",
    name: 'Happy Customer',
    location: 'India',
    stars: 5,
  },
  {
    quote: "This candle is made with so much detail and love. Truly appreciate the craftsmanship.",
    name: 'Spidey',
    location: 'India',
    stars: 5,
  },
];

export default function Testimonials() {
  const { ref, isInView } = useInView(0.1);

  return (
    <section className="py-24 md:py-36" style={{ background: '#FAF8F3' }}>
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-14" ref={ref}>
          <div className={`section-fade ${isInView ? 'visible' : ''}`}>
            <span className="font-sans text-xs tracking-[0.25em] uppercase text-sage">What They Say</span>
            <h2 className="font-serif text-4xl md:text-5xl text-warm-mid mt-3">
              Words that warm us
            </h2>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((t, i) => (
            <TestimonialCard key={t.name} testimonial={t} delay={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ testimonial, delay }: { testimonial: typeof testimonials[0]; delay: number }) {
  const { ref, isInView } = useInView(0.1);

  return (
    <div
      ref={ref}
      className={`section-fade section-fade-delay-${Math.min(delay + 1, 3)} ${isInView ? 'visible' : ''}`}
    >
      <div className="h-full p-7 md:p-8 rounded-3xl bg-white border border-[#E0D8C8] shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 flex flex-col">
        <Quote size={24} className="text-sage/40 mb-5 flex-shrink-0" strokeWidth={1} />

        <p className="font-serif italic text-base md:text-lg text-warm-mid/80 leading-relaxed flex-1 mb-6">
          &ldquo;{testimonial.quote}&rdquo;
        </p>

        <div className="flex items-center gap-3 pt-4 border-t border-[#F0EBE0]">
          <div className="w-10 h-10 rounded-full bg-[#F5F0E8] flex items-center justify-center flex-shrink-0">
            <span className="font-serif text-base text-sage">{testimonial.name[0]}</span>
          </div>
          <div>
            <p className="font-sans text-sm font-medium text-warm-mid">{testimonial.name}</p>
            <p className="font-sans text-xs text-warm-mid/40">{testimonial.location}</p>
          </div>
          <div className="ml-auto flex gap-0.5">
            {Array.from({ length: testimonial.stars }).map((_, i) => (
              <span key={i} className="text-sage text-xs">&#9733;</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
