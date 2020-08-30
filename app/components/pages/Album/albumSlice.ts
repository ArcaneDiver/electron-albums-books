import {
  createSlice,
  PayloadAction,
  SliceCaseReducers,
} from '@reduxjs/toolkit';
import { ipcRenderer } from 'electron';

// eslint-disable-next-line import/no-cycle
import { AppThunk, RootState } from '../../../store';

import { Album } from '../../../types';

const albumSlice = createSlice<
  { data: Album[] },
  SliceCaseReducers<{ data: Album[] }>,
  'albums'
>({
  name: 'albums',
  initialState: {
    data: [],
  },
  reducers: {
    refreshAlbums: (
      state: { data: Album[] },
      action: PayloadAction<Album[]>
    ) => {
      return {
        data: [...action.payload],
      };
    },
  },
});

export const { refreshAlbums } = albumSlice.actions;

export const addAlbum = (album: Album): AppThunk => async (
  dispatch,
  getState
) => {
  const [id] = await ipcRenderer.invoke('albums/add', {
    album,
  });

  const { albums } = getState();
  const newAlbums = [...albums.data, { ...album, id }];

  dispatch(refreshAlbums(newAlbums));
};

export const removeAlbum = (albumToRemove: Album): AppThunk => async (
  dispatch,
  getState
) => {
  await ipcRenderer.invoke('albums/remove', {
    id: albumToRemove.id,
  });

  const albums = getState().albums.data.filter(
    (album) => album.id !== albumToRemove.id
  );

  dispatch(refreshAlbums(albums));
};

export const updateAlbum = (
  oldAlbum: Album,
  newAlbum: Album
): AppThunk => async (dispatch, getState) => {
  await ipcRenderer.invoke('albums/update', {
    id: oldAlbum.id,
    album: newAlbum,
  });

  const albums = getState().albums.data.map((album) =>
    album.id === oldAlbum.id ? { ...newAlbum, id: oldAlbum.id } : album
  );

  dispatch(refreshAlbums(albums));
};

export default albumSlice.reducer;

export const selectAlbums = (state: RootState) => state.albums.data;
