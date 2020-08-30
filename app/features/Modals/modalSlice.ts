import {
  createSlice,
  PayloadAction,
  SliceCaseReducers,
} from '@reduxjs/toolkit';

// eslint-disable-next-line import/no-cycle
import { AppThunk, RootState } from '../../store';
import { Album, Book, Song } from '../../types';

type ModalState = {
  image: {
    open: boolean;
    data: string | null;
  };
  upload: {
    open: boolean;
    data: Album | Book | null;
    from: 'album' | 'book';
  };
  comment: {
    open: boolean;
    data: Album | Book | Song | null;
    from: 'album' | 'book' | 'song';
  };
};
const modalSlice = createSlice<
  ModalState,
  SliceCaseReducers<ModalState>,
  'modals'
>({
  name: 'modals',
  initialState: {
    image: {
      open: false,
      data: null,
    },
    upload: {
      open: false,
      data: null,
      from: 'album',
    },
    comment: {
      open: false,
      data: null,
      from: 'album',
    },
  },
  reducers: {
    openImageModal: (state, action: PayloadAction<string>) => ({
      ...state,
      image: {
        open: true,
        data: action.payload,
      },
    }),
    closeImageModal: (state) => ({
      ...state,
      image: {
        open: false,
        data: null,
      },
    }),
    openUploadImageModal: (
      state,
      action: PayloadAction<{ from: 'album' | 'book'; data: Album | Book }>
    ) => ({
      ...state,
      upload: {
        open: true,
        data: action.payload.data,
        from: action.payload.from,
      },
    }),
    closeUploadImageModal: (state) => ({
      ...state,
      upload: {
        open: false,
        data: null,
        from: 'album',
      },
    }),
    openCommentModal: (
      state,
      action: PayloadAction<{
        from: 'album' | 'book' | 'song';
        data: Album | Book | Song;
      }>
    ) => ({
      ...state,
      comment: {
        open: true,
        data: action.payload.data,
        from: action.payload.from,
      },
    }),
    closeCommentModal: (state) => ({
      ...state,
      comment: {
        open: false,
        data: null,
        from: 'album',
      },
    }),
  },
});

export const {
  openImageModal,
  closeImageModal,
  openUploadImageModal,
  closeUploadImageModal,
  openCommentModal,
  closeCommentModal,
} = modalSlice.actions;

export default modalSlice.reducer;

export const selectModals = (state: RootState) => state.modals;
