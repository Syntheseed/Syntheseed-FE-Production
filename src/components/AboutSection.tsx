import { Target, Lightbulb, Rocket, DollarSign } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useTheme } from '../contexts/ThemeContext';

import solutionImg from '../../assets/solution.png';
import downloadImg from '../../assets/image.png';
import peopleImg from '../../assets/people.png';
import moat from '../../assets/moat.png';
import gtmImg from '../../assets/gtm.png';
import legalImg from '../../assets/legal.png';
import risksImg from '../../assets/risks.png';
import metricsImg from '../../assets/metrics.png';

// --- Innovation Canvas ---
const canvasItems = [
  { title: 'PROBLEM', img: downloadImg },
  { title: 'SOLUTION', img: solutionImg },
  { title: 'AUDIENCE', img: peopleImg },
  { title: 'LEGAL', img: legalImg },
  { title: 'GTM', img: gtmImg },
  { title: 'RISKS', img: risksImg },
  { title: 'METRICS', img: metricsImg },
  { title: 'MOAT', img: moat }
];

const InnovationCanvasGrid = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className={`${isDark ? 'bg-[#192033]' : 'bg-white'} w-full rounded-2xl p-6 shadow transition-colors duration-300`}>
      <h3 className={`font-bold text-xl mb-6 ${isDark ? 'text-[rgb(var(--synth-blue))]' : 'text-[rgb(var(--synth-blue))]'}`}>
        Innovation Canvas
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {canvasItems.map((item) => (
          <div
            key={item.title}
            className={`
              rounded-xl border p-4 flex flex-col min-h-[170px] transition-colors duration-300
              ${isDark
                ? 'border-[rgb(var(--border-subtle))] bg-[#23283e]'
                : 'border-[rgb(var(--border-subtle))] bg-white'}
            `}
          >
            <span className={`font-semibold mb-4 text-base ${isDark ? 'text-[rgb(var(--synth-blue))]' : 'text-[rgb(var(--synth-blue))]'}`}>{item.title}</span>
            <div className={`
                rounded-md flex-1 min-h-[80px] flex items-center justify-center transition-colors duration-300
                ${isDark ? 'bg-[#151A22]' : 'bg-gray-50'}
              `}>
              {item.img && (
                <img
                  src={item.img}
                  alt={item.title}
                  className="max-h-[90px] w-auto object-contain"
                  style={{ maxWidth: '100%' }}
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const getCardClasses = (isDark: boolean) =>
  isDark
    ? 'bg-[#23283e] border-[rgb(var(--border-subtle))] border shadow-lg'
    : 'bg-white/95 border-[rgb(var(--border-subtle))] border shadow-xl';

const AboutSection = () => {
  const { ref: section1Ref, isVisible: section1Visible } = useScrollAnimation();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <section id="about" className="py-12 relative bg-[rgb(var(--bg-primary))] transition-colors duration-300">
      <div className="container mx-auto px-6">
        <div
          ref={section1Ref}
          className={`max-w-6xl mx-auto transition-all duration-1000 ${section1Visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
        >
          <div className="text-center mb-8">
            <p className="text-sm font-semibold tracking-widest text-[rgb(var(--synth-blue))] mb-1">ABOUT US</p>
            <h2 className={`text-3xl md:text-3xl font-bold mb-3 ${isDark ? 'text-[rgb(var(--synth-blue))]' : 'text-[rgb(var(--synth-blue))]'}`}>
              <span className="text-gradient">Your innovation canvas, powered by AI.</span>
            </h2>
            <p className={`text-lg max-w-2xl mx-auto ${isDark ? 'text-[rgb(var(--text-secondary))]' : 'text-[rgb(var(--text-secondary))]'}`}>
              Syntheseed helps founders, entrepreneurs, and product teams turn raw abstract thoughts into commercial innovations — from research and validation to build and launch — all in one collaborative workspace.
            </p>
          </div>

          <div className="md:grid md:grid-cols-2 gap-12 flex flex-col min-h-[550px]">
            {/* LEFT: Mission/Vision/About cards */}
            <div className="flex flex-col justify-between h-full space-y-8">
              {[
                {
                  icon: Target,
                  title: 'Our Mission',
                  description:
                    'To unlock human innovation by combining artificial intelligence, human insight, and digital systems — empowering anyone to turn ideas into real ventures that create meaningful change.',
                },
                {
                  icon: Lightbulb,
                  title: 'Our Vision',
                  description:
                    'A world where anyone with a powerful idea has the tools to transform it into something real, valuable, and impactful.',
                },
                {
                  icon: Rocket,
                  title: 'The Syntheseed Method',
                  description:
                    'We combine advanced AI with a structured innovation framework that bridges the gap between ideas and execution — helping innovators move from concept to launch with clarity and confidence.',
                },
                {
                  icon: DollarSign,
                  title: 'Investment',
                  description:
                    'Abraham Family Investments:  Seed funding\nIerardi Family Trust:  Seed funding\n\nFor Investor information, please email invest@syntheseed.com.',
                }
              ].map((item, idx) => (
                <div
                  key={idx}
                  className={`flex-1 p-7 md:p-8 rounded-xl flex flex-col transition-all duration-300 ${getCardClasses(isDark)}`}
                  style={{
                    transitionDelay: `${idx * 80}ms`,
                    minHeight: 0
                  }}
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-lg flex items-center justify-center mb-5 shadow">
                    <item.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className={`text-xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {item.title}
                  </h3>
                  <p className={`leading-relaxed text-sm whitespace-pre-line ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    {item.description.split(/(\S+@\S+\.\S+)/g).map((part, i) =>
                      /\S+@\S+\.\S+/.test(part) ? (
                        <a
                          key={i}
                          href={`mailto:${part.replace(/[.,;:]+$/, '')}`}
                          className="text-[rgb(var(--synth-blue))] hover:underline"
                        >
                          {part}
                        </a>
                      ) : (
                        <span key={i}>{part}</span>
                      )
                    )}
                  </p>
                </div>
              ))}
            </div>

            {/* RIGHT: Adaptive Innovation Canvas */}
            <InnovationCanvasGrid />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
