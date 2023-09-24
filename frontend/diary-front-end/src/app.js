// // src/app.js

import { Auth, getUser } from "./auth";

export async function init() {
  // Get our UI elements
  const userSection = document.querySelector("#user");
  const loginBtn = document.querySelector("#login");
  const logoutBtn = document.querySelector("#logout");
  const libraryBtn = document.querySelector("#library");
  const subscrBtn = document.querySelector("#subscr");
  console.log(loginBtn);
  console.log(logoutBtn);

  if (loginBtn) {
    loginBtn.onclick = () => {
      // Sign-in via the Amazon Cognito Hosted UI (requires redirects), see:
      // https://docs.amplify.aws/lib/auth/advanced/q/platform/js/#identity-pool-federation
      Auth.federatedSignIn();
    };
  }

  if (logoutBtn) {
    logoutBtn.onclick = () => {
      // Sign-out of the Amazon Cognito Hosted UI (requires redirects), see:
      // https://docs.amplify.aws/lib/auth/emailpassword/q/platform/js/#sign-out
      Auth.signOut();
    };
  }

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
    libraryBtn.classList.add("hidden");
    subscrBtn.classList.add("hidden");

    return;
  }

  // Log the user info for debugging purposes
  console.log({ user });

  // Update the UI to welcome the user
  //userSection.hidden = false;

  // Show the user's username
  userSection.querySelector(
    ".username"
  ).innerText = `Hello ${user.username}, welcome to your secure vault!`;

  // Disable the Login button
  loginBtn.disabled = true;
  logoutBtn.classList.remove("hidden");
  loginBtn.classList.add("hidden");
  libraryBtn.classList.remove("hidden");
  subscrBtn.classList.remove("hidden");
}
