import database from '../database';
import { Album } from '../types';

export const create = async (newAlbum: Album) => {
  return database('album').insert(newAlbum);
};

export const getAll = async () => {
  return database.select().table('album');
};

export const get = async (id: string) => {
  return database.select().table('album').where('id', '=', id);
};

export const remove = async (id: string) => {
  return database('album').delete().where('id', '=', id);
};

export const update = async (id: string, newAlbum: Partial<Album>) => {
  return database('album').update(newAlbum).where('id', '=', id);
};
