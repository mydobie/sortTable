/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
// import userEvent from '@testing-library/user-event';

import { render, waitFor, fireEvent } from '@testing-library/react';

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
    container = changeFilter(container, initial?.filter);
  }

  // if (props?.showFilter && initial?.filter) {
  //   // console.log('NOW IN FILTER WITH VALUE:', initial.filter);
  //   fireEvent.change(container.querySelector('[data-filter-input]'), {
  //     target: { value: initial.filter },
  //   });
  // }

  // if (props?.showFilter && !initial?.filter) {
  //   // Need to set value to anything so the empty is registered later
  //   // console.log('IN FILTER');
  //   fireEvent.change(container.querySelector('[data-filter-input]'), {
  //     target: { value: 'testStringSoEmptyWillRegisterAsAChange' },
  //   });
  //   fireEvent.change(container.querySelector('[data-filter-input]'), {
  //     target: { value: '' },
  //   });
  // }

  if (props?.showPagination && initial?.viewSet !== undefined) {
    // fireEvent.change(
    //   container.querySelector('[data-sort-number-of-inputs] select'),
    //   { target: { value: initial.viewSet } }
    // );
    container = changeViewItemsToView(container, initial.viewSet);
  }

  if (props?.showPagination && initial?.pageIndex !== undefined) {
    // if (container.querySelector('[data-pagination-select]')) {
    //   // drop down
    //   // const value = wrapper
    //   //   .find('[data-pagination-select] option')
    //   //   .at(initial.pageIndex)
    //   //   .prop('value');
    //   // wrapper
    //   //   .find('[data-pagination-select]')
    //   //   .simulate('change', { target: { value } })
    //   //   .update();
    // } else {
    //   container = clickPaginationButton(container, initial.pageIndex);
    // }
    container = clickPaginationButton(container, initial.pageIndex);
  }

  return container;
};

export const clickHeader = (container, headerIndex: number) => {
  fireEvent.click(
    container
      .querySelectorAll('thead th')
      .item(headerIndex)
      .querySelector('button')
  );
  return container;
};

export const changeFilter = (container, filterText: string = '') => {
  // The first fire event is needed if filterText is ""
  // Having the first fire event will ensure a filte rof '' will fire
  fireEvent.change(container.querySelector('[data-filter-input]'), {
    target: { value: 'testStringSoEmptyWillRegisterAsAChange' },
  });

  fireEvent.change(container.querySelector('[data-filter-input]'), {
    target: { value: filterText },
  });
  return container;
};

export const changeViewItemsToView = (container, numShown: number | string) => {
  fireEvent.change(
    container.querySelector('[data-sort-number-of-inputs] select'),
    { target: { value: `${numShown}` } }
  );
  return container;
};

export const clickPaginationButton = (container, pageIndex: number) => {
  if (container.querySelector(`[data-pagination-button]`)) {
    fireEvent.click(
      container
        .querySelectorAll(`[data-pagination-button]`)
        .item(pageIndex)
        .querySelector('button')
    );
  } else {
    fireEvent.change(container.querySelector('[data-pagination-select]'), {
      target: { value: `${pageIndex}` },
    });
  }
  return container;
};

// export const sortTableFactoryOLD = (
//   props?: any,
//   initial?: {
//     viewSet?: number | string;
//     filter?: string | number;
//     pageIndex?: number;
//   }
// ) => {
//   const steps = props?.showPagination ? viewSteps : undefined;
//   const tableData = props?.tableData ? props.tableData : data;
//   const tableHeaders = props?.headers ? props.headers : headers;

//   const wrapper = (
//     <SortTable
//       tableData={tableData}
//       headers={tableHeaders}
//       viewSteps={steps}
//       {...props}
//     />
//   );
//   return wrapper;
//   // const { container } = render(wrapper);

//   // console.log('****************************');

//   // if (props?.showFilter) {
//   //   console.log(container.querySelector('[data-filter-input]'));
//   //   console.log('ABOUT TO WAIT');

//   //   // test-filter;
//   //   await container.findByTestId('test-filter');

//   //   // await waitFor(() => {
//   //   //   console.log(container.querySelector('[data-filter-input]'));
//   //   //   return container.querySelector('[data-filter-input]');
//   //   // });
//   //   console.log(container.querySelector('[data-filter-input]'));
//   //   console.log('DONE WAITING');
//   // }

//   // console.log('ABOUT TO RETURN');
//   // return container;
// };

// export const sortTableOLD = async (
//   props?: any,
//   initial?: {
//     viewSet?: number | string;
//     filter?: string | number;
//     pageIndex?: number;
//   }
// ) => {
//   const steps = props?.showPagination ? viewSteps : undefined;
//   const tableData = props?.tableData ? props.tableData : data;
//   const tableHeaders = props?.headers ? props.headers : headers;

//   const wrapper = mount(
//     <SortTable
//       tableData={tableData}
//       headers={tableHeaders}
//       viewSteps={steps}
//       {...props}
//     />
//   ).update();

//   await sleep(0);
//   wrapper.update();

//   if (props?.showFilter) {
//     wrapper
//       .find('[data-filter-input]')
//       .simulate('change', {
//         target: { value: initial?.filter ? `${initial.filter}` : '' },
//       })
//       .update();
//   }
//   if (props?.showPagination && initial?.viewSet !== undefined) {
//     wrapper
//       .find('[data-sort-number-of-inputs] select')
//       .simulate('change', { target: { value: `${initial.viewSet}` } })
//       .update();
//   }

//   if (props?.showPagination && initial?.pageIndex !== undefined) {
//     if (wrapper.find('[data-pagination-select]').length > 0) {
//       // drop down
//       const value = wrapper
//         .find('[data-pagination-select] option')
//         .at(initial.pageIndex)
//         .prop('value');

//       wrapper
//         .find('[data-pagination-select]')
//         .simulate('change', { target: { value } })
//         .update();
//     } else {
//       wrapper
//         .find('[data-pagination-button]')
//         .at(initial.pageIndex)
//         .find('button')
//         .simulate('click')
//         .update();
//     }
//   }

//   return wrapper;
// };

export const columnText = (container, columnIndex: number) => {
  const rows = container.querySelectorAll('tbody tr');

  const cells = [];
  rows.forEach((row) => {
    // rows is a nodeList and map, filter, reduce etc are not available
    cells.push(
      row.querySelector(
        `[data-sorttable-data-cell]:nth-child(${columnIndex + 1})`
      ).innerHTML
    );
  });
  return cells;
};

export const expectedInObjectArray = (
  array: (string | number)[],
  objectArray: object[],
  key: string
): boolean =>
  array.every((item) => objectArray.some((object) => object[key] === item));
