import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import Seo from '../components/Seo';
import { trackEvent } from '../utils/analytics';

const ComingSoonPage = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();

  // We can treat this page as a standalone that respects the theme context
  const isDark = theme === 'dark';

  return (
    <>
      <Seo
        title="Coming Soon - Syntheseed"
        description="We are working hard to bring you something amazing. Stay tuned!"
        canonical="https://syntheseed.com/coming-soon"
      />

      {/* 
        Using global bg-bg-primary to switch between Light (F2F6FF) / Dark (070E18)
        and text-primary / text-secondary for adaptive typography.
      */}
      <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-bg-primary transition-colors duration-300">

        {/* Background Effects - Adaptive opacity/colors */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className={`absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full blur-[120px] animate-pulse-glow ${isDark ? 'bg-purple-600/20' : 'bg-purple-400/20'}`}></div>
          <div className={`absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full blur-[120px] animate-pulse-glow ${isDark ? 'bg-cyan-600/20' : 'bg-cyan-400/20'}`} style={{ animationDelay: '1s' }}></div>
        </div>

        {/* Content Card - Using global glass-effect */}
        <div className="glass-effect p-8 md:p-16 max-w-3xl w-full mx-4 text-center relative z-10 animate-fade-in">

          {/* Gradient Text Title */}
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 animate-slide-up bg-clip-text text-transparent bg-gradient-to-r from-[rgb(var(--synth-blue))] to-[rgb(var(--s-blue-2))]">
            COMING SOON
          </h1>

          <p className="text-lg md:text-2xl text-secondary mb-10 max-w-xl mx-auto animate-slide-up font-medium" style={{ animationDelay: '0.2s' }}>
            We're crafting an experience that fuses Artificial Intelligence, Human Intelligence, and Digital Intelligence.
            <br />
            <span className="block mt-4 text-[rgb(var(--synth-blue))] font-semibold">
              Something extraordinary is on the horizon.
            </span>
          </p>

          <div className="flex justify-center animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <button
              onClick={() => { trackEvent('button_click', { button: 'Return Home', location: 'coming_soon' }); navigate('/'); }}
              className="btn-secondary px-10 py-4 text-lg"
            >
              Return Home
            </button>
          </div>
        </div>

        {/* Floating tech grid - lighter in light mode */}
        <div className={`absolute inset-0 pointer-events-none ${isDark ? 'opacity-20' : 'opacity-10'}`}
          style={{
            backgroundImage: `linear-gradient(rgba(var(--synth-blue), 0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(var(--synth-blue), 0.15) 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}>
        </div>

      </div>
    </>
  );
};

export default ComingSoonPage;
