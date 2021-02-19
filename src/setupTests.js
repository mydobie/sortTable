// Add any code you want run before the tests are run
// Add any items that you want run before running the tests
// Do not delete this file
import React from 'react';

import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import { configure } from 'enzyme';
configure({ adapter: new Adapter() });
import { toHaveNoViolations } from 'jest-axe';
expect.extend(toHaveNoViolations);

React.useLayoutEffect = React.useEffect;
