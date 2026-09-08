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

  it('renders CTA inquiry links for each core service leading to the contact form', () => {
    render(
      <MemoryRouter>
        <ServicesPage />
      </MemoryRouter>
    );

    const auditCta = screen.getByRole('link', { name: /Inquire about accessibility audits/i });
    expect(auditCta).toBeInTheDocument();
    expect(auditCta).toHaveAttribute('href', '/contact?service=audits');

    const remediationCta = screen.getByRole('link', { name: /Inquire about remediation engineering/i });
    expect(remediationCta).toBeInTheDocument();
    expect(remediationCta).toHaveAttribute('href', '/contact?service=remediation');

    const testingCta = screen.getByRole('link', { name: /Inquire about accessibility testing/i });
    expect(testingCta).toBeInTheDocument();
    expect(testingCta).toHaveAttribute('href', '/contact?service=testing');
  });

  it('renders the comprehensive audit deliverable section in both core services and packages tabs', () => {
    render(
      <MemoryRouter>
        <ServicesPage />
      </MemoryRouter>
    );

    // Initial state: Core services tab is active
    expect(screen.getByRole('heading', { name: /What you receive: the comprehensive audit deliverable/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /What you receive: the comprehensive audit deliverable/i, id: 'deliverable-heading-services' })).toBeInTheDocument();

    // Switch to packages tab
    const packagesTab = screen.getByRole('tab', { name: /Service packages & pricing/i });
    fireEvent.click(packagesTab);

    // After tab switch: Packages tab deliverable is active
    expect(screen.getByRole('heading', { name: /What you receive: the comprehensive audit deliverable/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /What you receive: the comprehensive audit deliverable/i, id: 'deliverable-heading-packages' })).toBeInTheDocument();

    // Both headings exist in DOM across hidden/visible panels
    const allDeliverables = screen.getAllByRole('heading', {
      name: /What you receive: the comprehensive audit deliverable/i,
      hidden: true,
    });
    expect(allDeliverables.length).toBe(2);
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
