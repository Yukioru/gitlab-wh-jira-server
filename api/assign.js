const prepareTransitions = require('../utils/prepareTransitions');

module.exports = async function assign(instance, data) {
  const { issue, user } = instance;
  console.log(data.params.assign);
  try {
    const res = await user.search({
      query: data.params.assign,
    });
    if (res && Array.isArray(res) && res[0]) {
      await issue.assignIssue({
        issueKey: data.issueKey,
        accountId: res[0].accountId,
      });
    }
  } catch (error) {
    console.log(error);
  }
}
