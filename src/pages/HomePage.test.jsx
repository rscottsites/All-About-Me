import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { axe } from 'vitest-axe';
import HomePage from './HomePage';
import Header from '../components/Header';

describe('HomePage Component & Accessibility', () => {
  it('renders headline, identity card, and value proposition pillars', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Header />
        <HomePage />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { level: 1, name: /End-to-End Digital Accessibility Engineering/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: /End-to-End Accessibility Engineer/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: /Ryan Scott/i })).toBeInTheDocument();
    expect(screen.getByText(/Meet the Expert/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Free PDF Guide/i).length).toBeGreaterThan(0);
    expect(screen.getByRole('link', { name: /Download Free PDF/i })).toHaveAttribute('href', '#lead-magnet');
    expect(screen.getByText(/Rigorous manual and automated testing across desktop and mobile/i)).toBeInTheDocument();
  });

  it('has ZERO automated WCAG accessibility violations (axe test)', async () => {
    const { container } = render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
