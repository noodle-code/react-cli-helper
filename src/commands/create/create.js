const path = require('path');
const fs = require('fs');
const command = require('./../../command');
const filesystem = require('./../../utilities/filesystem');
const logger = require('./../../utilities/logger');
const stringLib = require('./../../utilities/string');
const constants = require('./../../constants');

const templates = {
  test: path.join(__dirname, '/templates/test.js.stub'),
  component: path.join(__dirname, '/templates/component.js.stub'),
  componentStateless: path.join(__dirname, '/templates/componentStateless.js.stub'),
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
                        .then(() => logger.logAndExit('File successfully created.', 0))
                        .catch(() => logger.logAndExit('Failed to create file.'));
            })
            .catch(message => logger.logAndExit(message));
};

const _generateComponentName = arguments => {
  let componentName = '';

  if (!arguments.options.componentName) {
    let sample = stringLib.ucfirst(arguments.commands[0].split('.')[0]);

    return sample
  }

  return stringLib.ucfirst(arguments.options.componentName);
};

const _createTest = (arguments, filepath) => {
  let describe = (arguments.options.describe) ? arguments.options.describe : '';

  let data = {
    describe
  };

  _createFile(filepath, 'test', data);
}

const _createComponent = (arguments, filepath) => {
  let template = 'component';

  if(arguments.options.stateless) {
    template += 'Stateless';
  }

  let data = {
    componentName: _generateComponentName(arguments)
  };

  _createFile(filepath, template, data);
}

const runCreateCommand = (command, nextArguments) => {
  if (nextArguments.commands.length <= 0 || !nextArguments.commands[0]) {
    logger.logAndExit('Invalid filename.');
  }

  let fullFilenamePath = _getFileFullPath(nextArguments);

  console.log('Creating file:' + nextArguments.commands[0])

  switch (command) {
    case 'test':
      _createTest(nextArguments, fullFilenamePath);
      return;
    case 'component':
      _createComponent(nextArguments, fullFilenamePath);
      return;
    default:
      logger.logAndExit('Unknown command');
      return;
  }
}

const create = () => {
  command.runNextCommand(runCreateCommand);
};

module.exports = create;
