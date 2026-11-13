import { motion } from "framer-motion";
import { Lightbulb, Eye, Rocket } from "lucide-react";

const cards = [
  {
    icon: Lightbulb,
    title: "Our Mission",
    text: "To advance the human potential for innovation and create meaningful changes for a better world by enabling ordinary people with solutions that combine Artificial Intelligence, Human Insight, and Digital Integration.",
  },
  {
    icon: Eye,
    title: "Our Vision",
    text: "To help dreamers transform their imagination into concrete ideas that can be built, launched, and improved.",
  },
  {
    icon: Rocket,
    title: "Innovation First",
    text: "We leverage cutting-edge AI technology within a foundational innovation system that bridges the gap between innovation and implementation, positioning ideas for success.",
  },
];

const AboutSection = () => (
  <section id="about" className="py-24 px-6">
    <div className="max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <span className="text-primary text-sm font-semibold tracking-widest uppercase">About Us</span>
        <h2 className="text-3xl md:text-5xl font-bold mt-4 mb-6">
          Your innovation canvas, powered by AI.
        </h2>
        <p className="text-muted-foreground max-w-3xl mx-auto text-lg">
          Syntheseed helps founders, entrepreneurs, and product teams turn raw abstract thoughts into commercial innovations — from research and validation to build and launch — all in one collaborative workspace.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-8">
        {cards.map((card, i) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className="bg-card border border-border rounded-2xl p-8 hover:border-primary/50 transition-colors"
          >
            <card.icon className="text-primary mb-4" size={32} />
            <h3 className="text-xl font-bold mb-3">{card.title}</h3>
            <p className="text-muted-foreground leading-relaxed">{card.text}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default AboutSection;
