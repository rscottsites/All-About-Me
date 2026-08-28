import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { axe } from 'vitest-axe';
import ServicesPage from './ServicesPage';

describe('ServicesPage Component & Accessibility', () => {
  it('renders page heading, core services, and package matrix', () => {
    render(
      <MemoryRouter>
        <ServicesPage />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { level: 1, name: /Core services & service packages/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: /Core engineering services/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: /Service packages & pricing/i })).toBeInTheDocument();
  });

  it('has ZERO automated WCAG accessibility violations (axe test)', async () => {
    const { container } = render(
      <MemoryRouter>
        <ServicesPage />
      </MemoryRouter>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
