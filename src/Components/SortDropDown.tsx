/* eslint-disable react/require-default-props */
import React, { ReactElement } from 'react';
import SortIcons from './SortIcons';
import { headerDataType, headerType } from './SortTable';

type SortDropDownProps = {
  headers: headerDataType[];
  selected?: headerType | null;
  onChange?: (columnKey: headerType) => void;
  onOrderChange?: (order: boolean) => void;
  sortAscending?: boolean | null;
  id?: string;
};

const SortDropDown = (props: SortDropDownProps): ReactElement => {
  const {
    headers,
    selected = null,
    onChange = () => {},
    onOrderChange = () => {},
    sortAscending = null,
    id = 'sortDropDown',
  } = props;

  return (
    <div className='row' data-sort-dropdown data-testid='sortDropDownWrapper'>
      <div className='col-auto' style={{ paddingRight: 0 }}>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label htmlFor={`${id}SortDropDown`}>Sort:</label>
      </div>
      <div className='col-auto' style={{ paddingRight: 0 }}>
        <select
          id={`${id}SortDropDown`}
          value={selected || ''}
          className='form-control form-select'
          onChange={(e) => onChange(e.target.value)}
          data-testid='sortDropDownColumn'
        >
          {selected === '' ? <option value=''>Select a sort</option> : null}
          {headers.map((header) =>
            !header.noSort ? (
              <option
                key={header.key}
                value={header.sortKey || header.key || ''}
              >
                {header.name}
              </option>
            ) : null
          )}
        </select>
      </div>
      {selected ? (
        <div className='col-auto' style={{ paddingLeft: 0 }}>
          <button
            type='button'
            onClick={(e) => {
              onOrderChange(!sortAscending);
            }}
            style={{
              border: 'none',
              background: 'none',
              width: '100%',
              textAlign: 'left',
              padding: '5px 10px',
            }}
            aria-label='Sort order'
            data-testid='sortDropDownButton'
            data-sortdirection={sortAscending ? 'asc' : 'desc'}
          >
            <SortIcons sortAsc={sortAscending || false} />
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default SortDropDown;
