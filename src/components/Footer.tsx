const columns = [
  {
    title: "Concreta",
    links: [
      { label: "A2C", href: "/products/abstract-to-concrete" },
      { label: "Priora", href: "/#products" },
      { label: "AVERTA", href: "/#averta" },
      { label: "DUAEN", href: "/products/data-use-manager" },
      { label: "Envela", href: "/#products" },
    ],
  },
  {
    title: "Consulting",
    links: [
      { label: "AI Strategy for Value Realization", href: "/#consulting" },
      { label: "Data Suitability Assurance", href: "/services" },
      { label: "Solution Assurance", href: "/#consulting" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/#company" },
      { label: "Insights", href: "/#insights" },
      { label: "Careers", href: "/#careers" },
      { label: "Contact", href: "/#contact" },
    ],
  },
];

const Footer = () => (
  <footer className="border-t border-border bg-background">
    <div className="max-w-6xl mx-auto px-6 py-14 grid md:grid-cols-2 lg:grid-cols-4 gap-10">
      <div>
        <a href="/#home" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">S</span>
          </div>
          <span className="text-xl font-bold">Syntheseed</span>
        </a>
        <p className="text-muted-foreground mt-4">Abstract to Concrete. Decisions that Endure.</p>
      </div>
      {columns.map((column) => (
        <div key={column.title}>
          <h5 className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-4">{column.title}</h5>
          <ul className="space-y-2">
            {column.links.map((link) => (
              <li key={link.label}>
                <a href={link.href} className="text-sm text-muted-foreground hover:text-foreground">{link.label}</a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
    <div className="max-w-6xl mx-auto px-6 py-6 border-t border-border flex flex-col sm:flex-row justify-between gap-2 text-sm text-muted-foreground">
      <span>© {new Date().getFullYear()} Syntheseed. All rights reserved.</span>
      <span>Patent-pending technology.</span>
    </div>
  </footer>
);

export default Footer;
