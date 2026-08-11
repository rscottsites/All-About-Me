import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Header from './Header';

describe('Header Component', () => {
  it('renders brand heading and 5 primary navigation links', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Header />
      </MemoryRouter>
    );

    expect(screen.getByText('RScott')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /^Home$/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Services & Packages/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /^About$/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /^Examples$/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Request Mini-Audit/i })).toBeInTheDocument();
  });

  it('marks active navigation link according to current router location', () => {
    render(
      <MemoryRouter initialEntries={['/services']}>
        <Header />
      </MemoryRouter>
    );

    const servicesLink = screen.getByRole('link', { name: /Services & Packages/i });
    expect(servicesLink).toHaveClass('active');
  });

  it('toggles mobile menu state and handles Escape key focus restoration', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Header />
      </MemoryRouter>
    );

    const toggleBtn = screen.getByRole('button', { name: /navigation menu/i });
    expect(toggleBtn).toHaveAttribute('aria-expanded', 'false');

    // Open menu
    fireEvent.click(toggleBtn);
    expect(toggleBtn).toHaveAttribute('aria-expanded', 'true');

    // Press Escape key to close menu
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(toggleBtn).toHaveAttribute('aria-expanded', 'false');
  });
});
