distFolder=lib #IF this changes ... also change minifyFilesInDir.js and restPackageJson.js

NODE_ENV=production
rm -rf $distFolder
# mkdir $distFolder
npm run buildts
node utils/resetPackageJson.js
node utils/moveCss.js
node utils/minifyFilesInDir.js

npm pack ./$distFolder