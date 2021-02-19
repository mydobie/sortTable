/* eslint-disable no-console */

// This file puts the summary of the coverage report in the console.
// Then checks to see if the minimum number of lines have been covered (see minimumLinesCoveredPercent)
// Will fail (aka process.exitCode =1) if minimum lines haven't been covered or if the coverage summary couldn't be found

const path = require('path');
const fs = require('fs');

const minimumLinesCoveredPercent = 75;

try {
  const json = JSON.parse(
    fs.readFileSync(
      path.resolve(__dirname, '../coverage/coverage-summary.json')
    )
  );

  console.log('Coverage Summary: ');
  console.log(json.total);

  if (json.total.lines.pct < minimumLinesCoveredPercent) {
    console.log('******************\n');
    console.log(
      `Minimum coverage of ${minimumLinesCoveredPercent}% of lines covered was not met.`
    );
    console.log('\n******************');
    process.exitCode = 1;
  } else {
    process.exitCode = 0;
  }
} catch (e) {
  console.log('******************\n');
  console.log('Cannot get test coverage report');
  console.log('\n******************');
  process.exitCode = 1;
}
