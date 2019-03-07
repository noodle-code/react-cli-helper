let consoleArguments = require('./consoleArgument');

let commandArguments = consoleArguments.getArguments();

const runNextCommand = callback => {
  let {commands, ...options} = commandArguments;

  if (commands.length <= 0) {
    return false;
  }

  if (!callback) {
    return false;
  }

  let nextCommand = commands.shift();

  callback(nextCommand, {commands, ...options});
};

module.exports = { runNextCommand };
