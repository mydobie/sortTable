/* Component to create a sortable and filterable table
Like a lightweight data tables (https://datatables.net/)
*/

import React from 'react';
import { distance } from 'fastest-levenshtein';
import SortIcons from './SortIcons';
import './sortTable.css';
import TableSummary from './TableSummary';
import SortDropDown from './SortDropDown';

const Pagination = React.lazy(() => import('./Pagination'));
const Filter = React.lazy(() => import('./Filter'));
const Loading = React.lazy(() => import('./Loading'));
const List = React.lazy(() => import('./List'));
const ResponsiveCss = React.lazy(() => import('./ResponsiveCss'));

export type tableDataType = {
  [key: string]: any;
  id: string | number;
  hidden?: boolean;
  rowindex?: number;
};

export type headerType = string;

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
  emptyCellClassName?: string;
  headerClassName?: string;
  id?: string;
  initialSort?: headerType; // what column should be sorted initially
  initialSortDsc?: boolean;
  isLoading?: boolean;
  isLoadingMessage?: JSX.Element;
  isResponsive?: boolean;
  isResponsiveList?: boolean;
  isResponsiveListAlwaysShow?: boolean; // only used for testing
  noDataMessage?: JSX.Element;
  showFilter?: boolean;
  showPagination?: boolean;
  sortedCellClass?: string;
  tableClassName?: string;
  viewSteps?: number[];
  useFuzzySearch?: boolean;
  maxFuzzyDistance?: number;
  debounceTimeout?: number; // this normally wouldn't be changed - used in testing
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
    isResponsive,
    isResponsiveList,
    isResponsiveListAlwaysShow,
    caption,
    tableClassName,
    headerClassName,
    noDataMessage,
    allDataFilteredMessage,
    isLoading,
    isLoadingMessage,
    initialSortDsc,
    emptyCellClassName,
    sortedCellClass,
    useFuzzySearch,
    maxFuzzyDistance = 3,
    debounceTimeout,
  } = props;

  const sortTableId = id ?? 'sortTable';

  const [tableDisplayRows, setTableDisplayRows] = React.useState(tableData);
  const [sortCol, setSortCol] = React.useState(''); // sort by this column
  const [sortAscending, setSortAscending] = React.useState(true);
  const [filterValue, setFilterValue] = React.useState('');
  const [maxNumber, setMaxNumber] = React.useState(
    defaultToAll || !viewSteps ? null : viewSteps[0]
  );
  const [startRow, setStartRow] = React.useState(0);
  const [isAlert, setAlert] = React.useState(false);
  const [alertText, setAlertText] = React.useState('');

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
          if (a[sortCol] === b[sortCol]) {
            return 0;
          }
          if (a[sortCol] === undefined) {
            return sortAscending === false ? -1 : 1;
          }
          if (b[sortCol] === undefined) {
            return sortAscending === true ? -1 : 1;
          }

          if (a[sortCol] < b[sortCol]) {
            return sortAscending === true ? -1 : 1;
          }
          return sortAscending === false ? -1 : 1;
        })
        .map((row, index) => ({ ...row, rowindex: index + 2 }));
      setTableDisplayRows(newSortData);
    }
    // Adding change to tableDisplayRows causes an infinite loop
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
          const isSortAscending = col !== sortCol || !sortAscending;
          if (col !== sortCol) {
            // setSortAscending(true);
            setSortCol(col);
          }
          setSortAscending(isSortAscending);
          setAlertText(
            `Sorted by ${header.name} ${
              isSortAscending ? 'ascending' : 'descending'
            }`
          );

          setAlert(true);
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
    <tr
      aria-rowindex={showPagination ? 1 : undefined}
      role={isResponsive && !isResponsiveList ? 'row' : undefined}
    >
      {headers.map((header) => (
        <th
          scope='col'
          key={header.key}
          aria-sort={setAriaSort(header.key)}
          style={header.style}
          className={`${header.className} ${
            header.key === sortCol || header.sortKey === sortCol
              ? sortedCellClass
              : ''
          }`}
          role={isResponsive && !isResponsiveList ? 'columnheader' : undefined}
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
      role={isResponsive && !isResponsiveList ? 'row' : undefined}
    >
      {headers.map((header) => {
        const data = dangerouslySetInnerHTML ? (
          // eslint-disable-next-line react/no-danger
          <span dangerouslySetInnerHTML={{ __html: rowData[header.key] }} />
        ) : (
          rowData[header.key]
        );

        const className = `${!data ? emptyCellClassName : ''} ${
          header.key === sortCol || header.sortKey === sortCol
            ? sortedCellClass
            : ''
        }`;
        if (header.rowheader) {
          return (
            <th
              scope='row'
              key={`${rowData.id}${header.key}`}
              data-sorttable-data-cell
              role={isResponsive && !isResponsiveList ? 'rowheader' : undefined}
              className={className}
            >
              {data}
            </th>
          );
        }
        return (
          <td
            key={`${rowData.id}${header.key}`}
            data-sorttable-data-cell
            role={isResponsive && !isResponsiveList ? 'cell' : undefined}
            className={className}
          >
            {isResponsive && !isResponsiveList ? (
              <span aria-hidden data-responsive-header>
                {header.name}
              </span>
            ) : null}
            {data}
          </td>
        );
      })}
    </tr>
  );

  /* ********************************* */
  const displayRows = () =>
    !showPagination || !maxNumber
      ? tableDisplayRows.filter((row) => !row.hide)
      : tableDisplayRows
          .filter((row) => !row.hide)
          .slice(startRow, startRow + maxNumber);

  /* ********************************* */
  const buildData = () => displayRows().map((row) => buildDataRow(row));

  /* ********************************* */
  // const filterRows = () => {
  //   const filterText =
  //     caseSensitiveFilter === true ? filterValue : filterValue.toLowerCase();

  //   const newTableDisplayRows = [...tableDisplayRows];

  //   newTableDisplayRows.forEach((row, index) => {
  //     newTableDisplayRows[index].hide = true;
  //     headers.forEach((header) => {
  //       if (
  //         (header.noFilter === undefined || header.noFilter === false) &&
  //         row[header.key] !== undefined
  //       ) {
  //         let value = row[header.key].toString();
  //         value = caseSensitiveFilter === true ? value : value.toLowerCase();

  //         if (
  //           (useFuzzySearch &&
  //             distance(value, filterText) <= maxFuzzyDistance) ||
  //           value.includes(filterText)
  //         ) {
  //           newTableDisplayRows[index].hide = false;
  //         }
  //       }
  //     });
  //   });

  //   setTableDisplayRows(newTableDisplayRows);
  //   setStartRow(0);
  // };

  React.useEffect(() => {
    const filterRows = () => {
      const filterText =
        caseSensitiveFilter === true ? filterValue : filterValue.toLowerCase();

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

            if (
              (useFuzzySearch &&
                distance(value, filterText) <= maxFuzzyDistance) ||
              value.includes(filterText)
            ) {
              newTableDisplayRows[index].hide = false;
            }
          }
        });
      });

      setTableDisplayRows(newTableDisplayRows);
      setStartRow(0);
    };

    filterRows();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterValue]);

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
  if (tableDisplayRows.length === 0) {
    return noData;
  }
  return (
    <div className='container-fluid'>
      <React.Suspense fallback={<></>}>
        {isResponsive && !isResponsiveList ? <ResponsiveCss /> : null}

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
                onChange={(a) => {
                  setFilterValue(a.target.value);
                }}
                label='Filter'
                id={sortTableId}
                debounceTimeout={debounceTimeout}
              />
            </div>
          ) : null}
        </div>
        <div className='row'>
          {isResponsive || isResponsiveList ? (
            <SortDropDown
              headers={headers}
              selected={sortCol}
              sortAscending={sortAscending}
              onChange={(a) => {
                setSortCol(a);
              }}
              onOrderChange={(a) => {
                setSortAscending(a);
              }}
            />
          ) : null}

          {isAlert ? (
            <div data-sort-table-confirm>
              <div className='alert alert-success' role='alert'>
                {alertText}
              </div>
            </div>
          ) : null}

          <table
            className={`table ${tableClassName}`}
            id={sortTableId}
            aria-describedby={`${sortTableId}RowsShownSummary`}
            aria-rowcount={
              showPagination || showFilter
                ? tableDisplayRows.length + 1
                : undefined
            }
            data-sort-responsive={
              (isResponsive && !isResponsiveList) ?? undefined
            }
            data-sort-responsive-has-list={isResponsiveList ?? undefined}
            data-sort-responsive-has-list-always-hide={
              isResponsiveListAlwaysShow ?? undefined
            }
            role={isResponsive && !isResponsiveList ? 'table' : undefined}
          >
            {caption ? <caption>{caption}</caption> : null}
            <thead
              className={headerClassName}
              role={isResponsive && !isResponsiveList ? 'rowgroup' : undefined}
            >
              {buildHeaders}
            </thead>
            {!isLoading ? (
              <tbody
                role={
                  isResponsive && !isResponsiveList ? 'rowgroup' : undefined
                }
                data-testid='sortTableBody'
              >
                {buildData()}
              </tbody>
            ) : null}
          </table>

          {isResponsiveList ? (
            <List
              headers={headers}
              tableData={displayRows()}
              isResponsiveListAlwaysShow={isResponsiveListAlwaysShow}
            />
          ) : null}

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
            {!isLoading ? (
              <TableSummary
                totalEntries={tableData.length}
                startRow={startRow + 1}
                endRow={
                  maxNumber
                    ? startRow + maxNumber
                    : tableDisplayRows.filter((row) => !row.hide).length
                }
                filteredTotal={
                  tableDisplayRows.filter((row) => !row.hide).length
                }
                sortColumn={
                  headers.find(
                    (header) =>
                      header.key === sortCol || header.sortKey === sortCol
                  )?.name
                }
                sortDirection={sortAscending ? 'ascending' : 'descending'}
              />
            ) : null}
          </div>

          {showPagination ? (
            <div className='col-sm'>
              <Pagination
                numberOfPages={Math.ceil(
                  maxNumber && maxNumber > 0
                    ? tableDisplayRows.filter((row) => !row.hide).length /
                        maxNumber
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
      </React.Suspense>
    </div>
  );
};

export default SortTable;
