// // src/app.js

import { Auth, getUser } from "./auth";

export async function init() {
  // Get our UI elements
  const userSection = document.querySelector("#user");
  const loginBtn = document.querySelector("#login");
  const logoutBtn = document.querySelector("#logout");

  if (!loginBtn || !logoutBtn || !userSection) {
    return null;
  }

  // Wire up event handlers to deal with login and logout.
  loginBtn.onclick = () => {
    // Sign-in via the Amazon Cognito Hosted UI (requires redirects), see:
    // https://docs.amplify.aws/lib/auth/advanced/q/platform/js/#identity-pool-federation
    Auth.federatedSignIn();
  };
  logoutBtn.onclick = () => {
    // Sign-out of the Amazon Cognito Hosted UI (requires redirects), see:
    // https://docs.amplify.aws/lib/auth/emailpassword/q/platform/js/#sign-out
    Auth.signOut();
  };

  // See if we're signed in (i.e., we'll have a `user` object)
  let user;
  try {
    user = await getUser();
  } catch (err) {
    console.log(err);
  }

  if (!user) {
    // Disable the Logout button
    logoutBtn.disabled = true;
    loginBtn.classList.remove("hidden");
    logoutBtn.classList.add("hidden");

    return;
  }

  // Log the user info for debugging purposes
  console.log({ user });

  // Update the UI to welcome the user
  userSection.hidden = false;

  // Show the user's username
  userSection.querySelector(
    ".username"
  ).innerText = `Hello ${user.username}, welcome to your vault!`;

  // Disable the Login button
  loginBtn.disabled = true;
  logoutBtn.classList.remove("hidden");
  loginBtn.classList.add("hidden");
}
