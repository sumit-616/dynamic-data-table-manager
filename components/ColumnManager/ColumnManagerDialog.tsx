'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  List,
  ListItem,
  ListItemText,
  Checkbox,
  TextField,
  Box,
  IconButton,
  Typography,
  Divider,
} from '@mui/material';
import { Add, DragIndicator } from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { updateColumn, addColumn, reorderColumns } from '../../store/tableSlice';
import { Column } from '../../types';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { SortableColumnItem } from './SortableColumnItem';

interface ColumnManagerDialogProps {
  open: boolean;
  onClose: () => void;
}

export function ColumnManagerDialog({ open, onClose }: ColumnManagerDialogProps) {
  const dispatch = useDispatch();
  const columns = useSelector((state: RootState) => state.table.columns);
  const [newColumnName, setNewColumnName] = useState('');

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleToggleColumn = (columnId: string) => {
    const column = columns.find(col => col.id === columnId);
    if (column) {
      dispatch(updateColumn({
        id: columnId,
        updates: { visible: !column.visible }
      }));
    }
  };

  const handleAddColumn = () => {
    if (newColumnName.trim()) {
      const newColumn: Column = {
        id: newColumnName.toLowerCase().replace(/\s+/g, '_'),
        label: newColumnName,
        field: newColumnName.toLowerCase().replace(/\s+/g, '_'),
        visible: true,
        sortable: true,
        editable: true,
        type: 'string',
        order: columns.length,
      };
      dispatch(addColumn(newColumn));
      setNewColumnName('');
    }
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = columns.findIndex(col => col.id === active.id);
      const newIndex = columns.findIndex(col => col.id === over.id);
      
      const reorderedColumns = arrayMove(columns, oldIndex, newIndex);
      const updatedColumns = reorderedColumns.map((col, index) => ({
        ...col,
        order: index,
      }));
      
      dispatch(reorderColumns(updatedColumns));
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Manage Columns</DialogTitle>
      <DialogContent>
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" gutterBottom>
            Add New Column
          </Typography>
          <Box display="flex" gap={1}>
            <TextField
              placeholder="Column name"
              value={newColumnName}
              onChange={(e) => setNewColumnName(e.target.value)}
              size="small"
              fullWidth
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleAddColumn();
                }
              }}
            />
            <Button
              variant="contained"
              onClick={handleAddColumn}
              disabled={!newColumnName.trim()}
              startIcon={<Add />}
            >
              Add
            </Button>
          </Box>
        </Box>

        <Divider sx={{ mb: 2 }} />

        <Typography variant="subtitle2" gutterBottom>
          Column Visibility & Order
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Drag to reorder columns, check/uncheck to show/hide
        </Typography>

        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={columns.map(col => col.id)}
            strategy={verticalListSortingStrategy}
          >
            <List>
              {columns.map((column) => (
                <SortableColumnItem
                  key={column.id}
                  column={column}
                  onToggle={handleToggleColumn}
                />
              ))}
            </List>
          </SortableContext>
        </DndContext>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}