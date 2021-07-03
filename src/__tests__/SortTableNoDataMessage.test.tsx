/* eslint-disable react/react-in-jsx-scope */

import { sortTableFactory } from './helpers/helpers';

describe('Sort Table No Data Messages', () => {
  test('The no data message is not showing if data is passed', async () => {
    const container = await sortTableFactory();
    expect(
      container.querySelector('[data-sort-no-data-message]')
    ).not.toBeInTheDocument();
    expect(container.querySelector('table')).toBeInTheDocument();
  });

  test('Default no data message', async () => {
    const container = await sortTableFactory({ tableData: [] });
    expect(
      container.querySelector('[data-sort-no-data-message]')
    ).toBeInTheDocument();
    expect(container.querySelector('table')).not.toBeInTheDocument();
  });

  test('Custom no data message - string', async () => {
    const customMessage = 'I am a custom no data message';
    const container = await sortTableFactory({
      tableData: [],
      noDataMessage: customMessage,
    });
    expect(
      container.querySelector('[data-sort-no-data-message]')
    ).not.toBeInTheDocument();
    expect(container.querySelector('table')).not.toBeInTheDocument();
    expect(container.innerHTML).toContain(customMessage);
  });

  test('Custom no data message - component', async () => {
    const customMessage = (
      <div id='myCustomNoDataMessage'>My custom message</div>
    );
    const container = await sortTableFactory({
      tableData: [],
      noDataMessage: customMessage,
    });
    expect(
      container.querySelector('[data-sort-no-data-message]')
    ).not.toBeInTheDocument();
    expect(container.querySelector('table')).not.toBeInTheDocument();
    expect(
      container.querySelector('#myCustomNoDataMessage')
    ).toBeInTheDocument();
  });

  test('Default message not shown by default', async () => {
    const container = await sortTableFactory({ showFilter: true });
    expect(
      container.querySelector('[data-sort-all-data-filtered]')
    ).not.toBeInTheDocument();
  });

  test('Default all filtered data message', async () => {
    const container = await sortTableFactory(
      { showFilter: true },
      { filter: 'noRowsReturned' }
    );
    expect(
      container.querySelector('[data-sort-all-data-filtered]')
    ).toBeInTheDocument();
  });

  test('Custom message not shown by default', async () => {
    const customMessage = 'My custom all filtered message';
    const container = await sortTableFactory({
      showFilter: true,
      allDataFilteredMessage: customMessage,
    });
    expect(container.innerHTML.includes(customMessage)).toBeFalsy();
  });

  test('Custom all filtered message - string', async () => {
    const customMessage = 'My custom all filtered message';
    const container = await sortTableFactory(
      {
        showFilter: true,
        allDataFilteredMessage: customMessage,
      },
      { filter: 'NoResultsReturned' }
    );
    expect(container.innerHTML).toContain(customMessage);
  });

  test('Custom all filtered message - component', async () => {
    const customMessage = (
      <div id='myCustomNoDataMessage'>My custom all filtered message</div>
    );
    const container = await sortTableFactory(
      {
        showFilter: true,
        allDataFilteredMessage: customMessage,
      },
      { filter: 'NoResultsReturned' }
    );
    expect(
      container.querySelector('#myCustomNoDataMessage')
    ).toBeInTheDocument();
  });
});
