/* eslint-disable import/no-cycle */
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';

import albumsReducer from './components/pages/Album/albumSlice';
import songsReducer from './components/pages/Song/songSlice';
import booksReducer from './components/pages/Book/bookSlice';

import modalsReducer from './features/Modals/modalSlice';
import loadingReducer from './features/Loading/loadingSlice';
// import favoritesReducer from './features/favoritesSlice';

export default (history: History) =>
  combineReducers({
    router: connectRouter(history),
    albums: albumsReducer,
    songs: songsReducer,
    books: booksReducer,
    modals: modalsReducer,
    loading: loadingReducer,
  });
