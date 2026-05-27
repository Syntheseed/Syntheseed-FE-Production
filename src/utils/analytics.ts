/* analytics.ts
 * Minimal GA4 wrapper for this SPA.
 * - Reads Vite env VITE_GA_MEASUREMENT_ID
 * - Dynamically loads gtag.js
 * - Exposes initAnalytics, trackPageView, trackEvent, trackFormSubmission, setUserProperties, optOut
 */

const GA_MEASUREMENT_ID = (import.meta.env.VITE_GA_MEASUREMENT_ID as string) || undefined;
const GA_DEBUG = (import.meta.env.VITE_GA_DEBUG as string) === 'true';

declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
  }
}

let initialized = false;

function ensureGtag(measurementId: string) {
  if (!measurementId) return;
  if (window.gtag) return;

  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer!.push(arguments);
  }
  window.gtag = gtag as any;

  const s = document.createElement('script');
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  if ((import.meta.env.VITE_GA_DEBUG as string) === 'true') {
    // make it obvious in dev when the script is injected
    // eslint-disable-next-line no-console
    console.log('[analytics] injecting gtag script:', s.src);
  }
  document.head.appendChild(s);

  // initialize config via the canonical gtag calls
  const config: Record<string, any> = { anonymize_ip: true };
  if (GA_DEBUG) config.debug_mode = true;

  try {
    // call gtag directly — window.gtag is our queueing stub and will push until the real script runs
    window.gtag && window.gtag('js', new Date());
    window.gtag && window.gtag('config', measurementId, config);
  } catch (e) {
    // fallback to dataLayer pushes if direct calls fail for any reason
    window.dataLayer!.push({ js: new Date() });
    window.dataLayer!.push({ config: measurementId, ...config });
  }
}

export function initAnalytics(opts?: { consentGiven?: boolean }) {
  if (!GA_MEASUREMENT_ID) return;
  if (initialized) return;
  // Respect an explicit denial
  const consentDenied = opts?.consentGiven === false;
  if (consentDenied) return;

  // In dev debug mode, allow forcing initialization even if consent isn't explicitly given
  const forcedByDebug = GA_DEBUG && !consentDenied;

  if (!forcedByDebug && opts?.consentGiven === undefined) {
    // if consent not provided, do not init unless debug forced
    // caller should explicitly request init (or RouteAnalytics will call it when consent exists)
    // but allow debug to force init below
  }

  // init (for debug or when consent granted)
  if (forcedByDebug || opts?.consentGiven === true) {
    if (GA_DEBUG) {
      // eslint-disable-next-line no-console
      console.log('[analytics] initAnalytics called (debug mode:', GA_DEBUG, ')', 'consentGiven=', opts?.consentGiven);
    }
    ensureGtag(GA_MEASUREMENT_ID);
    initialized = true;
  } else if (GA_DEBUG) {
    // If debug is true but caller didn't pass consent, still init for developer convenience
    // eslint-disable-next-line no-console
    console.log('[analytics] debug auto-init (no explicit consent)');
    ensureGtag(GA_MEASUREMENT_ID);
    initialized = true;
  }
}

export function trackPageView(path: string, title?: string) {
  if (!window.gtag) return;
  if ((import.meta.env.VITE_GA_DEBUG as string) === 'true') {
    // eslint-disable-next-line no-console
    console.log('[analytics] trackPageView', { path, title });
  }
  try {
    window.gtag('event', 'page_view', {
      page_path: path,
      page_title: title,
    });
  } catch (e) {
    // swallow
  }
}

export function trackEvent(action: string, params?: Record<string, any>) {
  if (!window.gtag) return;
  if ((import.meta.env.VITE_GA_DEBUG as string) === 'true') {
    // eslint-disable-next-line no-console
    console.log('[analytics] trackEvent', action, params);
  }
  try {
    window.gtag('event', action, params || {});
  } catch (e) {}
}

export function trackFormSubmission(formName: string, success: boolean, extra?: Record<string, any>) {
  if (!window.gtag) return;
  if ((import.meta.env.VITE_GA_DEBUG as string) === 'true') {
    // eslint-disable-next-line no-console
    console.log('[analytics] trackFormSubmission', { formName, success, extra });
  }
  try {
    window.gtag('event', 'form_submission', {
      form_name: formName,
      success,
      ...extra,
    });
  } catch (e) {}
}

export function setUserProperties(props: Record<string, any>) {
  if (!window.gtag) return;
  try {
    window.gtag('set', 'user_properties', props);
  } catch (e) {}
}

// Persist opt-out locally and remove gtag hooks if requested
export function optOutAnalytics() {
  try {
    localStorage.setItem('ga_consent', 'denied');
  } catch (e) {}
}

export function getConsentFromStorage(): 'granted' | 'denied' | 'unknown' {
  try {
    const v = localStorage.getItem('ga_consent');
    if (v === 'granted') return 'granted';
    if (v === 'denied') return 'denied';
  } catch (e) {}
  return 'unknown';
}

export default {
  initAnalytics,
  trackPageView,
  trackEvent,
  trackFormSubmission,
  setUserProperties,
  optOutAnalytics,
  getConsentFromStorage,
};
