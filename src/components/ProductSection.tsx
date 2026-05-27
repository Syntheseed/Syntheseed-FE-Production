import { Zap, Target, FileText, Lightbulb, TrendingUp, Sparkles } from 'lucide-react';
import FeatureCard from './FeatureCard';
import { useTheme } from '../contexts/ThemeContext';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import illustration from '../../assets/illustration.png';

const products = [
  {
    icon: Lightbulb,
    title: 'Instant Idea Expansion',
    description: 'AI-powered brainstorming develops one thought into a full concept.'
  },
  {
    icon: Target,
    title: 'Real-Time Feasibility',
    description: 'Get immediate feedback on market fit, resources and technical needs.'
  },
  {
    icon: FileText,
    title: 'Pitch & Plan Automation',
    description: 'Produce decks and business plans in seconds—never miss details.'
  },
  {
    icon: Sparkles,
    title: 'AI Insights',
    description: 'Find new opportunities and solutions automatically—beyond what you imagined.'
  },
  {
    icon: TrendingUp,
    title: 'Innovation Accelerator',
    description: 'Fast-track your journey from concept to launch using strategy automation.'
  },
  {
    icon: Zap,
    title: 'Digital Integration',
    description: 'Combine human creativity with AI intelligence for maximum results.'
  }
];

const ProductFeaturesSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <section
      id="product"
      className="py-12 transition-colors duration-500"
      style={{
        background: isDark
          ? 'linear-gradient(135deg, #10131d 70%, #0B1224 100%)'
          : 'linear-gradient(135deg, #f3fdff 70%, #e9f2fd 100%)',
      }}
    >
      <div className="container mx-auto px-6">
        {/* Centered Heading and Subtitle */}
        <div className="mb-12 text-center max-w-3xl mx-auto">
          <p className="text-sm font-semibold tracking-widest text-[rgb(var(--synth-blue))] mb-2">PRODUCT</p>
          <h2 className={`text-3xl font-bold mb-3 ${isDark ? 'text-[rgb(var(--synth-blue))]' : 'text-[rgb(var(--synth-blue))]'}`}>
            Everything you need to go from spark to launch
          </h2>
          <p className={`text-lg ${isDark ? 'text-[rgb(var(--text-secondary))]' : 'text-[rgb(var(--text-secondary))]'}`}>
            Capture and expand ideas, validate with AI, research patents deeply, align go-to-market plans, and build ideas — all in one place.
          </p>
        </div>
        {/* Content: Illustration and Grid */}
        <div
          ref={ref}
          className={`max-w-[1500px] mx-auto transition-all duration-1000 flex flex-col lg:flex-row items-center lg:items-start gap-12 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
        >
          {/* Illustration column */}
          <div className="flex-shrink-0 flex justify-center items-center w-full lg:w-[430px]">
            <img
              src={illustration}
              alt="Product Illustration"
              className="w-full max-w-sm md:max-w-md lg:max-w-full h-auto rounded-xl shadow-lg object-contain"
            />
          </div>
          {/* Card column: show responsive grid on small, original overlapping layout on lg+ */}
          <div className="flex-1 w-full flex flex-col">
            {/* Mobile / tablet: responsive grid */}
            <div className="w-full block lg:hidden">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
                {products.map((p, i) => (
                  <FeatureCard key={p.title} {...p} delay={i * 60} />
                ))}
              </div>
            </div>

            {/* Desktop (lg+): original overlapping rows */}
            <div className="hidden lg:flex flex-col items-center select-none">
              <div className="relative flex flex-col items-center select-none">
                <div className="flex flex-row justify-center gap-x-10 z-10 mb-[-40px]">
                  <FeatureCard {...products[0]} delay={0} />
                </div>
                <div className="flex flex-row justify-center gap-x-10 z-20 mb-[-40px]">
                  <FeatureCard {...products[1]} delay={60} />
                  <FeatureCard {...products[2]} delay={120} />
                </div>
                <div className="flex flex-row justify-center gap-x-10 z-30">
                  <FeatureCard {...products[3]} delay={180} />
                  <FeatureCard {...products[4]} delay={240} />
                  <FeatureCard {...products[5]} delay={300} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductFeaturesSection;
