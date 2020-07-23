var Services = require("../../../services/network");
const { loginSchema } = require("../../../services/hapiJoi");

const congnitoConfig = require("../../../config/awsConfig").config;

const AmazonCognitoIdentity = require("amazon-cognito-identity-js");
const AWS = require("aws-sdk");
global.fetch = require("node-fetch");

const poolData = {
  UserPoolId: congnitoConfig.COGNITO_IDENTITY_POOL_ID,
  ClientId: congnitoConfig.AMAZON_CLIENT_ID,
};

const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

const login = async (req, res, next) => {
  let { error, value } = loginSchema.validate(req.body);
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

  const { password, username } = req.body;

  try {
    var userData = {
      Username: username,
      Pool: userPool,
    };

    var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(
      {
        Username: username,
        Password: password,
      }
    );

    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: function (result) {
        Services._response(res, {
          acesstoken: result.getAccessToken().getJwtToken(),
          idtoken: result.getIdToken().getJwtToken(),
          refreshtoken: result.getRefreshToken().getToken(),
        });
      },
      onFailure: function (err) {
        Services._validationError(res, err, "Login failed");
      },
    });
  } catch (error) {
    Services._handleError(res, error.message);
  }
};
module.exports = { login };
