import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import LeadMagnetSection from './LeadMagnetSection';
import LeadMagnetDownloadModal from './LeadMagnetDownloadModal';
import LeadMagnetGuideModal from './LeadMagnetGuideModal';
import { leadMagnetInfo } from '../data/leadMagnetData';
import { trackEvent } from '../utils/analytics';

vi.mock('../utils/analytics', () => ({ trackEvent: vi.fn() }));

const response = (ok, body) => ({ ok, json: async () => body });
let fetchMock;
let downloadClick;

beforeEach(() => {
  vi.clearAllMocks();
  fetchMock = vi.fn().mockResolvedValue(response(false, { success: false }));
  vi.stubGlobal('fetch', fetchMock);
  downloadClick = vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => {});
  vi.spyOn(console, 'warn').mockImplementation(() => {});
});

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe.each(['lead-section', 'compact-section', 'modal'])('%s guide analytics', (formType) => {
  function renderForm() {
    render(
      <MemoryRouter>
        {formType === 'modal'
          ? <LeadMagnetDownloadModal isOpen onClose={() => {}} />
          : <LeadMagnetSection compact={formType === 'compact-section'} />}
      </MemoryRouter>
    );
  }

  function submit() {
    fireEvent.change(screen.getByLabelText(/(?:First|Full) Name/i), { target: { value: 'Taylor' } });
    fireEvent.change(screen.getByLabelText(/Work Email/i), { target: { value: 'taylor@example.com' } });
    fireEvent.click(screen.getByRole('checkbox', { name: /I consent/i }));
    fireEvent.click(screen.getByRole('button', { name: /Download free/i }));
  }

  const properties = { formType, resource: leadMagnetInfo.title };

  it('records capture once after API success and tracks each download separately', async () => {
    fetchMock.mockResolvedValueOnce(response(true, { success: true, messageId: 'test-id' }));
    renderForm();
    submit();
    await waitFor(() => expect(downloadClick).toHaveBeenCalledTimes(1));
    expect(trackEvent.mock.calls).toEqual([
      ['guide_lead_captured', properties],
      ['guide_download_started', properties],
    ]);
    expect(JSON.parse(fetchMock.mock.calls[0][1].body)).toMatchObject({
      websiteUrl: expect.any(String), platform: 'lead-magnet',
    });
    fireEvent.click(screen.getByRole('button', { name: /Re-download guide|Click here if download/i }));
    expect(downloadClick).toHaveBeenCalledTimes(2);
    expect(trackEvent.mock.calls).toEqual([
      ['guide_lead_captured', properties],
      ['guide_download_started', properties],
      ['guide_download_started', properties],
    ]);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it.each(['network', 'http', 'rejected', 'unconfigured', 'invalid-json'])(
    'downloads once without a captured lead on %s failure', async (failure) => {
      if (failure === 'network') fetchMock.mockRejectedValueOnce(new Error('Offline'));
      if (failure === 'http') fetchMock.mockResolvedValueOnce(response(false, { success: true }));
      if (failure === 'rejected') fetchMock.mockResolvedValueOnce(response(true, { success: false }));
      if (failure === 'unconfigured') fetchMock.mockResolvedValueOnce(response(true, { success: true, leadCaptured: false }));
      if (failure === 'invalid-json') fetchMock.mockResolvedValueOnce({ ok: true, json: async () => { throw new Error('Invalid JSON'); } });
      renderForm();
      submit();
      await waitFor(() => expect(downloadClick).toHaveBeenCalledTimes(1));
      expect(trackEvent.mock.calls).toEqual([['guide_download_started', properties]]);
    }
  );

  if (formType !== 'modal') {
    it.each([true, false])('counts fallback capture only on confirmed success (%s)', async (success) => {
      fetchMock
        .mockResolvedValueOnce(response(false, { success: false }))
        .mockResolvedValueOnce(response(true, { success }));
      renderForm();
      submit();
      await waitFor(() => expect(downloadClick).toHaveBeenCalledTimes(1));
      expect(fetchMock).toHaveBeenCalledTimes(2);
      expect(trackEvent.mock.calls).toEqual([
        ...(success ? [['guide_lead_captured', properties]] : []),
        ['guide_download_started', properties],
      ]);
    });
  }

  it('does not send events or start a download for invalid input', () => {
    renderForm();
    fireEvent.click(screen.getByRole('button', { name: /Download free/i }));
    expect(fetchMock).not.toHaveBeenCalled();
    expect(downloadClick).not.toHaveBeenCalled();
    expect(trackEvent).not.toHaveBeenCalled();
  });
});

it('tracks downloads from the online reader without another lead capture', () => {
  render(<LeadMagnetGuideModal isOpen onClose={() => {}} />);
  fireEvent.click(screen.getByRole('button', { name: /Download/i }));
  expect(downloadClick).toHaveBeenCalledTimes(1);
  expect(trackEvent.mock.calls).toEqual([
    ['guide_download_started', { formType: 'guide-reader', resource: leadMagnetInfo.title }],
  ]);
  expect(fetchMock).not.toHaveBeenCalled();
});
