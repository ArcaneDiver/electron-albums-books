import {
  createSlice,
  PayloadAction,
  SliceCaseReducers,
} from '@reduxjs/toolkit';

// eslint-disable-next-line import/no-cycle
import { AppThunk, RootState } from '../../store';

const loadingSlice = createSlice({
  name: 'loading',
  initialState: {
    value: false,
  },
  reducers: {
    startLoading: (state) => ({
      value: true,
    }),
    stopLoading: (state) => ({
      value: false,
    }),
  },
});

export const { startLoading, stopLoading } = loadingSlice.actions;

export default loadingSlice.reducer;

export const selectLoading = (state: RootState) => state.loading.value;
