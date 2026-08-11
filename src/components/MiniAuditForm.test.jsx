import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MiniAuditForm from './MiniAuditForm';

describe('MiniAuditForm Component', () => {
  it('renders required input fields and submit button', () => {
    render(<MiniAuditForm />);

    expect(screen.getByLabelText(/Full Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Work Email Address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Website or App URL/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Request Free Mini-Audit/i })).toBeInTheDocument();
  });

  it('displays error summary box when submitted with empty required fields', async () => {
    render(<MiniAuditForm />);

    const submitBtn = screen.getByRole('button', { name: /Request Free Mini-Audit/i });
    fireEvent.click(submitBtn);

    expect(await screen.findByRole('alert')).toBeInTheDocument();
    expect(screen.getAllByText(/Please enter your full name/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Please enter your email address/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Please enter your website or application URL/i).length).toBeGreaterThan(0);
  });

  it('allows filling inputs and submitting successfully', async () => {
    render(<MiniAuditForm />);

    const nameInput = screen.getByLabelText(/Full Name/i);
    const emailInput = screen.getByLabelText(/Work Email Address/i);
    const urlInput = screen.getByLabelText(/Website or App URL/i);
    const submitBtn = screen.getByRole('button', { name: /Request Free Mini-Audit/i });

    await userEvent.type(nameInput, 'Alex Morgan');
    await userEvent.type(emailInput, 'alex@acme.com');
    await userEvent.type(urlInput, 'https://acme.com');

    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText(/Request Received!/i)).toBeInTheDocument();
      expect(screen.getByText(/Alex Morgan/i)).toBeInTheDocument();
    });
  });
});
