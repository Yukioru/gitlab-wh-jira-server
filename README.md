# gitlab-wh-jira-server

## WebHook server for GitLab integration with Jira Cloud

### Actions work
- Remote link to issue
- Assign user to issue
- Transition issue in workflow
- Tracking spent time in issue

### How use

- Send config to env (Example of config - /config/default.json)
```
export NODE_CONFIG="{ "host": "", "email": "", "apiToken": "" }"
```
- Deploy in your server
- In GitLab repo settings integration Webhook URL `https://<domain>/hook` and check Push events