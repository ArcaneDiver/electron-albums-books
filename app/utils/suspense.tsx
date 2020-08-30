import React, { LazyExoticComponent } from 'react';
import {
  Backdrop,
  CircularProgress,
  makeStyles,
  createStyles,
  Theme,
} from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: { zIndex: theme.zIndex.drawer + 1, color: '#fff' },
  })
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default (Component: LazyExoticComponent<React.ComponentType<any>>) => (
  props: Record<string, unknown>
) => {
  const classes = useStyles();
  return (
    <React.Suspense
      fallback={
        // eslint-disable-next-line react/jsx-wrap-multilines
        <Backdrop className={classes.backdrop} open>
          <CircularProgress color="inherit" />
        </Backdrop>
      }
    >
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Component {...props} />
    </React.Suspense>
  );
};
