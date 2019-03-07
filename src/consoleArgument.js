let minimist = require('minimist');

const defaultArgsConfig = {
  string: [],
  boolean: [],
  alias: {},
  '--': true
};
const commandConfigs = [];

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

  let { _, ...options} = minimist(args, _compileArguments());

  return {
    commands: {..._},
    ...options
  };
};

module.exports = {
  getArguments
};
