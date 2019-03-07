let minimist = require('minimist');

const defaultArgsConfig = {};
let commandConfigs = [];

const _reduceCommandConfigArray = (accumulator, currentValue) => {
  let newConfig = {...accumulator};

  Object.keys(currentValue).forEach(key =>
    newConfig[key] = [...newConfig[key], ...currentValue[key]]
  );

  return newConfig;
};

const _compileArguments = () =>
  commandConfigs.reduce(_reduceCommandConfigArray, {...defaultArgsConfig});

export const getArguments = () => {
  const [,, ...args] = process.argv;

  let { _, ...options} = minimist(args, _compileArguments());

  return {
    commands: {..._},
    ...options
  };
};
