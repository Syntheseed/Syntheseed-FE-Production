import { useNavigate } from 'react-router-dom';
import { trackEvent } from '../utils/analytics';

const UnlockInnovationSection = () => {
  const navigate = useNavigate();

  return (
    <section id="unlock-innovation" className="py-10">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-center md:items-stretch justify-between rounded-3xl shadow-xl"
            style={{
              background: 'rgb(var(--border-color))',
            }}
          >
            {/* Left: Headline and Subtext */}
            <div className="flex-1 flex flex-col justify-center pl-8 pr-4 py-10">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                Build, validate, and launch your next idea.
              </h3>
              <p className="text-base md:text-lg text-white/90">
                Get initial analysis of your idea from Syntheseed today for free.
              </p>
            </div>
            {/* Right: Launch Button */}
            <div className="flex items-center md:justify-end px-8 py-10 md:py-0">
              <button
                onClick={() => { trackEvent('cta_click', { button: 'Launch Syntheseed', location: 'unlock_innovation' }); window.open('https://app.syntheseed.com', '_blank'); }}
                className="bg-white text-[rgb(var(--border-color))] rounded-xl px-10 py-4 text-lg font-semibold shadow-lg transition-all hover:bg-bg-secondary hover:text-primary border border-none flex items-center justify-center"
                style={{
                  minWidth: '270px',
                }}
              >
                Launch Syntheseed →
              </button>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UnlockInnovationSection;
