"use strict";

// Function to retrieve HTML Element object using ID
var $ = function (id) {
  return document.getElementById(id);
};
var successMsg = document.getElementById("success_login");

const changePass_form = $("changePassForm");
const user = JSON.parse(localStorage.getItem("UserLogin")) || {};

if (changePass_form) {
  changePass_form.addEventListener("submit", function (e) {
    e.preventDefault();
    const oldPassInput = $("oldPassword").value;
    const newPassInput = $("newPassword").value;
    const confPassInput = $("confPassword").value;

    if (oldPassInput === "" && newPassInput === "" && confPassInput === "") {
      appendAlertSucess(
        "Please fill out the fields you wish to update.",
        "danger"
      );
    } else {
      if (oldPassInput !== user.password) {
        appendAlertSucess("Invalid Current Password.", "danger");
      } else if (oldPassInput === newPassInput) {
        appendAlertSucess(
          "New password is the same as Current password.",
          "danger"
        );
      } else if (newPassInput !== confPassInput) {
        appendAlertSucess("New and Confirm passwords do not match.", "danger");
      } else {
        const newUpdates = {
          password: newPassInput,
        };

        const updatedProfile = {
          ...user,
          ...newUpdates,
        };

        localStorage.setItem("UserLogin", JSON.stringify(updatedProfile));
        appendAlertSucess("Password Updated", "success");
        setTimeout(() => {
          window.location.href = "change-password.html";
        }, 2000);
      }
    }
  });
}
