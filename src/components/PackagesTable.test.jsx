import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import PackagesTable from './PackagesTable';

describe('PackagesTable Component', () => {
  it('renders Package A, Package B, and Package C with correct scope and price details', () => {
    render(
      <MemoryRouter>
        <PackagesTable />
      </MemoryRouter>
    );

    expect(screen.getByText(/Package A: The Complete Overhaul/i)).toBeInTheDocument();
    expect(screen.getByText(/Package B: Monthly Accessibility QA/i)).toBeInTheDocument();
    expect(screen.getByText(/Package C: Targeted Fixes/i)).toBeInTheDocument();

    expect(screen.getByText(/\$7,000–\$15,000/i)).toBeInTheDocument();
    expect(screen.getByText(/\$1,000–\$4,000\/mo/i)).toBeInTheDocument();
    expect(screen.getByText(/\$1,500–\$3,500/i)).toBeInTheDocument();
  });
});
