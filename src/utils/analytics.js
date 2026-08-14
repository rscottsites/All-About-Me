import { track } from '@vercel/analytics';

/**
 * Universal event tracker for Vercel & Cloudflare Web Analytics.
 * @param {string} eventName - Name of the conversion or interaction event.
 * @param {Record<string, any>} [properties] - Optional metadata payload.
 */
export function trackEvent(eventName, properties = {}) {
  try {
    // 1. Vercel Custom Event Tracking
    track(eventName, properties);

    // 2. Custom DOM event dispatch for testing, monitoring, or third-party listeners
    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('app:analytics', {
          detail: { eventName, properties, timestamp: new Date().toISOString() },
        })
      );
    }
  } catch (err) {
    // Gracefully handle any tracking errors without impacting user interaction
    if (import.meta.env.DEV) {
      console.warn(`[Analytics] Track event failed: ${eventName}`, err);
    }
  }
}

/**
 * Initialize Cloudflare Web Analytics if beacon token is configured in environment.
 */
export function initCloudflareAnalytics() {
  if (typeof window === 'undefined') return;

  const cfToken = import.meta.env.VITE_CLOUDFLARE_BEACON_TOKEN;
  if (!cfToken) return;

  // Prevent duplicate script injection
  if (document.querySelector('script[data-cf-beacon]')) return;

  const script = document.createElement('script');
  script.defer = true;
  script.src = 'https://static.cloudflareinsights.com/beacon.min.js';
  script.setAttribute('data-cf-beacon', JSON.stringify({ token: cfToken }));
  document.head.appendChild(script);
}
