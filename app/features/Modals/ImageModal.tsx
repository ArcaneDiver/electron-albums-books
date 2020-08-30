import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  createStyles,
  makeStyles,
  Theme,
} from '@material-ui/core';
import { ipcRenderer } from 'electron';

import { selectModals, closeImageModal } from './modalSlice';
import { startLoading, stopLoading } from '../Loading/loadingSlice';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    image: {
      width: '100%',
      height: 'auto',
    },
  })
);

const ImageModal = () => {
  const [decompressedImg, setDecompressedImg] = useState<string | null>(null);

  const dispatch = useDispatch();
  const { open, data } = useSelector(selectModals).image;

  const classes = useStyles();

  const decompressImg = async () => {
    const imageDecompressed = await ipcRenderer.invoke('decompress', data);

    console.log(localStorage.getItem('aa') === data);

    setDecompressedImg(imageDecompressed);
    dispatch(stopLoading());
  };

  const handleCloseModal = () => {
    setDecompressedImg(null);
    dispatch(closeImageModal(null));
  };

  useEffect(() => {
    if (open && data) {
      if (!decompressedImg) {
        dispatch(startLoading());
        decompressImg();
      }
    }
  }, [open]);

  return (
    <Dialog open={open} onClose={handleCloseModal}>
      <DialogContent>
        <img
          className={classes.image}
          src={decompressedImg as string}
          alt="Loading..."
        />
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={handleCloseModal}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ImageModal;
