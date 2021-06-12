/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { mount } from 'enzyme';

import SortTable, {
  tableDataType,
  headerDataType,
} from '../../Components/SortTable';

export const data: tableDataType[] = [
  { id: 1, name: 'Cheese', price: '$4.90', stock: 20 },
  { id: 2, name: 'Milk', price: '$1.90', stock: 4 },
  { id: 3, name: 'Yoghurt', price: '$2.40', stock: 12 },
  { id: 4, name: 'Heavy Cream', price: '$3.90', stock: 9 },
  { id: 5, name: 'Butter', price: '$0.90', stock: 99 },
  { id: 6, name: 'Sour Cream', price: '$2.90', stock: 86 },
  {
    id: 7,
    name: 'Fancy French Cheese',
    price: '$99.0',
    stock: 15,
    url: <a href='https://google.com'>hello google</a>,
  },
];
export const headers: headerDataType[] = [
  { name: 'Price', key: 'price', className: 'myCustomPriceClass' },
  { name: 'Product Name', key: 'name', type: 'alpha', rowheader: true },
  {
    name: 'Stock',
    key: 'stock',
    noFilter: true,
  },
  {
    name: 'Link',
    key: 'url',
    noSort: true,
    noFilter: true,
    style: { color: 'purple' },
  },
];
const viewSteps: number[] = [2, 4, 10];

export const sortTable = (props?: any) => {
  const steps = props?.showPagination ? viewSteps : undefined;
  const tableData = props?.tableData ? props.tableData : data;
  const wrapper = mount(
    <SortTable
      tableData={tableData}
      headers={headers}
      viewSteps={steps}
      {...props}
    />
  ).update();

  if (props?.showFilter) {
    wrapper
      .find('[data-filter-input]')
      .simulate('change', { target: { value: '' } })
      .update();
  }

  return wrapper;
};

export const columnText = (wrapper, columnIndex) => {
  const rows = wrapper.find('tbody tr');

  return rows.map((row) =>
    row.find('[data-sorttable-data-cell]').at(columnIndex).text()
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
