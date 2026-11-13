import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import bookCover from "@/assets/causality-economics-ai-cover.jpg";

const BookSection = () => (
  <section id="book" className="py-24 px-6 bg-card/50">
    <div className="max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <span className="text-primary text-sm font-semibold tracking-widest uppercase">New Book</span>
        <h2 className="text-3xl md:text-5xl font-bold mt-4">
          From our Executive Chairman
        </h2>
      </motion.div>

      <div className="flex flex-col md:flex-row gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="md:w-2/5"
        >
          <div className="rounded-2xl overflow-hidden border border-primary/30 shadow-lg shadow-primary/10">
            <img
              src={bookCover}
              alt="Book cover: On Causality, Inference, Computational Effects, and the Economics of AI by Alex Abraham"
              className="w-full h-auto block"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="md:w-3/5 space-y-6"
        >
          <h3 className="text-2xl md:text-3xl font-bold">
            Where does the economic cost of AI truly begin?
          </h3>
          <p className="text-muted-foreground leading-relaxed text-lg">
            Alex Abraham introduces the AI Economic Causality Chain, tracing AI economics
            upstream from real-world causality and statistical structure through algorithmic
            encoding, inference, computational workload, and infrastructure. Across twenty
            chapters, the analysis connects computational requirements with organizational
            cost, scalability, competitive advantage, capital intensity, industry structure,
            and the emerging inference economy.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Supported by formal models, empirical illustrations, structural stress tests, and
            mathematical foundations, the book develops a broader framework of Computational
            AI Economics — showing not simply what AI costs, but why those costs arise and
            how they propagate.
          </p>
          <p className="border-l-2 border-primary pl-4 text-lg italic leading-relaxed">
            The book is <span className="font-semibold not-italic">“the definitive, scholarly,
            foundational work on AI cost origination and propagation.”</span>
          </p>
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 gap-2"
            asChild
          >
            <a
              href="https://www.amazon.com/dp/1662981996"
              target="_blank"
              rel="noopener noreferrer"
            >
              Get it on Amazon <ArrowRight size={18} />
            </a>
          </Button>
        </motion.div>
      </div>
    </div>
  </section>
);

export default BookSection;
