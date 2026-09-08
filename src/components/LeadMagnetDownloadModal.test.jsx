import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { axe } from 'vitest-axe';
import LeadMagnetDownloadModal from './LeadMagnetDownloadModal';

describe('LeadMagnetDownloadModal Component & Accessibility', () => {
  it('renders nothing when isOpen is false', () => {
    const { container } = render(
      <MemoryRouter>
        <LeadMagnetDownloadModal isOpen={false} onClose={vi.fn()} />
      </MemoryRouter>
    );
    expect(container).toBeEmptyDOMElement();
  });

  it('renders modal dialog with form when isOpen is true', () => {
    render(
      <MemoryRouter>
        <LeadMagnetDownloadModal isOpen={true} onClose={vi.fn()} />
      </MemoryRouter>
    );

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', {
        level: 2,
        name: /The 5 most common web accessibility challenges/i,
      })
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/Full Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Work Email/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Download free PDF guide/i })).toBeInTheDocument();
  });

  it('calls onClose when close button or Escape key is pressed', () => {
    const onClose = vi.fn();
    render(
      <MemoryRouter>
        <LeadMagnetDownloadModal isOpen={true} onClose={onClose} />
      </MemoryRouter>
    );

    const closeBtn = screen.getByRole('button', { name: /Close download modal/i });
    fireEvent.click(closeBtn);
    expect(onClose).toHaveBeenCalledTimes(1);

    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).toHaveBeenCalledTimes(2);
  });

  it('displays field errors under inputs and no error summary box when submitted with empty fields', async () => {
    render(
      <MemoryRouter>
        <LeadMagnetDownloadModal isOpen={true} onClose={vi.fn()} />
      </MemoryRouter>
    );

    const submitBtn = screen.getByRole('button', { name: /Download free PDF guide/i });
    fireEvent.click(submitBtn);

    const alerts = await screen.findAllByRole('alert');
    expect(alerts.length).toBe(3);
    expect(screen.getByText(/Please enter your full name/i)).toBeInTheDocument();
    expect(screen.getByText(/Please enter your work email address/i)).toBeInTheDocument();
    expect(screen.getByText(/Please provide your consent to download the guide/i)).toBeInTheDocument();

    // Ensure NO error summary box exists
    expect(screen.queryByText(/Please resolve the following/i)).not.toBeInTheDocument();
  });

  it('allows filling inputs and submitting successfully', async () => {
    render(
      <MemoryRouter>
        <LeadMagnetDownloadModal isOpen={true} onClose={vi.fn()} />
      </MemoryRouter>
    );

    const nameInput = screen.getByLabelText(/Full Name/i);
    const emailInput = screen.getByLabelText(/Work Email/i);
    const consentCheckbox = screen.getByRole('checkbox', { name: /I consent to receive/i });
    const submitBtn = screen.getByRole('button', { name: /Download free PDF guide/i });

    fireEvent.change(nameInput, { target: { value: 'Jordan Lee', name: 'name' } });
    fireEvent.change(emailInput, { target: { value: 'jordan@company.com', name: 'email' } });
    fireEvent.click(consentCheckbox);

    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText(/Your free PDF guide is ready!/i)).toBeInTheDocument();
    });
  });

  it('has ZERO automated WCAG accessibility violations (axe test)', async () => {
    const { container } = render(
      <MemoryRouter>
        <LeadMagnetDownloadModal isOpen={true} onClose={vi.fn()} />
      </MemoryRouter>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
