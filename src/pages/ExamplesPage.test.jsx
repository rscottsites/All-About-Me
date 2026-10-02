import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { axe } from 'vitest-axe';
import ExamplesPage from './ExamplesPage';

describe('ExamplesPage Component & Accessibility', () => {
  it('renders case studies gallery and handles platform filtering', () => {
    render(
      <MemoryRouter>
        <ExamplesPage />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { level: 1, name: /Accessibility engineering portfolio/i })).toBeInTheDocument();
    const filters = screen.getByRole('group', { name: /Filter case studies by platform/i });
    expect(filters).toBeInTheDocument();
    expect(screen.queryByRole('tab')).not.toBeInTheDocument();

    const allBtn = screen.getByRole('button', { name: /All case studies/i });
    const webBtn = screen.getByRole('button', { name: /Web & ARIA/i });
    const mobileBtn = screen.getByRole('button', { name: /Native mobile \(iOS\/Android\)/i });
    expect(allBtn).toHaveAttribute('aria-pressed', 'true');
    expect(webBtn).toHaveAttribute('aria-pressed', 'false');

    // Filter to Native Mobile
    fireEvent.click(mobileBtn);
    expect(mobileBtn).toHaveClass('active');
    expect(mobileBtn).toHaveAttribute('aria-pressed', 'true');
    expect(allBtn).toHaveAttribute('aria-pressed', 'false');
    expect(screen.getByRole('status')).toHaveTextContent(/Showing \d+ case stud(y|ies)/i);

    // Severity tags expose their visible text with no invalid role
    const severityTags = document.querySelectorAll('.severity-tag');
    expect(severityTags.length).toBeGreaterThan(0);
    severityTags.forEach((tag) => expect(tag).not.toHaveAttribute('role'));

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
