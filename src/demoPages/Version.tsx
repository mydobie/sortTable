import React from 'react';
import { sortTableVersion } from '../Components/SortTable';

function App(): JSX.Element {
  const [bootstrap, setBootstrap] = React.useState(null);

  React.useEffect(() => {
    const getVersions = async () => {
      try {
        fetch('/versions.json')
          .then((res) => res.json())
          .then((response) => {
            const versions = response;

            if (versions) {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              setBootstrap(versions.bootstrap);
            } else {
              throw Error('Uncaught Error');
            }
          })
          .catch(() => {
            // eslint-disable-next-line no-console
            console.log('Error finding versions file');
          });
      } catch (_error) {
        // eslint-disable-next-line no-console
        console.log('Error finding versions file');
      }
    };
    getVersions();
  }, []);
  return (
    <>
      <h1>Version</h1>

      <ul>
        <li>
          <strong>Project Name: </strong>
          {process.env.REACT_APP_NAME}
        </li>
        <li>
          <strong>Project Version: </strong>
          {sortTableVersion}
        </li>
        <li>
          <strong>Git Commit: </strong>
          {process.env.REACT_APP_GIT_SHA}
        </li>
        <li>
          <strong>React Version: </strong>
          {React.version}
        </li>
        <li>
          <strong>Bootstrap Version: </strong>
          {bootstrap}
        </li>
      </ul>
    </>
  );
}

export default App;
