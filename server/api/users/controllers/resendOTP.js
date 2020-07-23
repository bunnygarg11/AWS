var Services = require("../../../services/network");
const { resendOtpSchema } = require("../../../services/hapiJoi");

const congnitoConfig = require("../../../config/awsConfig").config;

const AmazonCognitoIdentity = require("amazon-cognito-identity-js");
const AWS = require("aws-sdk");

global.fetch = require("node-fetch");

const poolData = {
  UserPoolId: congnitoConfig.COGNITO_IDENTITY_POOL_ID,
  ClientId: congnitoConfig.AMAZON_CLIENT_ID,
};

const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

const resendOtp = async (req, res, next) => {
  let { error, value } = resendOtpSchema.validate(req.body);
  if (error) {
    return Services._validationError(
      res,
      error.details[0].message.replace(
        JSON.stringify(error.details[0].context.label),
        error.details[0].context.key
      ),
      "Error in error in payWallet"
    );
  }
  req.body = value;


  const {
    email ,
    token ,
    username ,
  } = req.body;

  try {
    var userData = {
      Username: email,
      Pool: userPool,
    };

    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

    cognitoUser.resendConfirmationCode( (err, result) => {
      if (err) {
        return Services._validationError(res, err,"Error in resending the confirmation code");
      }
      Services._response(res, result,"Sucessfully resend the confirmation code ");

    });

  } catch (error) {
    Services._handleError(res, error.message,"Error in resending the confirmation code");
  }
};
module.exports = { resendOtp };
