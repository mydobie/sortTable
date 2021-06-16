import React from 'react';

interface Props {
  onClick?: (pageNumber: number | undefined) => void;
  active: boolean;
  pageNumber?: number;
  disabled?: boolean;
  isPrevious?: boolean;
  isNext?: boolean;
}
const PaginationButton = (props: Props) => {
  const { active, disabled, pageNumber, onClick, isPrevious, isNext } = props;

  let ariaLabel;
  if (isNext) {
    ariaLabel = 'Next page';
  } else if (isPrevious) {
    ariaLabel = 'Previous page';
  }
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
        aria-current={active ? 'page' : undefined}
        onClick={onClick ? () => onClick(pageNumber) : () => {}}
        disabled={disabled}
        aria-label={ariaLabel}
      >
        {isPrevious ? <span aria-hidden='true'>&laquo;</span> : null}
        {isNext ? <span aria-hidden='true'>&raquo;</span> : null}
        {!isPrevious && !isNext ? (
          <>
            <span className='sr-only visually-hidden'>page </span>
            {pageNumber}
          </>
        ) : null}
      </button>
    </li>
  );
};

export default PaginationButton;
