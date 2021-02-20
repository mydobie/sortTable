/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-throw-literal */
/* eslint-disable global-require */

import React from 'react';
import PropTypes from 'prop-types';

const CustContainer = (props) => {
  const { children, ui, fluid } = props;

  try {
    // Code to skip to reactstrap
    if (
      (process.env.REACT_APP_USE_UI &&
        process.env.REACT_APP_USE_UI !== 'instructure') ||
      (ui && ui !== 'instructure')
    ) {
      throw 'Purposely skipping Instructure UI and using react-bootstrap';
    }

    // Import Instructure's component
    require.resolve('@instructure/ui-grid');
    const { Grid } = require('@instructure/ui-grid');

    return <Grid>{children}</Grid>;

    // type = 'instructure';
  } catch (error) {
    try {
      // Import react-bootstrap's component
      require.resolve('react-bootstrap');
      const { Container } = require('react-bootstrap');
      // type = 'reactBootstrap';
      return <Container fluid={fluid}>{children}</Container>;
    } catch (e) {
      //  console.log('Instructor nor reactstrap UI object available: ', e);
      return <div>The container component cannot be displayed.</div>;
    }
  }
};

CustContainer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
    PropTypes.number,
  ]),
  ui: PropTypes.string,
  fluid: PropTypes.bool,
};
CustContainer.defaultProps = {
  children: '',
  ui: undefined,
  fluid: false,
};

export default CustContainer;
