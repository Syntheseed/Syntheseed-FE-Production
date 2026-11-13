import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const posts = [
  {
    title: "When Strategy Meets Disruption: Key Lessons from The Limits of Strategy – Part I",
    tag: "Strategy",
    date: "Feb 17, 2026",
    img: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800",
    desc: "Key takeaways from Ernest von Simson's book and their relevance for AI innovators and leaders.",
  },
  {
    title: "The Promise and Challenges of Artificial General Intelligence (AGI)",
    tag: "AGI",
    date: "Nov 04, 2025",
    img: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800",
    desc: "AGI Represents the Next Frontier in Humanity's Technological Journey.",
  },
  {
    title: "From Abstract to Concrete",
    tag: "Innovation",
    date: "Nov 04, 2025",
    img: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800",
    desc: "How AI, Human Intelligence, and Digital Integration Boost Innovation.",
  },
  {
    title: "Unlocking the Potential Within",
    tag: "Innovation",
    date: "Nov 02, 2025",
    img: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800",
    desc: "Transform Your Abstract Ideas into Concrete Innovations with Syntheseed.",
  },
];

const BlogSection = () => (
  <section id="blog" className="py-24 px-6">
    <div className="max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <span className="text-primary text-sm font-semibold tracking-widest uppercase">Blog</span>
        <h2 className="text-3xl md:text-5xl font-bold mt-4 mb-6">
          Latest from Syntheseed
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
          Ideas on product strategy, go-to-market, and founder operations.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {posts.map((post, i) => (
          <motion.article
            key={post.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="bg-card border border-border rounded-2xl overflow-hidden group cursor-pointer hover:border-primary/50 transition-all"
          >
            <div className="overflow-hidden h-48">
              <img
                src={post.img}
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </div>
            <div className="p-5 space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full font-medium">{post.tag}</span>
                <span className="text-xs text-muted-foreground">{post.date}</span>
              </div>
              <h3 className="font-bold text-sm leading-snug line-clamp-2">
                {post.title}
              </h3>
              <p className="text-muted-foreground text-xs line-clamp-2">{post.desc}</p>
              <span className="text-primary text-xs flex items-center gap-1 font-semibold group-hover:gap-2 transition-all">
                Read More <ArrowRight size={12} />
              </span>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  </section>
);

export default BlogSection;
