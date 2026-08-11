import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { axe } from 'vitest-axe';
import ExamplesPage from './ExamplesPage';

describe('ExamplesPage Component & Accessibility', () => {
  it('renders case studies gallery and handles tab filtering', () => {
    render(
      <MemoryRouter>
        <ExamplesPage />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { level: 1, name: /Accessibility Engineering Portfolio/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /All Case Studies/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /Web & ARIA/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /Native Mobile \(iOS\/Android\)/i })).toBeInTheDocument();

    // Filter to Native Mobile
    const mobileTab = screen.getByRole('tab', { name: /Native Mobile \(iOS\/Android\)/i });
    fireEvent.click(mobileTab);
    expect(mobileTab).toHaveClass('active');
  });

  it('has ZERO automated WCAG accessibility violations (axe test)', async () => {
    const { container } = render(
      <MemoryRouter>
        <ExamplesPage />
      </MemoryRouter>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
