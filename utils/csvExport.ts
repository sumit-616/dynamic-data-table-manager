import { saveAs } from 'file-saver';
import { store } from '../store';

export function exportToCSV() {
  const state = store.getState();
  const { data, columns } = state.table;
  
  const visibleColumns = columns.filter(col => col.visible).sort((a, b) => a.order - b.order);
  
  // Create CSV headers
  const headers = visibleColumns.map(col => col.label).join(',');
  
  // Create CSV rows
  const rows = data.map(row => 
    visibleColumns.map(col => {
      const value = row[col.field];
      // Escape commas and quotes in values
      if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
        return `"${value.replace(/"/g, '""')}"`;
      }
      return value;
    }).join(',')
  );
  
  // Combine headers and rows
  const csvContent = [headers, ...rows].join('\n');
  
  // Create and download file
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
  const fileName = `table-data-${new Date().toISOString().split('T')[0]}.csv`;
  
  saveAs(blob, fileName);
}