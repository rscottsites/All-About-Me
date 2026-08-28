import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
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

    expect(screen.getByRole('heading', { level: 1, name: /End-to-end digital accessibility engineering/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: /Free accessibility mini-audit/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: /How we work/i })).toBeInTheDocument();
    expect(screen.getAllByText(/Free guide/i).length).toBeGreaterThan(0);
    expect(screen.getByRole('link', { name: /Download free guide/i })).toHaveAttribute('href', '#lead-magnet');
    expect(screen.getByText(/Rigorous manual and automated testing across desktop and mobile/i)).toBeInTheDocument();
  });

  it('allows switching between tabs (Why accessibility matters, Bridging the gap, Case studies)', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    const tabList = screen.getByRole('tablist', { name: /Capabilities and value sections/i });
    expect(tabList).toBeInTheDocument();

    const roiTab = screen.getByRole('tab', { name: /Why accessibility matters/i });
    const pillarsTab = screen.getByRole('tab', { name: /Bridging the gap/i });
    const portfolioTab = screen.getByRole('tab', { name: /Case studies/i });

    expect(roiTab).toHaveAttribute('aria-selected', 'true');
    expect(pillarsTab).toHaveAttribute('aria-selected', 'false');

    // Click Pillars tab
    fireEvent.click(pillarsTab);
    expect(pillarsTab).toHaveAttribute('aria-selected', 'true');
    expect(roiTab).toHaveAttribute('aria-selected', 'false');

    // Click Portfolio tab
    fireEvent.click(portfolioTab);
    expect(portfolioTab).toHaveAttribute('aria-selected', 'true');
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
