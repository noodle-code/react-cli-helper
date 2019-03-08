const path = require('path');
const fs = require('fs');
const command = require('./../../command');
const filesystem = require('./../../utilities/filesystem');
const constants = require('./../../constants');

const templates = {
  test: path.join(__dirname, '/templates/test.js.stub')
};

const _getFullPath = (filename, relativePath = '') =>
  path.join(constants.packageDir, relativePath, filename);

const _getFileFullPath = (arguments) => {
  let relativePath = arguments.options.savePath || '';

  return _getFullPath(arguments.commands[0] || '', relativePath);
};

const _createFile = (filename, template, data = {}) => {
  filesystem.fileNotExists(filename)
            .then(() => {
              let options = {
                data,
                template: templates[template]
              };

              filesystem.createFile(filename, options)
                        .then(() => {
                          console.log('File successfully created.');
                          return;
                        })
                        .catch(() => {
                          console.log('Failed to create file.');
                          return;
                        });
            })
            .catch(message => {
              console.log(message);
              return;
            });
};

const _createTest = (arguments, filepath) => {
  let describe = (arguments.options.describe) ? arguments.options.describe : '';

  let data = {
    describe
  };

  _createFile(filepath, 'test', data);
}

const runCreateCommand = (command, nextArguments) => {
  if (nextArguments.commands.length <= 0 || !nextArguments.commands[0]) {
    console.log('Invalid filename.');
    return;
  }

  let fullFilenamePath = _getFileFullPath(nextArguments);

  console.log('Creating file:' + nextArguments.commands[0])

  switch (command) {
    case 'test':
      _createTest(nextArguments, fullFilenamePath);
      return;
    default:
      console.log('Unknown command');
      return;
  }
}

const create = () => {
  command.runNextCommand(runCreateCommand);
};

module.exports = create;
