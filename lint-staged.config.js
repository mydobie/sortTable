// Sets scripts run as part of Husky's Git commit hooks.  There normally isn't a need to change this file

module.exports = {
  'src/**/*.{ts, tsx, js,jsx}': [
    (jsFiles) => jsFiles.map((jsFile) => `npm run lint:js ${jsFile}`), // check files
  ],

  'src/**/*.{html,md,json}': [
    (htmlFiles) => htmlFiles.map((htmlFile) => `npm run prettier ${htmlFile}`), // check files
  ],
};
