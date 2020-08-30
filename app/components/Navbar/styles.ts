import { createStyles, makeStyles, Theme } from '@material-ui/core';

export default makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    title: {
      marginRight: theme.spacing(2),
    },
    link: {
      color: theme.palette.common.white,
      fontSize: theme.typography.h6.fontSize,
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
    },
  })
);
