import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  TextField,
  createStyles,
  makeStyles,
  Theme,
} from '@material-ui/core';

import { selectModals, closeCommentModal } from './modalSlice';
import { startLoading, stopLoading } from '../Loading/loadingSlice';
import { updateAlbum } from '../../components/pages/Album/albumSlice';
import { updateBooks } from '../../components/pages/Book/bookSlice';
import { updateSongs } from '../../components/pages/Song/songSlice';

import { Album, Book, Song } from '../../types';

const CommentModal = () => {
  const [commentText, setCommentText] = useState<string>('');

  const dispatch = useDispatch();
  const { open, data, from } = useSelector(selectModals).comment;

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCommentText(event.target.value);
  };

  const handleCloseModal = () => {
    setCommentText('');
    dispatch(closeCommentModal(null));
  };

  const handleSaveComment = () => {
    if (from === 'album')
      dispatch(
        updateAlbum(data as Album, { ...(data as Album), comment: commentText })
      );
    else if (from === 'book')
      dispatch(
        updateBooks(data as Book, { ...(data as Book), comment: commentText })
      );
    else if (from === 'song')
      dispatch(
        updateSongs(data as Song, { ...(data as Song), comment: commentText })
      );

    handleCloseModal();
  };

  useEffect(() => {
    if (open) if (data && data.comment) setCommentText(data.comment);
  }, [open]);

  return (
    <Dialog open={open} maxWidth="md" onClose={handleCloseModal}>
      <DialogContent>
        <DialogContentText>Inserisci un commento</DialogContentText>
        <TextField
          label="Comment"
          multiline
          variant="outlined"
          value={commentText}
          onChange={handleInputChange}
        />
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={handleCloseModal}>
          Cancel
        </Button>
        <Button color="primary" onClick={handleSaveComment}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CommentModal;
