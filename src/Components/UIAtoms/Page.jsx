/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-throw-literal */
/* eslint-disable global-require */

import React from 'react';
import PropTypes from 'prop-types';

const PaginationButton = (props) => {
  const { children, active, onClick, ui, pageNum } = props;

  try {
    if (
      (process.env.REACT_APP_USE_UI &&
        process.env.REACT_APP_USE_UI !== 'instructure') ||
      (ui && ui !== 'instructure')
    ) {
      throw 'Purposely skipping Instructure UI and using react-bootstrap';
    }

    // Import Instructure's component
    require.resolve('@instructure/ui-pagination');
    const { Pagination } = require('@instructure/ui-pagination');

    return (
      <Pagination.Page current={active} onClick={onClick} key={pageNum}>
        {children}
      </Pagination.Page>
    );
  } catch (error) {
    try {
      // Import react-bootstrap's component
      require.resolve('react-bootstrap');
      const { Pagination } = require('react-bootstrap');
      return (
        <Pagination.Item active={active} onClick={onClick}>
          {children}
        </Pagination.Item>
      );
    } catch (e) {
      //  console.log('Instructor nor reactstrap UI object available: ', e);
      return <div>Cannot pagination item</div>;
    }
  }
};

PaginationButton.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
    PropTypes.number,
  ]),
  ui: PropTypes.string,
  pageNum: PropTypes.number,
  onClick: PropTypes.func,
  active: PropTypes.bool,
};
PaginationButton.defaultProps = {
  children: '',
  ui: undefined,
  pageNum: 0,
  onClick: () => {},
  active: false,
};

export default PaginationButton;
