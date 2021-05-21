import React from 'react';
import Page from './Page';

interface Props {
  numberOfPages: number;
  initialActivePage: number;
  onPageChange: (newPageNumber: number) => void;
}

const CustomPagination = (props: Props) => {
  const { initialActivePage, numberOfPages, onPageChange } = props;
  const [activePage, setActivePage] = React.useState(initialActivePage);
  const pages = [];

  React.useEffect(() => {
    onPageChange(activePage);
  }, [activePage, onPageChange]);

  for (let i = 1; i <= numberOfPages; i += 1) {
    pages.push(
      <Page
        pageNumber={i}
        active={activePage === i}
        onClick={() => {
          setActivePage(i);
        }}
      />
    );
  }
  return (
    <nav aria-label='Table pagination'>
      <ul className='pagination justify-content-end'>
        <Page
          label='Previous'
          pageNumber={0}
          active={activePage === 0}
          disabled={activePage <= 1}
          onClick={() => {
            setActivePage(activePage - 1);
          }}
        />
        {pages}

        <Page
          label='Next'
          pageNumber={numberOfPages + 1}
          active={activePage === numberOfPages + 1}
          disabled={activePage >= numberOfPages}
          onClick={() => {
            setActivePage(activePage + 1);
          }}
        />
      </ul>
    </nav>
  );
};

export default CustomPagination;
