const fs = require('fs');

const fileNotExists = filename => new Promise((resolve, reject) => {
  if(fs.existsSync(filename)) {
    let errorMessage = filename + ' already exists';
    errorMessage += ' consider using any other filename';
    errorMessage += ' or place it to other directory.';

    reject(errorMessage);
  }

  resolve();
  return;
});

const _getWriteData = (option, encoding = 'utf8') => {
  if(option.template) {
    return fs.readFileSync(option.template, encoding);
  }

  return (option.data) ? JSON.stringify(option.data) : '';
}

const createFile = (filename, option = {}, encoding = 'utf8') => new Promise(
  (resolve, reject) => {
    fs.writeFileSync(filename, _getWriteData(option, encoding));

    fileNotExists(filename)
      .then(() => reject())
      .catch(() => resolve());
  }
)

module.exports = {
  fileNotExists,
  createFile
};
