/* eslint-disable no-console */
const distFolder = './dist/';
const fs = require('fs');
const { exec } = require('child_process');

fs.readdirSync(distFolder).forEach((file) => {
  const regExp = /.*\.jsx?$/gim;
  if (regExp.test(file)) {
    exec(
      `npm run uglify -- ${distFolder}${file} -o ${distFolder}${file}`,
      (error, stdout, stderr) => {
        if (!error && !stderr) {
          console.log('Minifying ', file);
        } else {
          console.log('ERROR minifying ', file);
        }
      }
    );
  }
});
