/* eslint-disable react/no-unescaped-entities */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Accordion } from 'react-bootstrap';
import { tableDataType, headerDataType } from '../Components/SortTable';
import headersJson from '../sampleData/headers';
import dataJson from '../sampleData/data';

function JSONData(): JSX.Element {
  // @ts-ignore
  const headers: headerDataType[] = headersJson;
  const data: tableDataType[] = dataJson;

  return (
    <>
      <h1>JSON used for demo tables</h1>
      <p>
        For more information exactly how the data should be formatted, see the
        GitHub readme.
      </p>
      {/* <div>
        <pre>{JSON.stringify(dataJson, null, 2)}</pre>
      </div> */}

      <Accordion>
        <Accordion.Item eventKey='0'>
          <Accordion.Header>Header JSON</Accordion.Header>
          <Accordion.Body>
            <pre>
              <code>{JSON.stringify(headers, null, 2)}</code>
            </pre>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey='1'>
          <Accordion.Header>Data JSON</Accordion.Header>
          <Accordion.Body>
            <pre>
              <code>{JSON.stringify(data, null, 2)}</code>
            </pre>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  );
}

export default JSONData;
