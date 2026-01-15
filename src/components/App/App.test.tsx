import { render, waitFor, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import App from './index';
import { fetchAndProcessIncidents } from '../../services/incident-service';

// Mock the service
vi.mock('../../services/incident-service', () => ({
  fetchAndProcessIncidents: vi.fn(() => Promise.resolve([])),
}));

describe('App Component', () => {
  it('renders and calls the fetching service', async () => {
    render(<App />);
    
    await waitFor(() => {
      expect(fetchAndProcessIncidents).toHaveBeenCalled();
    });
  });

  it('renders the correct number of rows based on fetched data', async () => {
    const mockData = [
      { empty: <div />, 'Date and Time': '1/1/2026', Priority: 1, 'Location name': 'Loc 1', Description: 'Desc 1' },
      { empty: <div />, 'Date and Time': '1/2/2026', Priority: 2, 'Location name': 'Loc 2', Description: 'Desc 2' },
    ];
    
    vi.mocked(fetchAndProcessIncidents).mockResolvedValueOnce(mockData as any);
    
    render(<App />);
    
    await waitFor(() => {
      // getAllByRole('row') includes the header row, so we expect mockData.length + 1
      const rows = screen.getAllByRole('row');
      expect(rows.length).toBe(mockData.length + 1);
    });
  });
});
