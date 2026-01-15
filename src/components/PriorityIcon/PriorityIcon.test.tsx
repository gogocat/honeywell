import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import PriorityIcon from './index';

describe('PriorityIcon Component', () => {
  it('renders High Priority Alarm for priority 1', () => {
    render(<PriorityIcon priority={1} />);
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('alt', 'High Priority Alarm');
    expect(img).toHaveAttribute('title', 'High Priority Alarm');
  });

  it('renders Medium Priority Alarm for priority 2', () => {
    render(<PriorityIcon priority={2} />);
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('alt', 'Medium Priority Alarm');
    expect(img).toHaveAttribute('title', 'Medium Priority Alarm');
  });

  it('renders Low Priority Alarm for priority 3', () => {
    render(<PriorityIcon priority={3} />);
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('alt', 'Low Priority Alarm');
    expect(img).toHaveAttribute('title', 'Low Priority Alarm');
  });

  it('renders Low Priority Alarm as default for unknown priority', () => {
    render(<PriorityIcon priority={99} />);
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('alt', 'Low Priority Alarm');
  });
});
