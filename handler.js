'use strict';

module.exports.check_in = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        "response_type": "in_channel",
        "text": "おはようございます！"
      }
    )
  };
};
