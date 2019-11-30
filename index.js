const express = require('express');
const bodyParser = require('body-parser');
const Promise = require('bluebird');

const prepareCommits = require('./utils/prepareCommits');
const api = require('./api');

function isParam(data, param) {
  return data.params && Object.keys(data.params).includes(param);
}

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function (req, res) {
  res.send('It\'s main page, dude.');
});

app.all('/hook', async (req, res) => {
  if (!req.body) return;
  let { commits = [] } = req.body;
  commits = prepareCommits(commits);
  Promise.map(commits, async (commit) => {
    try {
      await api.createRemoteLink(commit);
      if (isParam(commit, 'transition')) {
        await api.transition(commit);
      }
      if (isParam(commit, 'time')) {
        await api.estimate(commit);
      }
      if (isParam(commit, 'assign')) {
        await api.assign(commit);
      }
    } catch (error) {
      console.log(error);
    }
  });
});

app.listen(3000, function () {
  console.log('GitLab WebHooks server listening on port 3000!');
});