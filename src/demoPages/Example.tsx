import React from 'react';
import SortTable, {
  tableDataType,
  headerDataType,
  sortTableVersion,
} from '../Components/SortTable';

import './app.css';

const dollarSort = (a: string, b: string) => {
  const aDollar = a.replace(/[^0-9.]/g, '');
  const bDollar = b.replace(/[^0-9.]/g, '');

  if (aDollar === bDollar) {
    return 0;
  }
  return Number(aDollar) > Number(bDollar) ? 1 : -1;
};

function App(): JSX.Element {
  const headers: headerDataType[] = [
    { name: 'Product Name', key: 'name', type: 'alpha', rowheader: true },
    {
      name: 'Price',
      key: 'price',
      className: 'myCustomPriceClass',
      customSort: dollarSort,
    },

    {
      name: 'Stock',
      key: 'stock',
      type: 'number',
      noFilter: true,
    },
    {
      name: 'Sale day',
      key: 'day',
      type: 'size',
      sortKey: 'saledaynum',
    },
    {
      name: 'Link',
      key: 'url',
      noSort: true,
      noFilter: true,
      style: { color: 'purple' },
    },
  ];
  const data: tableDataType[] = [
    {
      id: 1,
      name: 'Cheese',
      price: '$4.90',
      stock: 20,
      day: 'Friday',
      saledaynum: 5,
      url: '',
    },
    {
      id: 2,
      name: 'Milk',
      price: '$1.90',
      stock: 4,
      day: 'Monday',
      saledaynum: 1,
    },
    {
      id: 3,
      name: 'Yoghurt',
      price: '$2.40',
      stock: 12,
      day: 'Thursday',
      saledaynum: 4,
    },
    {
      id: 4,
      name: 'Heavy Cream',
      price: '$3.90',
      stock: 9,
      day: 'Tuesday',
      saledaynum: 2,
    },
    {
      id: 5,
      name: 'Butter',
      price: '$0.90',
      stock: 99,
      day: 'Wednesday',
      saledaynum: 3,
    },
    {
      id: 6,
      name: 'Sour Cream',
      price: '$2.90',
      stock: 86,
      day: 'Saturday',
      saledaynum: 6,
    },
    {
      id: 7,
      name: 'Fancy French Cheese',
      price: '$99.0',
      stock: 15,
      url: <a href='https://google.com'>hello google</a>,
      day: 'Sunday',
      saledaynum: 0,
    },
    { id: 8, name: 'Eggs', price: '$1.90', stock: 86 },
    {
      id: 9,
      name: 'Ricotta Cheese',
      price: '$3.99',
      stock: 6,
      day: 'Saturday',
      saledaynum: 6,
    },
    { id: 10, name: 'Frozen Custard', price: '$5.50', stock: 11 },
    {
      id: 11,
      name: 'Whey Powder',
      price: '$15.90',
      stock: 8,
      day: 'Wednesday',
      saledaynum: 3,
    },
  ];

  const [bootstrap, setBootstrap] = React.useState(null);

  React.useEffect(() => {
    const getVersions = async () => {
      try {
        fetch('/sortTable/versions.json')
          .then((res) => res.json())
          .then((response) => {
            const versions = response;

            if (versions) {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              setBootstrap(versions.bootstrap);
            } else {
              throw Error('Uncaught Error');
            }
          })
          .catch(() => {
            // eslint-disable-next-line no-console
            console.log('Error finding versions file');
          });
      } catch (_error) {
        // eslint-disable-next-line no-console
        console.log('Error finding versions file');
      }
    };
    getVersions();
  }, []);
  return (
    <div className='container'>
      <h1>Sample Filtering and Sorting Table</h1>
      <p>
        This is the demo page for a React sort table component. See the{' '}
        <a href='https://github.com/mydobie/sortTable'>Github page</a> for more
        information.
      </p>
      <hr />
      <h2>Responsive using modified CSS</h2>
      <p>
        This table has sorting, filter, and pagination enable. To assist users
        to know what column is sorted, the sorted cells have a custom CSS
        applied. On screens less than 700px, custom CSS will be applied to
        display the table to appear as if it is a list.
      </p>
      <SortTable
        id='sampleTable1'
        tableData={data}
        headers={headers}
        initialSort='name'
        initialSortDsc
        showFilter
        showPagination
        viewSteps={[1, 2, 4, 50]}
        caption='Store inventory'
        tableClassName='table-hover table-sm'
        defaultToAll
        isResponsive
        emptyCellClassName='emptyCell'
        sortedCellClass='sortedCellClass'
        initialPage={2}
        initialFilter='cheese'
        initialRowsDisplayed={2}
        allDataFilteredMessage='My custom all filtered message'
        onChange={(changeData) => {
          // eslint-disable-next-line no-console
          console.log(changeData);
        }}
      />
      <hr />
      <h2>Responsive using definition list</h2>
      <p>
        On screens less than 600px, the table will be hidden and a definition
        list will be shown instead.
      </p>
      <SortTable
        id='sampleTable2'
        tableData={data}
        headers={headers}
        initialSort='month'
        caption='Store inventory'
        tableClassName='table-hover table-sm'
        isResponsive
      />
      <hr />
      <ul>
        <li>
          <strong>Project Name: </strong>
          {process.env.REACT_APP_NAME}
        </li>
        <li>
          <strong>Project Version: </strong>
          {sortTableVersion}
        </li>
        <li>
          <strong>Git Commit: </strong>
          {process.env.REACT_APP_GIT_SHA}
        </li>
        <li>
          <strong>React Version: </strong>
          {React.version}
        </li>
        <li>
          <strong>Bootstrap Version: </strong>
          {bootstrap}
        </li>
      </ul>
    </div>
  );
}

export default App;
