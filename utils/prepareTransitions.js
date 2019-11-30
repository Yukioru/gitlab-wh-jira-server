const constants = require('../constants');
const kebabCase = require('lodash.kebabcase');
const { ENG_RX } = constants;

module.exports = function prepareTransitions(arr) {
  const obj = {};
  arr.forEach((item) => {
    let key = null;
    if (ENG_RX.test(item.name)) key = item.name;
    else if (ENG_RX.test(item.to.name)) key = item.to.name;
    if (key) {
      key = kebabCase(key);
      obj[key] = item.id;
    }
  });
  return obj;
}