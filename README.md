[![CircleCI](https://circleci.com/gh/yuzoiwasaki/bird-san/tree/main.svg?style=svg)](https://circleci.com/gh/yuzoiwasaki/bird-san/tree/main)

# bird-san

Slack app for [earlybirdslounge](https://earlybirdslounge.slack.com)

![Screenshot](https://github.com/yuzoiwasaki/bird-san/blob/main/images/screenshot.png)

## Build Setup

```bash
# install dependencies
$ npm i
# serve at localhost:3000
$ npm run dev
```

## Deploy

```bash
# deploy
$ sls deploy --stage <ENV_NAME>
# remove
$ sls remove --stage <ENV_NAME>
```