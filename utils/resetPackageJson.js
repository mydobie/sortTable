// This file minimizes the package.json file before it is included in the package to be published.
const path = require('path');
const fs = require('fs');

let packageJSON = fs.readFileSync(path.join(__dirname, '../package.json'));
packageJSON = JSON.parse(packageJSON);

const newPackageJSON = {
  ...packageJSON,
  peerDependencies: packageJSON.dependencies,
  scripts: {},
  devDependencies: {},
  dependencies: {},
  prettier: {},
  babel: {},
  eslintConfig: {},
  stylelint: {},
  husky: {},
  jest: {},
  browserslist: {},
};

fs.writeFileSync(
  path.join(__dirname, '../lib/package.json'),
  JSON.stringify(newPackageJSON)
);

process.exitCode = 0;
