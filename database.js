const aws = require('aws-sdk')
const docClient = new aws.DynamoDB.DocumentClient({region: 'ap-northeast-1'})

exports.insertActivityLog = async function insertActivityLog(userId, activityDate) {
  const params = {
    TableName: 'Activity',
    Item: {
      userId: userId,
      activityDate: activityDate
    }
  }
  try {
    await docClient.put(params).promise()
  } catch(error) {
    console.log(error)
  }
}

exports.getActivityCount = async function getActivityCount(userId) {
  const params = {
    TableName: 'Activity',
    Key: {
      userId: userId
    },
    Select: 'COUNT'
  }
  try {
    const result =  await docClient.get(params).promise()
    return result
  } catch(error) {
    console.log(error)
  }
}
