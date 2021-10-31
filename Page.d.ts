/// <reference types="react" />
interface Props {
    onClick?: (pageNumber: number | undefined) => void;
    active: boolean;
    pageNumber?: number;
    disabled?: boolean;
    isPrevious?: boolean;
    isNext?: boolean;
}
declare const PaginationButton: (props: Props) => JSX.Element;
export default PaginationButton;
