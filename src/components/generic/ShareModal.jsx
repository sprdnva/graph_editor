import React, { useState } from 'react';
import { Dialog, Box, Snackbar } from '@material-ui/core';
import { useSelector, shallowEqual } from 'react-redux';
import CloseRounded from '@material-ui/icons/CloseRounded';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import './shareModal.css';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const ShareModal = ({ open, handleClose }) => {
  const link = useSelector((state) => state.diagram.sharableLink, shallowEqual);

  const [isCopied, setIsCopied] = useState(false);

  return (
    <Dialog
      classes={{
        paper: 'paper_root',
      }}
      open={open}
      onClose={handleClose}
    >
      <CloseRounded className="close_icon" onClick={handleClose} />
      <Box className="link_box">
        {link}
        <CopyToClipboard text={link}>
          <Box
            display="inline-block"
            className="copy_icon-box"
            onClick={() => {
              setIsCopied(true);
            }}
          >
            <FileCopyIcon className="copy_icon" />
          </Box>
        </CopyToClipboard>
      </Box>
      <Snackbar
        open={isCopied}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        onClose={() => {
          setIsCopied(false);
        }}
        message="Copied to clipboard!"
        autoHideDuration={2000}
      />
    </Dialog>
  );
};

export default ShareModal;
