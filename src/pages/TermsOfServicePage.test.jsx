import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { axe } from 'vitest-axe';
import TermsOfServicePage from './TermsOfServicePage';

describe('TermsOfServicePage Component & Accessibility', () => {
  it('renders Terms of Service heading, effective date, and all 8 legal sections', () => {
    render(
      <MemoryRouter>
        <TermsOfServicePage />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { level: 1, name: /Terms of Service/i })).toBeInTheDocument();
    expect(screen.getByText(/August 14, 2026/i)).toBeInTheDocument();
    expect(screen.getByText(/1. Agreement to Terms/i)).toBeInTheDocument();
    expect(screen.getByText(/2. Intellectual Property Rights/i)).toBeInTheDocument();
    expect(screen.getByText(/3. Professional Disclaimer and Limitations/i)).toBeInTheDocument();
    expect(screen.getByText(/4. Limitation of Liability/i)).toBeInTheDocument();
    expect(screen.getByText(/5. Third-Party Links/i)).toBeInTheDocument();
    expect(screen.getByText(/6. Governing Law/i)).toBeInTheDocument();
    expect(screen.getByText(/7. Changes to Terms/i)).toBeInTheDocument();
    expect(screen.getByText(/8. Contact Information/i)).toBeInTheDocument();
    expect(screen.getByText(/ryanscott@rscottsites.com/i)).toBeInTheDocument();
    expect(screen.getByText(/4101 Dublin Blvd Ste F - 1080 Dublin, CA 94568-4603/i)).toBeInTheDocument();
  });

  it('has ZERO automated WCAG accessibility violations (axe test)', async () => {
    const { container } = render(
      <MemoryRouter>
        <TermsOfServicePage />
      </MemoryRouter>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
