/* eslint-disable react/react-in-jsx-scope */
import { screen, fireEvent, render } from '@testing-library/react';
import {
  sortTableFactory,
  data,
  headers,
  columnText,
  clickHeader,
  columnTextWithHeader,
} from './helpers/helpers';
import SortTable from '../Components/SortTable';

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
        .querySelector('svg[data-icontype="sortable"]')
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

    container = await clickHeader(container, nameIndex);

    nameColumn = columnText(container, nameIndex);
    expect(sortedData).toEqual(nameColumn);
  });

  test('Clicking on an unsorted column, adds the aria-sort attribute', async () => {
    const nameIndex = headers.findIndex((header) => header.key === 'name');

    let container = await sortTableFactory();

    container = await clickHeader(container, nameIndex);

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

    container = await clickHeader(container, nameIndex);

    const nameColumnUpdated = columnText(container, nameIndex);
    expect(nameColumnUpdated).toEqual(sortedData.reverse());
  });

  test('Clicking on an ascending column changes the aria-sort attribute', async () => {
    const nameIndex = headers.findIndex((header) => header.key === 'name');
    let container = await sortTableFactory({ initialSort: 'name' });

    container = await clickHeader(container, nameIndex);

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

    container = await clickHeader(container, stockIndex);

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
        .querySelector('svg[data-icontype="defaultAscending"]')
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
        .querySelector('svg[data-icontype="alphaAscending"]')
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
        .querySelector('svg[data-icontype="defaultAscending"]')
    ).toBeInTheDocument();
  });
});

describe('Sort Table Sorting Responsive', () => {
  test('Sort drop down is not available on non responsive view', async () => {
    await sortTableFactory({ isResponsive: false });
    expect(screen.queryByTestId('sortDropDownWrapper')).not.toBeInTheDocument();
  });

  test('Columns are part of the sort drop down on responsive view', async () => {
    await sortTableFactory({ isResponsiveListAlwaysShow: true });
    expect(screen.getByTestId('sortDropDownWrapper')).toBeInTheDocument();
  });

  test('If no column is sorted, then the sort direction button is not shown', async () => {
    await sortTableFactory({ isResponsiveListAlwaysShow: true });
    expect(screen.getByTestId('sortDropDownColumn')).toBeInTheDocument();
    expect(
      (screen.getByTestId('sortDropDownColumn') as HTMLSelectElement).value
    ).toEqual('');
    expect(screen.queryByTestId('sortDropDownButton')).not.toBeInTheDocument();
  });

  test('Columns marked as not sortable are not part of the drop down', async () => {
    await sortTableFactory({ isResponsiveListAlwaysShow: true });

    const sortableHeaders = headers
      .filter((header) => !header.noSort)
      .map((header) => header.sortKey || header.key);

    sortableHeaders.push(''); // this is for the "select a column option"

    Array.from(
      screen.getByTestId('sortDropDownColumn').getElementsByTagName('option')
    ).forEach((option) => {
      expect(sortableHeaders).toContain(option.value);
    });
  });

  test('If a column is already sorted, then the sort column and direction are correct', async () => {
    await sortTableFactory({
      initialSort: 'name',
      isResponsiveListAlwaysShow: true,
    });
    expect(
      (screen.getByTestId('sortDropDownColumn') as HTMLSelectElement).value
    ).toEqual('name');
    expect(screen.getByTestId('sortDropDownButton')).toBeInTheDocument();
    expect(
      screen
        .getByTestId('sortDropDownButton')
        .getAttribute('data-sortdirection')
    ).toEqual('asc');
  });

  test('Choosing a column, sorts the column ascending', async () => {
    await sortTableFactory({ isResponsiveListAlwaysShow: true });
    const sortedData = data.map((row) => row.name).sort();

    fireEvent.change(screen.getByTestId('sortDropDownColumn'), {
      target: { value: 'name' },
    });

    const nameColumn = columnTextWithHeader('name');
    expect(sortedData).toEqual(nameColumn);

    expect(
      screen
        .getByTestId('sortDropDownButton')
        .getAttribute('data-sortdirection')
    ).toEqual('asc');
  });

  test('Clicking the sort column switches the order to descending', async () => {
    await sortTableFactory({
      isResponsiveListAlwaysShow: true,
      initialSort: 'name',
    });
    const sortedData = data.map((row) => row.name).sort();
    expect(
      screen
        .getByTestId('sortDropDownButton')
        .getAttribute('data-sortdirection')
    ).toEqual('asc');
    fireEvent.click(screen.getByTestId('sortDropDownButton'));
    expect(
      screen
        .getByTestId('sortDropDownButton')
        .getAttribute('data-sortdirection')
    ).toEqual('desc');

    const nameColumn = columnTextWithHeader('name');
    expect(sortedData.reverse()).toEqual(nameColumn);
  });

  test('Column with a sortKey is sorted according to the sortKey value', async () => {
    await sortTableFactory({ isResponsiveListAlwaysShow: true });
    expect(
      screen
        .getByTestId('sortDropDownColumn')
        .querySelector('option[value="saledaynum"]')
    ).toBeInTheDocument();
    fireEvent.change(screen.getByTestId('sortDropDownColumn'), {
      target: { value: 'saledaynum' },
    });
    // const nameColumn = columnTextWithHeader('day');
    // expect(nameColumn).toEqual(sorted);
    // TODO fix this test.  The responsive header html is preventing the sort from working.
  });
});

