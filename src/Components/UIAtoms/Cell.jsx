/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-throw-literal */
/* eslint-disable global-require */

import React from 'react';
import PropTypes from 'prop-types';

const Cell = (props) => {
  const { children, colHeader, rowHeader, ui } = props;

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

    if (rowHeader) return <Table.RowHeader>{children}</Table.RowHeader>;
    if (colHeader) return <Table.ColHeader>{children}</Table.ColHeader>;
    return <Table.Cell>{children}</Table.Cell>;
  } catch (error) {
    try {
      // Import react-bootstrap's component
      require.resolve('react-bootstrap');
      let reactBootstrap = <td>{children}</td>;

      if (rowHeader) reactBootstrap = <th scope='row'>{children}</th>;
      if (colHeader) reactBootstrap = <th scope='col'>{children}</th>;

      return reactBootstrap;
    } catch (e) {
      //  console.log('Instructor nor reactstrap UI object available: ', e);
      return <div>Cannot display table cell</div>;
    }
  }
};

Cell.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
    PropTypes.number,
  ]),
  ui: PropTypes.string,
  colHeader: PropTypes.bool,
  rowHeader: PropTypes.bool,
};
Cell.defaultProps = {
  children: '',
  ui: undefined,
  colHeader: false,
  rowHeader: false,
};

export default Cell;
