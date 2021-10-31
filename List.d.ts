/// <reference types="react" />
import { headerDataType, tableDataType } from './SortTable';
import './responsivelist.css';
declare type listProps = {
    headers: headerDataType[];
    tableData: tableDataType[];
    isResponsiveListAlwaysShow?: boolean;
};
declare const List: (props: listProps) => JSX.Element;
export default List;
