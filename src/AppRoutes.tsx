/* eslint-disable import/no-extraneous-dependencies */
// Contains routing for entire application

import React, { ReactElement } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import ROUTES from './AppRouteNames';

import Home from './Example';
import FourOhFour from './FourOhFour';

const AppRoutes = (): ReactElement => (
  <>
    <Switch>
      <Route path={ROUTES.HOME} exact>
        <Home />
      </Route>
      {/* EXAMPLE: Route with a redirect */}
      <Route path='/home' exact>
        <Redirect to={ROUTES.HOME} />
      </Route>

      <Route path='/'>
        <FourOhFour />
      </Route>
    </Switch>
  </>
);

export default AppRoutes;
