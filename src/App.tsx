/* eslint-disable import/no-extraneous-dependencies */

import React, { ReactElement } from 'react';
import { HashRouter as Router } from 'react-router-dom'; // Use `HashRouter as Router` when you can't control the URL ... like GitHub pages
import 'bootstrap/dist/css/bootstrap.min.css';
import AppNavBar from './AppNavBar';
import AppRoutes from './AppRoutes';

import './app.css';

const App = (): ReactElement => {
  const basename = '';

  return (
    <>
      <Router basename={basename}>
        <AppNavBar />

        <main>
          <AppRoutes />
        </main>
      </Router>
    </>
  );
};

export default App;
