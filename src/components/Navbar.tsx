import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "AVERTA", href: "/#averta" },
  { label: "Concreta", href: "/#products" },
  { label: "Consulting", href: "/#consulting" },
  { label: "Company", href: "/#company" },
  { label: "Insights", href: "/#insights" },
  { label: "Contact", href: "/#contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/95 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="/#home" className="flex items-center gap-2">
          <img src="/logo-light.png" alt="" className="w-10 h-10 object-contain" />
          <span className="text-xl font-bold text-foreground">
            Syntheseed
          </span>
        </a>

        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-4">
          <a href="https://app.syntheseed.com" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Log in
          </a>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-6" asChild>
            <a href="/#contact">Request a briefing</a>
          </Button>
        </div>

        <button className="lg:hidden text-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="lg:hidden bg-background/95 backdrop-blur-md border-t border-border px-6 py-4 space-y-3">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a href="https://app.syntheseed.com" className="block text-sm text-muted-foreground hover:text-foreground">
            Log in
          </a>
          <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-full" asChild>
            <a href="/#contact" onClick={() => setMobileOpen(false)}>Request a briefing</a>
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
