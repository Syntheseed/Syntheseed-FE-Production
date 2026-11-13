import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/utils/analytics";

const Footer = () => (
  <footer className="border-t border-border">
    <div className="bg-gradient-to-r from-primary/10 to-primary/5 py-16 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <h3 className="text-2xl md:text-3xl font-bold mb-4">
          Build, validate, and launch your next idea.
        </h3>
        <p className="text-muted-foreground mb-8">
          Get initial analysis of your idea from Syntheseed today for free.
        </p>
        <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 gap-2" asChild>
          <a
            href="https://app.syntheseed.com"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent("cta_click", { button: "Get Started", location: "footer" })}
          >
            Get Started <ArrowRight size={18} />
          </a>
        </Button>
      </div>
    </div>

    <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 bg-primary rounded-lg flex items-center justify-center">
          <span className="text-primary-foreground font-bold text-sm">S</span>
        </div>
        <span className="font-bold text-foreground">Syntheseed</span>
      </div>
      <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Syntheseed. All rights reserved.</p>
    </div>
  </footer>
);

export default Footer;
