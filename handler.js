'use strict'

const qs = require('querystring')
const moment = require('moment')
require('moment-timezone')
const {
  getUserNamebyId,
  getCheckOutEmoji
} = require('./slack')

exports.check_in = async (event) => {
  const parsedBody = qs.parse(event.body)
  const userName = getUserNamebyId(parsedBody['user_id'])
  const greetingMessage = getGreetingMessage()

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        "response_type": "in_channel",
        "text": userName + "さん、" + greetingMessage + ":hatched_chick:"
      }
    )
  }
}

exports.check_out = async (event) => {
  const parsedBody = qs.parse(event.body)
  const userName = getUserNamebyId(parsedBody['user_id'])
  const emoji = getCheckOutEmoji()

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        "response_type": "in_channel",
        "text": userName + "さん、お疲れ様でした！" + emoji
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
