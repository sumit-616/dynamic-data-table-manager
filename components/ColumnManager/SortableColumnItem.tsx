'use client';

import React from 'react';
import {
  ListItem,
  ListItemText,
  Checkbox,
  ListItemIcon,
} from '@mui/material';
import { DragIndicator } from '@mui/icons-material';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Column } from '../../types';

interface SortableColumnItemProps {
  column: Column;
  onToggle: (columnId: string) => void;
}

export function SortableColumnItem({ column, onToggle }: SortableColumnItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: column.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <ListItem
      ref={setNodeRef}
      style={style}
      sx={{
        border: 1,
        borderColor: 'divider',
        borderRadius: 1,
        mb: 1,
        backgroundColor: 'background.paper',
      }}
    >
      <ListItemIcon
        {...attributes}
        {...listeners}
        sx={{ cursor: 'grab', minWidth: 'auto', mr: 1 }}
      >
        <DragIndicator />
      </ListItemIcon>
      <Checkbox
        checked={column.visible}
        onChange={() => onToggle(column.id)}
        color="primary"
      />
      <ListItemText
        primary={column.label}
        secondary={`Type: ${column.type}`}
      />
    </ListItem>
  );
}