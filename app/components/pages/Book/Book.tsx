import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Image, Comment } from '@material-ui/icons';
import MaterialTable from 'material-table';
import * as _ from 'lodash';

import { addBook, removeBook, selectBooks, updateBooks } from './bookSlice';
import {
  openCommentModal,
  openImageModal,
  openUploadImageModal,
} from '../../../features/Modals/modalSlice';

import { Book } from '../../../types';

const Books = () => {
  const dispatch = useDispatch();
  const books = useSelector(selectBooks);

  const handleBookAdd = async (newBook: Book) => {
    dispatch(addBook(newBook));
  };

  const handleBookUpdate = async (newBook: Book, oldBook: Book | undefined) => {
    if (oldBook) {
      dispatch(updateBooks(oldBook, newBook));
    }
  };

  const handleBookRemove = async (bookToRemove: Book) => {
    dispatch(removeBook(bookToRemove));
  };

  return (
    <MaterialTable
      columns={[
        {
          title: 'Autore',
          field: 'author',
          validate: (rowData) =>
            _.isString(rowData.author) && rowData.author !== '',
        },
        {
          title: 'Nome',
          field: 'name',
          validate: (rowData) =>
            _.isString(rowData.name) && rowData.name !== '',
        },
        {
          title: 'Anno',
          field: 'year',
          type: 'numeric',
          validate: (rowData) => rowData.year > 0,
        },
        {
          title: 'Genere',
          field: 'genre',
          validate: (rowData) =>
            _.isString(rowData.genre) && rowData.genre !== '',
        },
        {
          title: 'Numero di pagine',
          field: 'pages',
          type: 'numeric',
          validate: (rowData) => rowData.pages > 0,
        },
        {
          title: 'ISBN',
          field: 'isbn',
          validate: (rowData) =>
            _.isString(rowData.isbn) && rowData.isbn !== '',
        },
        {
          title: 'Valutazione',
          field: 'valutation',
          type: 'numeric',
          validate: (data) => data.valutation > 0 && data.valutation <= 5,
        },
      ]}
      data={_.cloneDeep(books)}
      title="I Libri"
      editable={{
        onRowAdd: handleBookAdd,
        onRowUpdate: handleBookUpdate,
        onRowDelete: handleBookRemove,
      }}
      actions={[
        {
          // eslint-disable-next-line react/display-name
          icon: () => <Image />,
          tooltip: 'Show image',
          onClick: (_evt, rowData) =>
            (rowData as Book).img
              ? dispatch(openImageModal((rowData as Book).img))
              : dispatch(
                  openUploadImageModal({
                    from: 'book',
                    data: _.omit(rowData, ['tableData']),
                  })
                ),
        },
        {
          // eslint-disable-next-line react/display-name
          icon: () => <Comment />,
          tooltip: 'Comment',
          onClick: (_evt, rowData) =>
            dispatch(
              openCommentModal({
                from: 'album',
                data: _.omit(rowData, ['tableData']),
              })
            ),
        },
      ]}
      options={{
        filtering: true,
      }}
    />
  );
};

export default Books;
