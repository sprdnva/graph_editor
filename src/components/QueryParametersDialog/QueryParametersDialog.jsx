import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useState } from 'react';
import ExportParamsForm from '../ExportParamsForm/ExportParamsForm';

const FormDialog = ({ open, onClose, onHandleSubmit }) => {
  const exportParams = useSelector(
    (state) => state.diagram.exportQueryParams,
    shallowEqual
  );

  const [parameters, setParameters] = useState({
    framework: 'keras',
  });

  // const [paramsString, setParamsString] = useState('');

  const handleDone = () => {
    const paramsArray = Object.keys(parameters).map((key) => {
      if (parameters[key]) {
        return `${key}=${parameters[key]}`;
      }
    });
    console.log(paramsArray);
    const paramsString = `?${paramsArray.join('&')}`;
    onHandleSubmit(paramsString);
    setParameters({});
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Select Parameters</DialogTitle>
      <DialogContent>
        <ExportParamsForm
          exportParams={exportParams}
          parameters={parameters}
          setParameters={setParameters}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleDone} color="primary">
          Done
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FormDialog;
