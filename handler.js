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

module.exports.check_out = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        "response_type": "in_channel",
        "text": "お疲れ様でした！"
      }
    )
  };
};
