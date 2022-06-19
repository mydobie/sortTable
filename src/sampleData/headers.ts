export default [
  { name: 'Product Name', key: 'name', type: 'alpha', rowheader: true },
  {
    name: 'Price',
    key: 'price',
    className: 'myCustomPriceClass',
    customSort: (a: string, b: string) => {
      const aDollar = a.replace(/[^0-9.]/g, '');
      const bDollar = b.replace(/[^0-9.]/g, '');

      if (aDollar === bDollar) {
        return 0;
      }
      return Number(aDollar) > Number(bDollar) ? 1 : -1;
    },
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
