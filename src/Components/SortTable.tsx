/* eslint-disable no-console */
/* Component to create a sortable and filterable table
Like a lightweight data tables (https://datatables.net/)
*/

import React from 'react';
import SortIcons, { SortType } from './SortIcons';
import './sortTable.css';
import TableSummary from './TableSummary';
import SortDropDown from './SortDropDown';
import { sortRows, filterRows } from './sortUtils';

const Pagination = React.lazy(() => import('./Pagination'));
const Filter = React.lazy(() => import('./Filter'));
const Loading = React.lazy(() => import('./Loading'));
const List = React.lazy(() => import('./List'));
const ResponsiveCss = React.lazy(() => import('./ResponsiveCss'));
import Table from './Table';

export const sortTableVersion = process.env.REACT_APP_VERSION;

// eslint-disable-next-line @typescript-eslint/naming-convention
export type tableDataType = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
  id: string | number;
  hidden?: boolean;
  rowindex?: number;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type CustomSortType = (a: any, b: any) => 0 | 1 | -1;

// eslint-disable-next-line @typescript-eslint/naming-convention
export type headerType = string;

// eslint-disable-next-line @typescript-eslint/naming-convention
export type headerDataType = {
  name: string;
  key: headerType;

  className?: string;
  noFilter?: boolean;
  noSort?: boolean;
  rowheader?: boolean;
  sortKey?: headerType;
  // eslint-disable-next-line @typescript-eslint/ban-types
  style?: Object;
  type?: SortType;
  customSort?: CustomSortType;
};

interface Props {
  // Required
  headers: headerDataType[];
  tableData: tableDataType[];

  // Optional - data
  allDataFilteredMessage?: JSX.Element | string;
  caption?: string;
  initialFilter?: string;
  initialPage?: number;
  initialRowsDisplayed?: number;
  initialSort?: headerType; // what column should be sorted initially
  initialSortDsc?: boolean;
  isLoadingMessage?: JSX.Element | string; // Used if isLoading is true
  noDataMessage?: JSX.Element | string;
  viewSteps?: number[];

  // Optional - config
  caseSensitiveFilter?: boolean;
  dangerouslySetInnerHTML?: boolean; // Used very rarely, but should the table process html in a string
  defaultToAll?: boolean;
  emptyCellClassName?: string;
  headerClassName?: string;
  id?: string;
  isLoading?: boolean;
  isResponsive?: boolean;
  isResponsiveAria?: boolean;
  showFilter?: boolean;
  showPagination?: boolean;
  sortedCellClass?: string;
  tableClassName?: string;
  exactFilterMatch?: boolean;
  smallScreenSize?: number;

  // Optional - callbacks
  onChange?: (props: {
    sortedColumn: headerType;
    sortedAscending: boolean;
    rowsShown: number | null;
    filter: string;
    page: number;
    pages: number;
    totalFiltered: number;
  }) => void;

  // For testing (wouldn't normally be used)
  debounceTimeout?: number;
  isResponsiveListAlwaysShow?: boolean;
  maxFuzzyDistance?: number; // Remove this in next major version
}

