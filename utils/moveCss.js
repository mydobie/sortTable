const path = require('path');
const fs = require('fs');

const files = fs
  .readdirSync(path.join(__dirname, '../src/Components'))
  .filter((fn) => fn.endsWith('.css') || fn.endsWith('.scss'));

files.forEach((file) => {
  fs.copyFileSync(
    path.join(__dirname, `../src/Components/${file}`),
    path.join(__dirname, `../lib/${file}`)
  );
});
