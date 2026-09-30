import { track } from '@vercel/analytics';

/**
 * Event tracker for Vercel Web Analytics and local listeners.
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
