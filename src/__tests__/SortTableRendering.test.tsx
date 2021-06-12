/* eslint-disable react/react-in-jsx-scope */

import { axe } from 'jest-axe';
import { sortTable, data, headers } from './helpers/helpers';

describe('Sort Table Rendering', () => {
  test('Snapshot test', () => {
    expect(
      sortTable({ showPagination: true, showFilter: true })
    ).toMatchSnapshot();
  });

  test('Expected number of columns and cells', () => {
    const wrapper = sortTable();
    expect(wrapper.find('tbody tr')).toHaveLength(data.length);
    expect(wrapper.find('thead tr').children()).toHaveLength(headers.length);
  });

  test('Header cells are marked with th tag', () => {
    expect(sortTable().find('thead th')).toHaveLength(headers.length);
  });

  test('Row headers are marked with th tags', () => {
    // Test set-up - ensure that there is only one row header
    const firstRow = sortTable().find('tbody tr').first();

    expect(firstRow.find('th')).toHaveLength(1);
    expect(firstRow.find('td')).toHaveLength(headers.length - 1);

    // Test Start
    const rowHeaderIndex = headers.findIndex((row) => row.rowheader);
    expect(firstRow.children().at(rowHeaderIndex).type()).toEqual('th');
  });

  test.todo('Components are rendered in a data cell');

  test.todo('DangerouslySetInnerHTML allows for rendered html');

  test('Filtering text box is not shown by default', () => {
    expect(sortTable().find('[data-filter]')).toHaveLength(0);
  });

  test('Pagination is not shown by default', () => {
    expect(sortTable().find('[data-pagination]')).toHaveLength(0);
    expect(sortTable().find('[data-sort-number-of-inputs]')).toHaveLength(0);
  });

  test('Table caption is shown when value is passed', () => {
    const myCaption = 'my caption';
    const wrapper = sortTable({ caption: myCaption });
    expect(wrapper.find('caption')).toHaveLength(1);
    expect(wrapper.find('caption').text()).toEqual(myCaption);
  });

  test('Empty caption tags are not shown', () => {
    expect(sortTable().find('caption')).toHaveLength(0);
  });

  test('Is Loading default message is shown', () => {
    // Test set-up - ensure loading isn't shown by default
    expect(sortTable().find('Loading')).toHaveLength(0);

    // Test Start
    expect(sortTable({ isLoading: true }).find('Loading')).toHaveLength(1);
    // verify data is no shown
    expect(
      sortTable({ isLoading: true }).find('[data-sorttable-data-cell]')
    ).toHaveLength(0);
  });

  test('Is Loading custom message is shown', () => {
    const customLoad = <div id='MyCustomLoading'>My loader</div>;
    expect(
      sortTable({ isLoading: true, isLoadingMessage: customLoad }).find(
        '#MyCustomLoading'
      )
    ).toHaveLength(1);
  });

  describe('Custom CSS', () => {
    test('Table header class name is set when passed', () => {
      const wrapper = sortTable({ headerClassName: 'myCustomHeaderClass' });
      expect(wrapper.find('thead.myCustomHeaderClass')).toHaveLength(1);
    });

    test('Responsive data attribute is set', () => {
      // verify responsive attribute is not set by default
      expect(sortTable().find('table[data-sort-responsive]')).toHaveLength(0);

      // applied with prop
      expect(
        sortTable({ isResponsive: true }).find('table[data-sort-responsive]')
      ).toHaveLength(1);
    });

    test('Custom table class name is set', () => {
      expect(
        sortTable({ tableClassName: 'myCustomClass' }).find(
          'table.myCustomClass'
        )
      ).toHaveLength(1);
    });

    test('Custom class name is added to column header', () => {
      // Test set-up - ensure a header className is set
      const index = headers.findIndex((header) => header.className);
      const { className } = headers[index];
      expect(className).not.toBeUndefined();

      // Test start
      expect(sortTable().find(`th.${className}`)).toHaveLength(1);
    });

    test('Custom style is added to column header', () => {
      // Test set-up - ensure a header className is set
      const index = headers.findIndex((header) => header.style);
      const color = headers[index].style?.color;
      expect(color).not.toBeUndefined();

      // Test start
      expect(sortTable().find('th').at(index).prop('style')).toHaveProperty(
        'color',
        color
      );
    });
  });

  describe('Accessibility', () => {
    test('Is accessible with default settings', async () => {
      const results = await axe(`<main>${sortTable()}</main>`);
      expect(results).toHaveNoViolations();
    });

    test('Is accessible with filtering', async () => {
      const results = await axe(
        `<main>${sortTable({ showFilter: true })}</main>`
      );
      expect(results).toHaveNoViolations();
    });

    test('Is accessible with pagination buttons', async () => {
      const results = await axe(
        `<main>${sortTable({ showPagination: true })}</main>`
      );
      expect(results).toHaveNoViolations();
    });

    test.todo('Is accessible with pagination drop down');
  });
});
