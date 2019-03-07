let consoleArguments = require('./consoleArgument');

let commandArguments = consoleArguments.getArguments();

const runNextCommand = callback => {
  let {commands, ...options} = commandArguments;

  if (commands.length <= 0) {
    console.log('No more commands to run.');
    return false;
  }

  if (!callback || typeof callback !== 'function') {
    console.log('Invalid callback argument.');
    return false;
  }

  let nextCommand = commands.shift();

  callback(nextCommand, {commands, ...options});
};

module.exports = { runNextCommand };
