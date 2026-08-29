import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { axe } from 'vitest-axe';
import ServicesPage from './ServicesPage';

describe('ServicesPage Component & Accessibility', () => {
  it('renders page heading and tab navigation between core services and packages', () => {
    render(
      <MemoryRouter>
        <ServicesPage />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { level: 1, name: /Core services & service packages/i })).toBeInTheDocument();
    
    const tabList = screen.getByRole('tablist', { name: /Services and packages sections/i });
    expect(tabList).toBeInTheDocument();

    const servicesTab = screen.getByRole('tab', { name: /Core engineering services/i });
    const packagesTab = screen.getByRole('tab', { name: /Service packages & pricing/i });

    expect(servicesTab).toHaveAttribute('aria-selected', 'true');
    expect(packagesTab).toHaveAttribute('aria-selected', 'false');

    expect(screen.getByRole('heading', { level: 2, name: /Core engineering services/i })).toBeInTheDocument();
  });

  it('allows switching between Core engineering services and Service packages tabs', () => {
    render(
      <MemoryRouter>
        <ServicesPage />
      </MemoryRouter>
    );

    const servicesTab = screen.getByRole('tab', { name: /Core engineering services/i });
    const packagesTab = screen.getByRole('tab', { name: /Service packages & pricing/i });

    // Click packages tab
    fireEvent.click(packagesTab);
    expect(packagesTab).toHaveAttribute('aria-selected', 'true');
    expect(servicesTab).toHaveAttribute('aria-selected', 'false');
    expect(screen.getByRole('heading', { level: 2, name: /Service packages & pricing/i })).toBeInTheDocument();

    // Click services tab back
    fireEvent.click(servicesTab);
    expect(servicesTab).toHaveAttribute('aria-selected', 'true');
    expect(packagesTab).toHaveAttribute('aria-selected', 'false');
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
