// EXAMPLE: Sort and filter table component
/* Component to create a sortable and filterable table
Like a lightweight data tables (https://datatables.net/)

Two arrays should be passed as props.  Both need to be in the following format:

headers: [
  { 
    name: 'Column header display text', 
    key: 'id_to_tie_header_to_data', 
    noSort: true, // set if you do not want this column sortable
    noFilter: true // set if you don not want data from this column to be filtered
   },
   ...
]

Example Headers:
[
   { name: 'Product Name', key: 'name', type: 'alpha' },
   { name: 'Price', key: 'price' },
]

Data is passed as the tableData prop.  Each items must include an id
and the data set using the keys defined in the headers

Here is an example:
tableData: [
   { "id": 1, "name": "Cheese", "price": "$4.90" },
   { "id": 2, "name": "Milk", "price": "$1.90"},
]

*/

import React from 'react';
import PropTypes from 'prop-types';
import Cell from './UIAtoms/Cell';
import TableRow from './UIAtoms/TableRow';
import Head from './UIAtoms/Head';
import Body from './UIAtoms/Body';
import Table from './UIAtoms/Table';
import SortIcons from './SortIcons';
import Pagination from './UIAtoms/Pagination';
import Page from './UIAtoms/Page';
import Select from './UIAtoms/Select';
import Filter from './UIAtoms/Filter';
import Container from './UIAtoms/Container';
import Row from './UIAtoms/Row';
import Col from './UIAtoms/Col';

export default class SortTable extends React.Component {
  constructor(props) {
    super(props);
    const { tableData } = props;
    this.state = {
      tableDisplayRows: tableData,
      sortCol: '',
      sortAscending: true,
      filterValue: '',
      maxNumber: props.defaultToAll ? '' : props.viewSteps[0],
      startRow: 0,
    };
    this.buildHeaders = this.buildHeaders.bind(this);
    this.buildDataRow = this.buildDataRow.bind(this);
    this.sortColumn = this.sortColumn.bind(this);
    this.headerButton = this.headerButton.bind(this);
    this.filterRows = this.filterRows.bind(this);

    this.noDataMessage = 'No data is available';
    this.allFilteredMessage = 'No data meets filtering criteria';
  }

  componentDidMount() {
    const { initialSort, headers } = this.props;
    if (
      initialSort !== '' &&
      headers.findIndex((header) => header.key === initialSort) !== -1
    ) {
      this.sortColumn(initialSort);
    }
  }

  headerButton(header) {
    const { sortCol, sortAscending } = this.state;

    if (header.noSort !== undefined && header.noSort === true) {
      return header.name;
    }
    const buttonIconType = header.key === sortCol ? header.type : 'sortable';
    const buttonIconColor = buttonIconType === 'sortable' ? '#ccc' : undefined;
    return (
      <button
        type='button'
        onClick={() => this.sortColumn(header.key)}
        style={{ border: 'none', padding: 'none', background: 'none' }}
      >
        <SortIcons
          sortAsc={sortAscending}
          type={buttonIconType}
          color={buttonIconColor}
        />
        {header.name}
      </button>
    );
  }

  buildHeaders() {
    const { headers, ui } = this.props;
    return (
      <Head ui={ui}>
        <TableRow ui={ui}>
          {headers.map((header) => (
            <Cell colHeader id={header.key} key={header.key} ui={ui}>
              {this.headerButton(header)}
            </Cell>
          ))}
        </TableRow>
      </Head>
    );
  }

  buildData() {
    const { tableDisplayRows, maxNumber, startRow } = this.state;
    const { showPagination, ui } = this.props;

    const rows =
      !showPagination || maxNumber === ''
        ? tableDisplayRows.filter((row) => !row.hide)
        : tableDisplayRows
            .filter((row) => !row.hide)
            .slice(startRow, startRow + maxNumber);

    return <Body ui={ui}>{rows.map((row) => this.buildDataRow(row))}</Body>;
  }

  buildDataRow(rowData) {
    const { headers, dangerouslySetInnerHTML, ui } = this.props;

    return (
      <TableRow key={rowData.id} ui={ui}>
        {headers.map((header) => {
          const data = dangerouslySetInnerHTML ? (
            // eslint-disable-next-line react/no-danger
            <span dangerouslySetInnerHTML={{ __html: rowData[header.key] }} />
          ) : (
            rowData[header.key]
          );
          return (
            <Cell key={`${rowData.id}${header.key}`} ui={ui}>
              {data}
            </Cell>
          );
        })}
      </TableRow>
    );
  }

  sortColumn(column) {
    const { tableDisplayRows, sortCol, sortAscending } = this.state;

    const newSortAsc = column !== sortCol ? true : !sortAscending;

    const sortedTableData = [...tableDisplayRows];
    sortedTableData.sort((a, b) => {
      if (a[column] < b[column]) {
        return newSortAsc === true ? -1 : 1;
      }
      if (a[column] > b[column]) {
        return newSortAsc === false ? -1 : 1;
      }
      return 0;
    });

    this.setState({
      tableDisplayRows: sortedTableData,
      sortAscending: newSortAsc,
      sortCol: column,
    });
  }

