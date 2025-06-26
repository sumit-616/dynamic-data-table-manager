export interface TableRow {
  id: string;
  name: string;
  email: string;
  age: number;
  role: string;
  department?: string;
  location?: string;
  [key: string]: any;
}

export interface Column {
  id: string;
  label: string;
  field: string;
  visible: boolean;
  sortable: boolean;
  editable: boolean;
  type: 'string' | 'number' | 'email';
  order: number;
}

export interface TableState {
  data: TableRow[];
  columns: Column[];
  searchTerm: string;
  sortField: string | null;
  sortDirection: 'asc' | 'desc';
  page: number;
  rowsPerPage: number;
  editingRows: string[];
  theme: 'light' | 'dark';
}

export interface ImportError {
  row: number;
  field: string;
  message: string;
}