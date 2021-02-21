/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-throw-literal */
/* eslint-disable global-require */

import React from 'react';
import PropTypes from 'prop-types';

const Select = (props) => {
  const { children, ui, style, onChange, ariaLabel, value } = props;

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
    return (
      <select
        onChange={onChange}
        aria-label={ariaLabel}
        value={value}
        style={{
          ...style,
          padding: '5px',
          borderRadius: '5px',
          borderColor: '#ccc',
        }}
      >
        {children}
      </select>
    );
  } catch (error) {
    try {
      // Import react-bootstrap's component
      require.resolve('react-bootstrap');
      const { Form } = require('react-bootstrap');
      return (
        <Form.Control
          as='select'
          onChange={onChange}
          aria-label={ariaLabel}
          value={value}
          style={style}
        >
          {children}
        </Form.Control>
      );
    } catch (e) {
      //  console.log('Instructor nor reactstrap UI object available: ', e);
      return <div>Cannot display select element</div>;
    }
  }
};

Select.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
    PropTypes.number,
  ]),
  ui: PropTypes.string,
  ariaLabel: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.oneOfType([PropTypes.string, PropTypes.node, PropTypes.number]),
    PropTypes.number,
  ]),
  style: PropTypes.objectOf(PropTypes.string),
};
Select.defaultProps = {
  children: '',
  ui: undefined,
  ariaLabel: undefined,
  onChange: () => {},
  value: '',
  style: {},
};

export default Select;
