import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { axe } from 'vitest-axe';
import ContactPage from './ContactPage';

describe('ContactPage Component & Accessibility', () => {
  it('renders mini-audit request heading, intake form, and benefits sidebar', () => {
    render(
      <MemoryRouter initialEntries={['/contact']}>
        <ContactPage />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { level: 1, name: /Request a Free Mini-Audit & Get in Touch/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: /Mini-Audit Request Intake Form/i })).toBeInTheDocument();
    expect(screen.getByText(/What's Included in Your Free Mini-Audit\?/i)).toBeInTheDocument();
    expect(screen.getByText(/48-Hour Delivery:/i)).toBeInTheDocument();
  });

  it('has ZERO automated WCAG accessibility violations (axe test)', async () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/contact']}>
        <ContactPage />
      </MemoryRouter>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
