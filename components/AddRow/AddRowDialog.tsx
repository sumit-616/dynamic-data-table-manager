'use client';

import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Grid,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { addRow } from '../../store/tableSlice';
import { TableRow } from '../../types';

interface AddRowDialogProps {
  open: boolean;
  onClose: () => void;
}

export function AddRowDialog({ open, onClose }: AddRowDialogProps) {
  const dispatch = useDispatch();
  const columns = useSelector((state: RootState) => state.table.columns);
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const editableColumns = columns.filter(col => col.editable);

  const onSubmit = (data: any) => {
    const newRow: TableRow = {
      id: Date.now().toString(),
      ...data,
      age: data.age ? parseInt(data.age) : 0,
    };
    
    dispatch(addRow(newRow));
    reset();
    onClose();
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const getValidationRules = (column: any) => {
    const rules: any = { required: 'This field is required' };
    
    if (column.type === 'email') {
      rules.pattern = {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: 'Please enter a valid email address',
      };
    }
    
    if (column.type === 'number') {
      rules.pattern = {
        value: /^\d+$/,
        message: 'Please enter a valid number',
      };
    }
    
    return rules;
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>Add New Row</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Box sx={{ pt: 1 }}>
            <Grid container spacing={2}>
              {editableColumns.map((column) => (
                <Grid item xs={12} sm={6} key={column.id}>
                  <TextField
                    label={column.label}
                    fullWidth
                    type={column.type === 'number' ? 'number' : 'text'}
                    {...register(column.field, getValidationRules(column))}
                    error={!!errors[column.field]}
                    helperText={errors[column.field]?.message as string}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" variant="contained">
            Add Row
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}