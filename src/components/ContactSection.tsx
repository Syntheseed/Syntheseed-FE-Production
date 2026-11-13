import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const emails = [
  { label: "General Information", email: "info@syntheseed.com" },
  { label: "Support", email: "help@syntheseed.com" },
  { label: "Careers", email: "career@syntheseed.com" },
  { label: "Investment", email: "invest@syntheseed.com" },
];

const ContactSection = () => (
  <section id="contact" className="py-24 px-6 bg-card/50">
    <div className="max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <span className="text-primary text-sm font-semibold tracking-widest uppercase">Contact</span>
        <h2 className="text-3xl md:text-5xl font-bold mt-4 mb-6">
          Get In Touch
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
          Ready to transform your ideas into reality? Let's start a conversation.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <h3 className="text-2xl font-bold">Contact Us</h3>
          {emails.map((e) => (
            <div key={e.email} className="space-y-1">
              <p className="text-sm text-muted-foreground">{e.label}</p>
              <a href={`mailto:${e.email}`} className="text-primary hover:underline flex items-center gap-2">
                <Mail size={16} /> {e.email}
              </a>
            </div>
          ))}
        </motion.div>

        <motion.form
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-4"
          onSubmit={(e) => e.preventDefault()}
        >
          <Input placeholder="Name" className="bg-secondary border-border rounded-xl" />
          <Input type="email" placeholder="Email" className="bg-secondary border-border rounded-xl" />
          <Input placeholder="Subject" className="bg-secondary border-border rounded-xl" />
          <textarea
            placeholder="Message"
            rows={5}
            className="flex w-full rounded-xl border border-border bg-secondary px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
          <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl">
            Send Message
          </Button>
        </motion.form>
      </div>
    </div>
  </section>
);

export default ContactSection;
