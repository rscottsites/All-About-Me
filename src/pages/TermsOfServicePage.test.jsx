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

    expect(screen.getByRole('heading', { level: 1, name: /Terms of service/i })).toBeInTheDocument();
    expect(screen.getByText(/August 14, 2026/i)).toBeInTheDocument();
    expect(screen.getByText(/1. Agreement to terms/i)).toBeInTheDocument();
    expect(screen.getByText(/2. Intellectual property rights/i)).toBeInTheDocument();
    expect(screen.getByText(/3. Professional disclaimer and limitations/i)).toBeInTheDocument();
    expect(screen.getByText(/4. Limitation of liability/i)).toBeInTheDocument();
    expect(screen.getByText(/5. Third-party links/i)).toBeInTheDocument();
    expect(screen.getByText(/6. Governing law/i)).toBeInTheDocument();
    expect(screen.getByText(/7. Changes to terms/i)).toBeInTheDocument();
    expect(screen.getByText(/8. Contact information/i)).toBeInTheDocument();
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
