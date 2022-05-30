/* eslint-disable import/no-extraneous-dependencies */
// Main navigation bar

import React, { ReactElement } from 'react';
import { NavLink } from 'react-router-dom';

import ROUTES from './AppRouteNames';

const activeClass = (isActive: boolean) =>
  `nav-link ${isActive ? 'active' : ''}`;

const AppNavBar = (): ReactElement => (
  <nav>
    <ul className='nav'>
      <li className='nav-item'>
        <NavLink
          className={({ isActive }) => activeClass(isActive)}
          to={ROUTES.HOME}
        >
          Home
        </NavLink>
      </li>
    </ul>
  </nav>
);

export default AppNavBar;
