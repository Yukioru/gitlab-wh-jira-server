module.exports = async function createRemoteLink(instance, data) {
  const { issue } = instance;
  const globalId = `gitlab-id=${data.id}`;

  // Check if link exists
  let link = null;
  try {
    link = await issue.getRemoteLinks({
      issueKey: data.issueKey,
      globalId,
    });
  } catch (error) {}

  // Create link if not exists
  if (!link) {
    await issue.createRemoteLink({
      issueKey: data.issueKey,
      remoteLink: {
        globalId: `gitlab-id=${data.id}`,
        object: {
          summary: data.issueKey,
          title: data.pureTitle,
          url: data.url,
        },
      },
    });
  }
}
