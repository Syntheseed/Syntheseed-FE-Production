import { useState, useEffect } from 'react';
import analytics from '../utils/analytics';
import { useTheme } from '../contexts/ThemeContext';

const AnalyticsConsent = () => {
  const [consent, setConsent] = useState<'granted' | 'denied' | 'unknown'>(() => analytics.getConsentFromStorage());
  const { theme } = useTheme();

  useEffect(() => {
    // If already granted in storage, initialize analytics
    if (consent === 'granted') {
      analytics.initAnalytics({ consentGiven: true });
    }
  }, [consent]);

  if (consent === 'granted' || consent === 'denied') return null;

  const containerClass = `fixed bottom-6 right-6 z-50 max-w-md shadow-lg rounded-lg p-4 ${
    theme === 'dark' ? 'bg-gray-900/95 text-slate-100' : 'bg-white/95 text-slate-900'
  }`;

  const declineClass = `px-3 py-1 rounded-md border text-sm ${theme === 'dark' ? 'border-slate-700 text-slate-100' : 'border-slate-200 text-slate-900'}`;

  return (
    <div className={containerClass}>
      <div className="text-sm">
        We use analytics to improve the site. Do you consent to anonymous Google Analytics tracking?
      </div>
      <div className="mt-3 flex gap-3 justify-end">
        <button
          className={declineClass}
          onClick={() => {
            try {
              localStorage.setItem('ga_consent', 'denied');
            } catch (e) {}
            setConsent('denied');
          }}
        >
          Decline
        </button>
        <button
          className="px-3 py-1 rounded-md bg-cyan-500 text-white text-sm"
          onClick={() => {
            try {
              localStorage.setItem('ga_consent', 'granted');
            } catch (e) {}
            analytics.initAnalytics({ consentGiven: true });
            setConsent('granted');
          }}
        >
          Accept
        </button>
      </div>
    </div>
  );
};

export default AnalyticsConsent;
