import Navbar from "../components/layout/Navbar";
import Hero from "../components/home/Hero";
import Features from "../components/home/Features";
import WhyChoose from "../components/home/WhyChoose";
import Stats from "../components/home/Stats";
import CTA from "../components/home/CTA";
import Footer from "../components/layout/Footer";
function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <WhyChoose />
      <Stats />
      <CTA />
        <Footer />
    </>
  );
}

export default Home;