const prepareTransitions = require('../utils/prepareTransitions');

module.exports = async function transition(instance, data) {
  const { issue } = instance;
  try {
    const rawData = await issue.getTransitions({
      issueKey: data.issueKey,
    });
    const transitions = prepareTransitions(rawData.transitions);
    await issue.transitionIssue({
      issueKey: data.issueKey,
      transition: {
        id: transitions[data.params.transition],
      },
    });
  } catch (error) {
    console.log(error);
  }
}
