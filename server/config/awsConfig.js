let config = {
  AWS_ACCOUNT_ID: process.env.AWS_ACCOUNT_ID,
  AWS_REGION: process.env.AWS_REGION ,
  COGNITO_IDENTITY_POOL_ID:
    process.env.COGNITO_IDENTITY_POOL_ID,
  IAM_ROLE_ARN:
    process.env.IAM_ROLE_ARN ,
  COGNITO_DATASET_NAME: process.env.COGNITO_DATASET_NAME ,
  COGNITO_KEY_NAME: process.env.COGNITO_KEY_NAME ,
  CALLBACKURL:
    process.env.CALLBACKURL ,
  AMAZON_CLIENT_ID: process.env.AMAZON_CLIENT_ID ,
  AMAZON_CLIENT_SECRET:
    process.env.AMAZON_CLIENT_SECRET ,
};

module.exports = {
  config: config,
};
