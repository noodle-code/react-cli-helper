const logAndExit = (message, code = 1) => {
  console.log(message);
  process.exit(1);
};

module.exports = {
  logAndExit
};
