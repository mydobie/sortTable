
NODE_ENV=production
npm run buildts
node utils/resetPackageJson.js
node utils/moveCss.js
node utils/minifyFilesInDir.js

npm pack ./lib