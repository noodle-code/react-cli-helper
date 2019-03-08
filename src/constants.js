const path = require('path');

const rootDir = path.join(__dirname, '../');
const packageDir = path.resolve(__dirname).split('/node_modules')[0];

module.exports = {
  rootDir,
  packageDir
};
