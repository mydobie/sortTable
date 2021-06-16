/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { mount } from 'enzyme';

import SortTable, {
  tableDataType,
  headerDataType,
} from '../../Components/SortTable';

export const data: tableDataType[] = [
  {
    id: 1,
    name: 'Cheese',
    price: '$4.90',
    stock: 20,
    day: 'Friday',
    saledaynum: 5,
  },
  {
    id: 2,
    name: 'Milk',
    price: '$1.90',
    stock: 4,
    day: 'Monday',
    saledaynum: 1,
  },
  {
    id: 3,
    name: 'Yoghurt',
    price: '$2.40',
    stock: 12,
    day: 'Thursday',
    saledaynum: 4,
  },
  {
    id: 4,
    name: 'Heavy Cream',
    price: '$3.90',
    stock: 9,
    day: 'Tuesday',
    saledaynum: 2,
  },
  {
    id: 5,
    name: 'Butter',
    price: '$0.90',
    stock: 99,
    day: 'Wednesday',
    saledaynum: 3,
  },
  {
    id: 6,
    name: 'Sour Cream',
    price: '$2.90',
    stock: 86,
    day: 'Saturday',
    saledaynum: 6,
  },
  {
    id: 7,
    name: 'Fancy French Cheese',
    price: '$99.0',
    stock: 15,
    url: <a href='https://google.com'>hello google</a>,
    day: 'Sunday',
    saledaynum: 0,
  },
  { id: 8, name: 'Eggs', price: '$1.90', stock: 86 },
  {
    id: 9,
    name: 'Ricotta Cheese',
    price: '$3.99',
    stock: 6,
    day: 'Saturday',
    saledaynum: 6,
  },
  { id: 10, name: 'Frozen Custard', price: '$5.50', stock: 11 },
  {
    id: 11,
    name: 'Whey Powder',
    price: '$15.90',
    stock: 8,
    day: 'Wednesday',
    saledaynum: 3,
  },
];
export const headers: headerDataType[] = [
  { name: 'Price', key: 'price', className: 'myCustomPriceClass' },
  { name: 'Product Name', key: 'name', type: 'alpha', rowheader: true },
  {
    name: 'Stock',
    key: 'stock',
    type: 'number',
    noFilter: true,
  },
  {
    name: 'Sale day',
    key: 'day',
    type: 'size',
    sortKey: 'saledaynum',
  },
  {
    name: 'Link',
    key: 'url',
    noSort: true,
    noFilter: true,
    style: { color: 'purple' },
  },
];
export const viewSteps: number[] = [2, 4, 10];

export const sortTable = (
  props?: any,
  initial?: {
    viewSet?: number | string;
    filter?: string | number;
    pageIndex?: number;
  }
) => {
  const steps = props?.showPagination ? viewSteps : undefined;
  const tableData = props?.tableData ? props.tableData : data;
  const tableHeaders = props?.headers ? props.headers : headers;

  const wrapper = mount(
    <SortTable
      tableData={tableData}
      headers={tableHeaders}
      viewSteps={steps}
      {...props}
    />
  ).update();

  if (props?.showFilter) {
    wrapper
      .find('[data-filter-input]')
      .simulate('change', {
        target: { value: initial?.filter ? `${initial.filter}` : '' },
      })
      .update();
  }
  if (props?.showPagination && initial?.viewSet !== undefined) {
    wrapper
      .find('[data-sort-number-of-inputs] select')
      .simulate('change', { target: { value: `${initial.viewSet}` } })
      .update();
  }

  if (props?.showPagination && initial?.pageIndex !== undefined) {
    if (wrapper.find('[data-pagination-select]').length > 0) {
      // drop down
      const value = wrapper
        .find('[data-pagination-select] option')
        .at(initial.pageIndex)
        .prop('value');

      wrapper
        .find('[data-pagination-select]')
        .simulate('change', { target: { value } })
        .update();
    } else {
      wrapper
        .find('[data-pagination-button]')
        .at(initial.pageIndex)
        .find('button')
        .simulate('click')
        .update();
    }
  }

  return wrapper;
};

export const columnText = (wrapper, columnIndex: number) => {
  const rows = wrapper.find('tbody tr');

  return rows.map(
    (row) => row.find('[data-sorttable-data-cell]').at(columnIndex).text() ?? ''
  );
};

// export const isInObject = (object: Object, value: string | number): boolean => {
//   for (const key in object) {
//     if (object[key] === value) {
//       return true;
//     }
//   }
//   return false;
// };

// export const arrayInObjectOfArray = (
//   array: (string | number)[],
//   objectArray: object[]
// ): boolean =>
//   array.every((item) => objectArray.some((object) => isInObject(object, item)));

export const expectedInObjectArray = (
  array: (string | number)[],
  objectArray: object[],
  key: string
): boolean =>
  array.every((item) => objectArray.some((object) => object[key] === item));
