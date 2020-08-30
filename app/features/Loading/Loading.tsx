import React from 'react';
import { useSelector } from 'react-redux';
import {
  Backdrop,
  CircularProgress,
  makeStyles,
  createStyles,
  Theme,
} from '@material-ui/core';

import { selectLoading } from './loadingSlice';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: { zIndex: theme.zIndex.drawer + 1, color: '#fff' },
  })
);

const Loading = () => {
  const isOpen = useSelector(selectLoading);
  const classes = useStyles();

  return (
    <Backdrop className={classes.backdrop} open={isOpen}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default Loading;
