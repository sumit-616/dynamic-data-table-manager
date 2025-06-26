import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TableState, TableRow, Column } from '../types';

const defaultColumns: Column[] = [
  { id: 'name', label: 'Name', field: 'name', visible: true, sortable: true, editable: true, type: 'string', order: 0 },
  { id: 'email', label: 'Email', field: 'email', visible: true, sortable: true, editable: true, type: 'email', order: 1 },
  { id: 'age', label: 'Age', field: 'age', visible: true, sortable: true, editable: true, type: 'number', order: 2 },
  { id: 'role', label: 'Role', field: 'role', visible: true, sortable: true, editable: true, type: 'string', order: 3 },
];

const sampleData: TableRow[] = [
  { id: '1', name: 'John Doe', email: 'john@example.com', age: 30, role: 'Developer' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', age: 28, role: 'Designer' },
  { id: '3', name: 'Bob Johnson', email: 'bob@example.com', age: 35, role: 'Manager' },
  { id: '4', name: 'Alice Brown', email: 'alice@example.com', age: 32, role: 'Developer' },
  { id: '5', name: 'Charlie Wilson', email: 'charlie@example.com', age: 29, role: 'Analyst' },
  { id: '6', name: 'Diana Davis', email: 'diana@example.com', age: 31, role: 'Designer' },
  { id: '7', name: 'Edward Miller', email: 'edward@example.com', age: 33, role: 'Developer' },
  { id: '8', name: 'Fiona Garcia', email: 'fiona@example.com', age: 27, role: 'Manager' },
  { id: '9', name: 'George Martinez', email: 'george@example.com', age: 34, role: 'Analyst' },
  { id: '10', name: 'Helen Rodriguez', email: 'helen@example.com', age: 26, role: 'Designer' },
  { id: '11', name: 'Ian Lopez', email: 'ian@example.com', age: 36, role: 'Developer' },
  { id: '12', name: 'Julia Hernandez', email: 'julia@example.com', age: 25, role: 'Manager' },
];

const initialState: TableState = {
  data: sampleData,
  columns: defaultColumns,
  searchTerm: '',
  sortField: null,
  sortDirection: 'asc',
  page: 0,
  rowsPerPage: 10,
  editingRows: [],
  theme: 'light',
};

const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<TableRow[]>) => {
      state.data = action.payload;
    },
    addRow: (state, action: PayloadAction<TableRow>) => {
      state.data.push(action.payload);
    },
    updateRow: (state, action: PayloadAction<{ id: string; data: Partial<TableRow> }>) => {
      const { id, data } = action.payload;
      const index = state.data.findIndex(row => row.id === id);
      if (index !== -1) {
        state.data[index] = { ...state.data[index], ...data };
      }
    },
    deleteRow: (state, action: PayloadAction<string>) => {
      state.data = state.data.filter(row => row.id !== action.payload);
    },
    setColumns: (state, action: PayloadAction<Column[]>) => {
      state.columns = action.payload;
    },
    updateColumn: (state, action: PayloadAction<{ id: string; updates: Partial<Column> }>) => {
      const { id, updates } = action.payload;
      const index = state.columns.findIndex(col => col.id === id);
      if (index !== -1) {
        state.columns[index] = { ...state.columns[index], ...updates };
      }
    },
    addColumn: (state, action: PayloadAction<Column>) => {
      state.columns.push(action.payload);
    },
    reorderColumns: (state, action: PayloadAction<Column[]>) => {
      state.columns = action.payload;
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
      state.page = 0;
    },
    setSorting: (state, action: PayloadAction<{ field: string; direction: 'asc' | 'desc' }>) => {
      state.sortField = action.payload.field;
      state.sortDirection = action.payload.direction;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setRowsPerPage: (state, action: PayloadAction<number>) => {
      state.rowsPerPage = action.payload;
      state.page = 0;
    },
    toggleEditing: (state, action: PayloadAction<string>) => {
      const rowId = action.payload;
      if (state.editingRows.includes(rowId)) {
        state.editingRows = state.editingRows.filter(id => id !== rowId);
      } else {
        state.editingRows.push(rowId);
      }
    },
    clearEditing: (state) => {
      state.editingRows = [];
    },
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.theme = action.payload;
    },
  },
});

export const {
  setData,
  addRow,
  updateRow,
  deleteRow,
  setColumns,
  updateColumn,
  addColumn,
  reorderColumns,
  setSearchTerm,
  setSorting,
  setPage,
  setRowsPerPage,
  toggleEditing,
  clearEditing,
  setTheme,
} = tableSlice.actions;

export default tableSlice.reducer;