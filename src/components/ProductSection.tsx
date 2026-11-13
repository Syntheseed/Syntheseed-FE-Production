import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { products } from "@/data/products";

const ProductSection = () => (
  <section id="product" className="py-24 px-6">
    <div className="max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <span className="text-primary text-sm font-semibold tracking-widest uppercase">Products</span>
        <h2 className="text-3xl md:text-5xl font-bold mt-4 mb-6">
          Innovative products to help you innovate, manage risk and protect your data.
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6">
        {products.map((p, i) => (
          <motion.div
            key={p.slug}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <Link
              to={`/products/${p.slug}`}
              className="block h-full bg-card border border-border rounded-2xl p-8 group hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                <p.icon className="text-primary" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">{p.name}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">{p.tagline}</p>
              <span className="inline-flex items-center gap-2 text-primary text-sm font-semibold">
                Learn more <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ProductSection;
