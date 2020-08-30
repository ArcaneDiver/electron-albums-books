/* eslint-disable no-console */
import * as path from 'path';
import { app } from 'electron';
import knex from 'knex';
import isDev from 'electron-is-dev';

import getDbPath from './utils/dbPath';

export const DB_RELATIVE_PATH = getDbPath();
console.log('DB_PATH:', DB_RELATIVE_PATH);

const database = knex({
  client: 'sqlite3',
  connection: {
    filename: DB_RELATIVE_PATH,
    charset: 'utf16',
  },
  useNullAsDefault: true,
});

export const init = async () => {
  try {
    const albumTableExist = await database.schema.hasTable('album');
    const bookTableExist = await database.schema.hasTable('book');
    const songTableExist = await database.schema.hasTable('song');
    if (!albumTableExist)
      await database.schema.createTable('album', (table) => {
        table.increments('id').unique().primary();
        table.string('author').notNullable();
        table.integer('year').notNullable();
        table.string('title').notNullable();
        table.string('genre').notNullable();
        table.integer('duration').notNullable();
        table.integer('valutation').notNullable();
        table.boolean('favorite').notNullable().defaultTo(false);
        table.string('img');
        table.string('comment');
      });

    if (!bookTableExist)
      await database.schema.createTable('book', (table) => {
        table.increments('id').unique().primary();
        table.string('author').notNullable();
        table.string('name').notNullable();
        table.integer('year').notNullable();
        table.string('genre').notNullable();
        table.integer('pages').notNullable();
        table.string('isbn').notNullable();
        table.integer('valutation').notNullable();
        table.boolean('favorite').notNullable().defaultTo(false);
        table.string('img');
        table.string('comment');
      });

    if (!songTableExist)
      await database.schema.createTable('song', (table) => {
        table.increments('id').unique().primary();
        table.string('title').notNullable();
        table.integer('duration').notNullable();
        table.string('genre').notNullable();
        table.integer('valutation').notNullable();
        table.boolean('favorite').notNullable().defaultTo(false);
        table.string('comment');
      });
  } catch (e) {
    console.log('Error on table creation', e.message);
  }
};

export default database;