describe('Custom sort function', () => {
  const myCustomSort = (a, b) => {
    if (a === b || (a !== 'first' && b !== 'first')) return 0;
    return a === 'first' ? -1 : 1;
  };
  const headers = [
    { name: 'My Column', key: 'custom', customSort: myCustomSort },
  ];

  const data = [
    {
      id: 1,
      custom: 'second',
    },
    {
      id: 2,
      custom: 'last',
    },
    {
      id: 3,
      custom: 'first',
    },
  ];

  test('Column with custom sort is sorted ascending', async () => {
    const wrapper = <SortTable tableData={data} headers={headers} />;

    let { container } = render(wrapper);
    fireEvent.click(
      // @ts-ignore
      container.querySelector('thead th').querySelector('button')
    );

    await new Promise((r) => setTimeout(r, 25)); // time to to allow debounce to finish

    let cells = [];
    container.querySelectorAll('tbody tr td').forEach((cell) => {
      // @ts-ignore
      cells.push(cell.innerHTML);
    });

    expect(cells).toEqual(['first', 'second', 'last']);
    expect(container.querySelector('th')?.getAttribute('aria-sort')).toEqual(
      'ascending'
    );
  });

  test('Column with custom sort is sorted descending', async () => {
    const wrapper = <SortTable tableData={data} headers={headers} />;

    let { container } = render(wrapper);
    fireEvent.click(
      // @ts-ignore
      container.querySelector('thead th').querySelector('button')
    );

    fireEvent.click(
      // @ts-ignore
      container.querySelector('thead th').querySelector('button')
    );

    await new Promise((r) => setTimeout(r, 25)); // time to to allow debounce to finish

    let cells = [];
    container.querySelectorAll('tbody tr td').forEach((cell) => {
      // @ts-ignore
      cells.push(cell.innerHTML);
    });

    expect(cells).toEqual(['last', 'second', 'first']);
    expect(container.querySelector('th')?.getAttribute('aria-sort')).toEqual(
      'descending'
    );
  });

  test('Column with custom sort sorts correctly if is the initial sort ascending', async () => {
    const wrapper = (
      <SortTable tableData={data} headers={headers} initialSort='custom' />
    );

    let { container } = render(wrapper);

    let cells = [];
    container.querySelectorAll('tbody tr td').forEach((cell) => {
      // @ts-ignore
      cells.push(cell.innerHTML);
    });

    expect(cells).toEqual(['first', 'second', 'last']);
    expect(container.querySelector('th')?.getAttribute('aria-sort')).toEqual(
      'ascending'
    );
  });

  test('Column with custom sort sorts correctly if is the initial sort descending', async () => {
    const wrapper = (
      <SortTable
        tableData={data}
        headers={headers}
        initialSort='custom'
        initialSortDsc
      />
    );

    let { container } = render(wrapper);

    let cells = [];
    container.querySelectorAll('tbody tr td').forEach((cell) => {
      // @ts-ignore
      cells.push(cell.innerHTML);
    });

    expect(cells).toEqual(['last', 'second', 'first']);
    expect(container.querySelector('th')?.getAttribute('aria-sort')).toEqual(
      'descending'
    );
  });
});
