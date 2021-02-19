distFolder=dist #IF this changes ... also change minifyFilesInDir.js and restPackageJson.js

NODE_ENV=production
rm -rf $distFolder
mkdir dist
npx babel src/Components --out-dir $distFolder --copy-files
node utils/resetPackageJson.js
node utils/minifyFilesInDir.js

npm pack ./$distFolder