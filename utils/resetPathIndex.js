/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');

try {
  const indexPath = path.join(__dirname, '../build/index.html');
  let index = fs.readFileSync(indexPath, 'utf8');
  index = index.replace(/\/static\//g, 'static/');

  fs.writeFileSync(indexPath, index);
  console.log('Javascript and CSS file paths reset in index.html');
  process.exitCode = 0;
} catch (e) {
  console.log(e);
  process.exitCode = 1;
}
