/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-throw-literal */
/* eslint-disable global-require */

import React from 'react';
import PropTypes from 'prop-types';

const Filter = (props) => {
  const { ui, value, label, onChange } = props;

  try {
    if (
      (process.env.REACT_APP_USE_UI &&
        process.env.REACT_APP_USE_UI !== 'instructure') ||
      (ui && ui !== 'instructure')
    ) {
      throw 'Purposely skipping Instructure UI and using react-bootstrap';
    }

    // // Import Instructure's component
    require.resolve('@instructure/ui-text-input');
    const { TextInput } = require('@instructure/ui-text-input');

    return (
      <TextInput
        renderLabel={label}
        onChange={(event) => {
          onChange(event);
        }}
        display='inline-block'
        width='20rem'
      />
    );
  } catch (error) {
    try {
      // Import react-bootstrap's component
      require.resolve('react-bootstrap');
      const { Form } = require('react-bootstrap');
      return (
        <Form>
          <Form.Label
            style={{ display: 'inline-block', paddingRight: '10px' }}
            htmlFor='inlineFilterText'
          >
            {label}
          </Form.Label>
          <Form.Control
            style={{ display: 'inline-block', width: 'auto' }}
            id='inlineFilterText'
            onChange={onChange}
            value={value}
          />
        </Form>
      );
    } catch (e) {
      //  console.log('Instructor nor reactstrap UI object available: ', e);
      return <div>Cannot display filter box</div>;
    }
  }
};

Filter.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
    PropTypes.number,
  ]),
  ui: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
Filter.defaultProps = {
  children: '',
  ui: undefined,
  label: 'Filter',
  onChange: () => {},
  value: '',
};

export default Filter;
