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
