import React from 'react';
import styles from './DataTable.module.scss';

interface DataTableProps<T> {
  data: T[];
}

const DataTable = <T extends object>({ data }: DataTableProps<T>) => {
  if (!data || data.length === 0) {
    return <div className={styles.empty}>No data available</div>;
  }

  const headers = Object.keys(data[0]) as (keyof T & string)[];

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr>
            {headers.map((header) => (
              <th key={header}>{header === 'empty' ? '' : header}</th>
            ))}
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          {data.map((row, index) => (
            <tr key={index}>
              {headers.map((header) => (
                <td key={`${index}-${header}`} data-label={header === 'empty' ? '' : header}>
                  {row[header] as React.ReactNode ?? ''}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
