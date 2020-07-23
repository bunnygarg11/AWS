const request = require("request");
const jwkToPem = require("jwk-to-pem");
const jwt = require("jsonwebtoken");
const congnitoConfig = require("../config/awsConfig").config;
var Services = require("../services/network");

module.exports = function (req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) {
    return Services._validationError(res, "No token,authorization failed");
  }

  const userPool_Id = `https://cognito-idp.${congnitoConfig.AWS_REGION}.amazonaws.com/${congnitoConfig.COGNITO_IDENTITY_POOL_ID}`;

  try {
    request(
      {
        method: "GET",
        url: `https://cognito-idp.${congnitoConfig.AWS_REGION}.amazonaws.com/${congnitoConfig.COGNITO_IDENTITY_POOL_ID}/.well-known/jwks.json`,
        json: true,
      },
      function (error, response, body) {
        if (!error && response.statusCode === 200) {
          pems = {};
          var keys = body["keys"];
          for (var i = 0; i < keys.length; i++) {
            //Convert each key to PEM
            var key_id = keys[i].kid;
            var modulus = keys[i].n;
            var exponent = keys[i].e;
            var key_type = keys[i].kty;
            var jwk = { kty: key_type, n: modulus, e: exponent };
            var pem = jwkToPem(jwk);
            pems[key_id] = pem;
          }
          //validate the token
          var decodedJwt = jwt.decode(token, { complete: true });
          if (!decodedJwt) {
            // console.log("Not a valid JWT token");
            return Services._validationError(
              res,
              "No token,authorization failed"
            );
          }

          if (decodedJwt.payload.iss != userPool_Id) {
            // console.log("invalid issuer");
            return Services._validationError(
              res,
              "No token,authorization failed"
            );
          }
          if (decodedJwt.payload.token_use != "access") {
            // console.log("Not an access token");
            return Services._validationError(
              res,
              "No token,authorization failed"
            );
          }

          var kid = decodedJwt.header.kid;
          var pem = pems[kid];
          if (!pem) {
            // console.log("Invalid token");
            return Services._validationError(
              res,
              "No token,authorization failed"
            );
          }

          jwt.verify(token, pem, function (err, payload) {
            if (err) {
              // console.log("Invalid Token.");
              return Services._validationError(
                res,
                err,
                "No token,authorization failed"
              );
            } else {
              // console.log("Valid Token.");
              // console.log(payload);
              next();
            }
          });
        } else {
          return Services._validationError(
            res,
            "No token,authorization failed"
          );
          // console.log("Error! Unable to download JWKs");
        }
      }
    );
  } catch (error) {
    // console.log(error);
    return Services._validationError(
      res,
      error,
      "No token,authorization failed"
    );
  }
};
