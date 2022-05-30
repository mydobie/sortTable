/* eslint-disable import/no-extraneous-dependencies */
import React, { ReactElement } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import ROUTES from './AppRouteNames';

import Home from './Example';
import FourOhFour from './FourOhFour';

const AppRoutes = (): ReactElement => (
  <Routes>
    <Route path={ROUTES.HOME} element={<Home />} />
    <Route path='/home' element={<Navigate to={ROUTES.HOME} />} />

    <Route path='*' element={<FourOhFour />} />
  </Routes>
);

export default AppRoutes;
