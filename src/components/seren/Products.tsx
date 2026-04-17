import { useInView } from '../../hooks/useInView';
import { Star, ArrowRight } from 'lucide-react';

const products = [
  {
    id: 1,
    name: 'Scented Candles',
    tagline: 'Perfect for late-night calm',
    description: 'Hand-poured with intention. Custom scents available — from warm vanilla to fresh linen, earthy oud to floral rose.',
    price: '₹199 – ₹799',
    image: 'https://images.pexels.com/photos/3270223/pexels-photo-3270223.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&dpr=1',
    badge: 'Best Seller',
    isFeatured: true,
    cta: 'Order Now',
    href: '#customize',
  },
  {
    id: 2,
    name: 'Gift Hampers',
    tagline: 'Gifts that feel personal',
    description: 'Curated & aesthetic gift sets, fully customizable. A thoughtful way to say you care — without the generic.',
    price: '₹599 – ₹2499',
    image: 'https://images.pexels.com/photos/5632401/pexels-photo-5632401.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&dpr=1',
    badge: null,
    isFeatured: false,
    cta: 'Order Now',
    href: '#customize',
  },
  {
    id: 3,
    name: 'Custom Orders',
    tagline: 'Made just for you',
    description: 'Choose your scent, packaging, message & more. Fully personalized from start to finish — because you deserve it.',
    price: 'Starting ₹299',
    image: 'https://images.pexels.com/photos/4099354/pexels-photo-4099354.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&dpr=1',
    badge: 'Popular',
    isFeatured: false,
    cta: 'Customize Now',
    href: '#customize',
  },
];

export default function Products() {
  const { ref, isInView } = useInView(0.1);

  return (
    <section id="products" className="py-24 md:py-36" style={{ background: '#F5F0E8' }}>
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16 md:mb-20" ref={ref}>
          <div className={`section-fade ${isInView ? 'visible' : ''}`}>
            <span className="font-sans text-xs tracking-[0.25em] uppercase text-sage">What We Offer</span>
            <h2 className="font-serif text-4xl md:text-5xl text-warm-mid mt-3 mb-5">
              Our Collections
            </h2>
            <p className="font-sans text-base text-warm-mid/60 max-w-md mx-auto">
              Every product is made by hand, with love — designed to bring softness into your space.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {products.map((product, i) => (
            <ProductCard key={product.id} product={product} delay={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductCard({ product, delay }: { product: typeof products[0]; delay: number }) {
  const { ref, isInView } = useInView(0.1);

  return (
    <div
      ref={ref}
      className={`section-fade section-fade-delay-${delay + 1} ${isInView ? 'visible' : ''}`}
    >
      <div
        className={`relative rounded-3xl overflow-hidden bg-[#FAF8F3] shadow-sm border transition-all duration-400 hover:shadow-xl hover:-translate-y-1 group ${
          product.isFeatured
            ? 'border-sage/40 ring-1 ring-sage/20'
            : 'border-[#E0D8C8]'
        }`}
      >
        {product.badge && (
          <div className={`absolute top-4 right-4 z-10 flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-sans font-medium tracking-wide ${
            product.isFeatured
              ? 'bg-sage text-warm-white'
              : 'bg-warm-dark text-warm-white'
          }`}>
            {product.isFeatured && <Star size={10} fill="currentColor" />}
            {product.badge}
          </div>
        )}

        <div className="relative overflow-hidden aspect-square">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2A2820]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        <div className="p-6">
          <p className="font-sans text-xs text-sage tracking-wider uppercase mb-2">{product.tagline}</p>
          <h3 className="font-serif text-2xl text-warm-mid mb-3">{product.name}</h3>
          <p className="font-sans text-sm text-warm-mid/60 leading-relaxed mb-5">{product.description}</p>

          <div className="flex items-center justify-between">
            <span className="font-serif text-lg text-warm-mid font-medium">{product.price}</span>
          </div>

          <a
            href={product.href}
            className={`mt-4 w-full flex items-center justify-center gap-2 py-3 rounded-full font-sans text-sm font-medium tracking-wide transition-all duration-300 group/btn ${
              product.isFeatured
                ? 'bg-sage text-warm-white hover:bg-warm-mid hover:shadow-md'
                : 'border border-[#C4BFA8] text-warm-mid hover:bg-sage hover:text-warm-white hover:border-sage'
            }`}
          >
            {product.cta}
            <ArrowRight size={14} className="transition-transform duration-300 group-hover/btn:translate-x-1" />
          </a>
        </div>
      </div>
    </div>
  );
}
