import { lazy } from 'react';

import suspense from '../../../utils/suspense';

import Album from './Album';

export const LazyAlbum = lazy(() =>
  /* webpackChunkName: "AlbumPage" */ import('./Album')
);
export const SuspenseAlbumPage = suspense(LazyAlbum);
export default Album;
