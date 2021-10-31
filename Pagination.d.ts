/// <reference types="react" />
import './pagination.css';
interface Props {
    numberOfPages: number;
    activePage: number;
    onPageChange: (newPageNumber: number) => void;
    id: string;
}
declare const Pagination: (props: Props) => JSX.Element | null;
export default Pagination;
