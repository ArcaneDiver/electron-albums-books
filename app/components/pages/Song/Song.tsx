import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useParams } from 'react-router-dom';
import { Comment } from '@material-ui/icons';
import MaterialTable from 'material-table';
import * as _ from 'lodash';

import { addSong, removeSong, selectSongs, updateSongs } from './songSlice';
import { selectAlbums } from '../Album/albumSlice';
import { openCommentModal } from '../../../features/Modals/modalSlice';

import { Song } from '../../../types';

const Songs = () => {
  const { albumID } = useParams<{ albumID: string }>();

  const dispatch = useDispatch();
  const everySong = useSelector(selectSongs);
  const everyAlbum = useSelector(selectAlbums);

  const album = everyAlbum.find(
    (albumFromState) => albumFromState.id === _.toNumber(albumID)
  );

  if (!album) return <Redirect to="/albums" />;

  const songsFromAlbum = everySong.filter(
    (song) => song.album_id === _.toNumber(albumID)
  );

  const handleSongAdd = async (newSong: Song) => {
    dispatch(addSong({ ...newSong, album_id: _.toNumber(albumID) }));
  };

  const handleSongRemove = async (songToDelete: Song) => {
    dispatch(removeSong(songToDelete));
  };

  const handleSongUpdate = async (newSong: Song, oldSong: Song | undefined) => {
    if (oldSong) {
      dispatch(updateSongs(oldSong, newSong));
    }
  };

  return (
    <MaterialTable
      columns={[
        {
          title: 'Titolo',
          field: 'title',
          validate: (rowData) =>
            _.isString(rowData.title) && rowData.title !== '',
        },
        {
          title: 'Durata',
          field: 'duration',
          type: 'numeric',
          validate: (rowData) => rowData.duration > 0,
        },
        {
          title: 'Genere',
          field: 'genre',
          validate: (rowData) =>
            _.isString(rowData.genre) && rowData.genre !== '',
        },
        {
          title: 'Valutatione',
          field: 'valutation',
          type: 'numeric',
          validate: (data) => data.valutation > 0 && data.valutation <= 5,
        },
      ]}
      title={`Canzoni dall'album: ${album.title}`}
      data={_.cloneDeep(songsFromAlbum)}
      editable={{
        onRowAdd: handleSongAdd,
        onRowUpdate: handleSongUpdate,
        onRowDelete: handleSongRemove,
      }}
      options={{
        filtering: true,
      }}
      actions={[
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
    />
  );
};

export default Songs;
