import { describe, it, expect, vi } from 'vitest';
import { fetchAndProcessIncidents } from './incident-service';
import fakeApi from './fake-api.js';

// Mock fakeApi
vi.mock('./fake-api.js', () => ({
  default: {
    getLocations: vi.fn(),
    getIncidentsByLocationId: vi.fn(),
  }
}));

describe('incident-service', () => {
  it('fetches, sorts, and processes incidents correctly', async () => {
    // 1. Mock Locations
    const mockLocations = [
      { name: 'Location A', id: 'loc-a' },
      { name: 'Location B', id: 'loc-b' },
    ];
    vi.mocked(fakeApi.getLocations).mockResolvedValue(mockLocations);

    // 2. Mock Incidents per location
    const mockIncidentsA = [
      { id: 1, name: 'Low Priority A', priority: 3, datetime: '2026-01-01T10:00:00Z', locationId: 'loc-a' },
      { id: 2, name: 'High Priority A', priority: 1, datetime: '2026-01-01T12:00:00Z', locationId: 'loc-a' },
    ];
    const mockIncidentsB = [
      { id: 3, name: 'Medium Priority B', priority: 2, datetime: '2026-01-01T11:00:00Z', locationId: 'loc-b' },
    ];

    vi.mocked(fakeApi.getIncidentsByLocationId).mockImplementation((id) => {
      if (id === 'loc-a') return Promise.resolve(mockIncidentsA);
      if (id === 'loc-b') return Promise.resolve(mockIncidentsB);
      return Promise.resolve([]);
    });

    // 3. Execute
    const result = await fetchAndProcessIncidents();

    // 4. Assertions
    expect(fakeApi.getLocations).toHaveBeenCalled();
    expect(fakeApi.getIncidentsByLocationId).toHaveBeenCalledWith('loc-a');
    expect(fakeApi.getIncidentsByLocationId).toHaveBeenCalledWith('loc-b');

    // Check sorting: Priority 1 first, then 2, then 3
    expect(result.length).toBe(3);
    expect(result[0].Priority).toBe(1); // High Priority A
    expect(result[0].Description).toBe('High Priority A');
    expect(result[0]['Location name']).toBe('Location A');

    expect(result[1].Priority).toBe(2); // Medium Priority B
    expect(result[1].Description).toBe('Medium Priority B');
    expect(result[1]['Location name']).toBe('Location B');

    expect(result[2].Priority).toBe(3); // Low Priority A
    expect(result[2].Description).toBe('Low Priority A');
  });

  it('sorts by datetime descending when priorities are equal', async () => {
    vi.mocked(fakeApi.getLocations).mockResolvedValue([{ name: 'Loc', id: 'loc' }]);
    
    const samePriorityIncidents = [
      { id: 1, name: 'Older', priority: 1, datetime: '2026-01-01T10:00:00Z', locationId: 'loc' },
      { id: 2, name: 'Newer', priority: 1, datetime: '2026-01-01T12:00:00Z', locationId: 'loc' },
    ];
    vi.mocked(fakeApi.getIncidentsByLocationId).mockResolvedValue(samePriorityIncidents);

    const result = await fetchAndProcessIncidents();

    expect(result[0].Description).toBe('Newer');
    expect(result[1].Description).toBe('Older');
  });
});
