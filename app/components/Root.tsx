import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { hot } from 'react-hot-loader/root';
import { History } from 'history';
import { ThemeProvider } from '@material-ui/core';

import { Store } from '../store';
import Routes from '../Routes';
import theme from '../utils/theme';

type Props = {
  store: Store;
  history: History;
};

const Root = ({ store, history }: Props) => (
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Routes />
      </ConnectedRouter>
    </Provider>
  </ThemeProvider>
);

export default hot(Root);
