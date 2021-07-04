import React from 'react';
import { headerDataType, tableDataType } from './SortTable';
import './responsivelist.css';

type listProps = {
  headers: headerDataType[];
  tableData: tableDataType[];
  // eslint-disable-next-line react/require-default-props
  isResponsiveListAlwaysShow?: boolean;
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
  const { headers, tableData, isResponsiveListAlwaysShow } = props;

  return (
    <div
      data-sort-responsive-list
      data-sort-responsive-list-always-show={isResponsiveListAlwaysShow}
    >
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
