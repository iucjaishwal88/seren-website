import { useInView } from '../../hooks/useInView';

export default function About() {
  const { ref, isInView } = useInView(0.12);

  return (
    <section id="about" className="py-24 md:py-36" style={{ background: '#FAF8F3' }}>
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-24 items-center" ref={ref}>
          <div className={`relative section-fade ${isInView ? 'visible' : ''}`}>
            <div className="relative rounded-3xl overflow-hidden aspect-[3/4] shadow-xl">
              <img
                src="https://images.pexels.com/photos/4397916/pexels-photo-4397916.jpeg?auto=compress&cs=tinysrgb&w=700&h=900&dpr=1"
                alt="Seren handcrafted candle"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2A2820]/10 to-transparent" />
            </div>
            <div className="absolute -bottom-6 -right-6 w-40 h-40 rounded-2xl overflow-hidden shadow-lg border-4 border-[#FAF8F3]">
              <img
                src="https://images.pexels.com/photos/6707628/pexels-photo-6707628.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=1"
                alt="Candle detail"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>

          <div className={`section-fade section-fade-delay-2 ${isInView ? 'visible' : ''}`}>
            <div className="inline-block mb-6">
              <span className="font-sans text-xs tracking-[0.25em] uppercase text-sage">Our Story</span>
              <div className="h-px w-full bg-sage/30 mt-2" />
            </div>

            <h2 className="font-serif text-4xl md:text-5xl text-warm-mid leading-tight mb-8">
              Seren means<br />
              <em className="italic text-sage">calm.</em>
            </h2>

            <p className="font-sans text-base text-warm-mid/70 leading-relaxed mb-6">
              Every candle we make is hand-poured with intention — designed to bring peace into your everyday life. We believe that a single flame can transform a room, a mood, a moment.
            </p>

            <p className="font-sans text-base text-warm-mid/70 leading-relaxed mb-10">
              Born from a love of slow living and natural beauty, Seren is crafted in small batches, using ingredients that care for both you and the earth. Each order is personal. Each candle is yours.
            </p>

            <div className="flex gap-10">
              <div>
                <p className="font-serif text-3xl text-warm-mid font-semibold">500+</p>
                <p className="font-sans text-xs text-warm-mid/50 mt-1 tracking-wide">Happy Customers</p>
              </div>
              <div className="w-px bg-[#E0D8C8]" />
              <div>
                <p className="font-serif text-3xl text-warm-mid font-semibold">100%</p>
                <p className="font-sans text-xs text-warm-mid/50 mt-1 tracking-wide">Handmade</p>
              </div>
              <div className="w-px bg-[#E0D8C8]" />
              <div>
                <p className="font-serif text-3xl text-warm-mid font-semibold">∞</p>
                <p className="font-sans text-xs text-warm-mid/50 mt-1 tracking-wide">Custom Options</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
