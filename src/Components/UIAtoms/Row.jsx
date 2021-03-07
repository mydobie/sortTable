/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-throw-literal */
/* eslint-disable global-require */

import React from 'react';
import PropTypes from 'prop-types';

const GridRow = (props) => {
  const { children, ui, style } = props;

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

    return <Grid.Row style={style}>{children}</Grid.Row>;

    // type = 'instructure';
  } catch (error) {
    try {
      // Import react-bootstrap's component
      require.resolve('react-bootstrap');
      const { Row } = require('react-bootstrap');
      // type = 'reactBootstrap';
      return <Row style={style}>{children}</Row>;
    } catch (e) {
      //  console.log('Instructor nor reactstrap UI object available: ', e);
      return <div>The container component cannot be displayed.</div>;
    }
  }
};

GridRow.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
    PropTypes.number,
  ]),
  ui: PropTypes.string,
  style: PropTypes.objectOf(PropTypes.string),
};
GridRow.defaultProps = {
  children: '',
  ui: undefined,
  style: {},
};

export default GridRow;
