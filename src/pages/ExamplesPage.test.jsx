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

    expect(screen.getByRole('heading', { level: 1, name: /Accessibility engineering portfolio/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /All case studies/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /Web & ARIA/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /Native mobile \(iOS\/Android\)/i })).toBeInTheDocument();

    // Filter to Native Mobile
    const mobileTab = screen.getByRole('tab', { name: /Native mobile \(iOS\/Android\)/i });
    fireEvent.click(mobileTab);
    expect(mobileTab).toHaveClass('active');

    // Bottom CTA section & enhanced micro-copy
    expect(screen.getByRole('heading', { level: 2, name: /Have similar accessibility challenges in your codebase\?/i })).toBeInTheDocument();
    expect(screen.getByText(/Get a comprehensive review delivered in 48 hours\./i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Request a free mini-audit/i })).toHaveAttribute('href', '/contact');
    expect(screen.getByText(/Not ready for an audit\?/i)).toBeInTheDocument();

    // Clicking download opens the modal dialog
    const downloadBtn = screen.getByRole('button', { name: /Download free PDF guide/i });
    expect(downloadBtn).toBeInTheDocument();
    fireEvent.click(downloadBtn);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: /The 5 most common web accessibility challenges/i })).toBeInTheDocument();
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
