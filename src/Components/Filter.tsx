import React from 'react';
import { DebounceInput } from 'react-debounce-input';

interface Props {
  label: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string | number;
  id: string;
  debounceTimeout?: number;
}

const Filter = (props: Props) => {
  const { label, onChange, value, id, debounceTimeout = 200 } = props;
  return (
    <div className='form-inline justify-content-end' data-filter>
      <div className='form-group'>
        <label htmlFor={`${id}FilterInput`}>{label}</label>
        {/* <input
          style={{
            marginLeft: '0.75em',
            display: 'inline-block',
            width: '250px',
          }}
          type='text'
          id={`${id}FilterInput`}
          className='form-control'
          onChange={(event) => onChange(event)}
          value={value}
          data-filter-input
        /> */}
        <DebounceInput
          style={{
            marginLeft: '0.75em',
            display: 'inline-block',
            width: '250px',
          }}
          id={`${id}FilterInput`}
          className='form-control'
          onChange={(event) => onChange(event)}
          value={value}
          debounceTimeout={debounceTimeout}
          data-filter-input
        />
      </div>
    </div>
  );
};

export default Filter;