  filterRows(event) {
    const { tableDisplayRows } = this.state;
    const { headers, caseSensitiveFilter } = this.props;

    const filterValue =
      caseSensitiveFilter === true
        ? event.target.value
        : event.target.value.toLowerCase();

    const newTableDisplayRows = [...tableDisplayRows];

    newTableDisplayRows.forEach((row, index) => {
      newTableDisplayRows[index].hide = true;
      headers.forEach((header) => {
        if (
          (header.noFilter === undefined || header.noFilter === false) &&
          row[header.key] !== undefined
        ) {
          let value = row[header.key].toString();
          value = caseSensitiveFilter === true ? value : value.toLowerCase();

          if (value.includes(filterValue)) {
            newTableDisplayRows[index].hide = false;
          }
        }
      });
    });

    this.setState({
      tableDisplayRows: newTableDisplayRows,
      filterValue,
      startRow: 0,
    });
  }

  filterInput() {
    const { filterValue } = this.state;
    const { ui } = this.props;
    return <Filter value={filterValue} onChange={this.filterRows} ui={ui} />;
  }

  showNumberInput() {
    const { maxNumber } = this.state;
    const { viewSteps, ui } = this.props;

    return (
      <div className='sortTableShowResultsSelect'>
        Show{' '}
        <Select
          ariaLabel='Number of items shown per page'
          value={maxNumber}
          style={{ width: '75px', display: 'inline-block' }}
          onChange={(e) =>
            this.setState({
              maxNumber: parseInt(e.target.value, 10) || '',
              startRow: 0,
            })
          }
          ui={ui}
        >
          {viewSteps.map((step) => (
            <option value={step} key={step}>
              {step}
            </option>
          ))}
          <option value=''>All</option>
        </Select>
        results
      </div>
    );
  }

  showPagination() {
    const { maxNumber, startRow, tableDisplayRows } = this.state;
    const { ui } = this.props;

    const rows = tableDisplayRows.filter((row) => !row.hide).length;

    const pageButtons = [];

    const max = parseInt(maxNumber || rows, 10);

    for (let i = 0; i < rows; i += max) {
      const pageNumber = pageButtons.length + 1;
      pageButtons.push(
        <Page
          key={pageNumber}
          pageNum={pageNumber}
          active={startRow === i}
          value={i}
          onClick={(e) => this.setState({ startRow: parseInt(i, 10) })}
          ui={ui}
        >
          {pageNumber}
        </Page>
      );
    }

    return (
      <div
        style={{ position: 'relative', height: '3rem' }}
        className='sortTablePagination'
      >
        <Pagination
          aria-label='Results page'
          style={{ position: 'absolute', right: '0' }}
          prevOnClick={() => {
            if (startRow >= maxNumber) {
              this.setState({ startRow: startRow - maxNumber });
            }
          }}
          nextOnClick={() => {
            if (startRow + maxNumber < rows) {
              this.setState({
                startRow: startRow + maxNumber,
              });
            }
          }}
          ui={ui}
        >
          {pageButtons.map((button) => button)}
        </Pagination>
      </div>
    );
  }

  render() {
    const { tableDisplayRows } = this.state;
    const { showFilter, showPagination, ui } = this.props;
    if (tableDisplayRows.length === 0) {
      return <p id='noDataToTableMessage'>{this.noDataMessage}</p>;
    }
    return (
      <Container fluid ui={ui}>
        <Row ui={ui} style={{ marginBottom: '15px' }}>
          <Col ui={ui}>{showPagination ? this.showNumberInput() : null}</Col>
          <Col ui={ui} style={{ textAlign: 'right' }}>
            {showFilter ? this.filterInput() : null}
          </Col>
        </Row>
        <Row>
          <Col>
            <Table ui={ui}>
              {this.buildHeaders()}
              {this.buildData()}
            </Table>

            {tableDisplayRows.findIndex((row) => !row.hide) === -1 ? (
              <p id='dataAllFilteredOut'>{this.allFilteredMessage}</p>
            ) : null}

            {showPagination ? this.showPagination() : null}
          </Col>
        </Row>
      </Container>
    );
  }
}

SortTable.propTypes = {
  tableData: PropTypes.arrayOf(PropTypes.object),
  headers: PropTypes.arrayOf(PropTypes.object),
  initialSort: PropTypes.string,
  caseSensitiveFilter: PropTypes.bool,
  showFilter: PropTypes.bool,
  showPagination: PropTypes.bool,
  dangerouslySetInnerHTML: PropTypes.bool,
  viewSteps: PropTypes.arrayOf(PropTypes.number),
  defaultToAll: PropTypes.bool,
  ui: PropTypes.oneOf(['instructure', undefined, 'bootstrap']),
};
SortTable.defaultProps = {
  tableData: [],
  headers: [],
  initialSort: '',
  caseSensitiveFilter: false,
  showFilter: true,
  showPagination: false,
  dangerouslySetInnerHTML: false,
  viewSteps: [10, 25, 50, 100],
  defaultToAll: false,
  ui: undefined,
};
