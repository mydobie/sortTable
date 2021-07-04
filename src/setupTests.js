// Add any code you want run before the tests are run
// Add any items that you want run before running the tests
// Do not delete this file
import React from 'react';
// ** If needed, the following three  lines allow hooks to work during shallow testing.  **
// import enableHooks from 'jest-react-hooks-shallow';
// enableHooks(jest);
// React.useLayoutEffect = React.useEffect;

import { toHaveNoViolations } from 'jest-axe';
expect.extend(toHaveNoViolations);

import '@testing-library/jest-dom';
