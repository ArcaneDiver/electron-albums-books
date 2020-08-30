import { lazy } from 'react';

import suspense from '../../../utils/suspense';

import Book from './Book';

export const LazyBook = lazy(() =>
  /* webpackChunkName: "BookPage" */ import('./Book')
);
export const SuspenseBookPage = suspense(LazyBook);
export default Book;
