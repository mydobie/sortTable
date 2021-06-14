/* eslint-disable react/react-in-jsx-scope */

import { sortTable } from './helpers/helpers';

describe('Sort Table No Data Messages', () => {
  test('The no data message is not showing if data is passed', () => {
    const wrapper = sortTable();
    expect(wrapper.find('[data-sort-no-data-message]')).toHaveLength(0);
    expect(wrapper.find('table')).toHaveLength(1);
  });

  test('Default no data message', () => {
    const wrapper = sortTable({ tableData: [] });
    expect(wrapper.find('[data-sort-no-data-message]')).toHaveLength(1);
    expect(wrapper.find('table')).toHaveLength(0);
  });

  test('Custom no data message - string', () => {
    const customMessage = 'I am a custom no data message';
    const wrapper = sortTable({ tableData: [], noDataMessage: customMessage });

    expect(wrapper.text().includes(customMessage)).toBeTruthy();
  });

  test('Custom no data message - component', () => {
    const customMessage = (
      <div id='myCustomNoDataMessage'>My custom message</div>
    );
    const wrapper = sortTable({ tableData: [], noDataMessage: customMessage });

    expect(wrapper.find('#myCustomNoDataMessage')).toHaveLength(1);
  });

  test('Default all filtered data message', () => {
    const wrapper = sortTable(
      { showFilter: true },
      { filter: 'noRowsReturned' }
    );

    expect(wrapper.find('[data-sort-all-data-filtered]')).toHaveLength(1);
  });

  test('Custom all filtered message - string', () => {
    const customMessage = 'My custom all filtered message';
    let wrapper = sortTable({
      showFilter: true,
      allDataFilteredMessage: customMessage,
    });

    // verify message isn't shown before filtering:
    expect(wrapper.text().includes(customMessage)).toBeFalsy();

    // filter
    wrapper = sortTable(
      {
        showFilter: true,
        allDataFilteredMessage: customMessage,
      },
      { filter: 'NoResultsReturned' }
    );

    expect(wrapper.text().includes(customMessage)).toBeTruthy();
  });

  test('Custom all filtered message - component', () => {
    const customMessage = (
      <div id='myCustomNoDataMessage'>My custom all filtered message</div>
    );
    let wrapper = sortTable({
      showFilter: true,
      allDataFilteredMessage: customMessage,
    });

    // verify message isn't shown before filtering:
    expect(wrapper.find('#myCustomNoDataMessage')).toHaveLength(0);

    // filter
    wrapper = sortTable(
      {
        showFilter: true,
        allDataFilteredMessage: customMessage,
      },
      { filter: 'NoResultsReturned' }
    );

    expect(wrapper.find('#myCustomNoDataMessage')).toHaveLength(1);
  });
});
