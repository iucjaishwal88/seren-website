import { useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';
import heroImage from '../../assets/hero-seren.png';

export default function Hero() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #FAF8F3 0%, #F0EBE0 45%, #E8E0CC 100%)' }}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, #9E9882 0%, transparent 70%)' }}
        />
        <div
          className="absolute bottom-1/3 left-1/3 w-64 h-64 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #C4BFA8 0%, transparent 70%)' }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-6 lg:px-8 w-full pt-24 pb-16 grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
        <div
          className={`transition-all duration-1000 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-sm border border-[#D8D2C0] rounded-full px-4 py-2 mb-8">
            <Sparkles size={13} className="text-sage" />
            <span className="font-sans text-xs text-warm-mid tracking-widest uppercase">Handmade in India</span>
          </div>

          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-warm-mid leading-[1.1] mb-6">
            Light Your<br />
            <em className="text-sage not-italic">Calm.</em>
          </h1>

          <p className="font-sans text-base md:text-lg text-warm-mid/70 leading-relaxed mb-10 max-w-md">
            Handcrafted scented candles & personalized gift hampers, made with love.
            For quiet nights, soft moments & a calmer mind.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <a href="#products" className="btn-primary text-center">
              Shop Now
            </a>
            <a href="#customize" className="btn-secondary text-center">
              Customize Your Order
            </a>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs text-warm-mid/60 font-sans">
            <span className="flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-sage inline-block" />
              Handmade in India
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-sage inline-block" />
              Affordable Luxury
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-sage inline-block" />
              Custom Orders Available
            </span>
          </div>
        </div>

        <div
          className={`relative transition-all duration-1000 delay-300 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          {/* Hero image — fixed: use object-contain so the full image is always visible and never cropped */}
          <div
            className="relative rounded-3xl overflow-hidden shadow-2xl h-[700px] md:h-[800px] max-w-sm mx-auto md:max-w-none flex items-center justify-center"
            style={{ background: 'linear-gradient(160deg, #F0EBE0 0%, #E8E0CC 100%)' }}
          >
            <img
              src={heroImage}
              alt="Seren luxury flower arrangements and candles"
              className="w-full h-full object-contain"
              loading="eager"
            />
          </div>

          <div className="absolute -bottom-4 -left-4 md:-left-8 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-[#E8E2D4] animate-float">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#F5F0E8] flex items-center justify-center">
                <span className="text-lg">🕯️</span>
              </div>
              <div>
                <p className="font-serif text-sm text-warm-mid font-medium">Custom Orders</p>
                <p className="font-sans text-xs text-warm-mid/60">Made just for you</p>
              </div>
            </div>
          </div>

          <div className="absolute -top-4 -right-4 md:-right-8 bg-sage/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
            <p className="font-sans text-xs text-warm-white font-medium">Reply in</p>
            <p className="font-serif text-lg text-warm-white font-semibold">1–2 hrs</p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <span className="font-sans text-xs tracking-widest text-warm-mid uppercase">Scroll</span>
        <div className="w-px h-10 bg-sage animate-pulse" />
      </div>
    </section>
  );
}
