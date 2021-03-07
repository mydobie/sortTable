/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
// List all the components you want users to be able to call

import React from 'react';
import STable from './SortTable';

// /* *********************************************************************************************************** */
// EXAMPLE - SINGLE COMPONENT
// There is only one component available.
// When called, an import like this would be used:
//    import MyComponent from 'MyComponent'

const SortTable = (props) => <STable {...props} />;

export default SortTable;
