import { Lightbulb, TrendingDown, Database, type LucideIcon } from "lucide-react";

export type Product = {
  slug: string;
  name: string;
  icon: LucideIcon;
  tagline: string;
  description: string;
  features: { title: string; text: string }[];
};

export const products: Product[] = [
  {
    slug: "abstract-to-concrete",
    name: "Abstract to Concrete",
    icon: Lightbulb,
    tagline: "Turn a raw idea into a structured, validated concept.",
    description:
      "Capture your idea and map it across problem, solution, audience, legal, go-to-market, risks, metrics and moat — with AI helping you fill every gap.",
    features: [
      { title: "Instant Idea Expansion", text: "AI-powered brainstorming develops one thought into a full concept." },
      { title: "Real-Time Feasibility", text: "Immediate feedback on market fit, resources and technical needs." },
      { title: "Pitch & Plan Automation", text: "Produce decks and business plans in seconds." },
    ],
  },
  {
    slug: "avoid-sunken-cost",
    name: "Avoid Sunken Cost",
    icon: TrendingDown,
    tagline: "Know early when to push forward — and when to stop.",
    description:
      "Helps organizations determine whether high-stakes actions are sufficiently supported by evidence, constraints, risk, and recoverability considerations before human authorization. It produces governed verdicts and an auditable decision record while keeping final authority with the accountable decision-maker.",
    features: [
      { title: "Early Warning Signals", text: "Spot projects drifting off course before costs pile up." },
      { title: "Go / No-Go Checkpoints", text: "Structured decision points based on real evidence." },
      { title: "Investment Tracking", text: "See exactly where resources are going across initiatives." },
    ],
  },
  {
    slug: "data-use-manager",
    name: "Dusera - Data Use Management",
    icon: Database,
    tagline: "Keep control of how your data is used.",
    description:
      "Helps organizations govern data use across applications, automated workflows, and AI agents. It evaluates whether data use is permitted for the stated purpose, necessary for the specific task, and supported by evidence of actual use.",
    features: [
      { title: "Usage Visibility", text: "See who uses which data, and for what purpose." },
      { title: "Permission Controls", text: "Set clear rules for access and sharing." },
      { title: "Compliance Ready", text: "Keep records that make audits straightforward." },
    ],
  },
];
