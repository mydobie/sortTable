/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-throw-literal */
/* eslint-disable global-require */

import React from 'react';
import PropTypes from 'prop-types';

const CustCol = (props) => {
  const { children, ui, width, style } = props;

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

    return width ? (
      <Grid.Col width={width} style={style}>
        {children}
      </Grid.Col>
    ) : (
      <Grid.Col style={style}>{children}</Grid.Col>
    );

    // type = 'instructure';
  } catch (error) {
    try {
      // Import react-bootstrap's component
      require.resolve('react-bootstrap');
      const { Col } = require('react-bootstrap');
      // type = 'reactBootstrap';
      return width ? (
        <Col sm={width} style={style}>
          {children}
        </Col>
      ) : (
        <Col style={style}>{children}</Col>
      );
    } catch (e) {
      //  console.log('Instructor nor reactstrap UI object available: ', e);
      return <div>The container component cannot be displayed.</div>;
    }
  }
};

CustCol.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
    PropTypes.number,
  ]),
  ui: PropTypes.string,
  width: PropTypes.number,
  style: PropTypes.objectOf(PropTypes.string),
};
CustCol.defaultProps = {
  children: '',
  ui: undefined,
  width: undefined,
  style: {},
};

export default CustCol;
