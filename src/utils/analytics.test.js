import { describe, it, expect, vi, beforeEach } from 'vitest';
import { trackEvent, initCloudflareAnalytics } from './analytics';

vi.mock('@vercel/analytics', () => ({
  track: vi.fn(),
}));

import { track } from '@vercel/analytics';

describe('Analytics Utility', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('calls Vercel track and dispatches custom DOM event on trackEvent', () => {
    const listener = vi.fn();
    window.addEventListener('app:analytics', listener);

    trackEvent('mini_audit_submitted', { package: 'mini-audit' });

    expect(track).toHaveBeenCalledWith('mini_audit_submitted', { package: 'mini-audit' });
    expect(listener).toHaveBeenCalled();

    window.removeEventListener('app:analytics', listener);
  });

  it('handles missing Cloudflare token safely without injecting scripts', () => {
    document.head.innerHTML = '';
    initCloudflareAnalytics();
    expect(document.querySelector('script[data-cf-beacon]')).toBeNull();
  });
});
