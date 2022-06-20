import { tableDataType, headerDataType, CustomSortType } from './SortTable';
export declare const sortRows: ({ rows, sortCol, sortAscending, onSort, customSort, }: {
    rows: tableDataType[];
    sortCol: string;
    sortAscending: boolean | null;
    onSort?: ((sortRows: tableDataType[]) => void | undefined) | undefined;
    customSort?: CustomSortType | undefined;
}) => tableDataType[];
export declare const filterRows: ({ rows, filterValue, caseSensitiveFilter, headers, maxFuzzyDistance, exactFilterMatch, }: {
    rows: tableDataType[];
    filterValue: string;
    caseSensitiveFilter: boolean | undefined;
    headers: headerDataType[];
    maxFuzzyDistance: number;
    exactFilterMatch: boolean | undefined;
}) => tableDataType[];
export declare const displayRows: ({ sortedAndFilteredRows, activePage, numberPerPage, }: {
    sortedAndFilteredRows: tableDataType[];
    activePage: number | null;
    numberPerPage: number | null;
}) => tableDataType[];
export declare const sortDirectionString: (col: string, sortCol: string, sortAscending: boolean) => 'ascending' | 'descending' | 'none' | 'other' | undefined;
