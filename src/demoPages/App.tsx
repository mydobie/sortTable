/* eslint-disable import/no-extraneous-dependencies */

import React, { ReactElement } from 'react';
import { BrowserRouter, HashRouter } from 'react-router-dom'; // Use `HashRouter as Router` when you can't control the URL ... like GitHub pages
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Card } from 'react-bootstrap';
import AppNavBar from './AppNavBar';
import AppRoutes from './AppRoutes';

import './app.css';

const Router =
  process.env.REACT_APP_USE_HASH_ROUTER === 'true' ? HashRouter : BrowserRouter;

const Header = (): ReactElement => (
  <header>
    <Card bg='dark' text='white'>
      <Card.Body>
        <Card.Title>React Sort Table</Card.Title>
      </Card.Body>
    </Card>
  </header>
);

const App = (): ReactElement => {
  const basename = '';

  return (
    <>
      <Router basename={basename}>
        <Header />
        <AppNavBar />

        <main>
          <Container style={{ paddingTop: '20px', paddingBottom: '20px' }}>
            <AppRoutes />
          </Container>
        </main>
      </Router>
    </>
  );
};

export default App;
