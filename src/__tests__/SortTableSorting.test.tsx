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

  test('Clicking on an unsorted number column, sorts the column', () => {
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

  test('Column with a sortKey is sorted according to the sortKey value', () => {
    const wrapper = sortTable({ initialSort: 'day' });
    const dayIndex = headers.findIndex((header) => header.key === 'day');

    const sorted = data
      .sort((a, b) => {
        const intA = a.saledaynum;
        const intB = b.saledaynum;
        if (intA === intB) return 0;
        if (intA === undefined) return 1;
        if (intB === undefined) return -1;
        return intA - intB;
      })
      .map((item) => item.day ?? '');

    const dayColumn = columnText(wrapper, dayIndex);
    expect(dayColumn).toEqual(sorted);
  });

  test('Undefined data in row is sorted at the bottom', () => {
    const wrapper = sortTable({ initialSort: 'day' });
    const dayIndex = headers.findIndex((header) => header.key === 'day');

    // ensure at least one row has a missing saledaynum column
    expect(data.some((item) => item.saledaynum === undefined)).toBeTruthy();

    const sorted = data
      .sort((a, b) => {
        const intA = a.saledaynum;
        const intB = b.saledaynum;
        if (intA === intB) return 0;
        if (intA === undefined) return 1;
        if (intB === undefined) return -1;
        return intA - intB;
      })
      .map((item) => item.day ?? '');

    const dayColumn = columnText(wrapper, dayIndex);
    expect(dayColumn).toEqual(sorted);
  });

  test('Sorting on an undefinded sort column type adds the size icon', () => {
    const undefinedTypeIndex = headers.findIndex(
      (header) => header.type === undefined
    );
    expect(undefinedTypeIndex).not.toBeUndefined();

    const wrapper = sortTable({
      initialSort: headers[undefinedTypeIndex].key,
    });

    expect(
      wrapper
        .find('thead th')
        .at(undefinedTypeIndex)
        .find('button svg path[data-icontype="defaultAscending"]')
    ).toHaveLength(1);
  });
  test('Sorting on an alpha sort column type adds the alpha icon', () => {
    const alphaTypeIndex = headers.findIndex(
      (header) => header.type === 'alpha'
    );
    expect(alphaTypeIndex).not.toBeUndefined();

    const wrapper = sortTable({
      initialSort: headers[alphaTypeIndex].key,
    });

    expect(
      wrapper
        .find('thead th')
        .at(alphaTypeIndex)
        .find('button svg path[data-icontype="alphaAscending"]')
    ).toHaveLength(1);
  });
  test('Sorting on a size sort column type adds the size icon', () => {
    const sizeTypeIndex = headers.findIndex((header) => header.type === 'size');
    expect(sizeTypeIndex).not.toBeUndefined();

    const wrapper = sortTable({
      initialSort: headers[sizeTypeIndex].key,
    });

    expect(
      wrapper
        .find('thead th')
        .at(sizeTypeIndex)
        .find('button svg path[data-icontype="defaultAscending"]')
    ).toHaveLength(1);
  });
});
