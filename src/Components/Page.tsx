import React from 'react';

interface Props {
  onClick?: (pageNumber: number) => void;
  active: boolean;
  pageNumber: number;
  label?: string;
  disabled?: boolean;
  isPrevious?: boolean;
  isNext?: boolean;
}
const PaginationButton = (props: Props) => {
  const { active, disabled, label, pageNumber, onClick, isPrevious, isNext } =
    props;

  return (
    <li
      className={`page-item ${disabled ? 'disabled' : ''} ${
        active ? 'active' : ''
      }`}
      data-pagination-previous-button={isPrevious}
      data-pagination-next-button={isNext}
      data-pagination-button={!isNext && !isPrevious ? true : undefined}
    >
      <button
        type='button'
        className={`page-link ${active ? 'active' : ''}`}
        aria-current={active ? 'page' : 'false'}
        onClick={onClick ? () => onClick(pageNumber) : () => {}}
        disabled={disabled}
      >
        {label || pageNumber}
      </button>
    </li>
  );
};

export default PaginationButton;
