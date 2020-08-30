import { lazy } from 'react';

import suspense from '../../../utils/suspense';

import Song from './Song';

export const LazySong = lazy(() =>
  /* webpackChunkName: "SongPage" */ import('./Song')
);
export const SuspenseSongPage = suspense(LazySong);
export default Song;
