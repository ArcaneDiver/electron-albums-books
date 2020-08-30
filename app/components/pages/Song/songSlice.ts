import {
  createSlice,
  PayloadAction,
  SliceCaseReducers,
} from '@reduxjs/toolkit';
import { ipcRenderer } from 'electron';
import * as _ from 'lodash';

// eslint-disable-next-line import/no-cycle
import { AppThunk, RootState } from '../../../store';

import { Song } from '../../../types';

const songSlice = createSlice<
  { data: Song[] },
  SliceCaseReducers<{ data: Song[] }>,
  'songs'
>({
  name: 'songs',
  initialState: {
    data: [],
  },
  reducers: {
    refreshSongs: (state: { data: Song[] }, action: PayloadAction<Song[]>) => {
      return {
        data: [...action.payload],
      };
    },
  },
});

export const { refreshSongs } = songSlice.actions;

export const addSong = (song: Song): AppThunk => async (dispatch, getState) => {
  const [id] = await ipcRenderer.invoke('songs/add', {
    song: _.omit(song, ['album_id']),
  });

  const { songs } = getState();
  const newSongs = [...songs.data, { ...song, id }];

  dispatch(refreshSongs(newSongs));
};

export const removeSong = (songToRemove: Song): AppThunk => async (
  dispatch,
  getState
) => {
  await ipcRenderer.invoke('songs/remove', { id: songToRemove.id });

  const songs = getState().songs.data.filter(
    (song) => song.id !== songToRemove.id
  );

  dispatch(refreshSongs(songs));
};

export const updateSongs = (oldSong: Song, newSong: Song): AppThunk => async (
  dispatch,
  getState
) => {
  await ipcRenderer.invoke('songs/update', {
    id: oldSong.id,
    song: newSong,
  });

  const songs = getState().songs.data.map((song) =>
    song.id === oldSong.id
      ? { ...newSong, id: oldSong.id, album_id: oldSong.album_id }
      : song
  );

  dispatch(refreshSongs(songs));
};

export default songSlice.reducer;

export const selectSongs = (state: RootState) => state.songs.data;
