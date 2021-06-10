/* Component to create a sortable and filterable table
Like a lightweight data tables (https://datatables.net/)
*/

import React from 'react';
import SortIcons from './SortIcons';
import Pagination from './Pagination';
import Filter from './Filter';
import Loading from './Loading';
import './responsive.css';

export type tableDataType = {
  [key: string]: any;
  id: string | number;
  hidden?: boolean;
  rowindex?: number;
};

type headerType = string;

export type headerDataType = {
  name: string;
  key: headerType;

  className?: string;
  noFilter?: boolean;
  noSort?: boolean;
  rowheader?: boolean;
  sortKey?: headerType;
  style?: Object;
  type?: string;
};

interface Props {
  headers: headerDataType[];
  tableData: tableDataType[];

  allDataFilteredMessage?: JSX.Element;
  caption?: string;
  caseSensitiveFilter?: boolean;
  dangerouslySetInnerHTML?: boolean; // Used very rarely, but should the table process html in a string
  defaultToAll?: boolean;
  headerClassName?: string;
  id?: string;
  initialSort?: headerType; // what column shouold be sorted intially
  initialSortDsc?: boolean;
  isLoading?: boolean;
  isLoadingMessage?: JSX.Element;
  isReponsive?: boolean;
  noDataMessage?: JSX.Element;
  showFilter?: boolean;
  showPagination?: boolean;
  tableClassName?: string;
  viewSteps?: number[];
}

const SortTable = (props: Props): JSX.Element => {
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
    isReponsive,
    caption,
    tableClassName,
    headerClassName,
    noDataMessage,
    allDataFilteredMessage,
    isLoading,
    isLoadingMessage,
    initialSortDsc,
  } = props;

  const sortTableId = id ?? 'sortTable';

  const [tableDisplayRows, setTableDisplayRows] = React.useState(tableData);
  const [sortCol, setSortCol] = React.useState(''); // sort by this columnn
  const [sortAscending, setSortAscending] = React.useState(true);
  const [filterValue, setFilterValue] = React.useState('');
  const [maxNumber, setMaxNumber] = React.useState(
    defaultToAll || !viewSteps ? null : viewSteps[0]
  );
  const [startRow, setStartRow] = React.useState(0);

  const noData: JSX.Element = noDataMessage ?? (
    <p data-sort-no-data-message>No data is available</p>
  );

  const allFiltered = allDataFilteredMessage ?? (
    <p data-sort-all-data-filtered>No data meets filtering criteria</p>
  );

  /* ********************************* */
  React.useEffect(() => {
    const initialSortColumn: headerDataType | undefined = initialSort
      ? headers.find((header) => header.key === initialSort)
      : undefined;

    if (initialSortColumn) {
      setSortAscending(!initialSortDsc);

      const col: headerType =
        initialSortColumn.sortKey ?? initialSortColumn.key;
      setSortCol(col);
    }
    // We want this to only run on component load, so leaving it as []
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ********************************* */
  React.useEffect(() => {
    if (sortCol && sortAscending !== undefined) {
      const newSortData = [...tableDisplayRows]
        .sort((a, b) => {
          if (a[sortCol] < b[sortCol]) {
            return sortAscending === true ? -1 : 1;
          }
          if (a[sortCol] > b[sortCol]) {
            return sortAscending === false ? -1 : 1;
          }
          return 0;
        })
        .map((row, index) => ({ ...row, rowindex: index + 2 }));
      setTableDisplayRows(newSortData);
    }
    // Adding chagne to tableDisplayRows causes an infinate loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortAscending, sortCol]);

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
          const col = header.sortKey ?? header.key;
          if (col !== sortCol) {
            setSortAscending(true);
            setSortCol(col);
          } else {
            setSortAscending(!sortAscending);
          }
        }}
        style={{
          border: 'none',
          padding: 'none',
          background: 'none',
          width: '100%',
          textAlign: 'left',
        }}
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
  const setAriaSort = (col: string) => {
    if (col !== sortCol) {
      return undefined;
    }
    return sortAscending ? 'ascending' : 'descending';
  };

  const buildHeaders = (
    <tr aria-rowindex={showPagination ? 1 : undefined}>
      {headers.map((header) => (
        <th
          scope='col'
          key={header.key}
          aria-sort={setAriaSort(header.key)}
          style={header.style}
          className={header.className}
        >
          {headerButton(header)}
        </th>
      ))}
    </tr>
  );

  /* ********************************* */
  const buildDataRow = (rowData: tableDataType) => (
    <tr
      key={rowData.id}
      aria-rowindex={showPagination ? rowData.rowindex : undefined}
    >
      {headers.map((header) => {
        const data = dangerouslySetInnerHTML ? (
          // eslint-disable-next-line react/no-danger
          <span dangerouslySetInnerHTML={{ __html: rowData[header.key] }} />
        ) : (
          rowData[header.key]
        );
        if (header.rowheader) {
          return (
            <th
              scope='row'
              key={`${rowData.id}${header.key}`}
              data-sorttable-data-cell
              data-label={header.name}
            >
              {data}
            </th>
          );
        }
        return (
          <td
            key={`${rowData.id}${header.key}`}
            data-sorttable-data-cell
            data-label={header.name}
          >
            {data}
          </td>
        );
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
        className='form-control form-select'
        aria-label='Number of items shown'
        value={maxNumber || ''} // TODO this seems like it should be null or undefined ... ?? doesn't work here
        style={{
          width: '75px',
          display: 'inline-block',
          marginLeft: '0.75em',
          marginRight: '0.75em',
        }}
        onChange={(e) => {
          setStartRow(0);
          setMaxNumber(parseInt(e.target.value, 10) ?? null);
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
      showPagination ? `${startRow + 1} to ${endRow} of ` : ''
    }${totalFiltered} entries${
      filterValue === '' ? '' : `(filtered from ${totalRows} total entries)`
    }`;
  };

  /* ********************************* */
  if (tableDisplayRows.length === 0) {
    return noData;
  }
  return (
    <div className='container-fluid'>
      <div
        className='row'
        style={{ marginBottom: showPagination || showFilter ? '15px' : '0' }}
      >
        {showPagination ? (
          <div className='col-sm'>{showNumberInput()}</div>
        ) : null}
        {showFilter ? (
          <div className='col-sm' style={{ textAlign: 'right' }}>
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
        <table
          className={`table ${tableClassName}`}
          id={sortTableId}
          aria-describedby={`${sortTableId}RowsShownSummary`}
          aria-rowcount={showPagination ? tableDisplayRows.length : undefined}
          data-sort-responsive={isReponsive ?? undefined}
        >
          {caption ? <caption>{caption}</caption> : null}
          <thead className={headerClassName}>{buildHeaders}</thead>
          <tbody>{buildData()}</tbody>
        </table>
        {tableDisplayRows.findIndex((row) => !row.hide) === -1
          ? allFiltered
          : null}

        {isLoading && !isLoadingMessage ? <Loading /> : null}
        {isLoading && isLoadingMessage ? isLoadingMessage : null}
      </div>
      <div className='row'>
        <div
          className='col-sm'
          id={`${sortTableId}RowsShownSummary`}
          data-pagination-summary
        >
          {rowsShownSummary()}
        </div>
        {showPagination ? (
          <div className='col-sm'>
            <Pagination
              numberOfPages={Math.ceil(
                maxNumber && maxNumber > 0
                  ? tableData.filter((row) => !row.hide).length / maxNumber
                  : 1
              )}
              initialActivePage={1}
              id={sortTableId}
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
