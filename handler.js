'use strict'

const qs = require('querystring')
const moment = require('moment')
require('moment-timezone')
const { getUserNameById, getCheckOutEmoji } = require('./slack')
const aws = require('aws-sdk')
const docClient = new aws.DynamoDB.DocumentClient({region: 'ap-northeast-1'})

exports.check_in = async (event) => {
  const parsedBody = qs.parse(event.body)
  const userId = parsedBody['user_id']

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

  const params = {
    TableName: 'Activity',
    Key: {
      userId: userId
    },
    Select: 'COUNT'
  }
  try {
    const activityCount =  await docClient.get(params).promise()
    console.log(activityCount)
  } catch(error) {
    console.log(error)
  }

  return userName + "さん、" + greetingMessage + ":hatched_chick:"
}

function createCheckOutText(userId) {
  const userName = getUserNameById(userId)
  const emoji = getCheckOutEmoji()
  return userName + "さん、お疲れ様でした！" + emoji
}
