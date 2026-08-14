import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { axe } from 'vitest-axe';
import AboutPage from './AboutPage';

describe('AboutPage Component & Accessibility', () => {
  it('renders Ryan Scott bio, Enterprise Experience, and competencies grid', () => {
    render(
      <MemoryRouter>
        <AboutPage />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { level: 1, name: /About Ryan Scott/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: /Bridging the gap between compliance and code./i })).toBeInTheDocument();
    expect(screen.getAllByText(/Enterprise Experience/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Year Up/i).length).toBeGreaterThan(0);
  });

  it('has ZERO automated WCAG accessibility violations (axe test)', async () => {
    const { container } = render(
      <MemoryRouter>
        <AboutPage />
      </MemoryRouter>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
