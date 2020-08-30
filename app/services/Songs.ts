import database from '../database';
import { Song } from '../types';

export const create = async (newSong: Song) => {
  return database('song').insert(newSong);
};

export const getAll = async () => {
  return database.select().table('song');
};

export const get = async (id: string) => {
  return database.select().table('song').where('id', '=', id);
};

export const remove = async (id: string) => {
  return database('song').delete().where('id', '=', id);
};

export const update = async (id: string, newSong: Partial<Song>) => {
  return database('song').update(newSong).where('id', '=', id);
};
