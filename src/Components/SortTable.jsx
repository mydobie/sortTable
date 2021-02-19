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
import {
  Table,
  Input,
  FormGroup,
  Label,
  Pagination,
  PaginationItem,
  PaginationLink,
  Container,
  Row,
  Col,
} from 'reactstrap';
import SortIcons from './SortIcons';

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
    const { headers } = this.props;
    return (
      <thead>
        <tr>
          {headers.map((header) => (
            <th scope='col' key={header.key}>
              {this.headerButton(header)}
            </th>
          ))}
        </tr>
      </thead>
    );
  }

  buildData() {
    const { tableDisplayRows, maxNumber, startRow } = this.state;
    const { showPagination } = this.props;

    const rows =
      !showPagination || maxNumber === ''
        ? tableDisplayRows.filter((row) => !row.hide)
        : tableDisplayRows
            .filter((row) => !row.hide)
            .slice(startRow, startRow + maxNumber);

    return <tbody>{rows.map((row) => this.buildDataRow(row))}</tbody>;
  }

  buildDataRow(rowData) {
    const { headers, dangerouslySetInnerHTML } = this.props;

    return (
      <tr key={rowData.id}>
        {headers.map((header) => {
          const data = dangerouslySetInnerHTML ? (
            // eslint-disable-next-line react/no-danger
            <span dangerouslySetInnerHTML={{ __html: rowData[header.key] }} />
          ) : (
            rowData[header.key]
          );
          return <td key={`${rowData.id}${header.key}`}>{data}</td>;
        })}
      </tr>
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
    return (
      <FormGroup check inline id='tableFilter' style={{ marginBottom: '20px' }}>
        <Label
          htmlFor='tableFilterInput'
          style={{ fontWeight: 'bold', marginRight: '10px' }}
        >
          Filter:
        </Label>

        <Input
          value={filterValue}
          onChange={this.filterRows}
          id='tableFilterInput'
        />
      </FormGroup>
    );
  }

  showNumberInput() {
    const { maxNumber } = this.state;
    const { viewSteps } = this.props;

    return (
      <FormGroup className='sortTableShowResultsSelect'>
        Show{' '}
        <Input
          type='select'
          aria-label='Number of items shown per page'
          value={maxNumber}
          style={{ width: '75px', display: 'inline-block' }}
          onChange={(e) =>
            this.setState({
              maxNumber: parseInt(e.target.value, 10) || '',
              startRow: 0,
            })
          }
        >
          {viewSteps.map((step) => (
            <option value={step} key={step}>
              {step}
            </option>
          ))}
          <option value=''>All</option>
        </Input>
        results
      </FormGroup>
    );
  }

  showPagination() {
    const { maxNumber, startRow, tableDisplayRows } = this.state;

    const rows = tableDisplayRows.filter((row) => !row.hide).length;

    const pageButtons = [];

    const max = parseInt(maxNumber || rows, 10);

    for (let i = 0; i < rows; i += max) {
      const pageNumber = pageButtons.length + 1;
      pageButtons.push(
        <PaginationItem
          key={pageNumber}
          active={startRow === i}
          className='sortTablePaginationItem'
        >
          <PaginationLink
            data-page-number={pageNumber}
            data-page-row={i}
            value={i}
            className='sortTablePaginationButton'
            onClick={(e) =>
              this.setState({ startRow: parseInt(e.target.value, 10) })
            }
          >
            {pageNumber}
          </PaginationLink>
        </PaginationItem>
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
        >
          <PaginationItem>
            <PaginationLink
              previous
              disabled={startRow < maxNumber}
              onClick={() => this.setState({ startRow: startRow - maxNumber })}
            >
              Previous
            </PaginationLink>
          </PaginationItem>
          {pageButtons.map((button) => button)}
          <PaginationItem>
            <PaginationLink
              next
              disabled={startRow + maxNumber > rows}
              onClick={() => {
                this.setState({
                  startRow: startRow + maxNumber,
                });
              }}
            >
              Next
            </PaginationLink>
          </PaginationItem>
        </Pagination>
      </div>
    );
  }

  render() {
    const { tableDisplayRows } = this.state;
    const { showFilter, showPagination } = this.props;
    if (tableDisplayRows.length === 0) {
      return <p id='noDataToTableMessage'>{this.noDataMessage}</p>;
    }
    return (
      <Container fluid>
        <Row>
          <Col sm='6'>{showPagination ? this.showNumberInput() : null}</Col>
          <Col sm='6' style={{ textAlign: 'right' }}>
            {showFilter ? this.filterInput() : null}
          </Col>
        </Row>

        <Table>
          {this.buildHeaders()}
          {this.buildData()}
        </Table>

        {tableDisplayRows.findIndex((row) => !row.hide) === -1 ? (
          <p id='dataAllFilteredOut'>{this.allFilteredMessage}</p>
        ) : null}

        {showPagination ? this.showPagination() : null}
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
};
