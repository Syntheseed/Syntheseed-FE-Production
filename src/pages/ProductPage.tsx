import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { products } from "@/data/products";
import NotFound from "./NotFound";

const canvasItems = [
  { label: "PROBLEM", color: "from-red-500/20 to-red-600/10", icon: "🎯" },
  { label: "SOLUTION", color: "from-green-500/20 to-green-600/10", icon: "💡" },
  { label: "AUDIENCE", color: "from-blue-500/20 to-blue-600/10", icon: "👥" },
  { label: "LEGAL", color: "from-purple-500/20 to-purple-600/10", icon: "⚖️" },
  { label: "GTM", color: "from-yellow-500/20 to-yellow-600/10", icon: "🚀" },
  { label: "RISKS", color: "from-orange-500/20 to-orange-600/10", icon: "⚠️" },
  { label: "METRICS", color: "from-cyan-500/20 to-cyan-600/10", icon: "📊" },
  { label: "MOAT", color: "from-pink-500/20 to-pink-600/10", icon: "🏰" },
];

const steps = [
  {
    num: "01",
    title: "Capture and Research",
    text: "Capture your thoughts and start developing your idea.",
    img: "https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    num: "02",
    title: "Expand and Validate",
    text: "Let AI surface assumptions, risks, and market signals. Collaborate with expert agents and prioritize the strongest wedge to strengthen your idea.",
    img: "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    num: "03",
    title: "Structure and Finalize",
    text: "Deep dive into patent research. Shape pricing, packaging, and go-to-market paths.",
    img: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    num: "04",
    title: "Build and Launch",
    text: "Produce and export investor‑ready briefs. Finalize plans and build your idea. Ready it for launch.",
    img: "https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
];

const ProductPage = () => {
  const { slug } = useParams();
  const product = products.find((p) => p.slug === slug);
  useEffect(() => window.scrollTo(0, 0), [slug]);
  if (!product) return <NotFound />;
  const others = products.filter((p) => p.slug !== slug);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="pt-32 pb-24 px-6">
        <div className="max-w-5xl mx-auto">
          <Link to="/#product" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-10">
            <ArrowLeft size={16} /> All products
          </Link>
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
            <product.icon className="text-primary" size={32} />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">{product.name}</h1>
          <p className="text-xl text-primary mb-6">{product.tagline}</p>
          <p className="text-muted-foreground text-lg max-w-3xl mb-16">{product.description}</p>

          <div className="grid md:grid-cols-3 gap-6 mb-24">
            {product.features.map((f) => (
              <div key={f.title} className="bg-card border border-border rounded-2xl p-8">
                <h3 className="text-lg font-bold mb-2">{f.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{f.text}</p>
              </div>
            ))}
          </div>

          {product.slug === "abstract-to-concrete" && (
            <div className="mb-24">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <h2 className="text-2xl md:text-4xl font-bold">
                  A structured framework for your ideas
                </h2>
              </motion.div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {canvasItems.map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    whileHover={{ scale: 1.05 }}
                    className={`bg-gradient-to-br ${item.color} border border-border rounded-2xl p-6 text-center cursor-pointer hover:border-primary/40 transition-all`}
                  >
                    <span className="text-3xl mb-3 block">{item.icon}</span>
                    <span className="text-sm font-bold tracking-wider text-foreground">{item.label}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {product.slug === "abstract-to-concrete" && (
            <div className="mb-24">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <span className="text-primary text-sm font-semibold tracking-widest uppercase">How it works</span>
                <h2 className="text-2xl md:text-4xl font-bold mt-4">
                  From spark → launch in 4 steps
                </h2>
              </motion.div>
              <div className="space-y-16">
                {steps.map((step, i) => (
                  <motion.div
                    key={step.num}
                    initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className={`flex flex-col ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} gap-8 items-center`}
                  >
                    <div className="md:w-1/2">
                      <img
                        src={step.img}
                        alt={step.title}
                        className="rounded-2xl w-full h-64 md:h-80 object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div className="md:w-1/2 space-y-4">
                      <span className="text-primary text-sm font-bold tracking-widest">STEP {step.num}</span>
                      <h3 className="text-2xl md:text-3xl font-bold">{step.title}</h3>
                      <p className="text-muted-foreground leading-relaxed text-lg">{step.text}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          <h2 className="text-2xl font-bold mb-6">Other products</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {others.map((p) => (
              <Link key={p.slug} to={`/products/${p.slug}`} className="bg-card border border-border rounded-2xl p-6 hover:border-primary/50 transition-all">
                <h3 className="font-bold mb-1">{p.name}</h3>
                <p className="text-muted-foreground text-sm">{p.tagline}</p>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductPage;
