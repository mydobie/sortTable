# React Sort Table

## Description

This is a lightweight replacement for the jQuery DataTables. The following options are supported:

- Pagination
- Filtering
- Sorting by column

[See a sort table in action](https://pages.github.umn.edu/dobe0002/react-sort-table/)

## Getting Started - Adding this component to your project

Currently there is only one way to use this component in your project - download the tgz file.

### Method 1 - create and use tgz file

1.  Clone this project.
1.  Run `npm run buildPackage` to build and tar the component.

The above steps will create a `.tgz` file in the root of this project. Move this `.tgz` file into your project, then add the path to the`.tgz` file to your `package.json` file:

```
dependencies: {
  "react-sort-table": "file://path_to_tgz_file.tgz",
}
```

Then run `npm install` in your projects.

---

## Using this component(s)

### Requirements

In order to use these components, you need to ensure that the following are in your package.json file and installed.

- react
- react-dom
- prop-types
- reactstrap

This component requires the Bootstrap CSS for styling. The CSS is available at the [Bootstrap CDN](https://www.bootstrapcdn.com/) or by downloading the [Bootstrap SCSS.](https://getbootstrap.com/docs/4.1/getting-started/download/)

### Including this component

On the React file that you want to use the web components, include the modules you want to use. For example:

```
import  SortTable  from 'react-sort-table';
```

Then use the component as a normal React component:

```
import SortTable from 'react-sort-table`;

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

- **tableData**: Data to be shown in the table. See `Data` section below.
- **headers**: Table headers. See `Headers` section below.
- **initialSort**: Name of column using `key` attribute value that is sorted on table load.
- **caseSensitiveFilter**: Is filtering case sensitive. Defaults to `false`.
- **showFilter**: Is the filtering box shown. Defaults to `true`.
- **showPagination**: Is the table paginated. Defaults to `false`.
- **dangerouslySetInnerHTML**: Should HTML sent as part of the data be rendered as HTML. Use with **Extreme** caution and only with data that is never entered by a user. Defaults to `false`.
- **defaultToAll**: If pagination is shown, should all the data be shown on the first 'page'. Defaults to `false`.

Note: All of the above props are optional.

### Headers

The headers for the table are sent via an array of json objects structured this way:

```
const headers = [
    { name: 'Product Name', key: 'name', type: 'alpha' },
    { name: 'Link', key: 'url', noSort: true, noFilter: true },
  ];
```

- **name**: Title of the header. This is the text shown on the table. Required.
- **key**: Key used in the data array. Required.
- **type**: Type of data. Options include: alpha (alphabetical) or size(numerical and simple alphabetical). Defaults to size. Optional.
- **noSort**: If set to `true`, this column will not be sortable. Defaults to false (aka column will be sortable). Optional.
- **noFilter**: If set to `true` this data in this column will not be matched when filtering. Defaults to false (aka column will be included the filter). Optional.

### Data

The data for the table is sent via an array of json objects structured this way:

```
[
    { id: 1, name: 'Cheese', price: '$4.90', stock: 20 },
    { id: 2, name: 'Milk', price: '$1.90', stock: 4 },
]
```

Note: `id` is require and needs to be unique. The rest of the keys (for example `name`, `price`, and `stock`) should be the value for a `key` entry in the header array.

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

## Structure of the project

The project is structured like this:

- `public/` => The public contains the shell html pages. There normally isn't a need to add or modify anything in this directory and it is only used for previewing the components while in development.
- `src/`
  - `__tests__/` => Jest test scripts. Add your test scripts here.
  - `Components/` => Contains the component files. Place your new component files here.
    - `index.jsx` => List of component(s) to be made available. This file needs to be edited, see file for directions.
  - `App.jsx` => References to components you want to preview while in development. This file needs to be edited, see file for directions.
  - `index.jsx` => Loads App.jsx into the html page. There normally isn't a need to modify this file.
  - `setupTests.jsx` => Add any scripts you wish to run before tests are started to this file.
- `utils/` => Contains helper node functions that are only used as part of the development or build phases.
- `componentBuild.config.js` => Webpack build configurations. There normally isn't a need to edit this file


## Building a demo file

Unfortunately, there is currently an automatic way to create a preview page that can be used by GitHub pages. Having an up-to-date demo file lets developers, BAs, and customers determine if this component will fit their needs.

1. Run `npm run d` to ensure the dependencies are installed.
1. Run `npm run build` to build the demo files.
1. Run `node utils/resetPathIndex.js`
1. Check out the gh-pages branch.
1. Move all files from the `build` folder to root of the project.
---

---
