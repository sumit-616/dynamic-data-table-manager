'use client';

import React from 'react';
import { TextField, InputAdornment } from '@mui/material';
import { Search } from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { setSearchTerm } from '../../store/tableSlice';

export function SearchBar() {
  const dispatch = useDispatch();
  const searchTerm = useSelector((state: RootState) => state.table.searchTerm);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchTerm(event.target.value));
  };

  return (
    <TextField
      placeholder="Search all fields..."
      value={searchTerm}
      onChange={handleSearch}
      size="small"
      sx={{ minWidth: { xs: 'auto', md: 300 } }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Search />
          </InputAdornment>
        ),
      }}
    />
  );
}