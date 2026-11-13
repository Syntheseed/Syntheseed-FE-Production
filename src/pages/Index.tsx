import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProductSection from "@/components/ProductSection";
import CareersSection from "@/components/CareersSection";
import ContactSection from "@/components/ContactSection";
import BlogSection from "@/components/BlogSection";
import BookSection from "@/components/BookSection";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <HeroSection />
    <AboutSection />
    <ProductSection />
    <CareersSection />
    <ContactSection />
    <BookSection />
    <BlogSection />
    <Footer />
  </div>
);

export default Index;
