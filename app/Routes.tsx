/* eslint react/jsx-props-no-spreading: off */
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import * as routes from './constants/routes';

import App from './components/App';
import HomePage from './components/pages/Home';
import AlbumPage from './components/pages/Album';
import { SuspenseSongPage } from './components/pages/Song';
import { SuspenseBookPage } from './components/pages/Book';

export default function Routes() {
  return (
    <App>
      <Switch>
        <Route path={routes.ALBUMS} component={AlbumPage} />
        <Route path={routes.BOOKS} component={SuspenseBookPage} />
        <Route path={routes.SONGS} component={SuspenseSongPage} />
        <Route path={routes.HOME} component={HomePage} />
      </Switch>
    </App>
  );
}
