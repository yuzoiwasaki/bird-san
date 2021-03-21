'use strict';

require('date-utils')
const qs = require('querystring')

const slack_user_map = {
  'U01GPV72XQD': 'いわさき',
  'U01HGSXBLUQ': 'ちなつ',
  'U01GLB6C7JA': 'けん',
  'U01GT30MT3L': 'ふくだ',
  'U01H41J15V4': 'ぱん',
  'U01J71N9ZCK': 'あきな',
  'U01KT99P4JZ': 'ねこ'
}

module.exports.check_in = async (event) => {
  const parsed_body = qs.parse(event.body)
  const user_id = parsed_body['user_id']
  const greeting_message = get_greeting_message()

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        "response_type": "in_channel",
        "text": slack_user_map[user_id] + "さん、" + greeting_message + ":hatched_chick:"
      }
    )
  };
};

module.exports.check_out = async (event) => {
  const parsed_body = qs.parse(event.body)
  const user_id = parsed_body['user_id']

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        "response_type": "in_channel",
        "text": slack_user_map[user_id] + "さん、お疲れ様でした！:clock9:"
      }
    )
  };
};

function get_greeting_message() {
  let message
  const hour = new Date().toFormat("HH24")

  if (hour >= 4 && hour < 12) {
    message = 'おはようございます！'
  } else if (hour >= 12 && hour < 18) {
    message = 'こんにちは!'
  } else {
    message = 'こんばんは！'
  }

  return message
}
