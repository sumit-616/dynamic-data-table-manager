import Papa from 'papaparse';
import { TableRow, ImportError } from '../types';

export interface ImportResult {
  data: TableRow[];
  errors: ImportError[];
}

export function parseCSV(file: File): Promise<ImportResult> {
  return new Promise((resolve) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const errors: ImportError[] = [];
        const data: TableRow[] = [];

        results.data.forEach((row: any, index: number) => {
          const rowNumber = index + 2; // +2 because index starts at 0 and header is row 1
          const processedRow: TableRow = {
            id: Date.now().toString() + index,
            name: '',
            email: '',
            age: 0,
            role: '',
          };

          // Validate and process each field
          Object.keys(row).forEach(key => {
            const value = row[key];
            const normalizedKey = key.toLowerCase().trim();

            if (normalizedKey === 'name') {
              if (!value || value.trim() === '') {
                errors.push({ row: rowNumber, field: 'name', message: 'Name is required' });
              } else {
                processedRow.name = value.trim();
              }
            } else if (normalizedKey === 'email') {
              const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
              if (!value || !emailRegex.test(value)) {
                errors.push({ row: rowNumber, field: 'email', message: 'Valid email is required' });
              } else {
                processedRow.email = value.trim();
              }
            } else if (normalizedKey === 'age') {
              const age = parseInt(value);
              if (isNaN(age) || age < 0 || age > 150) {
                errors.push({ row: rowNumber, field: 'age', message: 'Age must be a number between 0 and 150' });
              } else {
                processedRow.age = age;
              }
            } else if (normalizedKey === 'role') {
              if (!value || value.trim() === '') {
                errors.push({ row: rowNumber, field: 'role', message: 'Role is required' });
              } else {
                processedRow.role = value.trim();
              }
            } else {
              // Additional fields
              processedRow[normalizedKey] = value;
            }
          });

          // Only add row if no critical errors
          const criticalErrors = errors.filter(e => e.row === rowNumber);
          if (criticalErrors.length === 0) {
            data.push(processedRow);
          }
        });

        resolve({ data, errors });
      },
      error: () => {
        resolve({
          data: [],
          errors: [{ row: 0, field: 'file', message: 'Failed to parse CSV file' }]
        });
      }
    });
  });
}