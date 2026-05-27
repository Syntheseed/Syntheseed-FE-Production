import { useTheme } from '../contexts/ThemeContext';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const steps = [
  {
    number: 'STEP 1',
    title: 'Capture and Research',
    description: 'Capture your thoughts and start developing your idea.',
    image: 'https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    number: 'STEP 2',
    title: 'Expand and Validate',
    description:
      'Let AI surface assumptions, risks, and market signals. Collaborate with expert agents and prioritize the strongest wedge to strengthen your idea.',
    image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    number: 'STEP 3',
    title: 'Structure and Finalize',
    description:
      'Deep dive into patent research. Shape pricing, packaging, and go-to-market paths.',
    image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    number: 'STEP 4',
    title: 'Build and Launch',
    description:
      'Produce and export investor‑ready briefs. Finalize plans and build your idea. Ready it for launch.',
    image: 'https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=800'
  }
];

// responsive sizes will be handled via tailwind classes instead of a fixed circleSize

const ProcessSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <section
      id="process"
      className={`py-16 w-full transition-colors duration-300 ${isDark ? 'bg-[rgb(var(--bg-secondary))]' : 'bg-[rgb(var(--bg-secondary))]'}`}
    >
      <div className="container mx-auto px-6">
        <div
          ref={ref}
          className={`transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        >
          <div className="text-center mb-2">
            <span
              className={`inline-block rounded-full px-3 py-1 font-semibold tracking-wide uppercase ${isDark ? 'bg-[rgb(var(--bg-secondary))] text-[rgb(var(--synth-blue))]' : 'bg-[rgb(var(--bg-secondary))] text-[rgb(var(--synth-blue))]'}`}
              style={{
                fontSize: "0.95rem",
                letterSpacing: "0.04em"
              }}
            >
              How it works
            </span>
          </div>
          <h2
            className={`text-4xl font-extrabold tracking-tight mb-3 text-center ${isDark ? 'text-[rgb(var(--synth-blue))]' : 'text-[rgb(var(--synth-blue))]'}`}
          >
            From spark &rarr;  launch in 4 steps
          </h2>
          <div
            className={`text-center max-w-2xl mx-auto text-base font-medium mb-10 ${isDark ? 'text-[rgb(var(--text-secondary))]' : 'text-[rgb(var(--text-secondary))]'}`}
          >

          </div>
          {/* Steps: responsive grid that stacks on mobile */}
          <div className="w-full max-w-[1460px] mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
              {steps.map((step) => (
                <div key={step.number} className="flex flex-col items-center text-center w-full px-3">
                  <div
                    className={`rounded-full flex items-center justify-center border-4 shadow-lg mb-3 p-2 ${isDark ? 'bg-[#232a37] border-[rgb(var(--synth-blue))]' : 'bg-white border-[rgb(var(--synth-blue))]'}`}
                  >
                    {/* responsive avatar sizes: small on mobile, larger on desktop */}
                    <img
                      src={step.image}
                      alt={step.title}
                      className="rounded-full object-cover w-20 h-20 sm:w-28 sm:h-28 lg:w-40 lg:h-40"
                    />
                  </div>

                  <div className={`font-bold text-sm sm:text-base uppercase tracking-widest mt-1 ${isDark ? 'text-[rgb(var(--synth-blue))]' : 'text-[rgb(var(--synth-blue))]'}`}>
                    {step.number}
                  </div>
                  <div className={`font-semibold text-lg sm:text-xl mt-1 mb-2 ${isDark ? 'text-[rgb(var(--text-primary))]' : 'text-[rgb(var(--text-primary))]'}`}>
                    {step.title}
                  </div>
                  <div className={`text-sm sm:text-base leading-relaxed px-2 ${isDark ? 'text-[rgb(var(--text-secondary))]' : 'text-[rgb(var(--text-secondary))]'}`} style={{ whiteSpace: 'pre-line' }}>
                    {step.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
