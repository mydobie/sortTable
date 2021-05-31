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
   { name: 'Product Name', key: 'name', type: 'alpha' sortKey:''},
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

import SortIcons, { sortType } from './SortIcons';
import Pagination from './UIAtoms/Pagination';
import Filter from './UIAtoms/Filter';

type tableDataType = { [key: string]: any; id: string | number };

type headerType = string;
type headerDataType = {
  name: string;
  key: headerType;
  sortKey?: headerType;
  type?: sortType;
  noSort?: boolean;
  noFilter?: boolean;
};

interface Props {
  tableData: tableDataType[];
  headers: headerDataType[];
  initialSort?: headerType; // what column shouold be sorted intially
  caseSensitiveFilter?: boolean;
  showFilter?: boolean;
  showPagination?: boolean;
  dangerouslySetInnerHTML?: boolean; // Used very rarely, but should the table process html in a string
  viewSteps?: number[];
  defaultToAll?: boolean;
  id?: string;
}

const SortTable = (props: Props) => {
  const {
    tableData,
    defaultToAll,
    viewSteps,
    initialSort,
    headers,
    showPagination,
    dangerouslySetInnerHTML,
    showFilter,
    caseSensitiveFilter,
    id,
  } = props;

  const sortTableId = id || 'sortTable';

  const [tableDisplayRows, setTableDisplayRows] = React.useState(tableData);
  const [sortCol, setSortCol] = React.useState(''); // sort by this columnn
  const [sortAscending, setSortAscending] = React.useState(true);
  const [filterValue, setFilterValue] = React.useState('');
  const [maxNumber, setMaxNumber] = React.useState(
    defaultToAll || !viewSteps ? null : viewSteps[0]
  );
  const [startRow, setStartRow] = React.useState(0);

  const noDataMessage = 'No data is available';
  const allFilteredMessage = 'No data meets filtering criteria';

  /* ********************************* */
  React.useEffect(() => {
    const initialSortColumn: headerDataType | undefined = initialSort
      ? headers.find((header) => header.key === initialSort)
      : undefined;

    if (initialSortColumn && initialSort) {
      const newSortAsc: boolean =
        initialSort !== sortCol ? true : !sortAscending;
      setSortAscending(newSortAsc);

      const col: headerType = initialSortColumn.sortKey || initialSort;
      setSortCol(col);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ********************************* */
  React.useEffect(() => {
    if (sortCol && sortAscending !== undefined) {
      const newSortData = [...tableDisplayRows].sort((a, b) => {
        if (a[sortCol] < b[sortCol]) {
          return sortAscending === true ? -1 : 1;
        }
        if (a[sortCol] > b[sortCol]) {
          return sortAscending === false ? -1 : 1;
        }
        return 0;
      });
      setTableDisplayRows(newSortData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortAscending, sortCol]);

  /* ********************************* */
  React.useEffect(() => {
    setSortAscending(true);
  }, [sortCol]);

  /* ********************************* */
  const headerButton = (header: headerDataType) => {
    if (header.noSort !== undefined && header.noSort === true) {
      return header.name;
    }

    const buttonIconType =
      header.key === sortCol || header.sortKey === sortCol
        ? header.type
        : 'sortable';
    const buttonIconColor = buttonIconType === 'sortable' ? '#ccc' : undefined;
    return (
      <button
        type='button'
        onClick={() => {
          const col = header.sortKey || header.key;
          if (col !== sortCol) {
            setSortCol(col);
          } else {
            setSortAscending(!sortAscending);
          }
        }}
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
  };

  /* ********************************* */
  const buildHeaders = (
    <tr>
      {headers.map((header) => (
        <th scope='col' key={header.key}>
          {headerButton(header)}
        </th>
      ))}
    </tr>
  );

  /* ********************************* */
  const buildDataRow = (rowData: tableDataType) => (
    <tr key={rowData.id}>
      {headers.map((header) => {
        const data = dangerouslySetInnerHTML ? (
          // eslint-disable-next-line react/no-danger
          <span dangerouslySetInnerHTML={{ __html: rowData[header.key] }} />
        ) : (
          rowData[header.key]
        );
        return (
          <td key={`${rowData.id}${header.key}`} data-sorttable-data-cell>
            {data}
          </td>
        ); // KKD - need to make also to be a header cell if marked as a row header
      })}
    </tr>
  );

  /* ********************************* */
  const buildData = () => {
    const rows =
      !showPagination || !maxNumber
        ? tableDisplayRows.filter((row) => !row.hide)
        : tableDisplayRows
            .filter((row) => !row.hide)
            .slice(startRow, startRow + maxNumber);

    return rows.map((row) => buildDataRow(row));
  };

  /* ********************************* */
  const filterRows = (event: React.ChangeEvent<HTMLInputElement>) => {
    const filterText =
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

          if (value.includes(filterText)) {
            newTableDisplayRows[index].hide = false;
          }
        }
      });
    });

    setTableDisplayRows(newTableDisplayRows);
    setFilterValue(filterText);
    setStartRow(0);
  };

  /* ********************************* */
  const showNumberInput = () => (
    <div data-sort-number-of-inputs>
      Show
      <select
        className='form-control'
        aria-label='Number of items shown per page'
        value={maxNumber || ''}
        style={{
          width: '75px',
          display: 'inline-block',
          marginLeft: '0.75em',
          marginRight: '0.75em',
        }}
        onChange={(e) => {
          setStartRow(0);
          setMaxNumber(parseInt(e.target.value, 10) || null);
        }}
      >
        {viewSteps?.map((step) => (
          <option value={step} key={step}>
            {step}
          </option>
        ))}
        <option value=''>All</option>
      </select>
      results
    </div>
  );

  /* ********************************* */
  const rowsShownSummary = () => {
    const totalRows = tableDisplayRows.length;
    const totalFiltered = tableDisplayRows.filter((row) => !row.hide).length;

    let endRow = totalFiltered;

    if (maxNumber) {
      endRow = startRow + maxNumber;
      endRow = endRow > totalFiltered ? totalFiltered : endRow;
    }

    return `Showing ${
      startRow + 1
    } to ${endRow} of ${totalFiltered} entries (filtered from ${totalRows} total entries)`;
  };

  /* ********************************* */
  if (tableDisplayRows.length === 0) {
    return <p data-sort-no-data-message>{noDataMessage}</p>;
  }
  return (
    <div className='container-fluid' id={sortTableId}>
      <div
        className='row'
        style={{ marginBottom: showPagination || showFilter ? '15px' : '0' }}
      >
        {showPagination ? <div className='col'>{showNumberInput()}</div> : null}
        {showFilter ? (
          <div className='col' style={{ textAlign: 'right' }}>
            <Filter
              value={filterValue}
              onChange={filterRows}
              label='Filter'
              id={sortTableId}
            />{' '}
          </div>
        ) : null}
      </div>
      <div className='row'>
        <table className='table'>
          <thead>{buildHeaders}</thead>
          <tbody>{buildData()}</tbody>
        </table>
        {tableDisplayRows.findIndex((row) => !row.hide) === -1 ? (
          <p data-sort-all-data-filtered className='col'>
            {allFilteredMessage}
          </p>
        ) : null}
      </div>
      <div className='row'>
        <div className='col'>{rowsShownSummary()}</div>
        {showPagination ? (
          <div className='col'>
            <Pagination
              numberOfPages={Math.ceil(
                maxNumber && maxNumber > 0
                  ? tableData.filter((row) => !row.hide).length / maxNumber
                  : 1
              )}
              initialActivePage={1}
              onPageChange={(page) => {
                setStartRow(
                  maxNumber && page !== 0 ? (page - 1) * maxNumber : 0
                );
              }}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default SortTable;
