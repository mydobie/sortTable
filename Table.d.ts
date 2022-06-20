/// <reference types="react" />
declare const Table: ({ tableClassName, sortTableId, isResponsiveAria, isResponsive, ariaRowCount, caption, children, }: {
    tableClassName: string | undefined;
    sortTableId: string;
    isResponsiveAria: boolean | undefined;
    isResponsive: boolean | undefined;
    ariaRowCount: number | undefined;
    caption: string | undefined;
    children: JSX.Element;
}) => JSX.Element;
export default Table;
