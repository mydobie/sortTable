/* eslint-disable react/react-in-jsx-scope */

import '@testing-library/jest-dom/extend-expect';
import { axe } from 'jest-axe';
import { sortTableFactory, data, headers } from './helpers/helpers';

describe('Sort Table Rendering', () => {
  test('Snapshot test', async () => {
    const container = await sortTableFactory({
      showPagination: true,
      showFilter: true,
    });
    expect(container).toMatchSnapshot();
  });

  test('Expected number of columns and cells', async () => {
    const container = await sortTableFactory();
    const rows = container.querySelectorAll('tbody tr');
    const cols = container.querySelectorAll('thead tr th');
    expect(rows).toHaveLength(data.length);
    expect(cols).toHaveLength(headers.length);
  });

  test('Row headers are marked with th tags', async () => {
    const container = await sortTableFactory();
    const headerCells = container.querySelectorAll('tbody tr:first-child th');
    expect(headerCells).toHaveLength(1);

    // Test Start
    const rowHeaderIndex = headers.findIndex((row) => row.rowheader);
    const rowHeader = container.querySelectorAll(
      `tbody tr:first-child :nth-child(${rowHeaderIndex + 1})`
    );

    expect(rowHeader[0].tagName).toEqual('TH');
  });

  test('Components are rendered in a data cell', async () => {
    const dataHtml = [
      { id: 1, name: <strong>Cheese</strong>, price: '$4.90', stock: 20 },
    ];
    const nameIndex = headers.findIndex((row) => row.key === 'name');
    expect(nameIndex).not.toBeUndefined();

    const container = await sortTableFactory({
      tableData: dataHtml,
    });
    expect(
      container.querySelector(
        `tbody tr:first-child [data-sorttable-data-cell]:nth-child(${
          nameIndex + 1
        }) strong`
      )
    ).toBeInTheDocument();
  });

  test('DangerouslySetInnerHTML allows for rendered html', async () => {
    const dataHtml = [
      { id: 1, name: '<strong>Cheese</strong>', price: '$4.90', stock: 20 },
    ];
    const nameIndex = headers.findIndex((row) => row.key === 'name');
    expect(nameIndex).not.toBeUndefined();

    const container = await sortTableFactory({
      dangerouslySetInnerHTML: true,
      tableData: dataHtml,
    });
    expect(
      container.querySelector(
        `tbody tr:first-child [data-sorttable-data-cell]:nth-child(${
          nameIndex + 1
        }) strong`
      )
    ).toBeInTheDocument();
  });

  test('Filtering text box is not shown by default', async () => {
    const container = await sortTableFactory();
    expect(container.querySelector('[data-filter]')).not.toBeInTheDocument();
  });

  test('Pagination is not shown by default', async () => {
    const container = await sortTableFactory();
    expect(
      container.querySelector('[data-pagination]')
    ).not.toBeInTheDocument();
  });

  test('Table caption is shown when value is passed', async () => {
    const myCaption = 'my caption';
    const container = await sortTableFactory({ caption: myCaption });
    expect(container.querySelector('caption')).toBeInTheDocument();
    expect(container.querySelector('caption')).toHaveTextContent(myCaption);
  });

  test('Empty caption tags are not shown', async () => {
    const container = await sortTableFactory();
    expect(container.querySelector('caption')).not.toBeInTheDocument();
  });

  test('Is loading default message is not shown by default', async () => {
    const container = await sortTableFactory();
    expect(
      container.querySelector('[data-sort-table-loading]')
    ).not.toBeInTheDocument();
  });

  test('Is Loading default message is shown', async () => {
    const container = await sortTableFactory({ isLoading: true });
    expect(
      container.querySelector('[data-sort-table-loading]')
    ).toBeInTheDocument();

    expect(
      container.querySelector('[data-sorttable-data-cell]')
    ).not.toBeInTheDocument();
  });

  test('Is Loading custom message is shown', async () => {
    const customLoad = <div id='MyCustomLoading'>My custom loader</div>;
    const container = await sortTableFactory({
      isLoading: true,
      isLoadingMessage: customLoad,
    });
    expect(container.querySelector('#MyCustomLoading')).toBeInTheDocument();
    expect(
      container.querySelector('[data-sort-table-loading]')
    ).not.toBeInTheDocument();
  });

  describe('Custom CSS', () => {
    test('Table header class name is set when passed', async () => {
      const container = await sortTableFactory({
        headerClassName: 'myCustomHeaderClass',
      });
      expect(
        container.querySelector('thead.myCustomHeaderClass')
      ).toBeInTheDocument();
    });

    test('Responsive data attribute is not set by default', async () => {
      const container = await sortTableFactory();
      expect(
        container.querySelector('table[data-sort-responsive]')
      ).not.toBeInTheDocument();
    });

    test('Responsive data attribute is set', async () => {
      const container = await sortTableFactory({ isResponsive: true });
      expect(
        container.querySelector('table[data-sort-responsive]')
      ).toBeInTheDocument();
    });

    test('Custom table class name is set', async () => {
      const container = await sortTableFactory({
        tableClassName: 'myCustomClass',
      });
      expect(
        container.querySelector('table.myCustomClass')
      ).toBeInTheDocument();
    });

    test('Custom class name is added to column header', async () => {
      const index = headers.findIndex((header) => header.className);
      const { className } = headers[index];
      expect(className).not.toBeUndefined();

      const container = await sortTableFactory();
      expect(container.querySelector(`th.${className}`)).toBeInTheDocument();
    });

    test('Custom style is added to column header', async () => {
      const index = headers.findIndex((header) => header.style);
      const color = headers[index].style?.color;
      expect(color).not.toBeUndefined();

      const container = await sortTableFactory();
      const styleAttr = container
        .querySelector(`thead th:nth-child(${index + 1})`)
        .getAttribute('style');

      expect(styleAttr).toEqual(`color: ${color};`);
    });

    test('Non empty cells does not have custom empty css class name', async () => {
      const urlIndex = headers.findIndex((header) => header.key === 'url');
      const index = data.findIndex(
        (row) => row.url !== undefined && row.url !== ''
      );
      expect(urlIndex).not.toEqual(-1);
      expect(index).not.toEqual(-1);

      const container = await sortTableFactory({
        emptyCellClassName: 'myCustomCSSClassName',
      });
      expect(
        container.querySelector(
          `tbody tr:nth-child(${
            index + 1
          }) [data-sorttable-data-cell]:nth-child(${
            urlIndex + 1
          }).myCustomCSSClassName`
        )
      ).not.toBeInTheDocument();
    });

    test('Empty cell class is applied to undefined value', async () => {
      const urlIndex = headers.findIndex((header) => header.key === 'url');
      const index = data.findIndex((row) => row.url === undefined);
      expect(urlIndex).not.toEqual(-1);
      expect(index).not.toEqual(-1);

      const container = await sortTableFactory({
        emptyCellClassName: 'myCustomCSSClassName',
      });
      expect(
        container.querySelector(
          `tbody tr:nth-child(${
            index + 1
          }) [data-sorttable-data-cell]:nth-child(${
            urlIndex + 1
          }).myCustomCSSClassName`
        )
      ).toBeInTheDocument();
    });

    test('Empty cell class is applied to value that is empty', async () => {
      const urlIndex = headers.findIndex((header) => header.key === 'url');
      const index = data.findIndex((row) => row.url === '');
      expect(urlIndex).not.toEqual(-1);
      expect(index).not.toEqual(-1);

      const container = await sortTableFactory({
        emptyCellClassName: 'myCustomCSSClassName',
      });
      expect(
        container.querySelector(
          `tbody tr:nth-child(${
            index + 1
          }) [data-sorttable-data-cell]:nth-child(${
            urlIndex + 1
          }).myCustomCSSClassName`
        )
      ).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    test('Is accessible with default settings', async () => {
      const container = await sortTableFactory();
      const results = await axe(`<main>${container.innerHTML}</main>`);
      expect(results).toHaveNoViolations();
    });

    test('Is accessible with filtering', async () => {
      const container = await sortTableFactory({ showFilter: true });
      const results = await axe(`<main>${container.innerHTML}</main>`);
      expect(results).toHaveNoViolations();
    });

    test('Is accessible with pagination buttons', async () => {
      const container = await sortTableFactory({ showPagination: true });
      const results = await axe(`<main>${container.innerHTML}</main>`);
      expect(results).toHaveNoViolations();
    });
  });
});
