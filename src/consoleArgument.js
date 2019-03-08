let minimist = require('minimist');
let createConfig = require('./commands/create/argument');

const defaultArgsConfig = {
  string: [],
  boolean: [],
  alias: {}
};
const commandConfigs = [createConfig];

const _reduceCommandConfigArray = (accumulator, currentValue) => {
  let newConfig = {...accumulator};

  Object.keys(currentValue).forEach(key =>
    newConfig[key] = [...newConfig[key], ...currentValue[key]]
  );

  return newConfig;
};

const _compileArguments = () =>
  commandConfigs.reduce(_reduceCommandConfigArray, {...defaultArgsConfig});

const getArguments = () => {
  const [,, ...args] = process.argv;

  let { _,  ...options} = minimist(args, _compileArguments());

  return {
    commands: [..._],
    options
  };
};

module.exports = {
  getArguments
};
