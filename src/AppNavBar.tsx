/* eslint-disable import/no-extraneous-dependencies */
// Main navigation bar

import React, { ReactElement } from 'react';
import { NavLink } from 'react-router-dom';

import ROUTES from './AppRouteNames';

// EXAMPLE: Navigation bar
const AppNavBar = (): ReactElement => (
  <nav>
    <ul className='nav'>
      <li className='nav-item'>
        <NavLink activeClassName='active' className='nav-link' to={ROUTES.HOME}>
          Home
        </NavLink>
      </li>
    </ul>
  </nav>
);

export default AppNavBar;
