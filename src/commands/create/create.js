const path = require('path');
const fs = require('fs');
const command = require('./../../command');
const filesystem = require('./../../utilities/filesystem');
const constants = require('./../../constants');

const templates = {
  test: path.join(__dirname, '/templates/test.js.stub')
};

const _composeFullPath = (filename, relativePath = '') =>
  path.join(constants.packageDir, relativePath, filename);

const _createFile = (filename, template, data = {}) => {
  let fullPath = _composeFullPath(filename);

  filesystem.fileNotExists(fullPath)
            .then(() => {
              let options = {
                data,
                template: templates[template]
              };

              filesystem.createFile(fullPath, options)
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

const _createTest = arguments => {
  let filename = arguments.commands[0];
  let describe = (arguments.options.describe) ? arguments.options.describe : '';

  console.log('Creating test file: ' + filename);
  let data = {
    describe
  };
  _createFile(filename, 'test', data);
}

const runCreateCommand = (command, nextArguments) => {
  switch (command) {
    case 'test':
      _createTest(nextArguments);
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
