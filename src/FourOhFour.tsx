// Page rendered when url doesn't match route in App.jsx

import React, { ReactElement } from 'react';

// *** Main component ***
const FourOhFour = (/* props */): ReactElement => (
  <>
    <h1>Page not found</h1>
    <p>The page you requested could not be found.</p>
  </>
);

export default FourOhFour;
