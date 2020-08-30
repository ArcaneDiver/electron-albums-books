import {
  createSlice,
  PayloadAction,
  SliceCaseReducers,
} from '@reduxjs/toolkit';
import { ipcRenderer } from 'electron';

// eslint-disable-next-line import/no-cycle
import { AppThunk, RootState } from '../../../store';

import { Book } from '../../../types';

const bookSlice = createSlice<
  { data: Book[] },
  SliceCaseReducers<{ data: Book[] }>,
  'books'
>({
  name: 'books',
  initialState: {
    data: [],
  },
  reducers: {
    refreshBooks: (state: { data: Book[] }, action: PayloadAction<Book[]>) => {
      return {
        data: [...action.payload],
      };
    },
  },
});

export const { refreshBooks } = bookSlice.actions;

export const addBook = (book: Book): AppThunk => async (dispatch, getState) => {
  const [id] = await ipcRenderer.invoke('books/add', { book });

  const { books } = getState();
  const newBook = [...books.data, { ...book, id }];

  dispatch(refreshBooks(newBook));
};

export const removeBook = (bookToRemove: Book): AppThunk => async (
  dispatch,
  getState
) => {
  await ipcRenderer.invoke('books/remove', {
    id: bookToRemove.id,
  });

  const books = getState().books.data.filter(
    (book) => book.id !== bookToRemove.id
  );

  dispatch(refreshBooks(books));
};

export const updateBooks = (oldBook: Book, newBook: Book): AppThunk => async (
  dispatch,
  getState
) => {
  await ipcRenderer.invoke('books/update', {
    id: oldBook.id,
    book: newBook,
  });

  const books = getState().books.data.map((book) =>
    book.id === oldBook.id ? { ...newBook, id: oldBook.id } : book
  );

  dispatch(refreshBooks(books));
};

export default bookSlice.reducer;

export const selectBooks = (state: RootState) => state.books.data;
