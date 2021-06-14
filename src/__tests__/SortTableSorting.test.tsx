/* eslint-disable react/react-in-jsx-scope */
import { sortTable, data, headers, columnText } from './helpers/helpers';

describe('Sort Table Sorting', () => {
  test('Column marked as pre-sort is sorted', () => {
    const sortedData = data.map((row) => row.name).sort();
    const nameIndex = headers.findIndex((header) => header.key === 'name');

    const wrapper = sortTable({ initialSort: 'name' });
    const nameColumn = columnText(wrapper, nameIndex);
    expect(sortedData).toEqual(nameColumn);
  });
  test('Column marked as pre-sort is sorted descending', () => {
    const sortedData = data
      .map((row) => row.name)
      .sort()
      .reverse();
    const nameIndex = headers.findIndex((header) => header.key === 'name');
    const wrapper = sortTable({ initialSort: 'name', initialSortDsc: true });
    const nameColumn = columnText(wrapper, nameIndex);
    expect(sortedData).toEqual(nameColumn);
  });

  test('Columns have a search button', () => {
    const nameIndex = headers.findIndex((header) => header.key === 'name');
    expect(headers[nameIndex].noSort).toBeUndefined();

    const wrapper = sortTable();
    expect(wrapper.find('thead th').at(nameIndex).find('button')).toHaveLength(
      1
    );
  });

  test('Columns marked as not sortable do not have a search button', () => {
    const notSortableIndex = headers.findIndex(
      (header) => header.noSort !== undefined
    );

    const wrapper = sortTable();
    expect(
      wrapper.find('thead th').at(notSortableIndex).find('button')
    ).toHaveLength(0);
  });

  test('Sortable, but unsorted columns, have a sortable icon', () => {
    const nameIndex = headers.findIndex((header) => header.key === 'name');
    expect(headers[nameIndex].noSort).toBeUndefined();

    const wrapper = sortTable();

    expect(
      wrapper
        .find('thead th')
        .at(nameIndex)
        .find('path[data-icontype="sortable"]')
    ).toHaveLength(1);
  });

  test('Sortable, but unsorted, do not have aria-sort attribute', () => {
    const nameIndex = headers.findIndex((header) => header.key === 'name');
    expect(headers[nameIndex].noSort).toBeUndefined();

    const wrapper = sortTable();

    expect(
      wrapper.find('thead th').at(nameIndex).prop('aria-sort')
    ).toBeUndefined();
  });

  test('Clicking on an unsorted string column, sorts the column ascending', () => {
    const sortedData = data.map((row) => row.name).sort();
    const nameIndex = headers.findIndex((header) => header.key === 'name');

    const wrapper = sortTable();

    let nameColumn = columnText(wrapper, nameIndex);
    expect(sortedData).not.toEqual(nameColumn);

    wrapper
      .find('thead th')
      .at(nameIndex)
      .find('button')
      .simulate('click')
      .update();

    nameColumn = columnText(wrapper, nameIndex);
    expect(sortedData).toEqual(nameColumn);
  });

  test('Clicking on an unsorted column, adds the aria-sort attribute', () => {
    const nameIndex = headers.findIndex((header) => header.key === 'name');

    const wrapper = sortTable();

    wrapper
      .find('thead th')
      .at(nameIndex)
      .find('button')
      .simulate('click')
      .update();

    expect(wrapper.find('thead th').at(nameIndex).prop('aria-sort')).toEqual(
      'ascending'
    );
  });

  test('Clicking on an ascending column switches the order to descending', () => {
    const sortedData = data.map((row) => row.name).sort();
    const nameIndex = headers.findIndex((header) => header.key === 'name');

    const wrapper = sortTable({ initialSort: 'name' });
    const nameColumn = columnText(wrapper, nameIndex);
    expect(sortedData).toEqual(nameColumn);

    wrapper
      .find('thead th')
      .at(nameIndex)
      .find('button')
      .simulate('click')
      .update();

    const nameColumnUpdated = columnText(wrapper, nameIndex);

    expect(nameColumnUpdated).toEqual(sortedData.reverse());
  });

  test('Clicking on an ascending column changes the aria-sort attribute', () => {
    const nameIndex = headers.findIndex((header) => header.key === 'name');
    const wrapper = sortTable({ initialSort: 'name' });

    wrapper
      .find('thead th')
      .at(nameIndex)
      .find('button')
      .simulate('click')
      .update();

    expect(wrapper.find('thead th').at(nameIndex).prop('aria-sort')).toEqual(
      'descending'
    );
  });

  test.only('Clicking on an unsorted number column, sorts the column', () => {
    const sortedData = data
      .map((row) => parseInt(row.stock, 10))
      .sort((a, b) => (a === b ? 0 : a - b));
    const stockIndex = headers.findIndex((header) => header.key === 'stock');

    const wrapper = sortTable({ initialSort: 'name' });

    wrapper
      .find('thead th')
      .at(stockIndex)
      .find('button')
      .simulate('click')
      .update();

    const stockColumn = columnText(wrapper, stockIndex).map((item) =>
      parseInt(item, 10)
    );

    expect(stockColumn).toEqual(sortedData);
  });

  test.todo(
    'Clicking on column with a sortKey sorts according to the sortKey value'
  );

  test.todo('Clicking on an undefinded sort type adds the size icon');
  test.todo('Clicking on an alpha sort type adds the alpha icon');
  test.todo('Clicking on a size sort type adds the size icon');
});
