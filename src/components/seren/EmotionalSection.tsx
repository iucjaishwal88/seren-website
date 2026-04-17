import { useInView } from '../hooks/useInView';

export default function EmotionalSection() {
  const { ref, isInView } = useInView(0.15);

  return (
    <section className="relative py-28 md:py-40 overflow-hidden" style={{ background: '#2A2820' }}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#9E9882]/30 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#9E9882]/30 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-5"
          style={{ background: 'radial-gradient(circle, #9E9882 0%, transparent 70%)' }} />
      </div>

      <div className="max-w-3xl mx-auto px-6 text-center" ref={ref}>
        <div className={`section-fade ${isInView ? 'visible' : ''}`}>
          <p className="font-serif italic text-3xl md:text-4xl lg:text-5xl text-warm-white/90 leading-relaxed mb-8">
            Soft light.<br />
            Quiet thoughts.<br />
            A moment that feels like yours.
          </p>

          <div className="w-12 h-px bg-sage/60 mx-auto my-10" />

          <p className="font-sans text-base md:text-lg text-warm-white/50 leading-relaxed max-w-lg mx-auto">
            Seren is not just a candle.<br />
            It's your pause in a loud world.
          </p>
        </div>
      </div>
    </section>
  );
}
