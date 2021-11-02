import React from 'react';

interface TableSummaryProps {
  totalEntries: number;
  startRow?: number;
  endRow?: number;
  filteredTotal?: number;
  sortColumn?: string;
  sortDirection?: string;
}

const TableSummary = (props: TableSummaryProps): JSX.Element => {
  const {
    totalEntries, // total number of rows in table (when unfiltered and not  paginated)
    startRow,
    endRow,
    filteredTotal, // Subset of entries that can be shown
    sortColumn,
    sortDirection,
  } = props;

  let endingRow = endRow;
  const totalShowableRows = filteredTotal ?? totalEntries;

  if (endRow) {
    if (filteredTotal && endRow > filteredTotal) {
      endingRow = filteredTotal;
    }
    // else if (endRow > totalEntries) {
    // endingRow = totalEntries;
    // }
  }
  let displayString =
    startRow &&
    endingRow &&
    totalShowableRows !== 0 &&
    !(startRow === 1 && endingRow === totalShowableRows)
      ? `${startRow} - ${endingRow} of `
      : '';
  displayString += `${totalShowableRows} `;
  displayString += totalShowableRows === 1 ? 'entry' : 'entries';

  displayString +=
    filteredTotal !== undefined && filteredTotal < totalEntries
      ? ` (filtered from ${totalEntries})`
      : '';

  displayString += '.';
  displayString +=
    sortColumn && sortDirection
      ? ` ${sortColumn} sorted ${sortDirection}.`
      : '';
  return <span>{displayString}</span>;
};

export default TableSummary;
