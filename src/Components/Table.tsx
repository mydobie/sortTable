/* eslint-disable arrow-body-style */
import React from 'react';

const Table = ({
  tableClassName,
  sortTableId,
  isResponsive,
  isResponsiveList,
  ariaRowCount,
  caption,
  children,
}: {
  tableClassName: string | undefined;
  sortTableId: string;
  isResponsive: boolean | undefined;
  isResponsiveList: boolean | undefined;
  ariaRowCount: number | undefined;
  caption: string | undefined;
  children: JSX.Element;
}) => {
  return (
    <table
      className={`table ${tableClassName || ''}`}
      id={sortTableId}
      aria-describedby={`${sortTableId}RowsShownSummary`}
      aria-rowcount={ariaRowCount}
      data-sort-responsive={(isResponsive && !isResponsiveList) ?? undefined}
      data-sort-responsive-has-list={isResponsiveList ?? undefined}
      role={isResponsive ? 'table' : undefined}
    >
      {caption ? <caption>{caption}</caption> : null}
      {children}
    </table>
  );
};

export default Table;
