import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import MiniAuditForm from './MiniAuditForm';

describe('MiniAuditForm Component', () => {
  it('renders required input fields and submit button', () => {
    render(
      <MemoryRouter>
        <MiniAuditForm />
      </MemoryRouter>
    );

    expect(screen.getByLabelText(/Full Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Work Email Address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Website or App URL/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Request free mini-audit/i })).toBeInTheDocument();
  });

  it('displays error summary box when submitted with empty required fields', async () => {
    render(
      <MemoryRouter>
        <MiniAuditForm />
      </MemoryRouter>
    );

    const submitBtn = screen.getByRole('button', { name: /Request free mini-audit/i });
    fireEvent.click(submitBtn);

    const alerts = await screen.findAllByRole('alert');
    expect(alerts.length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Please enter your full name/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Please enter your email address/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Please enter your website or application URL/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Please provide your consent/i).length).toBeGreaterThan(0);
  });

  it('allows filling inputs and submitting successfully', async () => {
    render(
      <MemoryRouter>
        <MiniAuditForm />
      </MemoryRouter>
    );

    const nameInput = screen.getByLabelText(/Full Name/i);
    const emailInput = screen.getByLabelText(/Work Email Address/i);
    const urlInput = screen.getByLabelText(/Website or App URL/i);
    const consentCheckbox = screen.getByRole('checkbox', { name: /I consent to being contacted/i });
    const submitBtn = screen.getByRole('button', { name: /Request free mini-audit/i });

    await userEvent.type(nameInput, 'Alex Morgan');
    await userEvent.type(emailInput, 'alex@acme.com');
    await userEvent.type(urlInput, 'https://acme.com');
    fireEvent.click(consentCheckbox);

    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText(/Request received!/i)).toBeInTheDocument();
      expect(screen.getByText(/Alex Morgan/i)).toBeInTheDocument();
    });
  });

  it('correctly sets initialPackage when passed as a prop', () => {
    render(
      <MemoryRouter>
        <MiniAuditForm initialPackage="remediation" />
      </MemoryRouter>
    );

    const packageSelect = screen.getByLabelText(/Service or package interest/i);
    expect(packageSelect).toHaveValue('remediation');
  });
});
