import Navbar from "@/components/Navbar";
import Seo from "@/components/Seo";
import MarketingHome from "@/components/home/MarketingHome";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="min-h-screen bg-background text-foreground">
    <Seo
      description="Syntheseed builds decision systems and advises leaders on AI. AVERTA governed decision authority, innovation products, and AI consulting grounded in four decades of applied AI."
    />
    <Navbar />
    <MarketingHome />
    <Footer />
  </div>
);

export default Index;
