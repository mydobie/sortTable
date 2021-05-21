import React from 'react';

interface Props {
  label: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string | number;
}

const Filter = (props: Props) => {
  const { label, onChange, value } = props;
  return (
    <form className='form-inline justify-content-end'>
      <div className='form-group'>
        <label htmlFor='filterInput'>{label}</label>
        <input
          style={{ marginLeft: '0.75em' }}
          type='text'
          id='filterInput'
          className='form-control'
          onChange={(event) => onChange(event)}
          value={value}
        />
      </div>
    </form>
  );
};

export default Filter;
