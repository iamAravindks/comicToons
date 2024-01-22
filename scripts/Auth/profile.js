import { CURRENT_USER_KEY, PATHS, Utils } from "./Index.js";

window.onload = function () {
  const CurrentUser = Utils.loadFromLS(CURRENT_USER_KEY);
  if (!CurrentUser || CurrentUser.length === 0) {
    alert("Create an account or signin to continue");
    window.location.href = PATHS.signup;
  }

  document.querySelector("h3#email b").textContent = CurrentUser.email;
  document.querySelector("h3#name b").textContent = CurrentUser.username;
};
