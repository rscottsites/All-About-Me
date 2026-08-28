import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { axe } from 'vitest-axe';
import AccessibilityStatementPage from './AccessibilityStatementPage';

describe('AccessibilityStatementPage Component & Accessibility', () => {
  it('renders Accessibility Statement heading, effective date, and all 5 core sections', () => {
    render(
      <MemoryRouter>
        <AccessibilityStatementPage />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { level: 1, name: /Accessibility statement/i })).toBeInTheDocument();
    expect(screen.getByText(/August 14, 2026/i)).toBeInTheDocument();
    expect(screen.getByText(/1. Our commitment/i)).toBeInTheDocument();
    expect(screen.getByText(/2. Accessibility standard/i)).toBeInTheDocument();
    expect(screen.getByText(/3. Engineering practices and measures/i)).toBeInTheDocument();
    expect(screen.getByText(/4. Known limitations/i)).toBeInTheDocument();
    expect(screen.getByText(/5. Feedback and contact information/i)).toBeInTheDocument();
    expect(screen.getByText(/ryanscott@rscottsites.com/i)).toBeInTheDocument();
    expect(screen.getByText(/4101 Dublin Blvd Ste F - 1080 Dublin, CA 94568-4603/i)).toBeInTheDocument();
  });

  it('has ZERO automated WCAG accessibility violations (axe test)', async () => {
    const { container } = render(
      <MemoryRouter>
        <AccessibilityStatementPage />
      </MemoryRouter>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
