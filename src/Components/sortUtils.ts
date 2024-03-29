/* eslint-disable no-console */
import { distance } from 'fastest-levenshtein';
import { tableDataType, headerDataType, CustomSortType } from './SortTable';

const defaultSort = (a: string | number, b: string | number) => {
  if (a === b) {
    return 0;
  }
  return a === undefined || a > b ? 1 : -1;
};

export const sortRows = ({
  rows,
  sortCol,
  sortAscending,
  onSort = () => {},
  customSort,
}: {
  rows: tableDataType[];
  sortCol: string;
  sortAscending: boolean | null;
  onSort?: (sortRows: tableDataType[]) => void | undefined;
  customSort?: CustomSortType;
}): tableDataType[] => {
  const sortedRows = [...rows]
    // eslint-disable-next-line arrow-body-style
    .sort((a, b) => {
      return customSort
        ? customSort(a[sortCol], b[sortCol])
        : defaultSort(a[sortCol], b[sortCol]);
    })
    .map((row, index) => ({ ...row, rowindex: index + 2 }));

  if (!sortAscending) {
    sortedRows.reverse();
  }

  onSort(sortedRows);
  return sortedRows;
};

export const filterRows = ({
  rows,
  filterValue = '',
  caseSensitiveFilter = false,
  headers,
  maxFuzzyDistance,
  exactFilterMatch,
}: {
  rows: tableDataType[];
  filterValue: string;
  caseSensitiveFilter: boolean | undefined;
  headers: headerDataType[];
  maxFuzzyDistance: number;
  exactFilterMatch: boolean | undefined;
}): tableDataType[] => {
  const filterText =
    caseSensitiveFilter === true ? filterValue : filterValue.toLowerCase();

  const newTableDisplayRows = [...rows];
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
          (!exactFilterMatch &&
            distance(value, filterText) <= maxFuzzyDistance) ||
          value.includes(filterText)
        ) {
          newTableDisplayRows[index].hide = false;
        }
      }
    });
  });

  return rows;
};

export const displayRows = ({
  sortedAndFilteredRows,
  activePage,
  numberPerPage,
}: {
  sortedAndFilteredRows: tableDataType[];
  activePage: number | null;
  numberPerPage: number | null;
}): tableDataType[] => {
  if (activePage === null || numberPerPage === null) {
    return sortedAndFilteredRows;
  }
  const startIndex = (activePage - 1) * numberPerPage;
  const endIndex = startIndex + numberPerPage;
  const newRows = sortedAndFilteredRows.slice(startIndex, endIndex);
  return newRows;
};

export const sortDirectionString = (
  col: string,
  sortCol: string,
  sortAscending: boolean
): 'ascending' | 'descending' | 'none' | 'other' | undefined => {
  if (col !== sortCol) {
    return undefined;
  }
  return sortAscending ? 'ascending' : 'descending';
};
