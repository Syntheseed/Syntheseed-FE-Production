import ImageCarousel from './ImageCarousel';
import { useTheme } from '../contexts/ThemeContext';
import { trackEvent } from '../utils/analytics';
import { useNavigate } from 'react-router-dom';
import heroOne from '@/assets/hero-one.jpg';
import heroTwo from '@/assets/hero-two.jpg';
import heroThree from '@/assets/hero-three.jpg';

const HeroSection = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const isDark = theme === 'dark';

  // Open link in new tab
  const handleGetStarted = () => {
    trackEvent('cta_click', { button: 'Get Started', location: 'hero' });
    window.open('https://app.syntheseed.com', '_blank');
  };

  return (
    <section id="home" className="min-h-screen w-screen flex items-center justify-center relative overflow-hidden pt-20">
      <div className="absolute inset-0 -z-10 w-screen left-0">
        <ImageCarousel
          images={[
            heroOne,
            heroTwo,
            heroThree,
          ]}
          autoPlay={true}
          interval={8000}
        />
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center px-4">
          <div className="relative z-10">
            <h1
              className={`text-2xl sm:text-3xl md:text-5xl font-bold mb-6 animate-slide-up drop-shadow-2xl ${isDark ? 'text-[rgb(var(--synth-blue))]' : 'text-[rgb(var(--synth-blue))]'
                }`}
            >
              No Idea Should Be Left Behind
            </h1>

            <p
              className="text-base sm:text-lg md:text-2xl text-white max-w-2xl mx-auto font-semibold animate-slide-up drop-shadow-lg"
              style={{ animationDelay: '0.2s' }}
            >
              Transform Abstract Thoughts into Reality with the Power of Artificial Intelligence, Human Intelligence, and Digital Intelligence
            </p>
          </div>

          <div
            className="flex items-center justify-center animate-slide-up relative z-10 mt-8"
            style={{ animationDelay: '0.4s' }}
          >
            <button onClick={handleGetStarted} className="btn-secondary px-6 py-3 sm:px-8 sm:py-4">
              <span className="text-sm sm:text-base">Get started →</span>
            </button>

          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
