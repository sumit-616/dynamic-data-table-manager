'use client';

import React from 'react';
import { Box, Stack } from '@mui/material';
import { SearchBar } from './SearchBar';
import { ActionButtons } from './ActionButtons';
import { ThemeToggle } from './ThemeToggle';

export function TableControls() {
  return (
    <Box sx={{ mb: 3 }}>
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        spacing={2}
        alignItems={{ xs: 'stretch', md: 'center' }}
        justifyContent="space-between"
      >
        <SearchBar />
        <Stack direction="row" spacing={1} alignItems="center">
          <ActionButtons />
          <ThemeToggle />
        </Stack>
      </Stack>
    </Box>
  );
}