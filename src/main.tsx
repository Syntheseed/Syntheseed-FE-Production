import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ThemeProvider } from "./contexts/ThemeContext";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, useLocation } from "react-router-dom";
import analytics from "./utils/analytics";
import AnalyticsConsent from "./components/AnalyticsConsent";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <BrowserRouter>
          {/* Consent UI - will initialize analytics when accepted */}
          <AnalyticsConsent />

          {/* RouteAnalytics listens for route changes and sends page_view events */}
          <RouteAnalytics />

          <App />
          <Toaster position="top-right" />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  </StrictMode>
);

function RouteAnalytics() {
  const location = useLocation();

  useEffect(() => {
    // Initialize analytics if consent already granted in storage
    const consent = analytics.getConsentFromStorage();
    const debugMode = (import.meta.env.VITE_GA_DEBUG as string) === 'true';
    if (consent === 'granted') {
      analytics.initAnalytics({ consentGiven: true });
    } else if (debugMode) {
      // In dev/debug mode, initialize analytics even without explicit consent to allow testing
      // This is gated by VITE_GA_DEBUG and won't run in production unless you enable it.
      // eslint-disable-next-line no-console
      console.log('[analytics] VITE_GA_DEBUG enabled — auto-initializing analytics for testing');
      analytics.initAnalytics({ consentGiven: true });
    }
    // If unknown or denied, we rely on AnalyticsConsent to initialize after user accepts
  }, []);

  useEffect(() => {
    // Send a page_view for SPA navigations
    analytics.trackPageView(location.pathname + location.search, document.title);
  }, [location]);

  return null;
}
