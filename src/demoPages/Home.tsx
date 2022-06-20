/* eslint-disable react/no-unescaped-entities */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Accordion } from 'react-bootstrap';
import SortTable, {
  tableDataType,
  headerDataType,
} from '../Components/SortTable';
import headersJson from '../sampleData/headers';
import dataJson from '../sampleData/data';

function Home(): JSX.Element {
  const [loading, setLoading] = React.useState(true);
  // @ts-ignore
  const headers: headerDataType[] = headersJson;
  const data: tableDataType[] = dataJson;

  React.useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  return (
    <>
      <h1>Sample Filtering and Sorting Table</h1>
      <p>
        This is a lightweight replacement for the jQuery DataTables. Easily
        supports: pagination, filtering, sorting. All styling is based on
        Bootstrap.
      </p>
      {/* <div>
        <pre>{JSON.stringify(dataJson, null, 2)}</pre>
      </div> */}

      <SortTable
        tableData={data}
        headers={headers}
        initialSort='name'
        showFilter
        showPagination
        tableClassName='table-hover table-sm'
        sortedCellClass='sortedCell'
        emptyCellClassName='emptyCell'
        defaultToAll
        isLoading={loading}
      />

      <Accordion>
        <Accordion.Item eventKey='0'>
          <Accordion.Header>View React code</Accordion.Header>
          <Accordion.Body>
            <pre>
              <code>
                &lt;SortTable <br />
                <span className='code'>headers=&#123;headers&#125;</span>
                <span className='code'>tableData=&#123;data&#125;</span>
                <span className='code'>initialSort='name'</span>
                <span className='code'>showFilter</span>
                <span className='code'>showPagination</span>
                <span className='code'>
                  tableClassName='table-hover table-sm'
                </span>
                <span className='code'>defaultToAll</span>
                <span className='code'>emptyCellClassName='emptyCell' </span>
                <span className='code'>isLoading=&#123;loading&#125;</span>
                /&gt;
              </code>
            </pre>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey='1'>
          <Accordion.Header>View demo css</Accordion.Header>
          <Accordion.Body>
            <pre>
              <code>
                .sortedCell&#123;
                <span className='code'>
                  background-color:#cece6c30 !important
                </span>
                &#125;
                <br />
                .emptyCell:after &#123;
                <span className='code'>content: '-';</span>
                <span className='code'>color: #6e6e6e;</span>
                &#125;
              </code>
            </pre>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  );
}

export default Home;
