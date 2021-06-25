import React from 'react';
import { headerDataType, tableDataType } from './SortTable';

type listProps = {
  headers: headerDataType[];
  tableData: tableDataType[];
};

const ListRow = (props: {
  header: headerDataType;
  tableData: tableDataType;
}) => {
  const { header, tableData } = props;
  return (
    <>
      <dt className='float-left float-start'>{header.name}</dt>
      <dd>{tableData[header.key]}</dd>
    </>
  );
};

const List = (props: listProps) => {
  const { headers, tableData } = props;

  return (
    <div data-sort-responsive-list>
      {tableData.map((row) => (
        <dl key={row.id}>
          {headers.map((header) => (
            <ListRow header={header} tableData={row} key={header.key} />
          ))}
        </dl>
      ))}
    </div>
  );
};

export default List;
