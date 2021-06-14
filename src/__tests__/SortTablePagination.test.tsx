/* eslint-disable react/react-in-jsx-scope */
import { sortTable, viewSteps, data, columnText } from './helpers/helpers';

describe('Sort Table Pagination', () => {
  test('Show results drop down has correct options', () => {
    const wrapper = sortTable({ showPagination: true });
    const options = wrapper
      .find('[data-sort-number-of-inputs] select')
      .children();

    expect(options.length).toBeGreaterThan(1);
    viewSteps.forEach((step, index) => {
      expect(step).toEqual(options.at(index).prop('value'));
    });
  });

  test('All is shown as an option', () => {
    const wrapper = sortTable({ showPagination: true });
    const options = wrapper
      .find('[data-sort-number-of-inputs] select')
      .children();
    expect(options.last().text()).toBe('All');
  });

  test('All rows are shown if defaultToAll prop is set', () => {
    const wrapper = sortTable({ showPagination: true, defaultToAll: true });
    const value = wrapper
      .find('[data-sort-number-of-inputs] select')
      .prop('value');
    expect(value).toEqual('');

    const rows = wrapper.find('tbody tr');
    expect(rows).toHaveLength(data.length);
  });

  test('All rows are shown if "all" chosen', () => {
    let wrapper = sortTable({ showPagination: true });
    // test set up - ensure all is not shown and all rows are not showing
    const value = wrapper.find('[data-sort-number-of-inputs]').prop('value');
    expect(value).not.toEqual('');

    let rows = wrapper.find('tbody tr');
    expect(rows).not.toHaveLength(data.length);

    wrapper = sortTable({ showPagination: true }, { viewSet: '' });

    rows = wrapper.find('tbody tr');
    expect(rows).toHaveLength(data.length);
  });

  test('Changing show results changes number of rows shown', () => {
    let wrapper = sortTable({ showPagination: true }, { viewSet: 2 });
    expect(wrapper.find('tbody tr')).toHaveLength(2);

    wrapper = sortTable({ showPagination: true }, { viewSet: 4 });
    expect(wrapper.find('tbody tr')).toHaveLength(4);
  });

  test('Changing show results changes table summary', () => {
    let wrapper = sortTable({ showPagination: true, defaultToAll: true });
    expect(wrapper.find('[data-pagination-summary]').text()).toEqual(
      `Showing ${data.length} entries`
    );

    wrapper = sortTable(
      { showPagination: true, defaultToAll: true },
      { viewSet: 50 }
    );
    expect(wrapper.find('[data-pagination-summary]').text()).toEqual(
      `Showing ${data.length} entries`
    );

    wrapper = sortTable(
      { showPagination: true, defaultToAll: true },
      { viewSet: 2 }
    );
    expect(wrapper.find('[data-pagination-summary]').text()).toEqual(
      `Showing 1 to 2 of ${data.length} entries`
    );

    wrapper = sortTable(
      { showPagination: true, defaultToAll: true },
      { viewSet: 4 }
    );
    expect(wrapper.find('[data-pagination-summary]').text()).toEqual(
      `Showing 1 to 4 of ${data.length} entries`
    );
  });

  test('Changing rows shown does not change aria row count', () => {
    let wrapper = sortTable({ showPagination: true });
    expect(wrapper.find('table').props()['aria-rowcount']).toEqual(data.length);

    wrapper = sortTable(
      { showPagination: true, defaultToAll: true },
      { viewSet: 4 }
    );
    expect(wrapper.find('table').props()['aria-rowcount']).toEqual(data.length);
  });

  describe('Page links/buttons', () => {
    test('Pages/link are shown if under 10 pages is present', () => {
      const wrapper = sortTable({ showPagination: true }, { viewSet: 4 });

      expect(wrapper.find('[data-pagination-select]')).toHaveLength(0);
      expect(wrapper.find('[data-pagination-button]')).not.toHaveLength(0);
    });

    test('Correct number of pages are shown', () => {
      const wrapper = sortTable({ showPagination: true }, { viewSet: 4 });
      const numberOfPages = Math.ceil(data.length / 4);
      expect(numberOfPages).toBeGreaterThan(1);
      expect(wrapper.find('[data-pagination-button]')).toHaveLength(
        numberOfPages
      );
      // ensure previous and next buttons are available
      expect(wrapper.find('[data-pagination-previous-button]')).toHaveLength(1);
      expect(wrapper.find('[data-pagination-next-button]')).toHaveLength(1);
    });

    test('Number of pages changes when changing show results changes', () => {
      let wrapper = sortTable({ showPagination: true }, { viewSet: 4 });
      const numPages = wrapper.find('[data-pagination-button]').length;

      wrapper = sortTable({ showPagination: true }, { viewSet: 2 });
      expect(numPages).not.toEqual(
        wrapper.find('[data-pagination-button]').length
      );
    });

    test('Clicking on a page changes the items shown', () => {
      let wrapper = sortTable({ showPagination: true }, { viewSet: 2 });
      const initalValues = columnText(wrapper, 1);

      wrapper = sortTable(
        { showPagination: true },
        { viewSet: 2, pageIndex: 1 }
      );
      const newValues = columnText(wrapper, 1);
      expect(initalValues).not.toEqual(newValues);
    });

    test('Clicking on a page changes table summary', () => {
      let wrapper = sortTable({ showPagination: true }, { viewSet: 2 });
      expect(wrapper.find('[data-pagination-summary]').text()).toEqual(
        `Showing 1 to 2 of ${data.length} entries`
      );

      wrapper = sortTable(
        { showPagination: true },
        { viewSet: 2, pageIndex: 1 }
      );
      expect(wrapper.find('[data-pagination-summary]').text()).toEqual(
        `Showing 3 to 4 of ${data.length} entries`
      );
    });
  });

  describe('Previous and next buttons', () => {
    test('Previous button goes to previous page', () => {
      const wrapper = sortTable(
        { showPagination: true },
        { viewSet: 2, pageIndex: 1 }
      );

      expect(
        wrapper
          .find('[data-pagination-button]')
          .at(1)
          .find('button[aria-current]')
      ).toHaveLength(1);

      wrapper
        .find('[data-pagination-previous-button] button')
        .simulate('click')
        .update();

      expect(
        wrapper
          .find('[data-pagination-button]')
          .at(0)
          .find('button[aria-current]')
      ).toHaveLength(1);
    });

    test('Previous button is disabled on first page', () => {
      const wrapper = sortTable(
        { showPagination: true },
        { viewSet: 2, pageIndex: 0 }
      );

      expect(
        wrapper.find('[data-pagination-previous-button] button[disabled]')
      ).toHaveLength(1);
    });

    test('Next button goes to next page', () => {
      const wrapper = sortTable(
        { showPagination: true },
        { viewSet: 2, pageIndex: 0 }
      );
      expect(
        wrapper
          .find('[data-pagination-button]')
          .at(0)
          .find('button[aria-current]')
      ).toHaveLength(1);

      wrapper.find('[data-pagination-next-button] button').simulate('click');

      expect(
        wrapper
          .find('[data-pagination-button]')
          .at(1)
          .find('button[aria-current]')
      ).toHaveLength(1);
    });

    test('Next button is disabled on last page', () => {
      const numberOfPages = Math.ceil(data.length / 4);
      const wrapper = sortTable(
        { showPagination: true },
        { viewSet: 4, pageIndex: numberOfPages - 1 }
      );

      expect(
        // ensure that the last page is active
        wrapper
          .find('[data-pagination-button]')
          .last()
          .find('button[aria-current]')
      ).toHaveLength(1);

      expect(
        wrapper.find('[data-pagination-next-button] button[disabled]')
      ).toHaveLength(1);
    });
  });
  describe('Pagination drop down', () => {
    test('Drop down of pages is shown if there are 10 or more pages', () => {
      const wrapper = sortTable({ showPagination: true }, { viewSet: 1 });

      expect(data.length).toBeGreaterThan(10);
      expect(wrapper.find('[data-pagination-select]')).toHaveLength(1);
    });

    test('Correct number  of options are shown', () => {
      const wrapper = sortTable({ showPagination: true }, { viewSet: 1 });
      expect(wrapper.find('[data-pagination-select] option')).toHaveLength(
        data.length
      );
    });

    test.todo('Number of pages changes when changing show results changes');

    test('Selecting on a page changes the items shown', () => {
      let wrapper = sortTable({ showPagination: true }, { viewSet: 1 });
      const initalValues = columnText(wrapper, 1);

      wrapper = sortTable(
        { showPagination: true },
        { viewSet: 1, pageIndex: 1 }
      );
      expect(wrapper.find('[data-pagination-select]')).toHaveLength(1);
      const newValues = columnText(wrapper, 1);
      expect(initalValues).not.toEqual(newValues);
    });

    test('Selecting a page changes table summary', () => {
      let wrapper = sortTable({ showPagination: true }, { viewSet: 1 });
      expect(wrapper.find('[data-pagination-summary]').text()).toEqual(
        `Showing 1 to 1 of ${data.length} entries`
      );

      wrapper = sortTable(
        { showPagination: true },
        { viewSet: 1, pageIndex: 1 }
      );
      expect(wrapper.find('[data-pagination-summary]').text()).toEqual(
        `Showing 2 to 2 of ${data.length} entries`
      );
    });
  });

  describe('Pagination and filtering', () => {
    test('Number of pages chanages when filtering', () => {
      let wrapper = sortTable(
        { showPagination: true, showFilter: true },
        { viewSet: 2, filter: '' }
      );

      const initialNumberOfPages = wrapper.find(
        '[data-pagination-button]'
      ).length;

      wrapper = sortTable(
        { showPagination: true, showFilter: true },
        { viewSet: 2, filter: 'cheese' }
      );

      expect(wrapper.find('[data-pagination-button]')).not.toHaveLength(
        initialNumberOfPages
      );
    });

    test.todo('Aria rowindex does not change on each row');

    test('Table summary updates when filtering', () => {
      // Showing 1 to 2 of 7 entries
      // Showing 1 to 2 of 5 entries(filtered from 7 total entries)
      let wrapper = sortTable(
        { showPagination: true, showFilter: true },
        { viewSet: 2, filter: '' }
      );

      expect(wrapper.find('[data-pagination-summary]').text()).toEqual(
        `Showing 1 to 2 of ${data.length} entries`
      );

      wrapper = sortTable(
        { showPagination: true, showFilter: true },
        { viewSet: 2, filter: 'cheese' }
      );

      expect(wrapper.find('[data-pagination-summary]').text()).toEqual(
        `Showing 1 to 2 of 3 entries(filtered from ${data.length} total entries)`
      );
    });
  });
});
