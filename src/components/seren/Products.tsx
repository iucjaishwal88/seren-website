import { useInView } from '../../hooks/useInView';
import { MessageCircle } from 'lucide-react';
import { useOrderDialog } from './OrderDialog';

const products = [
  {
    id: 1,
    name: 'Seren Floral Glow — Heavenly Home',
    price: 700,
    description: '"Each piece is lovingly handcrafted to feel as unique and comforting as home itself" — Perfect for gifting & home decor',
    image: 'https://i.ibb.co/ZpR1cLPt/product1-jpeg.jpg',
  },
  {
    id: 2,
    name: 'Midnight Focus — Vanilla Coffee Candle',
    price: 450,
    description: '"Hand-poured with care to turn your study time into a calm, focused ritual" — Student Collection | 200ml | Wooden Lid',
    image: 'https://i.ibb.co/gFFvpqcn/product2-jpeg.jpg',
  },
  {
    id: 3,
    name: 'Blush Teddy — Seren',
    price: 70,
    description: '"Handcrafted teddy candle that wraps your space in warmth. A little piece of love."',
    image: 'https://i.ibb.co/HfxVV8bT/product3-jpeg.jpg',
  },
  {
    id: 4,
    name: 'Heart Message Candle',
    price: 599,
    description: '"A handcrafted heart candle designed to hold your message and make every moment unforgettable."',
    image: 'https://i.ibb.co/yc8ChCcj/product4-pjeg.jpg',
  },
  {
    id: 5,
    name: 'Moment by Seren',
    price: 650,
    description: '"A thoughtful, curated gift hamper filled with sweet surprises made to brighten someone\'s day instantly."',
    image: 'https://i.ibb.co/7dsK4qmt/product5-pjeg.jpg',
  },
  {
    id: 6,
    name: 'Create Your Surprise Box',
    price: 699,
    description: '"Design your own gift hamper, curated with love to match your vibe and make every moment special."',
    image: 'https://i.ibb.co/BKt24rbr/product6-jpeg.jpg',
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {products.map((product, i) => (
            <ProductCard key={product.id} product={product} delay={i % 4} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductCard({ product, delay }: { product: typeof products[0]; delay: number }) {
  const { ref, isInView } = useInView(0.1);
  const { openOrder } = useOrderDialog();

  return (
    <div
      ref={ref}
      className={`section-fade section-fade-delay-${delay + 1} ${isInView ? 'visible' : ''}`}
    >
      <div className="relative rounded-3xl overflow-hidden bg-[#FAF8F3] shadow-sm border border-[#E0D8C8] transition-all duration-400 hover:shadow-xl hover:-translate-y-1 group flex flex-col h-full">
        <div className="relative overflow-hidden aspect-square bg-[#FAF8F3]">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2A2820]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        <div className="p-6 flex flex-col flex-1">
          <h3 className="font-serif text-xl md:text-2xl text-warm-mid mb-2 leading-snug">{product.name}</h3>
          <span className="font-serif text-lg text-sage font-medium mb-3">₹{product.price}</span>
          <p className="font-sans text-sm text-warm-mid/60 leading-relaxed mb-6 flex-1">{product.description}</p>

          <button
            type="button"
            onClick={() => openOrder(`${product.name} (₹${product.price})`)}
            className="mt-auto w-full flex items-center justify-center gap-2 py-3 rounded-full font-sans text-sm font-medium tracking-wide bg-[#25D366] text-white hover:bg-[#20ba59] hover:shadow-md transition-all duration-300"
          >
            <MessageCircle size={16} />
            Order on WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
}
