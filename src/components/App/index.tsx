import { useEffect, useState } from 'react';
import DataTable from '../DataTable';
import { fetchAndProcessIncidents } from '../../services/incident-service';

function App() {
  const [tableData, setTableData] = useState<Record<string, unknown>[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const processedData = await fetchAndProcessIncidents();
        setTableData(processedData);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);


  return (
    <div className="container">
      <h1>Incidents</h1>
      {isLoading ? (
        <div className="spinner-container">
          <div className="spinner" />
        </div>
      ) : (
        <DataTable data={tableData} />
      )}
    </div>
  )
}


export default App
