/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-throw-literal */
/* eslint-disable global-require */

import React from 'react';
import PropTypes from 'prop-types';

const TContainer = (props) => {
  const { children, ui, thead } = props;

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
    require.resolve('@instructure/ui-table');
    const { Table } = require('@instructure/ui-table');

    return thead ? (
      <Table.Head>{children}</Table.Head>
    ) : (
      <Table.Body>{children}</Table.Body>
    );
  } catch (error) {
    try {
      // Import react-bootstrap's component
      require.resolve('react-bootstrap');
      return thead ? <thead>{children}</thead> : <tbody>{children}</tbody>;
    } catch (e) {
      //  console.log('Instructor nor reactstrap UI object available: ', e);
      return <div>Cannot display table header or body</div>;
    }
  }
};

TContainer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
    PropTypes.number,
  ]),

  thead: PropTypes.bool,
  ui: PropTypes.string,
};
TContainer.defaultProps = {
  children: '',
  ui: undefined,

  thead: false,
};

export default TContainer;
