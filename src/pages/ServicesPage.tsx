import { useEffect } from "react";
import { motion } from "framer-motion";
import { Eye, Compass, ShieldCheck } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const pillars = [
  {
    icon: Eye,
    title: "CLARITY",
    text: "A decision-specific view of whether available evidence supports the intended AI use.",
  },
  {
    icon: Compass,
    title: "ACTION",
    text: "A clear path to address consequential gaps before they become embedded in operations.",
  },
  {
    icon: ShieldCheck,
    title: "ACCOUNTABILITY",
    text: "Documented assurance findings, limitations and decision ownership that leadership can stand behind.",
  },
];

const ServicesPage = () => {
  useEffect(() => window.scrollTo(0, 0), []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="pt-32 pb-24 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <span className="text-primary text-sm font-semibold tracking-widest uppercase">Services</span>
            <h1 className="text-4xl md:text-6xl font-bold mt-4 mb-8">
              Data Suitability Assurance
            </h1>
            <p className="text-muted-foreground text-lg max-w-3xl leading-relaxed">
              Syntheseed Data Suitability Assurance establishes what an organization can
              reasonably rely on, where material data limitations exist, and what must
              change before or during AI use. It examines suitability in the context of
              the intended decision, not as a generic property of a dataset. Where
              upstream model data is inaccessible, assurance claims remain bounded by
              the evidence available.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 mb-24">
            {pillars.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card border border-border rounded-2xl p-8"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                  <p.icon className="text-primary" size={24} />
                </div>
                <h3 className="text-lg font-bold tracking-wider mb-3">{p.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{p.text}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-24"
          >
            <span className="text-primary text-sm font-semibold tracking-widest uppercase">Professional Consulting</span>
            <h2 className="text-2xl md:text-4xl font-bold mt-4 mb-6">
              Expert guidance for your AI journey
            </h2>
            <p className="text-muted-foreground text-lg max-w-3xl leading-relaxed">
              Syntheseed offers professional consulting to help companies integrate with
              AI and manage the data associated with integrating to AI. Our consultants
              work alongside your team to plan the integration, put the right data
              practices in place, and make sure your AI adoption is built on a
              foundation you can trust.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-card border border-primary/30 rounded-2xl p-10 md:p-14 text-center"
          >
            <h2 className="text-2xl md:text-4xl font-bold tracking-wide leading-snug">
              BEFORE YOU TRUST THE MODEL, ESTABLISH WHETHER ITS DATA IS FIT FOR PURPOSE.
            </h2>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ServicesPage;
