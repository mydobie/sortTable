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
  { name: 'Price', key: 'price' },
  { name: 'Product Name', key: 'name', type: 'alpha', rowheader: true },
  {
    name: 'Stock',
    key: 'stock',
    noFilter: true,
  },
  { name: 'Link', key: 'url', noSort: true, noFilter: true },
];
const viewSteps: number[] = [2, 4, 10];

// eslint-disable-next-line import/prefer-default-export
export const filterAndPaginationTable = () => {
  const wrapper = mount(
    <SortTable
      tableData={data}
      headers={headers}
      showFilter
      showPagination
      viewSteps={viewSteps}
    />
  );
  wrapper.update();
  return wrapper;
};

export const simpleTable = () => {
  const wrapper = mount(<SortTable tableData={data} headers={headers} />);
  wrapper.update();
  return wrapper;
};
