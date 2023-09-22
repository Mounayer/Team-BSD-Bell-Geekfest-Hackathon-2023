// src/authorization/cognito.js
const dotenv = require("dotenv");
dotenv.config();
// Configure a JWT token strategy for Passport based on
// Identity Token provided by Cognito. The token will be
// parsed from the Authorization header (i.e., Bearer Token).

const BearerStrategy = require("passport-http-bearer").Strategy;
const CognitoJwtVerifier = require("aws-jwt-verify").CognitoJwtVerifier;
const authorize = require("./auth-middleware");

// Create a Cognito JWT Verifier, which will confirm that any JWT we
// get from a user is valid and something we can trust. See:
// https://github.com/awslabs/aws-jwt-verify#cognitojwtverifier-verify-parameters
const jwtVerifier = CognitoJwtVerifier.create({
  userPoolId: process.env.AWS_COGNITO_POOL_ID,
  clientId: process.env.AWS_COGNITO_CLIENT_ID,
  // We expect an Identity Token (vs. Access Token)
  tokenUse: "id",
});

// At startup, download and cache the public keys (JWKS) we need in order to
// verify our Cognito JWTs, see https://auth0.com/docs/secure/tokens/json-web-tokens/json-web-key-sets
jwtVerifier
  .hydrate()
  .then(() => {
    console.info("Cognito JWKS cached");
  })
  .catch((err) => {
    console.error({
      file: __filename,
      msg: `Unable to cache Cognito JWKS\nError: ${err}`,
    });
  });

module.exports.strategy = () => {
  // For our Passport authentication strategy, we'll look for the Bearer Token
  // in the Authorization header, then verify that with our Cognito JWT Verifier.
  return new BearerStrategy(async (token, done) => {
    try {
      // Verify this JWT
      const user = await jwtVerifier.verify(token);
      console.debug({ user }, "verified user token");

      // Create a user, but only bother with their email
      done(null, user.email);
    } catch (err) {
      console.error({
        file: __filename,
        msg: `could not verify token\nError: ${err}\nToken: ${token}`,
      });
      done(null, false);
    }
  });
};

module.exports.authenticate = () => {
  return authorize("bearer");
};
