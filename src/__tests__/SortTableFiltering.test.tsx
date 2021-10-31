/* eslint-disable react/react-in-jsx-scope */

import { act } from '@testing-library/react';

import {
  columnText,
  expectedInObjectArray,
  data,
  headers,
  sortTableFactory,
} from './helpers/helpers';

describe('Sort Table Filtering (without pagination)', () => {
  test('Table summary without filtering', async () => {
    let container;
    await act(async () => {
      container = await sortTableFactory({ showFilter: true });
    });
    expect(
      container.querySelector('[data-pagination-summary] span').innerHTML
    ).toEqual(`${data.length} entries.`);
  });

  test('Entering a value filters filterable columns case insensitive by defaault', async () => {
    const expectedNamesSorted = ['Milk', 'Heavy Cream', 'Sour Cream'];

    // test set-up - ensure expected is in data
    expect(data.length).toBeGreaterThan(expectedNamesSorted.length);
    expect(
      expectedInObjectArray(expectedNamesSorted, data, 'name')
    ).toBeTruthy();
    const index = headers.findIndex((header) => header.key === 'name');

    // test start
    let container;
    await act(async () => {
      container = await sortTableFactory({ showFilter: true }, { filter: 'M' });
    });

    expect(columnText(container, index)).toEqual(expectedNamesSorted);
  });

  test('Filtering matches in a noFilter column are not displayed', async () => {
    // test set-up
    const expectedStockFiltered = ['20', '12'];
    expect(
      expectedInObjectArray(
        expectedStockFiltered.map((item) => parseInt(item, 10)),
        data,
        'stock'
      )
    ).toBeTruthy();

    expect(data.some((row) => row.stock === 4)).toBeTruthy(); // make sure there is a stock of 4

    const index = headers.findIndex((header) => header.key === 'stock');

    // test start
    let container;
    await act(async () => {
      container = await sortTableFactory({ showFilter: true }, { filter: '4' });
    });
    expect(columnText(container, index)).toEqual(expectedStockFiltered);
  });

  test('Filtering is case sensitive when caseSensitiveFilter is set to true', async () => {
    const expectedNamesSorted = ['Heavy Cream', 'Sour Cream'];

    // test set-up - ensure expected is in data
    expect(data.length).toBeGreaterThan(expectedNamesSorted.length);
    expect(
      expectedInObjectArray(expectedNamesSorted, data, 'name')
    ).toBeTruthy();
    const index = headers.findIndex((header) => header.key === 'name');

    // test start
    let container;
    await act(async () => {
      container = await sortTableFactory(
        { showFilter: true, caseSensitiveFilter: true },
        { filter: 'm' }
      );
    });
    expect(columnText(container, index)).toEqual(expectedNamesSorted);
  });

  test('Table summary changes with filtering', async () => {
    let container;
    await act(async () => {
      container = await sortTableFactory({ showFilter: true }, { filter: 'M' });
    });
    expect(
      container.querySelector('[data-pagination-summary] span').innerHTML
    ).toEqual(`3 entries (filtered from ${data.length}).`);
  });

  test('Aria row count is same as available rows', async () => {
    let container;
    await act(async () => {
      container = await sortTableFactory({ showFilter: true });
    });
    expect(
      container.querySelector('table').getAttribute('aria-rowcount')
    ).toEqual(`${data.length + 1}`);
  });

  test('Aria row count is correct and does not change with filtering', async () => {
    let container;
    await act(async () => {
      container = await sortTableFactory({ showFilter: true }, { filter: 'M' });
    });
    expect(container.querySelectorAll('table tr').length).not.toEqual(
      data.length + 1
    );
    expect(
      container.querySelector('table').getAttribute('aria-rowcount')
    ).toEqual(`${data.length + 1}`);
  });
});
