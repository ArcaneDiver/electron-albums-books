import * as fs from 'fs';
import * as path from 'path';
import { app } from 'electron';

export default () => {
  const appDataPath = app.getPath('appData');
  const folderPath = 'PROGETTO_INFO';
  const dbName = 'data.sqlite';

  const myAppPath = path.join(appDataPath, folderPath);

  try {
    if (!fs.existsSync(myAppPath)) fs.mkdirSync(myAppPath);
  } catch (e) {
    console.error(e);
  }

  return path.join(myAppPath, dbName);
};
