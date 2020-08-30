export type Album = {
  id: number;
  author: string;
  title: string;
  year: number;
  duration: number;
  genre: string;
  valutation: number;
  favorite: boolean;

  img?: string;
  comment?: string;
};

export type Song = {
  id: number;
  title: string;
  duration: number;
  genre: string;
  valutation: number;
  favorite: boolean;

  comment?: string;

  album_id: number;
};

export type Book = {
  id: number;
  author: string;
  name: string;
  year: number;
  genre: string;
  pages: number;
  isbn: string;
  valutation: number;
  favorite: boolean;

  img?: string;
  comment?: string;
};
