const SLACK_USER_MAP = {
  'U01GPV72XQD': 'いわさき',
  'U01HGSXBLUQ': 'ちなつ',
  'U01GLB6C7JA': 'けん',
  'U01GT30MT3L': 'ふくだ',
  'U01H41J15V4': 'ぱん',
  'U01J71N9ZCK': 'あきな',
  'U01KT99P4JZ': 'ねこ'
}

exports.getUserNameById = function getUserNameById(userId) {
  return SLACK_USER_MAP[userId]
}

exports.getCheckOutEmoji = function getCheckOutEmoji() {
  const emojis = [':clock9:', ':tea:', ':coffee:']
  return emojis[Math.floor(Math.random() * emojis.length)]
}
