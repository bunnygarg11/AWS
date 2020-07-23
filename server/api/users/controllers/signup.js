var Services = require("../../../services/network");
const congnitoConfig = require("../../../config/awsConfig").config;
const { signupSchema } = require("../../../services/hapiJoi");

const AmazonCognitoIdentity = require("amazon-cognito-identity-js");
const AWS = require("aws-sdk");

global.fetch = require("node-fetch");

const poolData = {
  UserPoolId: congnitoConfig.COGNITO_IDENTITY_POOL_ID,
  ClientId: congnitoConfig.AMAZON_CLIENT_ID,
};

const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

const signup = async (req, res, next) => {
  let { error, value } = signupSchema.validate(req.body);
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

  const { email, password, username } = req.body;

  try {
    let attributeList = [
      new AmazonCognitoIdentity.CognitoUserAttribute({
        Name: "email",
        Value: email,
      }),
    ];

    userPool.signUp(username, password, attributeList, null, (err, result) => {
      if (err) {
        return Services._validationError(res, err, "Error in signing up");
      } else {
        let cognitoUser = result.user;
        Services._response(res, {
          result,
          username: cognitoUser.getUsername(),
        });
      }
    });
  } catch (error) {
    Services._handleError(res, error.message, "Error in signing up");
  }
};
module.exports = { signup };
