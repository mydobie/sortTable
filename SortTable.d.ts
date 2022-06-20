/// <reference types="react" />
import { SortType } from './SortIcons';
import './sortTable.css';
export declare const sortTableVersion: string | undefined;
export declare type tableDataType = {
    [key: string]: any;
    id: string | number;
    hidden?: boolean;
    rowindex?: number;
};
export declare type CustomSortType = (a: any, b: any) => 0 | 1 | -1;
export declare type headerType = string;
export declare type headerDataType = {
    name: string;
    key: headerType;
    className?: string;
    noFilter?: boolean;
    noSort?: boolean;
    rowheader?: boolean;
    sortKey?: headerType;
    style?: Object;
    type?: SortType;
    customSort?: CustomSortType;
};
interface Props {
    headers: headerDataType[];
    tableData: tableDataType[];
    allDataFilteredMessage?: JSX.Element | string;
    caption?: string;
    initialFilter?: string;
    initialPage?: number;
    initialRowsDisplayed?: number;
    initialSort?: headerType;
    initialSortDsc?: boolean;
    isLoadingMessage?: JSX.Element | string;
    noDataMessage?: JSX.Element | string;
    viewSteps?: number[];
    caseSensitiveFilter?: boolean;
    dangerouslySetInnerHTML?: boolean;
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
    onChange?: (props: {
        sortedColumn: headerType;
        sortedAscending: boolean;
        rowsShown: number | null;
        filter: string;
        page: number;
        pages: number;
        totalFiltered: number;
    }) => void;
    debounceTimeout?: number;
    isResponsiveListAlwaysShow?: boolean;
    maxFuzzyDistance?: number;
}
declare const SortTable: (props: Props) => JSX.Element;
export default SortTable;
