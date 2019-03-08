const commands = require('./commands');
const logger = require('./utilities/logger');

const execute = (command, nextArguments) => {
  if (commands[command]) {
    const executeCommand = commands[command];
    executeCommand();
  } else {
    logger.logAndExit('Unrecognized command.');
  }
};

module.exports = execute;
