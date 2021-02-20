/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-throw-literal */
/* eslint-disable global-require */

import React from 'react';
import PropTypes from 'prop-types';

const CustomPagination = (props) => {
  const { children, ui, style, prevOnClick, nextOnClick } = props;

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
      <Pagination
        style={style}
        aria-label='Results page'
        labelNext='Next Page'
        labelPrev='Previous Page'
      >
        {children}
      </Pagination>
    );
  } catch (error) {
    try {
      // Import react-bootstrap's component
      require.resolve('react-bootstrap');
      const { Pagination } = require('react-bootstrap');
      return (
        <Pagination style={style} aria-label='Results page'>
          {prevOnClick !== null ? (
            <Pagination.Prev onClick={prevOnClick} />
          ) : null}
          {children}
          {nextOnClick !== null ? (
            <Pagination.Next onClick={nextOnClick} />
          ) : null}
        </Pagination>
      );
    } catch (e) {
      //  console.log('Instructor nor reactstrap UI object available: ', e);
      return <div>Cannot pagination</div>;
    }
  }
};

CustomPagination.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
    PropTypes.number,
  ]),
  ui: PropTypes.string,
  style: PropTypes.objectOf(PropTypes.string),
  prevOnClick: PropTypes.func,
  nextOnClick: PropTypes.func,
};
CustomPagination.defaultProps = {
  children: '',
  ui: undefined,
  style: {},
  prevOnClick: null,
  nextOnClick: null,
};

export default CustomPagination;
