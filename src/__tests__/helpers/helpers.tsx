/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import { render, waitFor, fireEvent, screen } from '@testing-library/react';

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
    url: '',
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
export const viewSteps: number[] = [1, 2, 4, 10];

export const sortTableFactory = async (
  props?: any,
  initial?: {
    viewSet?: number | string;
    filter?: string;
    pageIndex?: number;
  }
) => {
  const steps = props?.showPagination ? viewSteps : undefined;
  const tableData = props?.tableData ? props.tableData : data;
  const tableHeaders = props?.headers ? props.headers : headers;

  let wrapper = <></>;

  wrapper = (
    <SortTable
      debounceTimeout={1}
      tableData={tableData}
      headers={tableHeaders}
      viewSteps={steps}
      {...props}
    />
  );

  let { container } = render(wrapper);

  if (props?.showFilter) {
    await waitFor(() =>
      expect(container.querySelector('[data-filter]')).toBeInTheDocument()
    );
  }

  if (props?.showPagination) {
    await waitFor(() =>
      expect(
        container.querySelector('[data-sort-number-of-inputs]')
      ).toBeInTheDocument()
    );
  }

  if (props?.isLoading && !props?.isLoadingMessage) {
    await waitFor(() =>
      expect(
        container.querySelector('[data-sort-table-loading]')
      ).toBeInTheDocument()
    );
  }

  if (props?.showFilter) {
    container = await changeFilter(container, initial?.filter);
  }

  if (props?.showPagination && initial?.viewSet !== undefined) {
    container = await changeViewItemsToView(container, initial.viewSet);
  }

  if (props?.showPagination && initial?.pageIndex !== undefined) {
    // @ts-ignore
    container = await clickPaginationButton(container, initial.pageIndex);
  }

  return container;
};

export const clickHeader = async (container, headerIndex: number) => {
  fireEvent.click(
    container
      .querySelectorAll('thead th')
      .item(headerIndex)
      .querySelector('button')
  );
  await new Promise((r) => setTimeout(r, 25)); // time to to allow debounce to finish

  return container;
};

export const changeFilter = async (container, filterText: string = '') => {
  // The first fire event is needed if filterText is ""
  // Having the first fire event will ensure a filte rof '' will fire
  fireEvent.change(container.querySelector('[data-filter-input]'), {
    target: { value: 'testStringSoEmptyWillRegisterAsAChange' },
  });

  fireEvent.change(container.querySelector('[data-filter-input]'), {
    target: { value: filterText },
  });

  // TODO Change this to waitfor statements
  await new Promise((r) => setTimeout(r, 25)); // time to to allow debounce to finish
  return container;
};

export const changeViewItemsToView = async (
  container,
  numShown: number | string
) => {
  fireEvent.change(
    container.querySelector('[data-sort-number-of-inputs] select'),
    { target: { value: `${numShown}` } }
  );
  await new Promise((r) => setTimeout(r, 25)); // time to to allow debounce to finish

  return container;
};

export const clickPaginationButton = async (container, pageIndex: number) => {
  if (container.querySelector(`[data-pagination-button]`)) {
    fireEvent.click(
      container
        .querySelectorAll(`[data-pagination-button]`)
        .item(pageIndex)
        .querySelector('button')
    );

    await new Promise((r) => setTimeout(r, 25)); // time to to allow debounce to finish
    return container;
  }

  fireEvent.change(container.querySelector('[data-pagination-select]'), {
    target: { value: `${pageIndex}` },
  });
  await new Promise((r) => setTimeout(r, 25)); // time to to allow debounce to finish
  return container;
};

export const columnText = (container, columnIndex: number) => {
  const rows = container.querySelectorAll('tbody tr');

  const cells = [];
  rows.forEach((row) => {
    // rows is a nodeList and map, filter, reduce etc are not available
    cells.push(
      // @ts-ignore
      row.querySelector(
        `[data-sorttable-data-cell]:nth-child(${columnIndex + 1})`
      ).innerHTML
    );
  });
  return cells;
};

/* ***************************************** */

export const columnTextWithHeader = (column) => {
  const columnIndex = headers.findIndex(
    (header) => header.sortKey === column || header.key === column
  );

  const rows = screen.getByTestId('sortTableBody').getElementsByTagName('tr');
  const cells = [];

  Array.from(rows).forEach((row) => {
    // console.log('CELL LENGTH: ', row.getElementsByTagName('td').length);
    // @ts-ignore
    cells.push(row.querySelectorAll('td, th').item(columnIndex).innerHTML);
  });
  return cells;
};

/* ***************************************** */

export const expectedInObjectArray = (
  array: (string | number)[],
  objectArray: object[],
  key: string
): boolean =>
  array.every((item) => objectArray.some((object) => object[key] === item));
