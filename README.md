# React Sort Table

## Description

This is a lightweight replacement for the jQuery DataTables. The following options are supported:

- Pagination
- Filtering
- Sorting by column

[See a sort table in action](https://mydobie.github.io/sortTable/)

## Getting Started - Adding this component to your project

There are three methods of including this into your project.

### Method 1 create and use tgz file

1.  Clone this project.
1.  Run `npm run buildPackage` to build and tar the component.

The above steps will create a `.tgz` file in the root of this project. Move this `.tgz` file into your project. Add the path to the`.tgz` file to your `package.json` file:

```
dependencies: {
  "feature_flags": "file:/"path_to_tgz_file.tgz",
}
```

Then run `npm install`.

### Method 2 download tgz file from GitHub

1. Go to the [package page](https://github.com/mydobie/featureFlags/packages?ecosystem=npm) for this project and download the wanted version of the `.tgz` file.
1. Save the downloaded `.tgz` file into your project.
1. Add the path to the`.tgz` file to your `package.json` file:

```
dependencies: {
  "feature_flags": "file:/"path_to_tgz_file.tgz",
}
```

Then run `npm install`.

### Method 3 use GitHubs npm repository

Instead of creating or downloading the `.tgz` file, you can have NPM pull this module as if it were any other module. This process has been documented in the [README_GITHUB](README_GITHUB.md) file.

---

## Using this component(s)

### Requirements

In order to use these components, you need to ensure that the following are in your package.json file and installed.

- react
- react-dom

#### CSS

This component is configured to use the Bootstrap CSS for styling. The CSS is available at the [Bootstrap CDN](https://www.bootstrapcdn.com/) or by downloading the [Bootstrap SCSS.](https://getbootstrap.com/docs/5.0/getting-started/download/). Note that both Bootstrap 4 and 5 are supported.

### Including this component

On the React file that you want to use the web components, include the modules you want to use. For example:

```
import  SortTable  from 'sort-table';
```

Then use the component as a normal React component:

```
<SortTable
        tableData={data}
        headers={headers}
        initialSort='name'
        showFilter
        showPagination
        defaultToAll
      />

```

---

## Component Details

The following props are available to be sent to the `SortTable` component:

<table>
  <tr>
    <th>Name</th>
    <th>Type</th>
    <th>Required</th>
    <th>Default</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>headers</td>
    <td>headerDataType[]</td>
    <td>yes[]</td>
    <td></td>
    <td>Array of data to be used to build the column headers.  See the "Headers" section below for details.</td>
  </tr>
  <tr>
    <td>tableData</td>
    <td>tableDataType[]</td>
    <td>yes</td>
    <td></td>
    <td>Array of data to be displayed in the table.  See the "Data" section below for details.</td>
  </tr>
  <tr>
    <td>allDataFilteredMessage</td>
    <td>JSX.Element</td>
    <td>no</td>
    <td>"No data meets filtering criteria"</td>
    <td>If all data is filtered, message or component to be displayed.</td>
  </tr>
  <tr>
    <td>caption</td>
    <td>string</td>
    <td>no</td>
    <td>[not shown]</td>
    <td>Sets table caption to this string.</td>
  </tr>
  <tr>
    <td>caseSensitiveFilater</td>
    <td>boolean</td>
    <td>no</td>
    <td>false</td>
    <td>Is the filtering case sensitive.</td>
  </tr>
  <tr>
    <td>dangerouslySetInnerHTML</td>
    <td>boolean</td>
    <td>no</td>
    <td>false</td>
    <td>Should html provided in the tableData array be rendered as HTML.  This option should rarely be used and only with data that is not entered by users.</td>
  </tr>
  <tr>
    <td>defaultToAll</td>
    <td>boolean</td>
    <td>no</td>
    <td>false</td>
    <td>If pagination and viewSteps are provided, should the table default to showing all entries.</td>
  </tr>
  <tr>
    <td>headerClassName</td>
    <td>string</td>
    <td>no</td>
    <td>''</td>
    <td>Classes applied to the table header (thead).</td>
  </tr>
  <tr>
    <td>id </td>
    <td>string</td>
    <td>no</td>
    <td>"sortTable"</td>
    <td>Id applied to the table.  If there is more than one sortTable on the screen at once, this must be set to a unique value.</td>
  </tr>
   <tr>
    <td>emptyCellClassName</td>
    <td>string</td>
    <td>no</td>
    <td>(no default)</td>
    <td>This class will be applied to any <code>td</code> tag where the value is empty or undefined.  This can be used enter a value via css.  Example: <code>.emptyCell:after {content 'not known' } </code>
    </td>
  </tr>
  <tr>
    <td>initialSort</td>
    <td>string</td>
    <td>no</td>
    <td>(no default)</td>
    <td>If provided, the table will be sorted by this column when loaded.  The value is a value of the "key" entry in a header array entry.</td>
  </tr>
  <tr>
    <td>initialSortDsc</td>
    <td>boolean</td>
    <td>no</td>
    <td>false</td>
    <td>If a initialSort is provided, should it be sorted descending.</td>
  </tr>
   <tr>
    <td>isLoading</td>
    <td>boolean</td>
    <td>no</td>
    <td>false</td>
    <td>Display a loading message instead of the tableData</td>
  </tr>
   <tr>
    <td>isLoadingMessage</td>
    <td>JSX.Element</td>
    <td>no</td>
    <td>"Loading ..."</td>
    <td>String or componet shown when isLoading is set.</td>
  </tr>
  <tr>
    <td>isResponsive</td>
    <td>boolean</td>
    <td>no</td>
    <td></td>
    <td>When set, css will be applied so the table displays as a list on small screens.  Note:  This works best when the row header is the first cell in a row.</td>
  </tr>
  <tr>
    <td>noDataMessage</td>
    <td>JSX.Element</td>
    <td>no</td>
    <td>"No data is available"</td>
    <td>String or component shown if tableData is an empty array.</td>
  </tr>
  <tr>
    <td>showFilter</td>
    <td>boolean</td>
    <td>no</td>
    <td>false</td>
    <td>Show the table filter input.</td>
  </tr>
  <tr>
    <td>showPagination</td>
    <td>boolean</td>
    <td>no</td>
    <td>false</td>
    <td>Show the pagination links and elements per page drop down.</td>
  </tr>
  <tr>
    <td>tableClassName</td>
    <td>string</td>
    <td>no</td>
    <td>''</td>
    <td>Class name(s) applied to the table.</td>
  </tr>
  <tr>
    <td>viewSteps</td>
    <td>number[]</td>
    <td>no</td>
    <td>[All]</td>
    <td>Array of numbers that will populate the options in the elements per page drop down.</td>
  </tr>
</table>

### Headers

The headers for the table are sent via an array of json objects structured this way:

```
// JSX:
const headers = [
    { name: 'Product name', key: 'name', type: 'alpha' },
    { name: 'Price per unit', key: 'price' },
    { name: 'Stock available', key: 'stock' },
    { name: 'Link', key: 'url', noSort: true, noFilter: true },
  ];
```

OR

```
// Typescript:
import SortTable, { tableDataType, headerDataType } from './Components/SortTable';

const headers: headerDataType[] = [
    { name: 'Product name', key: 'name', type: 'alpha' },
    { name: 'Price per unit', key: 'price' },
    { name: 'Stock available', key: 'stock' },
    { name: 'Link', key: 'url', noSort: true, noFilter: true },
  ];

```

Note that the order of the columns (from left to right) is determined by the order of the header objects.

Information for each header is contained in an object with the followign keys.

<table>
  <tr>
    <th>Key</th>
    <th>Type</th>
    <th>Required</th>
    <th>Default</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>name</td>
    <td>string</td>
    <td>yes</td>
    <td></td>
    <td>Text desplayed in the header cell.</td>
  </tr>
  <tr>
    <td>key</td>
    <td>string</td>
    <td>yes</td>
    <td></td>
    <td>Unique key used to tie data to this header.</td>
  </tr>
  <tr>
    <td>className</td>
    <td>string</td>
    <td>no</td>
    <td>''</td>
    <td>Class name(s) applied to the header cell.</td>
  </tr>
  <tr>
    <td>noFilter</td>
    <td>boolean</td>
    <td>no</td>
    <td>false</td>
    <td>When set, data in tihs column will not be matched against any filter text entered by the user.</td>
  </tr>
  <tr>
    <td>noSort</td>
    <td>boolean</td>
    <td>no</td>
    <td>false</td>
    <td>When set, this column will not be sortable.</td>
  </tr>
  <tr>
    <td>rowheader</td>
    <td>boolean</td>
    <td>no</td>
    <td>false</td>
    <td>Elements in this column are headers for the row.</td>
  </tr>
  <tr>
    <td>sortKey</td>
    <td>string</td>
    <td>no</td>
    <td>undefined</td>
    <td>Key to data element that should be used when sorting.  This is normally used when sorting non-alphabetical or non-numerical items like month or days of the week.</td>
  </tr>
  <tr>
    <td>style</td>
    <td>object</td>
    <td>no</td>
    <td>{}</td>
    <td>Style elements applied to the header cell.</td>
  </tr>
  <tr>
    <td>type</td>
    <td>"size" | "alpha</td>
    <td>no</td>
    <td>"size"</td>
    <td>What sort icon is displayed when the column is sorted.</td>
  </tr>
</table>

### Data

The data for the table is sent via an array of json objects structured this way:

```
// JSX:

const data = [
    { id: 1, name: 'Cheese', price: '$4.90', stock: 20 },
    { id: 2, name: 'Milk', price: '$1.90', stock: 4 },
]
```

OR

```
// Typescript:

import SortTable, { tableDataType, headerDataType } from './Components/SortTable';

const data: tableDataType[] = [
    { id: 1, name: 'Cheese', price: '$4.90', stock: 20 },
    { id: 2, name: 'Milk', price: '$1.90', stock: 4 },
]

```

Information for each data row is contained in an object with the followign keys.

<table>
  <tr>
    <th>Key</th>
    <th>Type</th>
    <th>Required</th>
    <th>Default</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>string | number</td>
    <td>yes</td>
    <td></td>
    <td>Unique string or number for this table row</td>
  </tr>
  <tr>
    <td>anyString</td>
    <td>any</td>
    <td>yes</td>
    <td></td>
    <td>The value is the data to be displayed in the table.  The key should equal the value of the "key" attribute in a header row.</td>
  </tr>
</table>

---

---

---

# Developing

The following sections describe how perform development on this component(s).

## Get me started:

If you are just getting started, perform the following tasks to ensure your environment is ready for development.

1.  Verify node is installed => `node -v`. Ensure that it is the version listed in the `package.json` file
1.  Install dependencies => `npm run d`
1.  Check for lint errors => `npm run lint`
1.  Tun the tests => `npm run test`
1.  Find security advisories => `npm run npmAudit`
1.  Build production-ready package => `npm run buildPackage`
1.  Start dev server to preview the components => `npm run start` then go to [http://localhost:3000](http://localhost:3000)

## Node

If node isn't installed, you can install [Node](https://nodejs.org/en/) directly or via Node Version Manager (NVM). To verify if NVM is installed by running `nvm --version` in a terminal. See the [NVM website](https://github.com/nvm-sh/nvm) on how to install NVM and use a version of Node.

Alternatively you can choose to develop this application inside a Docker container instead of modifying the version of node or NVM on your machine. See the `DOCKER_DEV_ENV/README.md` file for more information. This is the recommended method for development.

## Install dependencies

After checking out the project, run `npm run d` in a terminal at the root of the project to install dependencies.

After installing dependencies, you can check to see what dependencies are out of date by running `npm outdated` in a terminal at the root of the project.

## Check security stats of dependencies

You can check if there is any high or critical security advisories for installed dependencies by running `npm run npmAudit`.

This application uses [Husky](https://github.com/typicode/husky) to automatically install Git Hooks that will check for security advisories at commit time. Commits will fail if any dependency has a high or critical security advisory. See the `husky` section in the `package.json` file. This means that you cannot commit code until high or critical security advisories are resolved. This was done intentionally because resolving high or critical security advisories is always the highest priority.

## Start the development server

In order to make development easier, there is sample parent component that contains the components in this package (located at `src/App.jsx`). To view this component in a browser, type `npm run start` in a terminal window while at the root of the project. This will start the development server at `http://localhost:3000` at and load the page in a browser.

Any change to a file will cause the application to be re-build an automatically show those changes in the browser.

## Tests

The test files are located in `src/__tests__` directory. All components in the `src/Component` should have a corresponding test with high test coverage.

You can run the test suite by typing `npm run test` in a terminal window while at the root of the project. When you run this command, a coverage report is created and saved in the `coverage` directory. In addition, you can get a summary of the coverage report by running `npm run checkCoverage`

If you wish to have the tests continually run while you are working, you can start the test in "watch" mode by typing `npm run test:watch` in a terminal window at the root of the project. Coverage reports will not be collected or updated while in "watch" mode.

## Linting

Linting is enforced before files can be committed into git (by using Husky). You can check all files in the project for linting by typing `npm run lint` in a terminal window while at the root of the project.

You can automatically fix some linting issues by running `npm run lint:fix` in a terminal window while at the root of the project.

## Security Audit

You can check for any high or critical known security vulnerabilities in the dependencies by typing `npm run npmAudit`. All known security vulnerabilities will be displayed, but the previous command will fail only if at least one of the issues are ranked "high" or higher.

---

---
