/* eslint-disable arrow-body-style */
import React from 'react';

const Table = ({
  tableClassName,
  sortTableId,
  isResponsiveAria,
  isResponsive,
  ariaRowCount,
  caption,
  children,
}: {
  tableClassName: string | undefined;
  sortTableId: string;
  isResponsiveAria: boolean | undefined;
  isResponsive: boolean | undefined;
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
      data-sort-responsive={isResponsiveAria ?? undefined}
      data-sort-responsive-has-list={isResponsive ?? undefined}
      role={isResponsiveAria ? 'table' : undefined}
    >
      {caption ? <caption>{caption}</caption> : null}
      {children}
    </table>
  );
};

export default Table;
