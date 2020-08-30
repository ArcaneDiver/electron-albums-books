import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Link } from '@material-ui/core';

import * as routes from '../../constants/routes';
import useStyles from './styles';
import theme from '../../utils/theme';

const Navbar = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Progetto INFO
          </Typography>
          <Link
            component={RouterLink}
            to={routes.ALBUMS}
            className={classes.link}
          >
            Albums
          </Link>
          <Link
            component={RouterLink}
            to={routes.BOOKS}
            className={classes.link}
          >
            Books
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
