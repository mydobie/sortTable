/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable react/no-unescaped-entities */
import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Accordion } from 'react-bootstrap';
import SortTable, {
  tableDataType,
  headerDataType,
} from '../Components/SortTable';
import headersJson from '../sampleData/headers';
import dataJson from '../sampleData/data';

function Responsive(): JSX.Element {
  // @ts-ignore
  const headers: headerDataType[] = headersJson;
  const data: tableDataType[] = dataJson;
  return (
    <div className='container'>
      <h1>Responsive tables</h1>
      <p>
        There are two choices to make a sort table responsive. One involves
        keeping the table HTML structure, adds a series of aria-roles, and
        displays as a list on a small screen.
      </p>
      <p>
        The second method is to render a different component on screen size. The
        new component is a defintiion list so it matches what is displayed on
        the screen.
      </p>
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
        showFilter
        tableClassName='table-hover table-sm'
        emptyCellClassName='emptyCell'
        sortedCellClass='sortedCellClass'
        isResponsive
      />
      <hr />
      <h2>Responsive using modified CSS</h2>

      <SortTable
        id='sampleTable1'
        tableData={data}
        headers={headers}
        showFilter
        tableClassName='table-hover table-sm'
        emptyCellClassName='emptyCell'
        sortedCellClass='sortedCellClass'
        isResponsiveAria
      />
      <hr />

      <Accordion>
        <Accordion.Item eventKey='1'>
          <Accordion.Header>Definition list version code</Accordion.Header>
          <Accordion.Body>
            <pre>
              <code>
                &lt;SortTable <br />
                <span className='code'>headers=&#123;headers&#125;</span>
                <span className='code'>tableData=&#123;data&#125;</span>
                <span className='code'>id='sampleTable1'</span>
                <span className='code'>showFilter</span>
                <span className='code'>
                  tableClassName='table-hover table-sm'
                </span>
                <span className='code'>emptyCellClassName='emptyCell' </span>
                /&gt;
              </code>
            </pre>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey='0'>
          <Accordion.Header>Aria role code</Accordion.Header>
          <Accordion.Body>
            <pre>
              <code>
                &lt;SortTable <br />
                <span className='code'>headers=&#123;headers&#125;</span>
                <span className='code'>tableData=&#123;data&#125;</span>
                <span className='code'>id='sampleTable1'</span>
                <span className='code'>showFilter</span>
                <span className='code'>isResponsiveAria</span>
                <span className='code'>
                  tableClassName='table-hover table-sm'
                </span>
                <span className='code'>emptyCellClassName='emptyCell' </span>
                /&gt;
              </code>
            </pre>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
}

export default Responsive;
