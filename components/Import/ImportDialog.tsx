'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Alert,
  List,
  ListItem,
  ListItemText,
  LinearProgress,
} from '@mui/material';
import { CloudUpload } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { setData } from '../../store/tableSlice';
import { parseCSV } from '../../utils/csvImport';
import { ImportError } from '../../types';

interface ImportDialogProps {
  open: boolean;
  onClose: () => void;
}

export function ImportDialog({ open, onClose }: ImportDialogProps) {
  const dispatch = useDispatch();
  const [importing, setImporting] = useState(false);
  const [errors, setErrors] = useState<ImportError[]>([]);
  const [success, setSuccess] = useState(false);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setImporting(true);
    setErrors([]);
    setSuccess(false);

    try {
      const result = await parseCSV(file);
      
      if (result.errors.length > 0) {
        setErrors(result.errors);
      } else {
        dispatch(setData(result.data));
        setSuccess(true);
        setTimeout(() => {
          onClose();
          setSuccess(false);
        }, 2000);
      }
    } catch (error) {
      setErrors([{ row: 0, field: 'file', message: 'Failed to parse CSV file' }]);
    } finally {
      setImporting(false);
    }
  };

  const handleClose = () => {
    if (!importing) {
      onClose();
      setErrors([]);
      setSuccess(false);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>Import CSV Data</DialogTitle>
      <DialogContent>
        {success ? (
          <Alert severity="success" sx={{ mb: 2 }}>
            Data imported successfully!
          </Alert>
        ) : (
          <Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Upload a CSV file with columns: Name, Email, Age, Role, and any additional fields.
              The first row should contain column headers.
            </Typography>

            <Box
              sx={{
                border: 2,
                borderColor: 'primary.main',
                borderStyle: 'dashed',
                borderRadius: 2,
                p: 4,
                textAlign: 'center',
                mb: 2,
                cursor: importing ? 'not-allowed' : 'pointer',
                opacity: importing ? 0.5 : 1,
              }}
              component="label"
            >
              <input
                type="file"
                accept=".csv"
                onChange={handleFileUpload}
                style={{ display: 'none' }}
                disabled={importing}
              />
              <CloudUpload sx={{ fontSize: 48, color: 'primary.main', mb: 1 }} />
              <Typography variant="h6" gutterBottom>
                {importing ? 'Processing...' : 'Click to upload CSV file'}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Or drag and drop your file here
              </Typography>
            </Box>

            {importing && <LinearProgress sx={{ mb: 2 }} />}

            {errors.length > 0 && (
              <Box>
                <Alert severity="error" sx={{ mb: 2 }}>
                  Found {errors.length} error(s) in the CSV file:
                </Alert>
                <List dense sx={{ maxHeight: 200, overflow: 'auto' }}>
                  {errors.slice(0, 10).map((error, index) => (
                    <ListItem key={index}>
                      <ListItemText
                        primary={`Row ${error.row}, Field "${error.field}"`}
                        secondary={error.message}
                      />
                    </ListItem>
                  ))}
                  {errors.length > 10 && (
                    <ListItem>
                      <ListItemText
                        secondary={`... and ${errors.length - 10} more errors`}
                      />
                    </ListItem>
                  )}
                </List>
              </Box>
            )}
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} disabled={importing}>
          {success ? 'Done' : 'Cancel'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}