import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { axe } from 'vitest-axe';
import PrivacyPolicyPage from './PrivacyPolicyPage';

describe('PrivacyPolicyPage Component & Accessibility', () => {
  it('renders Privacy Policy heading, effective date, and all core sections', () => {
    render(
      <MemoryRouter>
        <PrivacyPolicyPage />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { level: 1, name: /Privacy Policy/i })).toBeInTheDocument();
    expect(screen.getByText(/August 14, 2026/i)).toBeInTheDocument();
    expect(screen.getByText(/1. Information Collected/i)).toBeInTheDocument();
    expect(screen.getByText(/2. How Your Information is Used & Retained/i)).toBeInTheDocument();
    expect(screen.getByText(/3. Cookies and Tracking Technologies/i)).toBeInTheDocument();
    expect(screen.getByText(/4. Data Sharing and Disclosure/i)).toBeInTheDocument();
    expect(screen.getByText(/5. Your Data Privacy Rights/i)).toBeInTheDocument();
    expect(screen.getByText(/6. Children’s Privacy/i)).toBeInTheDocument();
    expect(screen.getByText(/7. Changes to This Policy/i)).toBeInTheDocument();
    expect(screen.getByText(/8. Contact Information/i)).toBeInTheDocument();
    expect(screen.getByText(/ryanscott@rscottsites.com/i)).toBeInTheDocument();
    expect(screen.getByText(/4101 Dublin Blvd Ste F - 1080 Dublin, CA 94568-4603/i)).toBeInTheDocument();
  });

  it('has ZERO automated WCAG accessibility violations (axe test)', async () => {
    const { container } = render(
      <MemoryRouter>
        <PrivacyPolicyPage />
      </MemoryRouter>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
