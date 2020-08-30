/* eslint-disable promise/catch-or-return */

import { Dispatch } from 'redux';
import { ipcRenderer } from 'electron';

import { refreshAlbums } from '../components/pages/Album/albumSlice';
import { refreshSongs } from '../components/pages/Song/songSlice';
import { refreshBooks } from '../components/pages/Book/bookSlice';

import { Song, Album, Book } from '../types';

export default async (dispatch: Dispatch) => {
  try {
    ipcRenderer
      .invoke('albums/get')
      .then((albums: Album[]) => dispatch(refreshAlbums(albums)));

    ipcRenderer
      .invoke('songs/get')
      .then((songs: Song[]) => dispatch(refreshSongs(songs)));

    ipcRenderer
      .invoke('books/get')
      .then((books: Book[]) => dispatch(refreshBooks(books)));
  } catch (e) {
    console.error(e);
  }
};
