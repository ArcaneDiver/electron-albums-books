import database from '../database';
import { Book } from '../types';

export const create = async (newBook: Book) => {
  return database('book').insert(newBook);
};

export const getAll = async () => {
  return database.select().table('book');
};

export const get = async (id: string) => {
  return database.select().table('book').where('id', '=', id);
};

export const remove = async (id: string) => {
  return database('book').delete().where('id', '=', id);
};

export const update = async (id: string, newBook: Partial<Book>) => {
  return database('book').update(newBook).where('id', '=', id);
};
