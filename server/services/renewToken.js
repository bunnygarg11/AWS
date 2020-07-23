function renew() {
  const RefreshToken = new AmazonCognitoIdentity.CognitoRefreshToken({
    RefreshToken: "your_refresh_token_from_a_previous_login",
  });

  const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

  const userData = {
    Username: "sample@gmail.com",
    Pool: userPool,
  };

  const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

  cognitoUser.refreshSession(RefreshToken, (err, session) => {
    if (err) {
      console.log(err);
    } else {
      let retObj = {
        access_token: session.accessToken.jwtToken,
        id_token: session.idToken.jwtToken,
        refresh_token: session.refreshToken.token,
      };
      console.log(retObj);
    }
  });
}
