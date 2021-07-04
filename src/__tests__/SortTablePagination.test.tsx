/* eslint-disable no-param-reassign */
/* eslint-disable react/react-in-jsx-scope */

import { fireEvent } from '@testing-library/react';
import {
  sortTableFactory,
  viewSteps,
  data,
  changeViewItemsToView,
  clickPaginationButton,
  columnText,
  changeFilter,
} from './helpers/helpers';

describe('Sort Table Pagination', () => {
  test('Show results drop down has correct options', async () => {
    const container = await sortTableFactory({ showPagination: true });

    const options = container.querySelectorAll(
      '[data-sort-number-of-inputs] select option'
    );
    expect(options.length).toBeGreaterThan(1);
    viewSteps.forEach((step, index) => {
      expect(`${step}`).toEqual(options.item(index).getAttribute('value'));
    });
  });

  test('All is shown as an option', async () => {
    const container = await sortTableFactory({ showPagination: true });
    const lastOption = container.querySelector(
      '[data-sort-number-of-inputs] select option:last-child'
    ).textContent;
    expect(lastOption).toEqual('All');
  });

  test('All rows are shown if defaultToAll prop is set', async () => {
    const container = await sortTableFactory({
      showPagination: true,
      defaultToAll: true,
    });
    const rows = container.querySelectorAll('table tbody tr');
    expect(rows).toHaveLength(data.length);
  });

  test('If defaultToAll is not set, then the number of elements shown matches the first option', async () => {
    const container = await sortTableFactory({ showPagination: true });
    const numberToShow = parseInt(
      container
        .querySelector('[data-sort-number-of-inputs] select option:first-child')
        .getAttribute('value'),
      10
    );

    const rows = container.querySelectorAll('table tbody tr');
    expect(rows).not.toHaveLength(data.length);
    expect(rows).toHaveLength(numberToShow);
  });

  test('All rows are shown if "all" chosen', async () => {
    const container = await sortTableFactory(
      { showPagination: true },
      { viewSet: '' }
    );
    const rows = container.querySelectorAll('table tbody tr');
    expect(rows).toHaveLength(data.length);
  });

  test('Changing show results changes number of rows shown', async () => {
    let container = await sortTableFactory(
      { showPagination: true },
      { viewSet: 2 }
    );
    let rows = container.querySelectorAll('table tbody tr');
    expect(rows).toHaveLength(2);
    container = changeViewItemsToView(container, 4);
    rows = container.querySelectorAll('table tbody tr');
    expect(rows).toHaveLength(4);
  });

  test('Table summary when default to all is set', async () => {
    const container = await sortTableFactory({
      showPagination: true,
      defaultToAll: true,
    });
    const expectedSummary = `${data.length} entries.`;
    expect(
      container.querySelector('[data-pagination-summary]').textContent
    ).toEqual(expectedSummary);
  });

  test('Table summary when selected items per page is larger than number of rows', async () => {
    expect(data.length).toBeLessThan(50);
    const container = await sortTableFactory(
      { showPagination: true },
      { viewSet: 50 }
    );
    const expectedSummary = `${data.length} entries.`;
    expect(
      container.querySelector('[data-pagination-summary]').textContent
    ).toEqual(expectedSummary);
  });

  test('Table summary when selected items per page is selected', async () => {
    let container = await sortTableFactory(
      { showPagination: true },
      { viewSet: 2 }
    );
    let expectedSummary = `1 - 2 of ${data.length} entries.`;

    expect(
      container.querySelector('[data-pagination-summary]').textContent
    ).toEqual(expectedSummary);

    container = changeViewItemsToView(container, 4);

    expectedSummary = `1 - 4 of ${data.length} entries.`;

    expect(
      container.querySelector('[data-pagination-summary]').textContent
    ).toEqual(expectedSummary);
  });

  test('Changing rows shown does not change aria row count', async () => {
    let container = await sortTableFactory({ showPagination: true });
    expect(
      container.querySelector('table').getAttribute('aria-rowcount')
    ).toEqual(`${data.length + 1}`);

    container = changeViewItemsToView(container, 4);
    expect(
      container.querySelector('table').getAttribute('aria-rowcount')
    ).toEqual(`${data.length + 1}`);
  });

  describe('Page links/buttons', () => {
    test('Pages/link are shown if under 10 pages is present', async () => {
      const container = await sortTableFactory(
        { showPagination: true },
        { viewSet: 2 }
      );
      expect(
        container.querySelector('[data-pagination-select]')
      ).not.toBeInTheDocument();
      expect(
        container.querySelector('[data-pagination-button]')
      ).toBeInTheDocument();
    });

    test('Correct number of pages are shown', async () => {
      const numberOfPages = Math.ceil(data.length / 4);
      expect(numberOfPages).toBeGreaterThan(1);
      const container = await sortTableFactory(
        { showPagination: true },
        { viewSet: 4 }
      );
      expect(
        container.querySelectorAll('[data-pagination-button]')
      ).toHaveLength(numberOfPages);
      // ensure previous and next buttons are available
      expect(
        container.querySelector('[data-pagination-previous-button]')
      ).toBeInTheDocument();
      expect(
        container.querySelector('[data-pagination-next-button]')
      ).toBeInTheDocument();
    });

    test('Number of pages changes when changing show results changes', async () => {
      let container = await sortTableFactory(
        { showPagination: true },
        { viewSet: 4 }
      );
      const numberOfPages = container.querySelectorAll(
        '[data-pagination-button]'
      ).length;
      container = changeViewItemsToView(container, 2);
      expect(
        container.querySelectorAll('[data-pagination-button]')
      ).not.toHaveLength(numberOfPages);
    });

    test('Clicking on a page changes the items shown', async () => {
      let container = await sortTableFactory(
        { showPagination: true },
        { viewSet: 2 }
      );
      const testColumnIndex = 1;
      const initialValues = columnText(container, testColumnIndex);
      container = clickPaginationButton(container, 1);
      expect(columnText(container, testColumnIndex)).not.toEqual(initialValues);
    });

    test('Clicking on a page changes table summary', async () => {
      let container = await sortTableFactory(
        { showPagination: true },
        { viewSet: 2 }
      );
      let expectedSummary = `1 - 2 of ${data.length} entries.`;
      expect(
        container.querySelector('[data-pagination-summary]').textContent
      ).toEqual(expectedSummary);
      container = clickPaginationButton(container, 1);
      expectedSummary = `3 - 4 of ${data.length} entries.`;
      expect(
        container.querySelector('[data-pagination-summary]').textContent
      ).toEqual(expectedSummary);
    });

    test('Correct table summary is shown when last page does not have full number of entries', async () => {
      // ensure that the last page will not have 4 entries
      const itemsOnLastPage = data.length % 4;
      expect(itemsOnLastPage).not.toEqual(0);
      const lastPage = Math.ceil(data.length / 4);
      const container = await sortTableFactory(
        { showPagination: true },
        { viewSet: 4, pageIndex: lastPage - 1 }
      );

      const expectedSummary = `9 - ${data.length} of ${data.length} entries.`;
      expect(
        container.querySelector('[data-pagination-summary]').textContent
      ).toEqual(expectedSummary);
    });
  });

  describe('Previous and next buttons', () => {
    test('Previous button goes to previous page', async () => {
      const container = await sortTableFactory(
        { showPagination: true },
        { viewSet: 2, pageIndex: 3 }
      );
      expect(
        container
          .querySelectorAll('[data-pagination-button]')
          .item(3)
          .querySelector('button[aria-current]')
      ).toBeInTheDocument();

      fireEvent.click(
        container.querySelector('[data-pagination-previous-button] button')
      );
      expect(
        container
          .querySelectorAll('[data-pagination-button]')
          .item(2)
          .querySelector('button[aria-current]')
      ).toBeInTheDocument();
    });

    test('Previous button is disabled on first page', async () => {
      const container = await sortTableFactory(
        { showPagination: true },
        { viewSet: 2, pageIndex: 0 }
      );
      expect(
        container.querySelector(
          '[data-pagination-previous-button] button[disabled]'
        )
      ).toBeInTheDocument();
    });

    test('Next button goes to next page', async () => {
      const container = await sortTableFactory(
        { showPagination: true },
        { viewSet: 2, pageIndex: 0 }
      );
      expect(
        container
          .querySelectorAll('[data-pagination-button]')
          .item(0)
          .querySelector('button[aria-current]')
      ).toBeInTheDocument();

      fireEvent.click(
        container.querySelector('[data-pagination-next-button] button')
      );

      expect(
        container
          .querySelectorAll('[data-pagination-button]')
          .item(1)
          .querySelector('button[aria-current]')
      ).toBeInTheDocument();
    });

    test('Next button is disabled on last page', async () => {
      const numberOfPages = Math.ceil(data.length / 4);
      const container = await sortTableFactory(
        { showPagination: true },
        { viewSet: 4, pageIndex: numberOfPages - 1 }
      );

      const buttons = container.querySelectorAll('[data-pagination-button]');

      expect(
        buttons.item(buttons.length - 1).querySelector('button[aria-current]')
      ).toBeInTheDocument();

      expect(
        container.querySelector(
          '[data-pagination-next-button] button[disabled]'
        )
      ).toBeInTheDocument();
    });
  });

  describe('Pagination drop down', () => {
    test('Drop down of pages is shown if there are 10 or more pages', async () => {
      const container = await sortTableFactory(
        { showPagination: true },
        { viewSet: 1 }
      );
      expect(data.length).toBeGreaterThan(10);
      expect(
        container.querySelector('[data-pagination-select]')
      ).toBeInTheDocument();
    });

    test('Correct number  of options are shown', async () => {
      const container = await sortTableFactory(
        { showPagination: true },
        { viewSet: 1 }
      );
      expect(
        container.querySelectorAll('[data-pagination-select] option')
      ).toHaveLength(data.length);
    });

    test.todo('Number of pages changes when changing show results changes');

    test('Selecting on a page changes the items shown', async () => {
      let container = await sortTableFactory(
        { showPagination: true },
        { viewSet: 1 }
      );
      const initalValues = columnText(container, 1);

      container = clickPaginationButton(container, 2);

      expect(
        container.querySelectorAll('[data-pagination-select]')
      ).toHaveLength(1);
      const newValues = columnText(container, 1);
      expect(initalValues).not.toEqual(newValues);
    });

    test('Selecting a page changes table summary', async () => {
      let container = await sortTableFactory(
        { showPagination: true },
        { viewSet: 1 }
      );
      expect(
        container.querySelector('[data-pagination-summary]').textContent
      ).toEqual(`1 - 1 of ${data.length} entries.`);

      container = clickPaginationButton(container, 2);
      expect(
        container.querySelector('[data-pagination-summary]').textContent
      ).toEqual(`2 - 2 of ${data.length} entries.`);
    });
  });

  describe('Pagination and filtering', () => {
    test('Number of pages chanages when filtering', async () => {
      let container = await sortTableFactory(
        { showPagination: true, showFilter: true },
        { viewSet: 2, filter: '' }
      );

      const initialNumberOfPages = container.querySelectorAll(
        '[data-pagination-button]'
      ).length;

      container = changeFilter(container, 'cheese');

      expect(
        container.querySelectorAll('[data-pagination-button]')
      ).not.toHaveLength(initialNumberOfPages);
    });

    test.todo('Aria rowindex does not change on each row');

    test('Table summary updates when filtering', async () => {
      let container = await sortTableFactory(
        { showPagination: true, showFilter: true },
        { viewSet: 2, filter: '' }
      );

      expect(
        container.querySelector('[data-pagination-summary]').textContent
      ).toEqual(`1 - 2 of ${data.length} entries.`);

      container = changeFilter(container, 'cheese');

      expect(
        container.querySelector('[data-pagination-summary]').textContent
      ).toEqual(`1 - 2 of 3 entries (filtered from ${data.length}).`);
    });
  });
});