const SortTable = (props: Props): JSX.Element => {
  const {
    // Required
    headers,
    tableData,

    // Optional - data
    allDataFilteredMessage,
    caption,
    initialFilter = '',
    initialPage,
    initialRowsDisplayed,
    initialSort,
    initialSortDsc,
    isLoadingMessage,
    noDataMessage,
    viewSteps = [10, 25, 50],

    // Optional - config
    caseSensitiveFilter,
    dangerouslySetInnerHTML,
    defaultToAll,
    emptyCellClassName,
    headerClassName,
    id,
    isLoading,
    isResponsive = true,
    isResponsiveAria,
    showFilter,
    showPagination,
    sortedCellClass,
    tableClassName,
    exactFilterMatch = false,
    smallScreenSize = 650,

    // Optional - callbacks
    onChange = () => {},

    // For testing (wouldn't normally be used)
    debounceTimeout,
    isResponsiveListAlwaysShow,
    maxFuzzyDistance = 3,
  } = props;

  // let rowsDisplayed = defaultToAll || !viewSteps ? null : viewSteps[0];
  let rowsDisplayed = !showPagination || defaultToAll ? null : viewSteps[0];

  if (initialRowsDisplayed && viewSteps) {
    rowsDisplayed = viewSteps.includes(initialRowsDisplayed)
      ? initialRowsDisplayed
      : rowsDisplayed;
  }

  const sortTableId = id ?? 'sortTable';
  const [isDesktop, setDesktop] = React.useState(
    window.innerWidth > smallScreenSize
  );
  const [tableDisplayRows, setTableDisplayRows] = React.useState(tableData);
  const [sortCol, setSortCol] = React.useState(''); // sort by this column
  const [sortAscending, setSortAscending] = React.useState(true);
  const [filterValue, setFilterValue] = React.useState('');
  const [maxNumber, setMaxNumber] = React.useState(rowsDisplayed); // aka number of rows shown at a time
  const [activePage, setActivePage] = React.useState(initialPage ?? 1);

  const updateMedia = () => {
    setDesktop(window.innerWidth > 650);
  };

  React.useEffect(() => {
    window.addEventListener('resize', updateMedia);
    return () => window.removeEventListener('resize', updateMedia);
  }, []);

  const filteredRows = React.useCallback(
    () => tableDisplayRows.filter((row) => !row.hide),
    [tableDisplayRows]
  );

  const numberOfPages = Math.ceil(
    maxNumber && maxNumber > 0 && filteredRows().length > 0
      ? filteredRows().length / maxNumber
      : 1
  );

  /* ***************************** */
  const sortTableRows = ({
    col,
    ascending,
    initialRows,
    customSort,
  }: {
    col: string;
    ascending: boolean;
    initialRows?: tableDataType[];
    customSort?: CustomSortType;
  }) => {
    if (!initialRows) {
      initialRows = tableDisplayRows;
    }
    const rows = sortRows({
      rows: initialRows,
      sortCol: col,
      sortAscending: ascending,
      customSort,
    });

    setTableDisplayRows(rows);

    setSortCol(col);
    setSortAscending(ascending);
  };
  /* ***************************** */
  const filterTableRows = (filter: string) => {
    setTableDisplayRows(
      filterRows({
        rows: tableDisplayRows,
        filterValue: filter,
        caseSensitiveFilter,
        headers,
        maxFuzzyDistance,
        exactFilterMatch,
      })
    );
    setFilterValue(filter);
  };

  /* ***************************** */

  const startRow = maxNumber ? (activePage - 1) * maxNumber : 1;

  /* ***************************** */
  const noData: JSX.Element | string = noDataMessage ?? (
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
      const col: headerType =
        initialSortColumn.sortKey ?? initialSortColumn.key;

      // TODO Clean this up so we can use the given helpers above
      sortRows({
        rows: tableDisplayRows,
        sortCol: col,
        sortAscending: !initialSortDsc,
        customSort: initialSortColumn.customSort,
        onSort: (sortedRows) => {
          setSortCol(col);
          setSortAscending(!initialSortDsc);

          if (initialFilter && initialFilter !== '') {
            const fRows = filterRows({
              rows: sortedRows,
              filterValue: initialFilter,
              caseSensitiveFilter,
              headers,
              maxFuzzyDistance,
              exactFilterMatch,
            });

            setTableDisplayRows(fRows);
            setFilterValue(initialFilter);
          } else {
            setTableDisplayRows(sortedRows);
          }
        },
      });
    }

    // We want this to only run on component load, so leaving it as []
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    onChange({
      sortedColumn: sortCol,
      sortedAscending: sortAscending,
      rowsShown: maxNumber,
      filter: filterValue,
      page: activePage,
      pages: numberOfPages,
      totalFiltered: filteredRows().length,
    });
  }, [
    activePage,
    filterValue,
    filteredRows,
    maxNumber,
    numberOfPages,
    onChange,
    sortAscending,
    sortCol,
  ]);

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
          sortTableRows({
            col,
            ascending: isSortAscending,
            customSort: header.customSort,
          });
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
      role={isResponsiveAria ? 'row' : undefined}
    >
      {headers.map((header) => (
        <th
          scope='col'
          key={header.key}
          aria-sort={setAriaSort(header.key)}
          style={header.style}
          className={`${header.className || ''} ${
            header.key === sortCol || header.sortKey === sortCol
              ? sortedCellClass
              : ''
          }`}
          role={isResponsiveAria ? 'columnheader' : undefined}
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
      role={isResponsiveAria ? 'row' : undefined}
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
              role={isResponsiveAria ? 'rowheader' : undefined}
              className={className || ''}
            >
              {data}
            </th>
          );
        }
        return (
          <td
            key={`${rowData.id}${header.key}`}
            data-sorttable-data-cell
            role={isResponsiveAria ? 'cell' : undefined}
            className={className || ''}
          >
            {isResponsiveAria ? (
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
      ? filteredRows()
      : filteredRows().slice(startRow, startRow + maxNumber);

  const buildData = () => displayRows().map((row) => buildDataRow(row));

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
          setActivePage(1);
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
    return <>{noData}</>;
  }

  return (
    <div className='container-fluid'>
      <React.Suspense fallback={<></>}>
        {isResponsiveAria ? <ResponsiveCss /> : null}

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
                  filterTableRows(a.target.value);
                }}
                label='Filter'
                id={sortTableId}
                debounceTimeout={debounceTimeout}
              />
            </div>
          ) : null}
        </div>
        <div className='row'>
          {isResponsiveAria ||
          (isResponsive && !isDesktop) ||
          isResponsiveListAlwaysShow ? (
            <SortDropDown
              headers={headers}
              selected={sortCol}
              sortAscending={sortAscending}
              onChange={(col, sortAsc) => {
                sortTableRows({ col, ascending: sortAsc });
              }}
            />
          ) : null}
          {isDesktop || !isResponsive ? (
            <Table
              caption={caption}
              tableClassName={tableClassName}
              sortTableId={sortTableId}
              isResponsiveAria={isResponsiveAria}
              isResponsive={isResponsive}
              ariaRowCount={
                showPagination || showFilter
                  ? tableDisplayRows.length + 1
                  : undefined
              }
            >
              <>
                <thead
                  className={headerClassName || ''}
                  role={isResponsiveAria ? 'rowgroup' : undefined}
                >
                  {buildHeaders}
                </thead>
                {!isLoading ? (
                  <tbody
                    role={isResponsiveAria ? 'rowgroup' : undefined}
                    data-testid='sortTableBody'
                  >
                    {buildData()}
                  </tbody>
                ) : null}
              </>
            </Table>
          ) : null}

          {(!isDesktop && isResponsive) || isResponsiveListAlwaysShow ? (
            <List headers={headers} tableData={displayRows()} />
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
                startRow={maxNumber ? startRow + 1 : 0}
                endRow={
                  maxNumber ? startRow + maxNumber : filteredRows().length
                }
                filteredTotal={filteredRows().length}
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
                numberOfPages={numberOfPages}
                activePage={activePage}
                id={sortTableId}
                onPageChange={(page) => {
                  setActivePage(page);
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
