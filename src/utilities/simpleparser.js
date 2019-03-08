const generateFromTemplate = (stringData, data) => {

  let pattern = /\{\{\s*([a-zA-Z0-9_\.]+)\s*\}\}/g;
  let parsedString = stringData;

  let placeholders = stringData.match(pattern);

  placeholders.forEach(placeholder => {
    let key = placeholder.replace(/^[^a-zA-Z0-9]+|[^a-zA-Z0-9]+$/g, '');

    parsedString = parsedString.replace(new RegExp(placeholder), data[key]);
  });

  return parsedString;
};

module.exports = { generateFromTemplate };
