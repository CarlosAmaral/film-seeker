const url = require("url");
const config = require("./config");

function imagePlaceholder(poster) {
  if (
    poster == "N/A" ||
    url.parse(poster).hostname === config.frontEnd.rejectedHost
  ) {
    return (poster = config.frontEnd.imagePlaceholderPath);
  } else {
    return poster;
  }
}

function removeDuplicate(array, property) {
  const newArray = [];
  const obj = {};

  for (let i in array) {
    obj[array[i][property]] = array[i];
  }

  for (let x in obj) {
    newArray.push(obj[x]);
  }
  return newArray;
}

module.exports = {
  imagePlaceholder: imagePlaceholder,
  removeDuplicate: removeDuplicate
};
