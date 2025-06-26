'use client';

import React, { useState, useEffect } from 'react';
import { TextField } from '@mui/material';
import { Column } from '../../types';

interface EditableCellProps {
  value: any;
  column: Column;
  onUpdate: (value: any) => void;
}

export function EditableCell({ value, column, onUpdate }: EditableCellProps) {
  const [localValue, setLocalValue] = useState(value);
  const [error, setError] = useState('');

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const validate = (val: string) => {
    if (column.type === 'number') {
      if (isNaN(Number(val)) || val === '') {
        setError('Must be a valid number');
        return false;
      }
    } else if (column.type === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(val)) {
        setError('Must be a valid email');
        return false;
      }
    }
    setError('');
    return true;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setLocalValue(newValue);
    
    if (validate(newValue)) {
      const finalValue = column.type === 'number' ? Number(newValue) : newValue;
      onUpdate(finalValue);
    }
  };

  return (
    <TextField
      value={localValue}
      onChange={handleChange}
      size="small"
      fullWidth
      error={!!error}
      helperText={error}
      type={column.type === 'number' ? 'number' : 'text'}
      variant="outlined"
      sx={{
        '& .MuiOutlinedInput-root': {
          minHeight: '36px',
        },
      }}
    />
  );
}