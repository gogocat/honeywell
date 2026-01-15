import { useEffect, useState } from 'react';
import DataTable from '../DataTable';
import PriorityIcon from '../PriorityIcon';
import fakeApi, { Incident } from '../../services/fake-api.js'; 

function App() {
  const [tableData, setTableData] = useState<Record<string, unknown>[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const locations = await fakeApi.getLocations();
        const locationMap = new Map(locations.map(loc => [loc.id, loc.name]));

        // One pass to get unique location IDs and their corresponding Promises
        const seenIds = new Set<string>();
        const incidentPromises: Promise<Incident[]>[] = [];

        for (const { id } of locations) {
          if (!seenIds.has(id)) {
            seenIds.add(id);
            incidentPromises.push(fakeApi.getIncidentsByLocationId(id));
          }
        }

        const results = await Promise.all(incidentPromises);

        // Flatten, sort, and transform to display format
        const processedData = results
          .flat()
          .sort((a, b) => (
            a.priority - b.priority || 
            new Date(b.datetime).getTime() - new Date(a.datetime).getTime()
          ))
          .map(incident => ({
            empty: <PriorityIcon priority={incident.priority} />,
            'Date and Time': new Date(incident.datetime).toLocaleString(),
            Priority: incident.priority,
            'Location name': locationMap.get(incident.locationId) || incident.locationId,
            Description: incident.name
          }));

        setTableData(processedData);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container">
      <h1>Incidents</h1>
      <DataTable data={tableData} />
    </div>
  )
}

export default App
