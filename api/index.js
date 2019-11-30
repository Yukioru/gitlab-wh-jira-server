const JiraClient = require('jira-connector');
const config = require('config'); // process.NODE_CONFIG="{}"

const instance = new JiraClient({
  host: config.get('host'),
  basic_auth: {
    email: config.get('email'),
    api_token: config.get('apiToken'),
  },
});

module.exports = {
  createRemoteLink: async (params) => (
    await require('./createRemoteLink')(instance, params)
  ),
  transition: async (params) => (
    await require('./transition')(instance, params)
  ),
  assign: async (params) => (
    await require('./assign')(instance, params)
  ),
  estimate: async (params) => (
    await require('./estimate')(instance, params)
  ),
};
