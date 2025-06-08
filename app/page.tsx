import NavBar from "@/components/NavBar";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import FeaturesSection from "@/components/FeaturesSection";
import Testimonials from "@/components/Testimonials";

export default function page() {
  return (
    <>
      <NavBar />
      <Hero />
      <FeaturesSection />
      <Testimonials />
      <CTASection />
      <Footer />
    </>
  );
}
