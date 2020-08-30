import React from 'react';
import { Container } from '@material-ui/core';

import Navbar from '../Navbar';
import UploadModal from '../../features/Modals/UploadModal';
import ImageModal from '../../features/Modals/ImageModal';
import CommentModal from '../../features/Modals/CommentModal';
import Loading from '../../features/Loading/Loading';

import useStyles from './styles';

// eslint-disable-next-line react/prop-types
const App: React.FC = ({ children }) => {
  const classes = useStyles();
  return (
    <>
      <Navbar />
      <Container maxWidth={false} className={classes.main}>
        {children as any}
      </Container>
      <UploadModal />
      <ImageModal />
      <CommentModal />
      <Loading />
    </>
  );
};

export default App;
