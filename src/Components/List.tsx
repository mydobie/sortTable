import React from 'react';
import { headerDataType, tableDataType } from './SortTable';
import './responsivelist.css';

// eslint-disable-next-line @typescript-eslint/naming-convention
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
      <dt>{header.name}</dt>
      <dd>{tableData[header.key]}</dd>
    </>
  );
};

const List = (props: listProps): JSX.Element => {
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
