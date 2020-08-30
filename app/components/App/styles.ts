import { createStyles, makeStyles, Theme } from '@material-ui/core';

export default makeStyles((theme: Theme) =>
  createStyles({
    main: {
      height: 'calc(100vh - 64px)',
      width: '100%',
      padding: theme.spacing(4),
      backgroundColor: theme.palette.background.default,
      zIndex: -1,
    },
  })
);
