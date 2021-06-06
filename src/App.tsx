import React from 'react';
import SortTable from './Components/SortTable';

function App() {
  const headers = [
    {
      name: 'Product Name',
      key: 'name',
      type: 'alpha',
      rowheader: true,
      style: { width: '150px' },
    },
    { name: 'Price', key: 'price', className: 'priceRow' },
    { name: 'Stock', key: 'stock' },
    { name: 'Month', key: 'month', sortKey: 'monthValue' },
    { name: 'Link', key: 'url', noSort: true, noFilter: true },
  ];

  const data = [
    {
      id: 1,
      name: 'Cheese',
      price: '$4.90',
      stock: 20,
      month: 'June',
      monthValue: 6,
    },
    {
      id: 2,
      name: 'Milk',
      price: '$1.90',
      stock: 4,
      month: 'April',
      monthValue: 4,
    },
    {
      id: 3,
      name: 'Yoghurt',
      price: '$2.40',
      stock: 12,
      month: 'June',
      monthValue: 6,
    },
    {
      id: 4,
      name: 'Heavy Cream',
      price: '$3.90',
      stock: 9,
      month: 'June',
      monthValue: 6,
    },
    {
      id: 5,
      name: 'Butter',
      price: '$0.90',
      stock: 99,
      month: 'March',
      monthValue: 3,
    },
    {
      id: 6,
      name: 'Sour Cream ',
      price: '$2.90',
      stock: 86,
      url: <a href='https://umn.edu'>Link to UMN</a>,
      month: 'March',
      monthValue: 3,
    },
    {
      id: 7,
      name: 'Fancy French Cheese',
      price: '$99.0',
      stock: 12,
      month: 'April',
      monthValue: 4,
    },
  ];

  return (
    <div>
      <h1>Sample Filtering and Sorting Table</h1>
      <h2>Bootstrap version:</h2>
      <SortTable
        tableData={data}
        headers={headers}
        initialSort='name'
        showFilter
        showPagination
        viewSteps={[2, 4, 50]}
        caption='Store inventory'
        tableClassName='table-hover table-sm'
        defaultToAll
      />
      <hr />
      <ul>
        <li>
          <strong>Project Name:</strong>
          {process.env.REACT_APP_NAME}
        </li>
        <li>
          <strong>Project Version:</strong>
          {process.env.REACT_APP_VERSION}
        </li>
        <li>
          <strong>Git Commit:</strong>
          {process.env.REACT_APP_GIT_SHA}
        </li>
      </ul>
      <a href='https://google.com'>Sample link to google</a>
    </div>
  );
}

export default App;
