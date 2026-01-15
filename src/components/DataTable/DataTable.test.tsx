import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import DataTable from './index';

describe('DataTable Component', () => {
  it('renders "No data available" when data is empty', () => {
    render(<DataTable data={[]} />);
    expect(screen.getByText('No data available')).toBeInTheDocument();
  });

  it('renders headers based on data keys', () => {
    const data = [{ name: 'Test', age: 30 }];
    render(<DataTable data={data} />);
    
    expect(screen.getByText('name')).toBeInTheDocument();
    expect(screen.getByText('age')).toBeInTheDocument();
  });

  it('renders empty string for "empty" header', () => {
    const data = [{ empty: 'icon', name: 'Test' }];
    render(<DataTable data={data} />);
    
    const ths = screen.getAllByRole('columnheader');
    // The first header for 'empty' should be empty text
    expect(ths[0].textContent).toBe('');
    expect(ths[1].textContent).toBe('name');
  });

  it('renders data rows correctly', () => {
    const data = [
      { name: 'Alice', age: 25 },
      { name: 'Bob', age: 40 }
    ];
    render(<DataTable data={data} />);
    
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('25')).toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();
    expect(screen.getByText('40')).toBeInTheDocument();
  });

  it('renders React nodes within cells', () => {
    const data = [{ 
      icon: <span data-testid="custom-icon">🔥</span>, 
      label: 'Fire' 
    }];
    render(<DataTable data={data} />);
    
    expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
    expect(screen.getByText('Fire')).toBeInTheDocument();
  });
});
