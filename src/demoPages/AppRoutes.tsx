/* eslint-disable import/no-extraneous-dependencies */
import React, { ReactElement } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import ROUTES from './AppRouteNames';

import Home from './Home';
import Version from './Version';
import JSONData from './JSONData';
import Responsive from './Responsive';
import FourOhFour from './FourOhFour';

const AppRoutes = (): ReactElement => (
  <Routes>
    <Route path={ROUTES.HOME} element={<Home />} />
    <Route path='/home' element={<Navigate to={ROUTES.HOME} />} />
    <Route path={ROUTES.VERSION} element={<Version />} />
    <Route path={ROUTES.JSON} element={<JSONData />} />
    <Route path={ROUTES.RESPONSIVE} element={<Responsive />} />
    <Route path='*' element={<FourOhFour />} />
  </Routes>
);

export default AppRoutes;
