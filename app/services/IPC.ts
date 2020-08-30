import { ipcMain } from 'electron';
import { compressToUTF16, decompressFromUTF16 } from 'lz-string';

import * as Albums from './Albums';
import * as Songs from './Songs';
import * as Books from './Books';

// eslint-disable-next-line import/prefer-default-export
export const init = () => {
  ipcMain.handle('albums/add', async (event, args) =>
    Albums.create(args.album)
  );
  ipcMain.handle('albums/get', async (event, args) => Albums.getAll());
  ipcMain.handle('albums/remove', async (event, args) =>
    Albums.remove(args.id)
  );
  ipcMain.handle('albums/update', async (event, args) =>
    Albums.update(args.id, args.album)
  );

  ipcMain.handle('songs/add', async (event, args) => Songs.create(args.song));
  ipcMain.handle('songs/get', async (event, args) => Songs.getAll());
  ipcMain.handle('songs/remove', async (event, args) => Songs.remove(args.id));
  ipcMain.handle('songs/update', async (event, args) =>
    Songs.update(args.id, args.song)
  );

  ipcMain.handle('books/add', async (event, args) => Books.create(args.book));
  ipcMain.handle('books/get', async (event, args) => Books.getAll());
  ipcMain.handle('books/remove', async (event, args) => Books.remove(args.id));
  ipcMain.handle('books/update', async (event, args) =>
    Books.update(args.id, args.book)
  );

  ipcMain.handle('compress', (event, args) => compressToUTF16(args));
  ipcMain.handle('decompress', (event, args) => decompressFromUTF16(args));
};
