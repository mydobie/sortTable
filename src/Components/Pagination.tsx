import React from 'react';
import Page from './Page';
import './pagination.css';

interface Props {
  numberOfPages: number;
  initialActivePage: number;
  onPageChange: (newPageNumber: number) => void;
  id: string;
}

const CustomPagination = (props: Props) => {
  const { initialActivePage, numberOfPages, onPageChange, id } = props;
  const [activePage, setActivePage] = React.useState(initialActivePage);
  const pages = [];

  React.useEffect(() => {
    onPageChange(activePage);
  }, [activePage, onPageChange]);

  React.useEffect(() => {
    setActivePage(1);
    onPageChange(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numberOfPages]);

  for (let i = 1; i <= numberOfPages; i += 1) {
    pages.push(
      <Page
        pageNumber={i}
        key={i}
        active={activePage === i}
        onClick={() => {
          setActivePage(i);
        }}
      />
    );
  }

  return (
    <div className='position-relative'>
      <a
        href={`#${id}EndPagination`}
        data-skip-pagination-link
        className='position-absolute top-0 start-100'
      >
        Skip pagination
      </a>

      <nav aria-label='Table pagination'>
        <ul
          className='pagination pagination-sm justify-content-end'
          data-pagination
        >
          <Page
            active={activePage === 0}
            disabled={activePage <= 1}
            onClick={() => {
              setActivePage(activePage - 1);
            }}
            isPrevious
          />
          {pages}

          <Page
            active={activePage === numberOfPages + 1}
            disabled={activePage >= numberOfPages}
            onClick={() => {
              setActivePage(activePage + 1);
            }}
            isNext
          />
        </ul>
      </nav>
      <div id={`${id}EndPagination`} />
    </div>
  );
};

export default CustomPagination;

// .visually-hidden
