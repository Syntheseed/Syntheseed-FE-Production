import { FormEvent, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/utils/analytics";
import bookCover from "@/assets/causality-economics-ai-cover.jpg";
import HeroSection from "@/components/HeroSection";

const APP_URL = "https://app.syntheseed.com";

const retailers = [
  { name: "Amazon", href: "https://www.amazon.com/dp/1662981996" },
  { name: "Barnes & Noble (paperback)", href: "https://www.barnesandnoble.com/w/on-causality-inference-computational-effects-and-the-economics-of-ai-alex-abraham/1151747047?ean=9781662982002" },
  { name: "Barnes & Noble (Nook eBook)", href: "https://www.barnesandnoble.com/w/books/1151747047?ean=2940185459607" },
  { name: "Kobo (eBook)", href: "https://www.kobo.com/ww/en/ebook/on-causality-inference-computational-effects-and-the-economics-of-ai" },
  { name: "Bookshop.org", href: "https://bookshop.org/p/books/on-causality-inference-computational-effects-and-the-economics-of-ai/e29989f93fe8da47" },
  { name: "Walmart", href: "https://www.walmart.com/ip/On-Causality-Inference-Computational-Effects-and-the-Economics-of-AI-Paperback-9781662982002/21264007852" },
  { name: "ThriftBooks", href: "https://www.thriftbooks.com/w/on-causality-inference-computational-effects-and-the-economics-of-ai_alex-abraham/60778563/" },
  { name: "Payot (Switzerland)", href: "https://payot.ch/p/on-causality-inference-computational-effects-and-the-economics-of-ai-9781662981999" },
];

const pillars = [
  { num: "01", title: "Govern decisions", text: "AVERTA makes sure consequential decisions don't sink.", href: "#averta", link: "AVERTA" },
  { num: "02", title: "Build on Concreta", text: "One platform for shaping ideas, protecting inventions, safeguarding data and deploying physical AI.", href: "#products", link: "The platform" },
  { num: "03", title: "Adopt AI with confidence", text: "Senior advisors who turn AI into realized value, delivered on-site.", href: "#consulting", link: "Consulting" },
];

const products = [
  { stage: "Shape", name: "A2C", text: "Abstract to Concrete. Turn a raw idea into a structured, validated concept.", href: "/products/abstract-to-concrete" },
  { stage: "Protect", name: "Priora", text: "Know where your invention stands before you invest in a filing.", href: "#contact" },
  { stage: "Govern", name: "AVERTA", text: "Consequential decisions that hold.", href: "#averta" },
  { stage: "Safeguard", name: "DUAEN", text: "Control and verify what data AI agents and applications access and use.", href: "/products/data-use-manager" },
  { stage: "Deploy", name: "Envela", text: "Deployment assurance for physical AI, in any industry.", href: "#contact" },
];

const services = [
  { title: "AI Strategy for Value Realization", text: "Find where AI creates measurable value in your organization, and capture it." },
  { title: "Data Suitability Assurance", text: "AI built on data fit for its purpose.", href: "/services", link: "Explore the service" },
  { title: "Solution Assurance", text: "Know an AI solution works as intended before you depend on it." },
];

const timeline = [
  { year: "1986", text: "Neural network solution for chemical process control" },
  { year: "1993", text: "Genetic programming language and compiler built in LISP" },
  { year: "2023", text: "Syntheseed founded" },
  { year: "2026", text: "AVERTA introduced; patent applications filed on governed decision authority" },
];

const posts = [
  { meta: "Strategy · Feb 2026", title: "When Strategy Meets Disruption: Lessons from The Limits of Strategy", text: "What a classic on strategic failure teaches AI innovators and leaders." },
  { meta: "AGI · Nov 2025", title: "The Promise and Challenges of Artificial General Intelligence", text: "AGI as the next frontier, and what it demands of the people building it." },
  { meta: "Innovation · Nov 2025", title: "From Abstract to Concrete", text: "How artificial, human and digital intelligence combine to move ideas forward." },
];

const emails = [
  { label: "General", email: "info@syntheseed.com" },
  { label: "Support", email: "help@syntheseed.com" },
  { label: "Careers", email: "career@syntheseed.com" },
  { label: "Investors", email: "invest@syntheseed.com" },
];

const MarketingHome = () => {
  const [note, setNote] = useState("");

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setNote("Thank you. A member of our team will be in touch.");
    event.currentTarget.reset();
  };

  return (
    <main>
      <HeroSection />

      <section className="py-24 px-6 bg-card/40">
        <div className="max-w-6xl mx-auto">
          <p className="text-primary text-sm font-semibold tracking-widest uppercase">What we do</p>
          <h2 className="text-3xl md:text-5xl font-bold mt-3 mb-4">One discipline, three ways to engage.</h2>
          <p className="text-muted-foreground text-lg max-w-3xl">
            Every Syntheseed offering answers the same question: is this decision ready to be made, and can it be defended afterward?
          </p>
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {pillars.map((pillar) => (
              <a key={pillar.num} href={pillar.href} className="bg-card border border-border rounded-2xl p-8 flex flex-col hover:border-primary/50 transition-colors">
                <span className="text-primary font-semibold">{pillar.num}</span>
                <h3 className="text-2xl font-bold mt-3 mb-3">{pillar.title}</h3>
                <p className="text-muted-foreground flex-1">{pillar.text}</p>
                <span className="mt-6 text-primary font-semibold inline-flex items-center gap-2">
                  {pillar.link} <ArrowRight size={16} />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="averta" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <span className="inline-block border border-primary text-primary text-xs font-semibold tracking-widest uppercase px-3 py-1.5 rounded-full">
            Flagship
          </span>
          <p className="text-primary text-sm font-semibold tracking-widest uppercase mt-6">AVERTA</p>
          <h2 className="text-3xl md:text-5xl font-bold mt-3 mb-4 max-w-3xl">Consequential decisions shouldn't sink.</h2>
          <p className="text-muted-foreground text-lg max-w-3xl">
            Before you commit capital, reputation or safety, know the decision will hold. AVERTA governs high-stakes decisions so they endure, and so you never pour more into one that should have stopped.
          </p>
          <div className="flex flex-wrap gap-4 mt-10">
            <Button className="rounded-full px-6" asChild>
              <a href="#contact">Schedule a private demonstration <ArrowRight size={16} /></a>
            </Button>
            <Button variant="outline" className="rounded-full px-6" asChild>
              <a href="#contact">Become a founding design partner <ArrowRight size={16} /></a>
            </Button>
          </div>
        </div>
      </section>

      <section id="products" className="py-24 px-6 bg-card/40">
        <div className="max-w-6xl mx-auto">
          <p className="text-primary text-sm font-semibold tracking-widest uppercase">The Concreta platform</p>
          <h2 className="text-3xl md:text-5xl font-bold mt-3 mb-4">One platform. Every product.</h2>
          <p className="text-muted-foreground text-lg max-w-3xl">
            Our products are delivered on Concreta, built to take an idea from abstract to concrete and keep the decisions behind it sound.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-6 mt-12">
            {products.map((product, index) => (
              <a
                key={product.name}
                href={product.href}
                className={`bg-card border border-border rounded-2xl p-8 flex flex-col hover:border-primary/50 transition-colors ${
                  index < 3 ? "lg:col-span-2" : "lg:col-span-3"
                }`}
              >
                <span className="text-primary text-xs font-semibold tracking-widest uppercase">{product.stage}</span>
                <h3 className="text-2xl font-bold mt-3 mb-2">{product.name}</h3>
                <p className="text-muted-foreground flex-1">{product.text}</p>
                <span className="mt-6 font-semibold inline-flex items-center gap-2">
                  Learn more <ArrowRight size={16} />
                </span>
              </a>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-4 mt-10 text-muted-foreground">
            <p><span className="text-foreground font-semibold">Delivered on Concreta.</span> Integrated and tailored on-site by our team.</p>
            <Button className="rounded-full ml-auto" asChild>
              <a
                href={APP_URL}
                onClick={() => trackEvent("cta_click", { button: "Analyze your idea free", location: "products" })}
              >
                Analyze your idea free <ArrowRight size={16} />
              </a>
            </Button>
          </div>
        </div>
      </section>

      <section id="consulting" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <p className="text-primary text-sm font-semibold tracking-widest uppercase">Consulting</p>
          <h2 className="text-3xl md:text-5xl font-bold mt-3 mb-4">AI expertise you can hold accountable.</h2>
          <p className="text-muted-foreground text-lg max-w-3xl">
            Our advisors have built AI systems, cloud practices and decision platforms, not just strategy decks. Delivered on-site, alongside your team.
          </p>
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {services.map((service) => (
              <div key={service.title} className="bg-card border border-border rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                <p className="text-muted-foreground">{service.text}</p>
                {service.href && (
                  <a href={service.href} className="mt-5 inline-flex items-center gap-2 text-primary font-semibold">
                    {service.link} <ArrowRight size={16} />
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="company" className="py-24 px-6 bg-card/40">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16">
          <div>
            <p className="text-primary text-sm font-semibold tracking-widest uppercase">Why Syntheseed</p>
            <h2 className="text-3xl md:text-5xl font-bold mt-3 mb-4">Four decades of applied AI, not four quarters.</h2>
            <p className="text-muted-foreground text-lg">
              Syntheseed was founded by Dr. Alex Abraham, who has built working AI systems since 1986. Our team pairs that depth with senior engineering and product leadership.
            </p>
            <p className="text-muted-foreground text-lg mt-4">
              We build our own models and decision logic. We do not resell someone else's.
            </p>
          </div>
          <ol className="border-l border-border space-y-8">
            {timeline.map((item) => (
              <li key={item.year} className="relative pl-8">
                <span className="absolute -left-1.5 top-2 w-3 h-3 rounded-full bg-primary" />
                <b className="block text-2xl text-primary">{item.year}</b>
                <span className="text-muted-foreground">{item.text}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="book" className="py-24 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-[280px_1fr] gap-12 items-center">
          <img
            src={bookCover}
            alt="Book cover: On Causality, Inference, Computational Effects, and the Economics of AI by Alex Abraham"
            className="w-full rounded-2xl border border-primary/40 shadow-lg shadow-primary/10"
          />
          <div>
            <p className="text-primary text-sm font-semibold tracking-widest uppercase">From our Executive Chairman</p>
            <h2 className="text-3xl md:text-5xl font-bold mt-3 mb-4">Where does the economic cost of AI truly begin?</h2>
            <p className="text-primary text-xl italic leading-snug">
              The definitive, foundational scholarly work on the origination of the cost economics of AI.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-4">
              Most treatments of AI economics begin with GPU clusters, cloud bills and tokens. This book begins upstream. It establishes the discipline of Computational AI Economics and shows that spending, energy use and hardware utilization are downstream symptoms of where cost actually originates.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-4">
              Through the AI Economic Causality Chain, it traces cost to its root: how real-world causal complexity and statistical structure shape algorithmic encoding, which drives inference dynamics, computational workload and, ultimately, capital intensity.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-4">
              It is the foundation for how we advise clients on AI investment.
            </p>
            <details className="relative inline-block mt-8 group">
              <summary className="list-none cursor-pointer [&::-webkit-details-marker]:hidden">
                <span className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground">
                  Buy the Book
                </span>
              </summary>
              <div className="absolute left-0 top-full z-10 mt-2 min-w-72 overflow-hidden rounded-xl border border-border bg-card shadow-xl">
                {retailers.map((retailer) => (
                  <a
                    key={retailer.name}
                    href={retailer.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block border-b border-border px-4 py-3 text-sm last:border-b-0 hover:bg-secondary hover:text-primary"
                  >
                    {retailer.name}
                  </a>
                ))}
              </div>
            </details>
          </div>
        </div>
      </section>

      <section id="insights" className="pb-24 px-6">
        <div className="max-w-6xl mx-auto">
          <p className="text-primary text-sm font-semibold tracking-widest uppercase">Insights</p>
          <h2 className="text-3xl md:text-5xl font-bold mt-3 mb-10">Thinking from Syntheseed.</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {posts.map((post) => (
              <a key={post.title} href="#insights" className="block border-t-2 border-primary pt-6">
                <p className="text-xs uppercase tracking-wider text-muted-foreground">{post.meta}</p>
                <h3 className="text-xl font-bold mt-3 mb-2">{post.title}</h3>
                <p className="text-muted-foreground">{post.text}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="careers" className="py-20 px-6 bg-card/40">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div>
            <p className="text-primary text-sm font-semibold tracking-widest uppercase">Careers</p>
            <h2 className="text-3xl md:text-5xl font-bold mt-3">Build what lasts with us.</h2>
            <div className="flex flex-wrap gap-3 mt-5">
              {["Senior Full Stack Developer", "Senior UI Developer", "Senior ML Engineer"].map((role) => (
                <span key={role} className="border border-border rounded-full px-4 py-2 text-sm">{role}</span>
              ))}
            </div>
          </div>
          <Button variant="outline" className="rounded-full" asChild>
            <a href="#careers">View open roles <ArrowRight size={16} /></a>
          </Button>
        </div>
      </section>

      <section id="contact" className="py-24 px-6">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16">
          <div>
            <p className="text-primary text-sm font-semibold tracking-widest uppercase">Contact</p>
            <h2 className="text-3xl md:text-5xl font-bold mt-3 mb-4">Start with the decision in front of you.</h2>
            <p className="text-muted-foreground text-lg">
              Tell us what you are deciding, building or adopting. A senior member of our team will respond.
            </p>
            <div className="grid sm:grid-cols-2 gap-6 mt-8">
              {emails.map((item) => (
                <div key={item.email}>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground">{item.label}</p>
                  <a href={`mailto:${item.email}`} className="text-primary hover:underline">{item.email}</a>
                </div>
              ))}
            </div>
          </div>
          <form className="grid gap-4" onSubmit={onSubmit}>
            <div className="grid sm:grid-cols-2 gap-4">
              <input required placeholder="Name" className="bg-secondary border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground" />
              <input required type="email" placeholder="Work email" className="bg-secondary border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground" />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <input placeholder="Organization" className="bg-secondary border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground" />
              <select required defaultValue="" className="bg-secondary border border-border rounded-xl px-4 py-3 text-foreground">
                <option value="" disabled>I'm interested in...</option>
                <option>AVERTA demonstration</option>
                <option>Founding design partnership</option>
                <option>Consulting engagement</option>
                <option>Concreta platform products</option>
                <option>Investment</option>
                <option>Something else</option>
              </select>
            </div>
            <textarea placeholder="What decision are you facing?" className="min-h-32 bg-secondary border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground" />
            <div>
              <Button type="submit" className="rounded-full px-6">
                Send message <ArrowRight size={16} />
              </Button>
            </div>
            <p className="text-primary text-sm min-h-5">{note}</p>
          </form>
        </div>
      </section>
    </main>
  );
};

export default MarketingHome;
