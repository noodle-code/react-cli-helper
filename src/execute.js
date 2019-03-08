const commands = require('./commands');

const execute = (command, nextArguments) => {
  if (commands[command]) {
    const executeCommand = commands[command];
    executeCommand();
  } else {
    console.log('Unrecognized command.');
    return;
  }
};

module.exports = execute;
