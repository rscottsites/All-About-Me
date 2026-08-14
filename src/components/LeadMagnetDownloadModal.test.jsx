import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import LeadMagnetDownloadModal from './LeadMagnetDownloadModal';

describe('LeadMagnetDownloadModal Component & Accessibility', () => {
  it('renders nothing when isOpen is false', () => {
    const { container } = render(
      <LeadMagnetDownloadModal isOpen={false} onClose={vi.fn()} />
    );
    expect(container).toBeEmptyDOMElement();
  });

  it('renders modal dialog with form when isOpen is true', () => {
    render(
      <LeadMagnetDownloadModal isOpen={true} onClose={vi.fn()} />
    );

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', {
        level: 2,
        name: /The 5 Most Common Web Accessibility Challenges/i,
      })
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/Full Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Work Email/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Download Free PDF Guide/i })).toBeInTheDocument();
  });

  it('calls onClose when close button or Escape key is pressed', () => {
    const onClose = vi.fn();
    render(<LeadMagnetDownloadModal isOpen={true} onClose={onClose} />);

    const closeBtn = screen.getByRole('button', { name: /Close download modal/i });
    fireEvent.click(closeBtn);
    expect(onClose).toHaveBeenCalledTimes(1);

    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).toHaveBeenCalledTimes(2);
  });

  it('allows filling inputs and submitting successfully', async () => {
    render(<LeadMagnetDownloadModal isOpen={true} onClose={vi.fn()} />);

    const nameInput = screen.getByLabelText(/Full Name/i);
    const emailInput = screen.getByLabelText(/Work Email/i);
    const submitBtn = screen.getByRole('button', { name: /Download Free PDF Guide/i });

    fireEvent.change(nameInput, { target: { value: 'Jordan Lee', name: 'name' } });
    fireEvent.change(emailInput, { target: { value: 'jordan@company.com', name: 'email' } });

    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText(/Your Free PDF Guide is Ready!/i)).toBeInTheDocument();
    });
  });

  it('has ZERO automated WCAG accessibility violations (axe test)', async () => {
    const { container } = render(
      <LeadMagnetDownloadModal isOpen={true} onClose={vi.fn()} />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
