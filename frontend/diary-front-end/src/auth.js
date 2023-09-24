// src/auth.js

import { Amplify, Auth } from "aws-amplify";

// Configure our Auth object to use our Cognito User Pool
Amplify.configure({
  Auth: {
    // Amazon Region.
    region: "us-east-2",

    // Amazon Cognito User Pool ID
    userPoolId: process.env.NEXT_PUBLIC_AWS_COGNITO_POOL_ID,

    // Amazon Cognito App Client ID (26-char alphanumeric string)
    userPoolWebClientId: process.env.NEXT_PUBLIC_AWS_COGNITO_CLIENT_ID,

    // Hosted UI configuration
    oauth: {
      // Amazon Hosted UI Domain
      domain: process.env.NEXT_PUBLIC_AWS_COGNITO_HOSTED_UI_DOMAIN,

      // These scopes must match what we set in the User Pool for this App Client
      scope: ["email", "phone", "openid"],

      // These must match what you have specified in the Hosted UI
      // app settings for Callback and Redirect URLs (e.g., no trailing slash).
      redirectSignIn: process.env.NEXT_PUBLIC_OAUTH_SIGN_IN_REDIRECT_URL,
      redirectSignOut: process.env.NEXT_PUBLIC_OAUTH_SIGN_OUT_REDIRECT_URL,

      // We're using the Access Code Grant flow (i.e., `code`)
      responseType: "code",
    },
  },
});

/**
 * Get the authenticated user
 *
 * Returns null if not authenticated
 * @returns Promise<user>
 */
async function getUser() {
  try {
    // Get the user's info, see:
    // https://docs.amplify.aws/lib/auth/advanced/q/platform/js/#identity-pool-federation
    const currentAuthenticatedUser = await Auth.currentAuthenticatedUser();

    // Get the user's username
    const username = currentAuthenticatedUser.username;


    // Get the user's Identity Token, which we'll use later with our
    // microservice. See discussion of various tokens:
    // https://docs.aws.amazon.com/cognito/latest/developerguide/amazon-cognito-user-pools-using-tokens-with-identity-providers.html
    const idToken = currentAuthenticatedUser.signInUserSession.idToken.jwtToken;
    const payload = idToken.split(".")[1];
    const decodedPayload = JSON.parse(atob(payload));
    // Get the sub UUID which uniquely identifies each user
    const sub = decodedPayload.sub;
    const accessToken =
      currentAuthenticatedUser.signInUserSession.accessToken.jwtToken;


    // Return a simplified "user" object
    return {
      sub,
      username,
      idToken,
      accessToken,
      // Include a simple method to generate headers with our Authorization info
      authorizationHeaders: (type = "application/json") => {
        const headers = { "Content-Type": type };
        headers["Authorization"] = `Bearer ${idToken}`;
        return headers;
      },
    };
  } catch (err) {
    console.log(err);
    // Unable to get user, return `null` instead
    return null;
  }
}

export { Auth, getUser };
