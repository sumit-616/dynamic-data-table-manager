'use client';

import React, { useState } from 'react';
import { Button, Stack } from '@mui/material';
import { ViewColumn, Upload, Download, Add } from '@mui/icons-material';
import { ColumnManagerDialog } from '../ColumnManager/ColumnManagerDialog';
import { ImportDialog } from '../Import/ImportDialog';
import { AddRowDialog } from '../AddRow/AddRowDialog';
import { exportToCSV } from '../../utils/csvExport';

export function ActionButtons() {
  const [columnDialogOpen, setColumnDialogOpen] = useState(false);
  const [importDialogOpen, setImportDialogOpen] = useState(false);
  const [addRowDialogOpen, setAddRowDialogOpen] = useState(false);

  return (
    <>
      <Stack direction="row" spacing={1}>
        <Button
          variant="outlined"
          startIcon={<Add />}
          onClick={() => setAddRowDialogOpen(true)}
          size="small"
        >
          Add Row
        </Button>
        <Button
          variant="outlined"
          startIcon={<ViewColumn />}
          onClick={() => setColumnDialogOpen(true)}
          size="small"
        >
          Columns
        </Button>
        <Button
          variant="outlined"
          startIcon={<Upload />}
          onClick={() => setImportDialogOpen(true)}
          size="small"
        >
          Import
        </Button>
        <Button
          variant="outlined"
          startIcon={<Download />}
          onClick={exportToCSV}
          size="small"
        >
          Export
        </Button>
      </Stack>

      <ColumnManagerDialog
        open={columnDialogOpen}
        onClose={() => setColumnDialogOpen(false)}
      />
      
      <ImportDialog
        open={importDialogOpen}
        onClose={() => setImportDialogOpen(false)}
      />

      <AddRowDialog
        open={addRowDialogOpen}
        onClose={() => setAddRowDialogOpen(false)}
      />
    </>
  );
}