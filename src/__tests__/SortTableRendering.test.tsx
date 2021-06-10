/* eslint-disable react/react-in-jsx-scope */
import { mount } from 'enzyme';
// import { axe } from 'jest-axe';
import SortTable from '../Components/SortTable';
import {
  filterAndPaginationTable,
  data,
  headers,
  simpleTable,
} from './helpers/helpers';

describe('Sort Table Rendering', () => {
  test('Snapshot test', () => {
    expect(filterAndPaginationTable()).toMatchSnapshot();
  });

  test('Expected number of columns and cells', () => {
    const wrapper = simpleTable();
    expect(wrapper.find('tbody tr')).toHaveLength(data.length);
    expect(wrapper.find('thead tr').children()).toHaveLength(headers.length);
  });

  test('Header cells are marked with th tag', () => {
    expect(simpleTable().find('thead th')).toHaveLength(headers.length);
  });

  test('Row headers are marked with th tags', () => {
    // Test set-up - ensure that there is only one row header
    const firstRow = simpleTable().find('tbody tr').first();

    expect(firstRow.find('th')).toHaveLength(1);
    expect(firstRow.find('td')).toHaveLength(headers.length - 1);

    // Test Start
    const rowHeaderIndex = headers.findIndex((row) => row.rowheader);
    expect(firstRow.children().at(rowHeaderIndex).type()).toEqual('th');
  });

  test.todo('Components are rendered in a data cell');

  test.todo('DangerouslySetInnerHTML allows for rendered html');

  test('Filtering text box is not shown by default', () => {
    expect(simpleTable().find('[data-filter]')).toHaveLength(0);
  });

  test('Pagination is not shown by default', () => {
    expect(simpleTable().find('[data-pagination]')).toHaveLength(0);
    expect(simpleTable().find('[data-sort-number-of-inputs]')).toHaveLength(0);
  });

  test('Table caption is shown when value is passed', () => {
    const myCaption = 'my caption';
    const wrapper = mount(
      <SortTable tableData={data} headers={headers} caption={myCaption} />
    );
    expect(wrapper.find('caption')).toHaveLength(1);
    expect(wrapper.find('caption').text()).toEqual(myCaption);
  });

  test('Empty caption tags are not shown', () => {
    expect(simpleTable().find('caption')).toHaveLength(0);
  });

  test('Is Loading default message is shown', () => {
    // Test set-up - ensure loading isn't shown by default
    expect(simpleTable().find('Loading')).toHaveLength(0);

    // Test Start
    const wrapper = mount(
      <SortTable tableData={data} headers={headers} isLoading />
    );
    expect(wrapper.find('Loading')).toHaveLength(1);
  });

  test.todo('Is Loading custom message is shown');

  describe('Custom CSS', () => {
    test.todo('Table header class name is set when passed');

    test.todo('Responsive data attribute is set');

    test.todo('Custom table class name is set');

    test.todo('Custom class name is added to column header');

    test.todo('Custom style is added to column header');
  });

  describe('Accessibility', () => {
    test.todo('Is accessible with default settings');

    test.todo('Is accessible with filtering');

    test.todo('Is accessible with pagination buttons');

    test.todo('Is accessible with pagination drop down');
  });
});
