/* eslint-disable react/react-in-jsx-scope */

import {
  sortTableFactory,
  data,
  headers,
  columnText,
  clickHeader,
} from './helpers/helpers';

describe('Sort Table Sorting', () => {
  test('Column marked as pre-sort is sorted', async () => {
    const sortedData = data.map((row) => row.name).sort();
    const nameIndex = headers.findIndex((header) => header.key === 'name');

    const container = await sortTableFactory({ initialSort: 'name' });
    const nameColumn = columnText(container, nameIndex);
    expect(sortedData).toEqual(nameColumn);
  });
  test('Column marked as pre-sort is sorted descending', async () => {
    const sortedData = data
      .map((row) => row.name)
      .sort()
      .reverse();
    const nameIndex = headers.findIndex((header) => header.key === 'name');
    const container = await sortTableFactory({
      initialSort: 'name',
      initialSortDsc: true,
    });
    const nameColumn = columnText(container, nameIndex);
    expect(sortedData).toEqual(nameColumn);
  });

  test('Columns have a search button', async () => {
    const nameIndex = headers.findIndex((header) => header.key === 'name');
    expect(headers[nameIndex].noSort).toBeUndefined();

    const container = await sortTableFactory();
    expect(
      container
        .querySelectorAll('thead th')
        .item(nameIndex)
        .querySelector('button')
    ).toBeInTheDocument();
  });

  test('Columns marked as not sortable do not have a search button', async () => {
    const notSortableIndex = headers.findIndex(
      (header) => header.noSort !== undefined
    );

    const container = await sortTableFactory();
    expect(
      container
        .querySelectorAll('thead th')
        .item(notSortableIndex)
        .querySelector('button')
    ).not.toBeInTheDocument();
  });

  test('Sortable, but unsorted columns, have a sortable icon', async () => {
    const nameIndex = headers.findIndex((header) => header.key === 'name');
    expect(headers[nameIndex].noSort).toBeUndefined();

    const container = await sortTableFactory();

    expect(
      container
        .querySelectorAll('thead th')
        .item(nameIndex)
        .querySelector('path[data-icontype="sortable"]')
    ).toBeInTheDocument();
  });

  test('Sortable, but unsorted, do not have aria-sort attribute', async () => {
    const nameIndex = headers.findIndex((header) => header.key === 'name');
    expect(headers[nameIndex].noSort).toBeUndefined();

    const container = await sortTableFactory();

    expect(
      container
        .querySelectorAll('thead th')
        .item(nameIndex)
        .querySelector('[aria-sort]')
    ).not.toBeInTheDocument();
  });

  test('Clicking on an unsorted string column, sorts the column ascending', async () => {
    const sortedData = data.map((row) => row.name).sort();
    const nameIndex = headers.findIndex((header) => header.key === 'name');

    let container = await sortTableFactory();

    let nameColumn = columnText(container, nameIndex);
    expect(sortedData).not.toEqual(nameColumn);

    container = clickHeader(container, nameIndex);

    nameColumn = columnText(container, nameIndex);
    expect(sortedData).toEqual(nameColumn);
  });

  test('Clicking on an unsorted column, adds the aria-sort attribute', async () => {
    const nameIndex = headers.findIndex((header) => header.key === 'name');

    let container = await sortTableFactory();

    container = clickHeader(container, nameIndex);

    expect(
      container
        .querySelectorAll('thead th')
        .item(nameIndex)
        .getAttribute('aria-sort')
    ).toEqual('ascending');
  });

  test('Clicking on an ascending column switches the order to descending', async () => {
    const sortedData = data.map((row) => row.name).sort();
    const nameIndex = headers.findIndex((header) => header.key === 'name');

    let container = await sortTableFactory({ initialSort: 'name' });
    const nameColumn = columnText(container, nameIndex);
    expect(sortedData).toEqual(nameColumn);

    container = clickHeader(container, nameIndex);

    const nameColumnUpdated = columnText(container, nameIndex);
    expect(nameColumnUpdated).toEqual(sortedData.reverse());
  });

  test('Clicking on an ascending column changes the aria-sort attribute', async () => {
    const nameIndex = headers.findIndex((header) => header.key === 'name');
    let container = await sortTableFactory({ initialSort: 'name' });

    container = clickHeader(container, nameIndex);

    expect(
      container
        .querySelectorAll('thead th')
        .item(nameIndex)
        .getAttribute('aria-sort')
    ).toEqual('descending');
  });

  test('Clicking on an unsorted number column, sorts the column', async () => {
    const sortedData = data
      .map((row) => parseInt(row.stock, 10))
      .sort((a, b) => (a === b ? 0 : a - b));
    const stockIndex = headers.findIndex((header) => header.key === 'stock');

    let container = await sortTableFactory({ initialSort: 'name' });

    container = clickHeader(container, stockIndex);

    const stockColumn = columnText(container, stockIndex).map((item) =>
      parseInt(item, 10)
    );

    expect(stockColumn).toEqual(sortedData);
  });

  test('Column with a sortKey is sorted according to the sortKey value', async () => {
    const container = await sortTableFactory({ initialSort: 'day' });
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

    const dayColumn = columnText(container, dayIndex);
    expect(dayColumn).toEqual(sorted);
  });

  test('Undefined data in row is sorted at the bottom', async () => {
    const container = await sortTableFactory({ initialSort: 'day' });
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

    const dayColumn = columnText(container, dayIndex);
    expect(dayColumn).toEqual(sorted);
  });

  test('Sorting on an undefinded sort column type adds the size icon', async () => {
    const undefinedTypeIndex = headers.findIndex(
      (header) => header.type === undefined
    );
    expect(undefinedTypeIndex).not.toBeUndefined();

    const container = await sortTableFactory({
      initialSort: headers[undefinedTypeIndex].key,
    });

    expect(
      container
        .querySelectorAll('thead th')
        .item(undefinedTypeIndex)
        .querySelector('button svg path[data-icontype="defaultAscending"]')
    ).toBeInTheDocument();
  });

  test('Sorting on an alpha sort column type adds the alpha icon', async () => {
    const alphaTypeIndex = headers.findIndex(
      (header) => header.type === 'alpha'
    );
    expect(alphaTypeIndex).not.toBeUndefined();

    const container = await sortTableFactory({
      initialSort: headers[alphaTypeIndex].key,
    });

    expect(
      container
        .querySelectorAll('thead th')
        .item(alphaTypeIndex)
        .querySelector('button svg path[data-icontype="alphaAscending"]')
    ).toBeInTheDocument();
  });

  test('Sorting on a size sort column type adds the size icon', async () => {
    const sizeTypeIndex = headers.findIndex((header) => header.type === 'size');
    expect(sizeTypeIndex).not.toBeUndefined();

    const container = await sortTableFactory({
      initialSort: headers[sizeTypeIndex].key,
    });

    expect(
      container
        .querySelectorAll('thead th')
        .item(sizeTypeIndex)
        .querySelector('button svg path[data-icontype="defaultAscending"]')
    ).toBeInTheDocument();
  });
});
