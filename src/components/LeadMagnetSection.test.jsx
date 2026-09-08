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
        name: /The 5 most common web accessibility challenges \(and their solutions\)/i,
      })
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Work Email/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Download free guide/i })).toBeInTheDocument();
  });

  it('shows field errors under invalid inputs and no error summary box on empty submission', async () => {
    render(
      <MemoryRouter>
        <LeadMagnetSection />
      </MemoryRouter>
    );

    const submitBtn = screen.getByRole('button', { name: /Download free guide/i });
    fireEvent.click(submitBtn);

    const alerts = await screen.findAllByRole('alert');
    expect(alerts.length).toBe(3);
    expect(screen.getByText(/First name is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Work email is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Please provide your consent to download the guide/i)).toBeInTheDocument();

    // Ensure NO error summary box or top header exists
    expect(screen.queryByText(/Please fix/i)).not.toBeInTheDocument();
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
    const submitBtn = screen.getByRole('button', { name: /Download free guide/i });

    await userEvent.type(nameInput, 'Taylor');
    await userEvent.type(emailInput, 'taylor@company.com');
    fireEvent.click(consentCheckbox);

    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText(/Your guide is ready!/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Read guide online/i })).toBeInTheDocument();
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
