import Navbar from '@/components/seren/Navbar';
import Hero from '@/components/seren/Hero';
import EmotionalSection from '@/components/seren/EmotionalSection';
import About from '@/components/seren/About';
import Products from '@/components/seren/Products';
import Gallery from '@/components/seren/Gallery';
import CustomizeForm from '@/components/seren/CustomizeForm';
import WhySeren from '@/components/seren/WhySeren';
import TrustSection from '@/components/seren/TrustSection';
import Testimonials from '@/components/seren/Testimonials';
import Footer from '@/components/seren/Footer';
import MobileCta from '@/components/seren/MobileCta';
import ChatButton from '@/components/seren/ChatButton';

const Index = () => {
  return (
    <div className="min-h-screen" style={{ background: '#FAF8F3' }}>
      <Navbar />
      <main>
        <Hero />
        <EmotionalSection />
        <About />
        <Products />
        <Gallery />
        <CustomizeForm />
        <WhySeren />
        <TrustSection />
        <Testimonials />
      </main>
      <Footer />
      <MobileCta />
      <ChatButton />
    </div>
  );
};

export default Index;
