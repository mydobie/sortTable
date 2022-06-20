/// <reference types="react" />
export declare type SortType = 'size' | 'alpha' | 'number' | 'sortable';
interface Props {
    sortAsc?: boolean;
    color?: string;
    size?: number;
    type?: SortType;
}
declare const SortIcons: ({ sortAsc, color, size, type, }: Props) => JSX.Element;
export default SortIcons;
