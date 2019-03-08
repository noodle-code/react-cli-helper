const path = require('path');
const fs = require('fs');
const command = require('./../../command');
const filesystem = require('./../../utilities/filesystem');

const templates = {
  test: path.join(__dirname, '/templates/test.js.stub')
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

const _createTest = arguments => {
  let filename = arguments.commands[0];

  console.log('Creating test file: ' + filename);
  _createFile(filename, 'test');
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
