[![CircleCI](https://circleci.com/gh/yuzoiwasaki/bird-san/tree/main.svg?style=svg)](https://circleci.com/gh/yuzoiwasaki/bird-san/tree/main)

# bird-san

Slack app for [earlybirdslounge](https://earlybirdslounge.slack.com)

## Build Setup

```bash
# install dependencies
$ npm i
# serve at localhost:3000
$ sls offline
```

## Deploy

```bash
# deploy
$ sls deploy --stage <ENV_NAME>
# remove
$ sls remove --stage <ENV_NAME>
```