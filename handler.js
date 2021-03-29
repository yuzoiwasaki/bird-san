'use strict'

const qs = require('querystring')
const moment = require('moment')
require('moment-timezone')
const { getUserNameById, getCheckOutEmoji } = require('./slack')
const { insertActivityLog, getActivityCount } = require('./database')

exports.check_in = async (event) => {
  const parsedBody = qs.parse(event.body)
  const userId = parsedBody['user_id']

  const date = getToday()
  insertActivityLog(userId, date)

  const text = createCheckInText(userId)

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        "response_type": "in_channel",
        "text": text
      }
    )
  }
}

exports.check_out = async (event) => {
  const parsedBody = qs.parse(event.body)
  const userId = parsedBody['user_id']
  const text = createCheckOutText(userId)

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        "response_type": "in_channel",
        "text": text
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

function getToday() {
  moment.tz.setDefault('Asia/Tokyo')
  return moment().format('YYYY-MM-DD')
}

function createCheckInText(userId) {
  const userName = getUserNameById(userId)
  const greetingMessage = getGreetingMessage()
  const activityCount = getActivityCount(userId)
  console.log(activityCount)

  return userName + "さん、" + greetingMessage + ":hatched_chick:"
}

function createCheckOutText(userId) {
  const userName = getUserNameById(userId)
  const emoji = getCheckOutEmoji()
  return userName + "さん、お疲れ様でした！" + emoji
}
