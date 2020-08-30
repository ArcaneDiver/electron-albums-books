import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DropzoneDialog } from 'material-ui-dropzone';
import { ipcRenderer } from 'electron';

import { selectModals, closeUploadImageModal } from './modalSlice';
import { startLoading, stopLoading } from '../Loading/loadingSlice';

import fileToBase64 from '../../utils/fileToBase64';
import { updateAlbum } from '../../components/pages/Album/albumSlice';
import { Album, Book } from '../../types';
import { updateBooks } from '../../components/pages/Book/bookSlice';

const UploadModal = () => {
  const dispatch = useDispatch();
  const { open, data, from } = useSelector(selectModals).upload;

  const handleCompleteUpload = async (files: File[]) => {
    dispatch(startLoading());
    dispatch(closeUploadImageModal(null));

    const filesBase64 = await Promise.all(
      files.map((file) => fileToBase64(file))
    );

    const compressedFiles = await Promise.all(
      filesBase64.map<Promise<string>>((base64) =>
        ipcRenderer.invoke('compress', base64)
      )
    );

    localStorage.setItem('aa', compressedFiles[0]);

    if (from === 'album')
      dispatch(
        updateAlbum(data as Album, {
          ...(data as Album),
          img: compressedFiles[0],
        })
      );
    else if (from === 'book')
      dispatch(
        updateBooks(data as Book, {
          ...(data as Book),
          img: compressedFiles[0],
        })
      );
    dispatch(stopLoading());
  };

  return (
    <DropzoneDialog
      open={open}
      acceptedFiles={['image/*']}
      cancelButtonText="cancel"
      submitButtonText="submit"
      maxFileSize={3000000}
      onClose={() => dispatch(closeUploadImageModal(null))}
      onSave={handleCompleteUpload}
      showPreviews
      filesLimit={1}
    />
  );
};

export default UploadModal;
