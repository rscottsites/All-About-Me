import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import RouteAnnouncer from './RouteAnnouncer';

describe('RouteAnnouncer Component', () => {
  it('renders an aria-live="polite" region for screen readers and sets page title', async () => {
    render(
      <MemoryRouter initialEntries={['/services']}>
        <RouteAnnouncer />
      </MemoryRouter>
    );

    const liveRegion = screen.getByText((content, element) => {
      return element.getAttribute('aria-live') === 'polite';
    });

    expect(liveRegion).toBeInTheDocument();
    expect(document.title).toContain('Services & Packages');
  });
});
