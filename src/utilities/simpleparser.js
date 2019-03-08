const generateFromTemplate = (stringData, data) => {
  let pattern = /\{\{\s*([a-zA-Z0-9_\.]+)\s*\}\}/g;
  let placeholders = stringData.match(pattern);

  return placeholders.reduce(
    (accumulator, currentPlaceholder) => {
      let key = currentPlaceholder.replace(/^[^a-zA-Z0-9]+|[^a-zA-Z0-9]+$/g, '');

      return accumulator.replace(new RegExp(currentPlaceholder), data[key]);
    },
    stringData
  );
};

module.exports = { generateFromTemplate };
