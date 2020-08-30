import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import MaterialTable from 'material-table';
import {
  LibraryMusic,
  Image,
  Comment,
  Star,
  StarBorder,
} from '@material-ui/icons';
import * as _ from 'lodash';

import { addAlbum, removeAlbum, updateAlbum, selectAlbums } from './albumSlice';
import {
  openUploadImageModal,
  openImageModal,
  openCommentModal,
} from '../../../features/Modals/modalSlice';

import { Album } from '../../../types';

const Albums: React.FC<RouteComponentProps> = ({ history }) => {
  const dispatch = useDispatch();
  const albums = useSelector(selectAlbums);

  const handleAlbumAdd = async (newAlbum: Album) => {
    dispatch(addAlbum(newAlbum));
  };

  const handleAlbumRemove = async (albumToDelete: Album) => {
    dispatch(removeAlbum(albumToDelete));
  };

  const handleAlbumUpdate = async (
    newAlbum: Album,
    oldAlbum: Album | undefined
  ) => {
    if (oldAlbum) {
      dispatch(updateAlbum(oldAlbum, newAlbum));
    }
  };

  const handleRedirectToSongsPage = (rowData: Album) => {
    history.push(`/songs/${rowData.id}/`);
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
          title: 'Anno',
          field: 'year',
          type: 'numeric',
          validate: (rowData) => rowData.year > 0,
        },
        {
          title: 'Titolo',
          field: 'title',
          validate: (rowData) =>
            _.isString(rowData.title) && rowData.title !== '',
        },
        {
          title: 'Genere',
          field: 'genre',
          validate: (rowData) =>
            _.isString(rowData.genre) && rowData.genre !== '',
        },
        {
          title: 'Durata',
          field: 'duration',
          type: 'numeric',
          validate: (rowData) => rowData.duration > 0,
        },
        {
          title: 'Valutazione',
          field: 'valutation',
          type: 'numeric',
          validate: (data) => data.valutation > 0 && data.valutation <= 5,
        },
      ]}
      data={_.cloneDeep(albums)}
      title="Gli albums"
      editable={{
        onRowAdd: handleAlbumAdd,
        onRowUpdate: handleAlbumUpdate,
        onRowDelete: handleAlbumRemove,
      }}
      actions={[
        {
          // eslint-disable-next-line react/display-name
          icon: () => <LibraryMusic />,
          tooltip: 'Go to songs',
          onClick: (_evt, rowData) =>
            handleRedirectToSongsPage(rowData as Album),
        },
        {
          // eslint-disable-next-line react/display-name
          icon: () => <Image />,
          tooltip: 'Show image',
          onClick: (_evt, rowData) =>
            (rowData as Album).img
              ? dispatch(openImageModal((rowData as Album).img))
              : dispatch(
                  openUploadImageModal({
                    from: 'album',
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
        (rowData) => ({
          // eslint-disable-next-line react/display-name
          icon: () => (rowData.favorite ? <Star /> : <StarBorder />),
          tooltip: 'Preferiti',
          onClick: (_evt, data) =>
            dispatch(
              updateAlbum(_.omit(data, ['tableData']) as Album, {
                ...(_.omit(data, ['tableData']) as Album),
                favorite: !(data as Album).favorite,
              })
            ),
        }),
      ]}
      options={{
        filtering: true,
      }}
    />
  );
};

export default Albums;
