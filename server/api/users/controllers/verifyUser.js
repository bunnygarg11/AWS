var Services = require("../../../services/network");
const { verifyUserSchema } = require("../../../services/hapiJoi");
const congnitoConfig = require("../../../config/awsConfig").config;

const AmazonCognitoIdentity = require("amazon-cognito-identity-js");
const AWS = require("aws-sdk");

global.fetch = require("node-fetch");

const poolData = {
  UserPoolId: congnitoConfig.COGNITO_IDENTITY_POOL_ID,
  ClientId: congnitoConfig.AMAZON_CLIENT_ID,
};

const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

const verifyuser = async (req, res, next) => {
  let { error, value } = verifyUserSchema.validate(req.body);
  if (error) {
    return Services._validationError(
      res,
      error.details[0].message.replace(
        JSON.stringify(error.details[0].context.label),
        error.details[0].context.key
      ),
      "Error in user verification"
    );
  }
  req.body = value;

  const { token, username } = req.body;

  try {
    var userData = {
      Username: username,
      Pool: userPool,
    };

    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

    cognitoUser.confirmRegistration(token, true, (err, result) => {
      if (err) {
        return Services._validationError(
          res,
          err,
          "Error in verifying the user"
        );
      }
      Services._response(res, result, "User successfully verified");
    });
  } catch (error) {
    Services._handleError(res, error.message, "Error in verifying the user");
  }
};
module.exports = { verifyuser };
