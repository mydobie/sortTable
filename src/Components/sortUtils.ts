/* eslint-disable no-console */
import { distance } from 'fastest-levenshtein';
import { tableDataType, headerDataType } from './SortTable';

export const sortRows = ({
  rows,
  sortCol,
  sortAscending,
  onSort = () => {},
}: {
  rows: tableDataType[];
  sortCol: string;
  sortAscending: boolean | null;
  onSort?: (sortRows: tableDataType[]) => void | undefined;
}): tableDataType[] => {
  const sortedRows = [...rows]
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

  onSort(sortedRows);
  return sortedRows;
};

export const filterRows = ({
  rows,
  filterValue = '',
  caseSensitiveFilter = false,
  headers,
  useFuzzySearch = true,
  maxFuzzyDistance,
}: {
  rows: tableDataType[];
  filterValue: string;
  caseSensitiveFilter: boolean | undefined;
  headers: headerDataType[];
  useFuzzySearch: boolean | undefined;
  maxFuzzyDistance: number;
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
          (useFuzzySearch && distance(value, filterText) <= maxFuzzyDistance) ||
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
