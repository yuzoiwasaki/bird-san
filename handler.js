'use strict'

const qs = require('querystring')
const moment = require('moment')
require('moment-timezone')

const SLACK_USER_MAP = {
  'U01GPV72XQD': 'いわさき',
  'U01HGSXBLUQ': 'ちなつ',
  'U01GLB6C7JA': 'けん',
  'U01GT30MT3L': 'ふくだ',
  'U01H41J15V4': 'ぱん',
  'U01J71N9ZCK': 'あきな',
  'U01KT99P4JZ': 'ねこ'
}

module.exports.check_in = async (event) => {
  const parsedBody = qs.parse(event.body)
  const userId = parsedBody['user_id']
  const greetingMessage = getGreetingMessage()

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        "response_type": "in_channel",
        "text": SLACK_USER_MAP[userId] + "さん、" + greetingMessage + ":hatched_chick:"
      }
    )
  }
}

module.exports.check_out = async (event) => {
  const parsedBody = qs.parse(event.body)
  const userId = parsedBody['user_id']
  const emoji = getCheckOutEmoji()

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        "response_type": "in_channel",
        "text": SLACK_USER_MAP[userId] + "さん、お疲れ様でした！" + emoji
      }
    )
  }
}

function getGreetingMessage() {
  moment.tz.setDefault('Asia/Tokyo')
  const hour = Number(moment().format('HH'))

  let message

  if (hour >= 4 && hour < 12) {
    message = 'おはようございます！'
  } else if (hour >= 12 && hour < 18) {
    message = 'こんにちは！'
  } else {
    message = 'こんばんは！'
  }

  return message
}

function getCheckOutEmoji() {
  const emojis = [':clock9:', ':tea:', ':coffee:']
  return emojis[Math.floor(Math.random() * emojis.length)]
}
