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
  const userId = parsedBody['user_id']
  const userName = getUserNameById(userId)
  const text = createCheckInText(userName)

  const date = getToday()
  const params = {
    TableName: 'Activity',
    Item: {
      userId: userId,
      activityDate: date
    }
  }
  try {
    await docClient.put(params).promise()
  } catch(error) {
    console.log(error)
  }

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
  const userName = getUserNameById(userId)
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

function getToday() {
  moment.tz.setDefault('Asia/Tokyo')
  return moment().format('YYYY-MM-DD')
}

function createCheckInText(userName) {
  const greetingMessage = getGreetingMessage()
  return userName + "さん、" + greetingMessage + ":hatched_chick:"
}

function createCheckOutText(userName) {
  const emoji = getCheckOutEmoji()
  return userName + "さん、お疲れ様でした！" + emoji
}
