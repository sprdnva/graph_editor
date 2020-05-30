import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useState } from 'react';
import ExportParamsForm from './ExportParamsForm';

const FormDialog = ({ open, onClose }) => {
  const exportParams = useSelector(
    (state) => state.diagram.exportQueryParams,
    shallowEqual
  );

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Select Parameters</DialogTitle>
      <DialogContent>
        <ExportParamsForm exportParams={exportParams} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={onClose} color="primary">
          Done
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FormDialog;
