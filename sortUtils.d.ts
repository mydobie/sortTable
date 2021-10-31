import { tableDataType, headerDataType } from './SortTable';
export declare const sortRows: ({ rows, sortCol, sortAscending, onSort, }: {
    rows: tableDataType[];
    sortCol: string;
    sortAscending: boolean | null;
    onSort?: ((sortRows: tableDataType[]) => void | undefined) | undefined;
}) => tableDataType[];
export declare const filterRows: ({ rows, filterValue, caseSensitiveFilter, headers, useFuzzySearch, maxFuzzyDistance, }: {
    rows: tableDataType[];
    filterValue: string;
    caseSensitiveFilter: boolean | undefined;
    headers: headerDataType[];
    useFuzzySearch: boolean | undefined;
    maxFuzzyDistance: number;
}) => tableDataType[];
export declare const displayRows: ({ sortedAndFilteredRows, activePage, numberPerPage, }: {
    sortedAndFilteredRows: tableDataType[];
    activePage: number | null;
    numberPerPage: number | null;
}) => tableDataType[];
export declare const sortDirectionString: (col: string, sortCol: string, sortAscending: boolean) => 'ascending' | 'descending' | 'none' | 'other' | undefined;
