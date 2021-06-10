/* eslint-disable react/react-in-jsx-scope */
// import { mount } from 'enzyme';
// import { axe } from 'jest-axe';
// import SortTable from '../Components/SortTable';

describe('Sort Table Pagination', () => {
  test.todo('Show results drop down has correct options');
  test.todo('All is shown as an option');
  test.todo('All rows are shown if defaultToAll prop is set');
  test.todo('All rows are shown if "all" chosen');
  test.todo('Changing show results changes number of rows shown');
  test.todo('Changing show results changes table summary');

  test.todo('Changing rows shown does not change aria row count');

  describe('Page links/buttons', () => {
    test.todo('Pages/link are shown if under 10 pages is present');
    test.todo('Correct number of pages are shown');
    test.todo('Number of pages changes when chaning show results changes');
    test.todo('Clicking on a page changes the items shown');
    test.todo('Clicking on a page changes table summary');
  });

  describe('Previous and next buttons', () => {
    test.todo('Previous button goes to previous page');
    test.todo('Previous button is disabled on first page');
    test.todo('Next button goes to next page');
    test.todo('Next button is disabled on last page');
  });
  describe('Pagination drop down', () => {
    test.todo('Drop down of pages is shown if there are 10 or more pages');
    test.todo('Correct number  of options are shown');
    test.todo('Number of pages changes when chaning show results changes');
    test.todo('Selecting on a page changes the items shown');
    test.todo('Selecting a page changes table summary');
  });
  describe('Pagination and filtering', () => {
    test.todo('Number of pages chanages when filtering');
    test.todo('Aria rowindex does not change on each row');
    test.todo('Table summary updates when filtering');
  });
});
