import { motion } from "framer-motion";
import { MapPin, Clock, ArrowRight } from "lucide-react";

const jobs = [
  {
    title: "Senior Full Stack Developer",
    dept: "Engineering",
    desc: "Build the Future of Human + AI Creativity. Our platform blends AI, Human Intelligence, and Digital Integration to help people worldwide create and innovate.",
  },
  {
    title: "Senior UI Developer",
    dept: "Engineering",
    desc: "Syntheseed is a pioneering AI platform dedicated to helping people worldwide realize their dreams through the fusion of AI, Human Intelligence, and Digital Integration.",
  },
  {
    title: "Senior ML Engineer",
    dept: "Engineering",
    desc: "Come be part of creative innovation working on cutting-edge machine learning systems that power the Syntheseed platform.",
  },
];

const CareersSection = () => (
  <section id="careers" className="py-24 px-6">
    <div className="max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <span className="text-primary text-sm font-semibold tracking-widest uppercase">Careers</span>
        <h2 className="text-3xl md:text-5xl font-bold mt-4 mb-6">
          Join Our Team
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
          Build the future of innovation with us — explore our open roles.
        </p>
      </motion.div>

      <div className="space-y-4 max-w-4xl mx-auto">
        {jobs.map((job, i) => (
          <motion.div
            key={job.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="bg-card border border-border rounded-2xl p-6 hover:border-primary/50 transition-all group cursor-pointer"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-2">
                <span className="text-xs text-primary font-semibold tracking-wider uppercase">{job.dept}</span>
                <h3 className="text-xl font-bold">{job.title}</h3>
                <p className="text-muted-foreground text-sm line-clamp-2">{job.desc}</p>
                <div className="flex gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1"><MapPin size={14} /> Anywhere</span>
                  <span className="flex items-center gap-1"><Clock size={14} /> Full-time, Part-time</span>
                </div>
              </div>
              <span className="text-primary flex items-center gap-1 text-sm font-semibold group-hover:gap-2 transition-all whitespace-nowrap">
                View Role <ArrowRight size={16} />
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default CareersSection;
