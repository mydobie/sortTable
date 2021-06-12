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
    const wrapper = sortTable({ showFilter: true });
    const expectedNamesSorted = ['Milk', 'Heavy Cream', 'Sour Cream'];

    // test set-up - ensure expected is in data
    expect(data.length).toBeGreaterThan(expectedNamesSorted.length);
    expect(
      expectedInObjectArray(expectedNamesSorted, data, 'name')
    ).toBeTruthy();
    const index = headers.findIndex((header) => header.key === 'name');

    // test start
    wrapper
      .find('[data-filter-input]')
      .simulate('change', { target: { value: 'M' } })
      .update();

    expect(columnText(wrapper, index)).toEqual(expectedNamesSorted);
  });

  test('Filtering matches in a noFilter column are not displayed', () => {
    const wrapper = sortTable({ showFilter: true });

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
    wrapper
      .find('[data-filter-input]')
      .simulate('change', { target: { value: '4' } })
      .update();

    expect(columnText(wrapper, index)).toEqual(expectedStockFiltered);
  });

  test('Filtering is case sensitive when caseSensitiveFilter is set to true', () => {
    const wrapper = sortTable({ showFilter: true, caseSensitiveFilter: true });
    const expectedNamesSorted = ['Heavy Cream', 'Sour Cream'];

    // test set-up - ensure expected is in data
    expect(data.length).toBeGreaterThan(expectedNamesSorted.length);
    expect(
      expectedInObjectArray(expectedNamesSorted, data, 'name')
    ).toBeTruthy();
    const index = headers.findIndex((header) => header.key === 'name');

    // test start
    wrapper
      .find('[data-filter-input]')
      .simulate('change', { target: { value: 'm' } })
      .update();

    expect(columnText(wrapper, index)).toEqual(expectedNamesSorted);
  });

  test('Table summary changes with filtering', () => {
    const wrapper = sortTable({ showFilter: true });
    expect(wrapper.find('[data-pagination-summary]').text()).toEqual(
      `Showing ${data.length} entries`
    );

    wrapper
      .find('[data-filter-input]')
      .simulate('change', { target: { value: 'M' } })
      .update();

    expect(wrapper.find('[data-pagination-summary]').text()).toEqual(
      `Showing 3 entries(filtered from ${data.length} total entries)`
    );
  });

  test('Aria row count is correct and does not change with filtering', () => {
    const wrapper = sortTable({ showFilter: true });
    expect(wrapper.find('table').props()['aria-rowcount']).toEqual(data.length);

    wrapper
      .find('[data-filter-input]')
      .simulate('change', { target: { value: 'M' } })
      .update();

    expect(wrapper.find('tbody tr')).not.toEqual(data.length);
    expect(wrapper.find('table').props()['aria-rowcount']).toEqual(data.length);
  });
});
