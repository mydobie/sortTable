/* eslint-disable react/react-in-jsx-scope */
// import { axe } from 'jest-axe';
import {
  sortTable,
  columnText,
  expectedInObjectArray,
  data,
  headers,
} from './helpers/helpers';

describe('Sort Table Filtering (without pagination)', () => {
  test('Entering a value filters filterable columns case insensitive by defaault', () => {
    const expectedNamesSorted = ['Milk', 'Heavy Cream', 'Sour Cream'];

    // test set-up - ensure expected is in data
    expect(data.length).toBeGreaterThan(expectedNamesSorted.length);
    expect(
      expectedInObjectArray(expectedNamesSorted, data, 'name')
    ).toBeTruthy();
    const index = headers.findIndex((header) => header.key === 'name');

    // test start
    const wrapper = sortTable({ showFilter: true }, { filter: 'M' });

    expect(columnText(wrapper, index)).toEqual(expectedNamesSorted);
  });

  test('Filtering matches in a noFilter column are not displayed', () => {
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
    const wrapper = sortTable({ showFilter: true }, { filter: 4 });
    expect(columnText(wrapper, index)).toEqual(expectedStockFiltered);
  });

  test('Filtering is case sensitive when caseSensitiveFilter is set to true', () => {
    const expectedNamesSorted = ['Heavy Cream', 'Sour Cream'];

    // test set-up - ensure expected is in data
    expect(data.length).toBeGreaterThan(expectedNamesSorted.length);
    expect(
      expectedInObjectArray(expectedNamesSorted, data, 'name')
    ).toBeTruthy();
    const index = headers.findIndex((header) => header.key === 'name');

    // test start
    const wrapper = sortTable(
      { showFilter: true, caseSensitiveFilter: true },
      { filter: 'm' }
    );

    expect(columnText(wrapper, index)).toEqual(expectedNamesSorted);
  });

  test('Table summary changes with filtering', () => {
    // Unfiltered
    let wrapper = sortTable({ showFilter: true });
    expect(wrapper.find('[data-pagination-summary]').text()).toEqual(
      `Showing ${data.length} entries`
    );

    // Filtered
    wrapper = sortTable({ showFilter: true }, { filter: 'M' });
    expect(wrapper.find('[data-pagination-summary]').text()).toEqual(
      `Showing 3 entries(filtered from ${data.length} total entries)`
    );
  });

  test('Aria row count is correct and does not change with filtering', () => {
    let wrapper = sortTable({ showFilter: true });
    expect(wrapper.find('table').props()['aria-rowcount']).toEqual(data.length);

    wrapper = sortTable({ showFilter: true }, { filter: 'M' });

    expect(wrapper.find('tbody tr')).not.toEqual(data.length);
    expect(wrapper.find('table').props()['aria-rowcount']).toEqual(data.length);
  });
});
