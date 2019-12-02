const constants = require('../constants');
const { KEY_RX, TAGS_RX, PARAM_RX, STATUSES } = constants;

module.exports = function prepareCommits(arr) {
  return arr.reverse().map((commit) => {
    const msg = commit.message;
    console.log(`COMMIT: <${commit.author.name}> (${commit.timestamp}) ${msg}`);
    if (KEY_RX.test(msg)) {
      const [, issueKey] = KEY_RX.exec(msg);
      const others = msg.replace(issueKey, '').trim();
      const params = others.match(TAGS_RX);
      let commands = {};
      if (params && Array.isArray(params)) {
        params.forEach((param) => {
          if (PARAM_RX.test(param)) {
            let [, paramKey, paramOpts] = PARAM_RX.exec(param);
            if (paramKey === 'label') {
              paramOpts = paramOpts.split(' ');
            }
            if (STATUSES.includes(paramKey)) {
              if (paramKey === 'close') paramKey = 'done';
              paramOpts = paramKey;
              paramKey = 'transition';
            }
            commands[paramKey] = paramOpts || paramKey;
          }
        });
      }
      commands = Object.keys(commands).length ? commands : null;
      return {
        ...commit,
        issueKey,
        pureTitle: others,
        params: commands,
      };
    }
    return null;
  }).filter(e => !!e);
}
