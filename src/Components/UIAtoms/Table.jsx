/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-throw-literal */
/* eslint-disable global-require */

import React from 'react';
import PropTypes from 'prop-types';

const CustTable = (props) => {
  const { children, ui, caption } = props;

  // let type;

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

    return <Table caption={caption}>{children}</Table>;
  } catch (error) {
    try {
      // Import react-bootstrap's component
      require.resolve('react-bootstrap');
      const { Table } = require('react-bootstrap');
      return <Table>{children}</Table>;
    } catch (e) {
      //  console.log('Instructor nor reactstrap UI object available: ', e);
      return <div>The table component cannot be displayed.</div>;
    }
  }
};

CustTable.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
    PropTypes.number,
  ]),
  ui: PropTypes.string,
  caption: PropTypes.string,
};
CustTable.defaultProps = {
  children: '',
  ui: undefined,
  caption: '',
};

export default CustTable;
