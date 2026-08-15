import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import LeadMagnetSection from './LeadMagnetSection';

describe('LeadMagnetSection Component & Accessibility', () => {
  it('renders lead magnet heading, input fields, and download button', () => {
    render(
      <MemoryRouter>
        <LeadMagnetSection />
      </MemoryRouter>
    );

    expect(
      screen.getByRole('heading', {
        level: 2,
        name: /The 5 Most Common Web Accessibility Challenges \(And Their Solutions\)/i,
      })
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Work Email/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Download Free PDF Guide/i })).toBeInTheDocument();
  });

  it('shows accessible error summary on invalid or empty submission', async () => {
    render(
      <MemoryRouter>
        <LeadMagnetSection />
      </MemoryRouter>
    );

    const submitBtn = screen.getByRole('button', { name: /Download Free PDF Guide/i });
    fireEvent.click(submitBtn);

    const alerts = await screen.findAllByRole('alert');
    expect(alerts.length).toBeGreaterThan(0);
    expect(screen.getAllByText(/First name is required/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Work email is required/i).length).toBeGreaterThan(0);
  });

  it('allows filling inputs and triggers success state and download on submit', async () => {
    render(
      <MemoryRouter>
        <LeadMagnetSection />
      </MemoryRouter>
    );

    const nameInput = screen.getByLabelText(/First Name/i);
    const emailInput = screen.getByLabelText(/Work Email/i);
    const consentCheckbox = screen.getByRole('checkbox', { name: /I consent to receive/i });
    const submitBtn = screen.getByRole('button', { name: /Download Free PDF Guide/i });

    await userEvent.type(nameInput, 'Taylor');
    await userEvent.type(emailInput, 'taylor@company.com');
    fireEvent.click(consentCheckbox);

    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText(/Your PDF Guide is Ready!/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Read Guide Online/i })).toBeInTheDocument();
    });
  });

  it('has ZERO automated WCAG accessibility violations (axe test)', async () => {
    const { container } = render(
      <MemoryRouter>
        <LeadMagnetSection />
      </MemoryRouter>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
