const KEY_RX = /([A-Z][A-Z]+\-\d+)/;
const TAGS_RX = /\#([\w\+\b\d@\-. ]*)\b/g;
const PARAM_RX = /\#([\w-]+)\ ?([\w\W]+)?/;
const STATUSES = ['in-progress', 'to-do', 'backlog', 'review', 'done', 'close'];
const ENG_RX = /\w+/;

module.exports = {
  KEY_RX,
  TAGS_RX,
  PARAM_RX,
  ENG_RX,
  STATUSES
};
