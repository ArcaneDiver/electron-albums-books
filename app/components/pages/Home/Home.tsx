import React from 'react';
import { Redirect } from 'react-router-dom';

import { ALBUMS } from '../../../constants/routes';

const Home = () => <Redirect to={ALBUMS} exact />;

export default Home;
