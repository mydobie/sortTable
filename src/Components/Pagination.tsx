/* eslint-disable no-console */
import React, { useEffect } from 'react';
import Page from './Page';
import './pagination.css';

interface Props {
  numberOfPages: number;
  activePage: number;
  onPageChange: (newPageNumber: number) => void;
  id: string;
}

const Pagination = (props: Props): JSX.Element | null => {
  const { activePage = 1, numberOfPages, onPageChange, id } = props;
  // const [activePage, setActivePage] = React.useState(initialActivePage);

  useEffect(() => {
    if (activePage > numberOfPages) {
      onPageChange(numberOfPages);
    }
    if (activePage < 1) {
      onPageChange(1);
    }
  }, [activePage, numberOfPages, onPageChange]);

  if (numberOfPages < 1) {
    console.warn('Number of pagination pages is less than 1');
  }

  const maxNumberOfPages = 10;

  if (numberOfPages <= 1) {
    return null;
  }

  const setPages = () => {
    const pages = [];
    for (let i = 1; i <= numberOfPages; i += 1) {
      pages.push(
        <Page
          pageNumber={i}
          key={i}
          active={activePage === i}
          onClick={() => {
            onPageChange(i);
          }}
        />
      );
    }
    return pages;
  };

  const setSelect = () => {
    const options = [];
    for (let i = 1; i <= numberOfPages; i += 1) {
      options.push(
        <option value={i} key={i}>
          {i}
        </option>
      );
    }
    return (
      <li>
        <select
          className='form-select form-select-sm custom-select custom-select-sm'
          style={{ width: '6em' }}
          onChange={(event) => onPageChange(parseInt(event.target.value, 10))}
          value={activePage}
          aria-label='Show page number'
          data-pagination-select
        >
          {options}
        </select>
      </li>
    );
  };

  return (
    <div>
      <div className='text-right text-end' data-skip-pagination-wrapper>
        <a href={`#${id}EndPagination`} data-skip-pagination-link>
          Skip pagination
        </a>
      </div>
      <nav aria-label='Table pagination'>
        <ul
          className='pagination pagination-sm justify-content-end'
          data-pagination
        >
          <Page
            active={activePage === 0}
            disabled={activePage <= 1}
            onClick={() => {
              onPageChange(activePage - 1);
            }}
            isPrevious
          />
          {numberOfPages > maxNumberOfPages ? setSelect() : setPages()}

          <Page
            active={activePage === numberOfPages + 1}
            disabled={activePage >= numberOfPages}
            onClick={() => {
              onPageChange(activePage + 1);
            }}
            isNext
          />
        </ul>
      </nav>
      <div id={`${id}EndPagination`} />
    </div>
  );
};

export default Pagination;
