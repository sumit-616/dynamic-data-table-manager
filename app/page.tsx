'use client';

import React from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';
import { DataTable } from '../components/DataTable/DataTable';
import { TableControls } from '../components/TableControls/TableControls';

export default function Home() {
  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom fontWeight="bold" textAlign="center">
          📊Dynamic Data Table Manager
        </Typography>
        <Typography variant="h6" color="text.secondary" textAlign="center" sx={{ mb: 3 }}>
          Manage your data with powerful sorting, filtering, and editing capabilities
        </Typography>
      </Box>
      
      <Paper elevation={1} sx={{ p: 3, borderRadius: 3 }}>
        <TableControls />
        <DataTable />
      </Paper>
    </Container>
  );
}