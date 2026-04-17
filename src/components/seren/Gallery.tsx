import { useInView } from '../hooks/useInView';
import { Instagram } from 'lucide-react';

const images = [
  {
    src: 'https://images.pexels.com/photos/3059609/pexels-photo-3059609.jpeg?auto=compress&cs=tinysrgb&w=500&h=700&dpr=1',
    alt: 'Cozy candle moment',
    tall: true,
  },
  {
    src: 'https://images.pexels.com/photos/1123262/pexels-photo-1123262.jpeg?auto=compress&cs=tinysrgb&w=500&h=400&dpr=1',
    alt: 'Candle glow evening',
    tall: false,
  },
  {
    src: 'https://images.pexels.com/photos/6707628/pexels-photo-6707628.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&dpr=1',
    alt: 'Scented candle lifestyle',
    tall: false,
  },
  {
    src: 'https://images.pexels.com/photos/4397916/pexels-photo-4397916.jpeg?auto=compress&cs=tinysrgb&w=500&h=700&dpr=1',
    alt: 'Aesthetic candle setup',
    tall: true,
  },
  {
    src: 'https://images.pexels.com/photos/5632401/pexels-photo-5632401.jpeg?auto=compress&cs=tinysrgb&w=500&h=400&dpr=1',
    alt: 'Gift hamper aesthetic',
    tall: false,
  },
  {
    src: 'https://images.pexels.com/photos/4099354/pexels-photo-4099354.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&dpr=1',
    alt: 'Custom candle packaging',
    tall: false,
  },
];

export default function Gallery() {
  const { ref, isInView } = useInView(0.1);

  return (
    <section className="py-24 md:py-36" style={{ background: '#2A2820' }}>
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-14" ref={ref}>
          <div className={`section-fade ${isInView ? 'visible' : ''}`}>
            <div className="inline-flex items-center gap-2 mb-4">
              <Instagram size={16} className="text-sage" />
              <span className="font-sans text-xs tracking-[0.25em] uppercase text-sage">@seren</span>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl text-warm-white mb-4">
              Seen in your cozy moments
            </h2>
            <p className="font-sans text-sm text-warm-white/40 max-w-md mx-auto">
              Real moments. Real calm.
            </p>
          </div>
        </div>

        <div className="columns-2 md:columns-3 gap-3 md:gap-4 space-y-3 md:space-y-4">
          {images.map((img, i) => (
            <GalleryItem key={i} img={img} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function GalleryItem({ img, index }: { img: typeof images[0]; index: number }) {
  const { ref, isInView } = useInView(0.05);

  return (
    <div
      ref={ref}
      className={`section-fade ${isInView ? 'visible' : ''} break-inside-avoid`}
      style={{ transitionDelay: `${index * 0.08}s` }}
    >
      <div className="relative overflow-hidden rounded-2xl group cursor-pointer">
        <img
          src={img.src}
          alt={img.alt}
          className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-[#2A2820]/0 group-hover:bg-[#2A2820]/30 transition-all duration-300 flex items-center justify-center">
          <Instagram size={22} className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </div>
    </div>
  );
}
