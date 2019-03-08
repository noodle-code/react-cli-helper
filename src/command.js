let consoleArguments = require('./consoleArgument');

let commandArguments = consoleArguments.getArguments();

const runNextCommand = callback => {
  let commands = [...commandArguments.commands];

  if (commands.length <= 0) {
    console.log('No more commands to run.');
    return false;
  }

  if (!callback || typeof callback !== 'function') {
    console.log('Invalid callback argument.');
    return false;
  }

  let nextCommand = commands.shift();
  commandArguments.commands = [...commands];

  callback(nextCommand, {commands, options: commandArguments.options});
};

module.exports = { runNextCommand };
