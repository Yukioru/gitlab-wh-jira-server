module.exports = async function assign(instance, data) {
  const { issue } = instance;
  console.log(data.params.time);
  try {
    await issue.addWorkLog({
      issueKey: data.issueKey,
      worklog: {
        timeSpent: data.params.time,
      },
    });
  } catch (error) {
    console.log(error);
  }
}
