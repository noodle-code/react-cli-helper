let consoleArguments = require('./consoleArgument');
const logger = require('./utilities/logger');

let commandArguments = consoleArguments.getArguments();

const runNextCommand = callback => {
  let commands = [...commandArguments.commands];

  if (commands.length <= 0) {
    logger.logAndExit('No more commands to run.');
  }

  if (!callback || typeof callback !== 'function') {
    logger.logAndExit('Invalid callback argument.');
  }

  let nextCommand = commands.shift();
  commandArguments.commands = [...commands];

  callback(nextCommand, {commands, options: commandArguments.options});
};

module.exports = { runNextCommand };
