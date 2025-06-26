'use client';

import React, { useMemo } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
  Tooltip,
  Box,
  Typography,
  Chip,
} from '@mui/material';
import {
  ArrowUpward,
  ArrowDownward,
  Edit,
  Delete,
  Check,
  Close,
} from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { setSorting, setPage, setRowsPerPage, toggleEditing, deleteRow, updateRow } from '../../store/tableSlice';
import { TableRow as TableRowType } from '../../types';
import { EditableCell } from './EditableCell';
import { DeleteConfirmDialog } from './DeleteConfirmDialog';

export function DataTable() {
  const dispatch = useDispatch();
  const { data, columns, searchTerm, sortField, sortDirection, page, rowsPerPage, editingRows } = useSelector(
    (state: RootState) => state.table
  );

  const [deleteDialog, setDeleteDialog] = React.useState<{ open: boolean; rowId: string | null }>({
    open: false,
    rowId: null,
  });

  const visibleColumns = useMemo(() => 
    columns.filter(col => col.visible).sort((a, b) => a.order - b.order),
    [columns]
  );

  const filteredAndSortedData = useMemo(() => {
    let filtered = data;

    // Apply search filter
    if (searchTerm) {
      filtered = data.filter(row =>
        visibleColumns.some(col =>
          String(row[col.field]).toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    // Apply sorting
    if (sortField) {
      filtered = [...filtered].sort((a, b) => {
        const aVal = a[sortField];
        const bVal = b[sortField];
        
        if (typeof aVal === 'number' && typeof bVal === 'number') {
          return sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
        }
        
        const aStr = String(aVal).toLowerCase();
        const bStr = String(bVal).toLowerCase();
        
        if (sortDirection === 'asc') {
          return aStr.localeCompare(bStr);
        } else {
          return bStr.localeCompare(aStr);
        }
      });
    }

    return filtered;
  }, [data, searchTerm, sortField, sortDirection, visibleColumns]);

  const paginatedData = useMemo(() => {
    const startIndex = page * rowsPerPage;
    return filteredAndSortedData.slice(startIndex, startIndex + rowsPerPage);
  }, [filteredAndSortedData, page, rowsPerPage]);

  const handleSort = (field: string) => {
    const newDirection = sortField === field && sortDirection === 'asc' ? 'desc' : 'asc';
    dispatch(setSorting({ field, direction: newDirection }));
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    dispatch(setPage(newPage));
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setRowsPerPage(parseInt(event.target.value, 10)));
  };

  const handleEdit = (rowId: string) => {
    dispatch(toggleEditing(rowId));
  };

  const handleDelete = (rowId: string) => {
    setDeleteDialog({ open: true, rowId });
  };

  const confirmDelete = () => {
    if (deleteDialog.rowId) {
      dispatch(deleteRow(deleteDialog.rowId));
    }
    setDeleteDialog({ open: false, rowId: null });
  };

  const handleCellUpdate = (rowId: string, field: string, value: any) => {
    dispatch(updateRow({ id: rowId, data: { [field]: value } }));
  };

  const handleSaveRow = (rowId: string) => {
    dispatch(toggleEditing(rowId));
  };

  const handleCancelRow = (rowId: string) => {
    dispatch(toggleEditing(rowId));
  };

  const SortableTableCell = ({ column, children }: { column: any; children: React.ReactNode }) => (
    <TableCell
      sx={{ 
        fontWeight: 600,
        cursor: column.sortable ? 'pointer' : 'default',
        userSelect: 'none',
        '&:hover': column.sortable ? { backgroundColor: 'action.hover' } : undefined,
      }}
      onClick={() => column.sortable && handleSort(column.field)}
    >
      <Box display="flex" alignItems="center" gap={1}>
        {children}
        {column.sortable && sortField === column.field && (
          sortDirection === 'asc' ? <ArrowUpward fontSize="small" /> : <ArrowDownward fontSize="small" />
        )}
      </Box>
    </TableCell>
  );

  return (
    <Paper elevation={3} sx={{ borderRadius: 3 }}>
      <TableContainer>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {visibleColumns.map(column => (
                <SortableTableCell key={column.id} column={column}>
                  {column.label}
                </SortableTableCell>
              ))}
              <TableCell sx={{ fontWeight: 600, width: 120 }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={visibleColumns.length + 1} align="center" sx={{ py: 4 }}>
                  <Typography variant="body1" color="text.secondary">
                    {searchTerm ? 'No results found for your search.' : 'No data available.'}
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              paginatedData.map((row) => {
                const isEditing = editingRows.includes(row.id);
                return (
                  <TableRow
                    key={row.id}
                    hover={!isEditing}
                    sx={{
                      '&:last-child td, &:last-child th': { border: 0 },
                      backgroundColor: isEditing ? 'action.selected' : 'inherit',
                    }}
                  >
                    {visibleColumns.map(column => (
                      <TableCell key={column.id}>
                        {isEditing && column.editable ? (
                          <EditableCell
                            value={row[column.field]}
                            column={column}
                            onUpdate={(value) => handleCellUpdate(row.id, column.field, value)}
                          />
                        ) : (
                          <Box>
                            {column.type === 'email' ? (
                              <Chip 
                                label={row[column.field]} 
                                variant="outlined" 
                                size="small"
                                color="primary"
                              />
                            ) : (
                              row[column.field]
                            )}
                          </Box>
                        )}
                      </TableCell>
                    ))}
                    <TableCell>
                      <Box display="flex" gap={1}>
                        {isEditing ? (
                          <>
                            <Tooltip title="Save">
                              <IconButton
                                size="small"
                                color="success"
                                onClick={() => handleSaveRow(row.id)}
                              >
                                <Check />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Cancel">
                              <IconButton
                                size="small"
                                color="error"
                                onClick={() => handleCancelRow(row.id)}
                              >
                                <Close />
                              </IconButton>
                            </Tooltip>
                          </>
                        ) : (
                          <>
                            <Tooltip title="Edit">
                              <IconButton
                                size="small"
                                color="primary"
                                onClick={() => handleEdit(row.id)}
                              >
                                <Edit />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete">
                              <IconButton
                                size="small"
                                color="error"
                                onClick={() => handleDelete(row.id)}
                              >
                                <Delete />
                              </IconButton>
                            </Tooltip>
                          </>
                        )}
                      </Box>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 50]}
        component="div"
        count={filteredAndSortedData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{ borderTop: 1, borderColor: 'divider' }}
      />
      <DeleteConfirmDialog
        open={deleteDialog.open}
        onClose={() => setDeleteDialog({ open: false, rowId: null })}
        onConfirm={confirmDelete}
      />
    </Paper>
  );
}