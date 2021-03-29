const aws = require('aws-sdk')
const docClient = new aws.DynamoDB.DocumentClient({region: 'ap-northeast-1'})

exports.insertActivityLog = function insertActivityLog(userId, activityDate) {
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
