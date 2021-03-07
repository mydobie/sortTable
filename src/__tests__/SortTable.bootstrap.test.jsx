/* eslint-disable react/react-in-jsx-scope */
import { shallow } from 'enzyme';
import { axe } from 'jest-axe';
import SortTable from '../Components/SortTable';

const data = [
  { id: 1, name: 'Cheese', price: '$4.90', stock: 20 },
  { id: 2, name: 'Milk', price: '$1.90', stock: 4 },
  { id: 3, name: 'Yoghurt', price: '$2.40', stock: 12 },
  { id: 4, name: 'Heavy Cream', price: '$3.90', stock: 9 },
  { id: 5, name: 'Butter', price: '$0.90', stock: 99 },
  { id: 6, name: 'Sour Cream', price: '$2.90', stock: 86 },
  {
    id: 7,
    name: 'Fancy French Cheese',
    price: '$99.0',
    stock: 15,
    url: <a href='https://google.com'>hello google</a>,
  },
];
const headers = [
  { name: 'Product Name', key: 'name', type: 'alpha' },
  { name: 'Price', key: 'price' },
  {
    name: 'Stock',
    key: 'stock',
    noFilter: true,
  },
  { name: 'Link', key: 'url', noSort: true, noFilter: true },
];
const viewSteps = [2, 4, 10];
describe('Sort Table tests', () => {
  let wrapper = '';
  let wrapperPaginated = '';
  beforeEach((done) => {
    wrapper = shallow(
      <SortTable
        tableData={data}
        headers={headers}
        initialSort='name'
        showFilter
        ui='bootstrap'
      />
    );
    wrapper.update();
    wrapperPaginated = shallow(
      <SortTable
        tableData={data}
        headers={headers}
        showFilter
        showPagination
        viewSteps={viewSteps}
        ui='bootstrap'
      />
    );
    wrapperPaginated.update();
    wrapperPaginated
      .find('Filter')
      .simulate('change', { target: { value: '' } }); // this should result in 4 total
    wrapperPaginated.update();

    done();
  });

  test('Expected number of rows in table', () => {
    // header row columns
    expect(wrapper).toMatchSnapshot();
    expect(
      wrapper.find('Head').first().find('Row').first().find('Cell')
    ).toHaveLength(headers.length);

    // data rows
    expect(wrapper.find('Body').first().find('Row')).toHaveLength(data.length);

    // Data row columns
    expect(
      wrapper.find('Body').first().find('Row').first().find('Cell')
    ).toHaveLength(headers.length);
  });

  test('Set dangerouslySetInnerHTML allows for rendered html', () => {
    const dataHtml = [
      { id: 1, name: '<strong>Cheese</strong>', price: '$4.90', stock: 20 },
    ];
    const wrapperHTML = shallow(
      <SortTable
        tableData={dataHtml}
        headers={headers}
        dangerouslySetInnerHTML
        ui='bootstrap'
      />
    );
    const firstCell = wrapperHTML.find('Body Row Cell').first().html();
    expect(firstCell).toMatch(/<span><strong>Cheese<\/strong><\/span>/);

    const wrapperNoHTML = shallow(
      <SortTable tableData={dataHtml} headers={headers} ui='bootstrap' />
    );
    const firstNoHtmlCell = wrapperNoHTML.find('Body Row Cell').first().html();
    expect(firstNoHtmlCell).toMatch(/&lt;strong&gt;Cheese&lt;\/strong&gt;/);
  });

  describe('Accessibility checks', () => {
    test('Is accessible with filter and one column sorted', async () => {
      const results = await axe(`<main>${wrapper.html()}</main>`); // NOTE main is required to prevent landmark error
      expect(results).toHaveNoViolations();
    });
    test('Is accessible with pagination', async () => {
      const results = await axe(`<main>${wrapperPaginated.html()}</main>`); // NOTE main is required to prevent landmark error
      expect(results).toHaveNoViolations();
    });
  });

  describe('Sorting', () => {
    test('Column marked as pre-sort is sorted', () => {
      const expectedNames = [
        'Butter',
        'Cheese',
        'Fancy French Cheese',
        'Heavy Cream',
        'Milk',
        'Sour Cream',
        'Yoghurt',
      ];
      const find = [];
      const rows = wrapper.find('Body').first().find('Row');
      rows.forEach((row) => {
        find.push(row.find('Cell').first().children().text());
      });
      expect(find).toEqual(expectedNames);
    });
    test('Columns marked as not sortable do not have a search button', () => {
      const headerRow = wrapper.find('Head').first().find('Row').first();

      // expect first entry not be set as not sortable
      expect(headers[0].noSort).toBeFalsy(); // Ensure test data is as expected
      expect(headerRow.find('Cell').first().find('button')).toHaveLength(1);

      // expect no sort column not to have a button
      expect(headers[3].noSort).toBe(true); // Ensure test data is as expected
      expect(headerRow.at(3).find('Cell').first().find('button')).toHaveLength(
        0
      );
    });

    test('Columns that are sortable (but not sorted) have search icon', () => {
      const headerRow = wrapper.find('Head').first().find('Row').first();

      // first column is sorted on page load
      expect(
        headerRow.find('Cell').first().find('button').find('SortIcons').props()
          .type
      ).toBe('alpha');

      // second column is sortable but not sorted
      expect(
        headerRow.find('Cell').at(1).find('button').find('SortIcons').props()
          .type
      ).toBe('sortable');

      // Click on second column and ensure that the icons change
      wrapper
        .find('Head')
        .first()
        .find('Row')
        .first()
        .find('Cell')
        .at(1)
        .find('button')
        .simulate('click');
      wrapper.update();

      const changedHeaderRow = wrapper.find('Head').first().find('Row').first();

      expect(
        changedHeaderRow
          .find('Cell')
          .first()
          .find('button')
          .find('SortIcons')
          .props().type
      ).toBe('sortable');

      // second column is sortable but not sorted
      expect(
        changedHeaderRow
          .find('Cell')
          .at(1)
          .find('button')
          .find('SortIcons')
          .props().type
      ).toBe('size');
    });

    test('Clicking on an unsorted string column, sorts the column', () => {
      // click on 'stock' column

      const expected = ['4', '9', '12', '15', '20', '86', '99'];
      let find = [];
      // ensure that it is not currently sorted
      let rows = wrapper.find('Body').first().find('Row');
      rows.forEach((row) => {
        find.push(row.find('Cell').at(2).text());
      });
      expect(find).not.toEqual(expected);

      // click on button
      wrapper
        .find('Head')
        .first()
        .find('Cell')
        .at(2)
        .find('button')
        .first()
        .simulate('click');
      wrapper.update();
      find = [];
      rows = wrapper.find('Body').first().find('Row');
      rows.forEach((row) => {
        find.push(row.find('Cell').at(2).children().text());
      });
      expect(find).toEqual(expected);
    });

    test('Clicking on a sorted string column, flips the sort', () => {
      // click on "name button"
      const expectedNames = [
        'Butter',
        'Cheese',
        'Fancy French Cheese',
        'Heavy Cream',
        'Milk',
        'Sour Cream',
        'Yoghurt',
      ];
      let find = [];
      let rows = wrapper.find('Body').first().find('Row');
      rows.forEach((row) => {
        find.push(row.find('Cell').first().children().text());
      });
      expect(find).toEqual(expectedNames); // ensure it is currently sorted

      // reverse expected
      expectedNames.reverse();
      expect(expectedNames[0]).toEqual('Yoghurt'); // Check reverse worked

      wrapper
        .find('Head')
        .first()
        .find('Cell')
        .at(0)
        .find('button')
        .first()
        .simulate('click');
      wrapper.update();

      find = [];
      rows = wrapper.find('Body').first().find('Row');
      rows.forEach((row) => {
        find.push(row.find('Cell').first().children().text());
      });

      expect(find).toEqual(expectedNames);
    });
  });

  describe('Filtering', () => {
    test('Setting showFilter to false hides the filter input', () => {
      wrapper = shallow(
        <SortTable
          tableData={data}
          headers={headers}
          showFilter={false}
          ui='bootstrap'
        />
      );
      wrapper.update();
      expect(wrapper.find('#tableFilter')).toHaveLength(0);
    });

    test('Entering a value in to the filter, filters columns', () => {
      // Note ... this test assumes that the filter is on by default
      // Note ... this test assumes that filtering is case insensitive by default
      expect(wrapper.find('Filter')).toHaveLength(1);

      // check that all row are showing and sorted
      const expectedNames = [
        'Butter',
        'Cheese',
        'Fancy French Cheese',
        'Heavy Cream',
        'Milk',
        'Sour Cream',
        'Yoghurt',
      ];
      let find = [];
      let rows = wrapper.find('Body').first().find('Row');
      rows.forEach((row) => {
        find.push(row.find('Cell').first().children().text());
      });
      expect(find).toEqual(expectedNames);

      wrapper.find('Filter').simulate('change', { target: { value: 'm' } });

      wrapper.update();

      // Now after typing, verify filtering
      const expectedNamesSorted = ['Heavy Cream', 'Milk', 'Sour Cream'];
      find = [];
      rows = wrapper.find('Body').first().find('Row');
      rows.forEach((row) => {
        find.push(row.find('Cell').first().children().text());
      });
      expect(find).toEqual(expectedNamesSorted);
    });

    test('Matches in a column marked as noFilter are not displayed', () => {
      expect(headers[2].noFilter).toEqual(true);

      wrapper.find('Filter').simulate('change', { target: { value: '' } });
      wrapper.update();
      // verify all rows are showing
      const expectedStock = ['99', '20', '15', '9', '4', '86', '12'];
      let find = [];
      let rows = wrapper.find('Body').first().find('Row');
      rows.forEach((row) => {
        find.push(row.find('Cell').at(2).children().text());
      });
      expect(find).toEqual(expectedStock);

      wrapper.find('Filter').simulate('change', { target: { value: '4' } });
      wrapper.update();

      // verify '4' is not in the expected results
      const expectedStockFiltered = ['20', '12'];
      find = [];
      rows = wrapper.find('Body').first().find('Row');
      rows.forEach((row) => {
        find.push(row.find('Cell').at(2).children().text());
      });

      expect(find).toEqual(expectedStockFiltered);
    });
    test('Matches are case sensitive when caseSensitiveFilter is set to true', () => {
      wrapper = shallow(
        <SortTable
          tableData={data}
          headers={headers}
          initialSort='name'
          caseSensitiveFilter
          ui='bootstrap'
        />
      );
      wrapper.find('Filter').simulate('change', { target: { value: '' } });
      wrapper.update();

      const expectedNames = [
        'Butter',
        'Cheese',
        'Fancy French Cheese',
        'Heavy Cream',
        'Milk',
        'Sour Cream',
        'Yoghurt',
      ];
      let find = [];
      let rows = wrapper.find('Body').first().find('Row');
      rows.forEach((row) => {
        find.push(row.find('Cell').first().children().text());
      });
      expect(find).toEqual(expectedNames);

      wrapper.find('Filter').simulate('change', { target: { value: 'M' } });
      wrapper.update();

      const expectedNamesFiltered = ['Milk'];
      find = [];
      rows = wrapper.find('Body').first().find('Row');
      rows.forEach((row) => {
        find.push(row.find('Cell').at(0).children().text());
      });

      expect(find).toEqual(expectedNamesFiltered);
    });
  });

  describe('No data messages', () => {
    test('No data message is displayed when data is not passed into the component', () => {
      wrapper = shallow(
        <SortTable
          tableData={[]}
          headers={headers}
          initialSort='name'
          ui='bootstrap'
        />
      );
      wrapper.update();
      expect(wrapper.find('#noDataToTableMessage')).toHaveLength(1);
      expect(wrapper.find('Table')).toHaveLength(0);
    });
    test('No data message is not displayed when data is  passed into the component', () => {
      wrapper = shallow(
        <SortTable
          tableData={data}
          headers={headers}
          initialSort='name'
          ui='bootstrap'
        />
      );
      wrapper.update();
      expect(wrapper.find('#noDataToTableMessage')).toHaveLength(0);
      expect(wrapper.find('CustContainer')).toHaveLength(1);
    });
    test('No matches message is displayed when there are not any matches to a filter', () => {
      wrapper.find('Filter').simulate('change', { target: { value: 'zzzzz' } });
      wrapper.update();
      expect(wrapper.find('#dataAllFilteredOut')).toHaveLength(1);
    });
    test('No matches message is not displayed when there are matches to a filter', () => {
      wrapper.find('Filter').simulate('change', { target: { value: '' } });
      wrapper.update();
      expect(wrapper.find('#dataAllFilteredOut')).toHaveLength(0);
    });
  });

  describe('Pagination', () => {
    test('Pagination is not show by default', () => {
      expect(wrapper.find('.sortTableShowResultsSelect')).toHaveLength(0);
      expect(wrapper.find('.sortTablePagination')).toHaveLength(0);
    });

    test('Pagination is shown when turned on', () => {
      expect(wrapperPaginated.find('.sortTableShowResultsSelect')).toHaveLength(
        1
      );
      expect(wrapperPaginated.find('.sortTablePagination')).toHaveLength(1);
    });

    test('Show results drop down has correct options', () => {
      const options = wrapperPaginated
        .find('.sortTableShowResultsSelect')
        .find('Select')
        .children();
      expect(options).toHaveLength(viewSteps.length + 1);
      expect(options.first().prop('value')).toBe(viewSteps[0]);
      expect(options.at(1).prop('value')).toBe(viewSteps[1]);
      expect(options.at(2).prop('value')).toBe(viewSteps[2]);
      expect(options.last().prop('value')).toBe('');
      expect(options.last().text()).toBe('All');
    });

    test.todo('All rows are shown if defaultToAll is set');

    test('Changing show results changes number of rows shown', () => {
      let select = wrapperPaginated
        .find('.sortTableShowResultsSelect')
        .find('Select');
      // check select is defaulting to first value
      expect(select.props().value).toEqual(viewSteps[0]);
      expect(wrapperPaginated.find('Body').first().find('Row')).toHaveLength(
        viewSteps[0]
      );

      // change select to next value
      wrapperPaginated
        .find('.sortTableShowResultsSelect')
        .find('Select')
        .simulate('change', { target: { value: viewSteps[1] } });
      wrapperPaginated.update();

      select = wrapperPaginated
        .find('.sortTableShowResultsSelect')
        .find('Select');
      expect(select.props().value).toEqual(viewSteps[1]);
      expect(wrapperPaginated.find('Body').first().find('Row')).toHaveLength(
        viewSteps[1]
      );

      // change to "all" rows
      wrapperPaginated
        .find('.sortTableShowResultsSelect')
        .find('Select')
        .simulate('change', { target: { value: '' } });
      wrapperPaginated.update();

      select = wrapperPaginated
        .find('.sortTableShowResultsSelect')
        .find('Select');
      expect(select.props().value).toEqual('');
      expect(wrapperPaginated.find('Body').first().find('Row')).toHaveLength(
        data.length
      );
    });

    test('Correct number of pages shown', () => {
      const maxPerPage = wrapperPaginated
        .find('.sortTableShowResultsSelect')
        .find('Select')
        .props().value;
      const pagesNum = Math.ceil(data.length / maxPerPage);

      expect(
        wrapperPaginated.find('CustomPagination').find('PaginationButton')
      ).toHaveLength(pagesNum);
    });

    test('Number of pages changes when changing show results changes', () => {
      const maxPerPage = wrapperPaginated
        .find('.sortTableShowResultsSelect')
        .find('Select')
        .props().value;
      let pagesNum = Math.ceil(data.length / maxPerPage);
      expect(wrapperPaginated.find('PaginationButton')).toHaveLength(pagesNum);
      expect(maxPerPage).not.toEqual(4); // this ensures we have a good test
      wrapperPaginated
        .find('.sortTableShowResultsSelect')
        .find('Select')
        .simulate('change', { target: { value: 4 } });
      wrapperPaginated.update();
      pagesNum = Math.ceil(data.length / 4);
      expect(wrapperPaginated.find('PaginationButton')).toHaveLength(pagesNum);
    });

    test('Number of pages changes when filtering', () => {
      const maxPerPage = wrapperPaginated
        .find('.sortTableShowResultsSelect')
        .find('Select')
        .props().value;

      const pagesNum = Math.ceil(data.length / maxPerPage);
      expect(wrapperPaginated.find('PaginationButton')).toHaveLength(pagesNum);

      wrapperPaginated
        .find('Filter')
        .simulate('change', { target: { value: 'm' } }); // this should result in 4 total
      wrapper.update();
      const newPageNum = Math.ceil(4 / maxPerPage);

      expect(newPageNum).not.toEqual(pagesNum); // this is to ensure a good test
      expect(wrapperPaginated.find('PaginationButton')).toHaveLength(
        newPageNum
      );
    });

    test('Clicking on a page changes items shown', () => {
      const maxPerPage = wrapperPaginated
        .find('.sortTableShowResultsSelect')
        .find('Select')
        .props().value;
      const initialRows = wrapperPaginated.find('Body').first().find('Row');
      expect(initialRows.length).toEqual(maxPerPage);
      const firstItem = initialRows
        .first()
        .find('Cell')
        .first()
        .children()
        .text();
      expect(firstItem).toEqual(data[0].name);

      wrapperPaginated
        .find('CustomPagination')
        .find('PaginationButton')
        .at(1)
        .simulate('click', { target: { value: '2' } });
      wrapperPaginated.update();

      const newRows = wrapperPaginated.find('Body').first().find('Row');
      const secondItem = newRows.first().find('Cell').first().children().text();
      expect(firstItem).not.toEqual(secondItem);

      expect(newRows.length).toEqual(maxPerPage);
      expect(secondItem).toEqual(data[maxPerPage].name);
    });

    test.skip('Selecting previous goes to previous page and changes items shown', () => {
      wrapperPaginated.find({ next: true }).first().simulate('click');

      const previousButton = wrapperPaginated.find({ previous: true });
      expect(previousButton).toHaveLength(1); // Previous button exists

      // Verify  not on first page;
      expect(
        wrapperPaginated.find('.sortTablePaginationItem').at(1).props().active
      ).toEqual(true);

      const firstItem = wrapperPaginated
        .find('tbody')
        .first()
        .find('tr')
        .first()
        .find('td')
        .first()
        .text();
      expect(firstItem).not.toEqual(data[0].name);

      previousButton.first().simulate('click');
      wrapperPaginated.update();

      expect(
        wrapperPaginated.find('.sortTablePaginationItem').at(0).props().active
      ).toEqual(true);

      const secondItem = wrapperPaginated
        .find('tbody')
        .first()
        .find('tr')
        .first()
        .find('td')
        .first()
        .text();
      expect(secondItem).toEqual(data[0].name);
    });

    test.skip('Previous button is disabled when on the first page', () => {
      expect(
        wrapperPaginated.find('.sortTablePaginationItem').first().props().active
      ).toBe(true);
      expect(
        wrapperPaginated.find({ previous: true }).first().props().disabled
      ).toBe(true);
    });

    test.skip('Selecting next goes to next page and changes items shown', () => {
      const nextButtons = wrapperPaginated.find({ next: true });
      expect(nextButtons).toHaveLength(1); // Next button exists

      const initialRows = wrapperPaginated.find('tbody').first().find('tr');
      expect(initialRows).toHaveLength(2);
      const initialRow = initialRows.first().find('td').first().text();
      expect(initialRow).toEqual(data[0].name);
      expect(
        wrapperPaginated.find('.sortTablePaginationItem').first().props().active
      ).toEqual(true); // verify first pagination button is selected

      nextButtons.first().simulate('click');
      wrapperPaginated.update();

      const nextRows = wrapperPaginated.find('tbody').first().find('tr');

      const nextRow = nextRows.first().find('td').first().text();
      expect(nextRow).toEqual(data[2].name);
      expect(nextRow).not.toEqual(initialRow);
      expect(
        wrapperPaginated.find('.sortTablePaginationItem').at(1).props().active
      ).toEqual(true); // verify first pagination button is selected
    });

    test.skip('Next button is disabled when on the last page', () => {
      expect(wrapperPaginated.find({ next: true }).props().disabled).toEqual(
        false
      );
      const pageButtons = wrapperPaginated.find('.sortTablePaginationButton');
      pageButtons.last().simulate('click', { target: { value: 6 } });
      expect(wrapperPaginated.find({ next: true }).props().disabled).toEqual(
        true
      );
    });
  });
});
