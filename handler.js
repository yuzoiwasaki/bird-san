'use strict'

const qs = require('querystring')
const moment = require('moment')
require('moment-timezone')
const {
  getUserNameById,
  getCheckOutEmoji
} = require('./slack')
const aws = require('aws-sdk')
const docClient = new aws.DynamoDB.DocumentClient({region: 'ap-northeast-1'})

exports.check_in = async (event) => {
  const parsedBody = qs.parse(event.body)
  const userName = getUserNameById(parsedBody['user_id'])
  const text = createCheckInText(userName)

  const params = {
    TableName: 'Activity',
    Item: {
      userId: parsedBody['user_id'],
      activityDate: '2021-03-28'
    }
  }
  docClient.put(params)

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
  const userName = getUserNameById(parsedBody['user_id'])
  const text = createCheckOutText(userName)

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

function createCheckInText(userName) {
  const greetingMessage = getGreetingMessage()
  return userName + "さん、" + greetingMessage + ":hatched_chick:"
}

function createCheckOutText(userName) {
  const emoji = getCheckOutEmoji()
  return userName + "さん、お疲れ様でした！" + emoji
}
