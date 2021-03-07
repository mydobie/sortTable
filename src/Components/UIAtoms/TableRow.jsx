/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-throw-literal */
/* eslint-disable global-require */

import React from 'react';
import PropTypes from 'prop-types';

const Row = (props) => {
  const { children, ui } = props;

  try {
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
    return <Table.Row>{children}</Table.Row>;
  } catch (error) {
    try {
      // Import react-bootstrap's component
      require.resolve('react-bootstrap');
      return <tr>{children}</tr>;
    } catch (e) {
      //  console.log('Instructor nor reactstrap UI object available: ', e);
      return <div>Cannot display table row</div>;
    }
  }
};

Row.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
    PropTypes.number,
  ]),
  ui: PropTypes.string,
};
Row.defaultProps = {
  children: '',
  ui: undefined,
};

export default Row;