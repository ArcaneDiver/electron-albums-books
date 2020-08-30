import { lazy } from 'react';

import suspense from '../../../utils/suspense';

import Home from './Home';

export const LazyHome = lazy(() =>
  /* webpackChunkName: "AlbumPage" */ import('./Home')
);
export const SuspenseHomePage = suspense(LazyHome);
export default Home;
