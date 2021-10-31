import { ReactElement } from 'react';
import { headerDataType, headerType } from './SortTable';
declare type SortDropDownProps = {
    headers: headerDataType[];
    selected?: headerType | null;
    onChange?: (columnKey: headerType, sortAscending: boolean) => void;
    sortAscending?: boolean | null;
    id?: string;
};
declare const SortDropDown: (props: SortDropDownProps) => ReactElement;
export default SortDropDown;
