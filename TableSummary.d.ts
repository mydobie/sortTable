/// <reference types="react" />
interface TableSummaryProps {
    totalEntries: number;
    startRow?: number;
    endRow?: number;
    filteredTotal?: number;
    sortColumn?: string;
    sortDirection?: string;
}
declare const TableSummary: (props: TableSummaryProps) => JSX.Element;
export default TableSummary;
