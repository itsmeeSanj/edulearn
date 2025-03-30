"use strict";

// Function to retrieve HTML Element object using ID
var $ = function (id) {
  return document.getElementById(id);
};
var successMsg = document.getElementById("success_login");

const profile_form = $("profile_form");
const user = JSON.parse(localStorage.getItem("UserLogin")) || {};

// console.log(user);

$("firstName").placeholder = user.firstName;
$("lastName").placeholder = user.lastName;
$("email").placeholder = user.email;

if (profile_form) {
  profile_form.addEventListener("submit", function (e) {
    e.preventDefault();
    const emailInput = $("email").value;
    const firstNameInput = $("firstName").value;
    const lastNameInput = $("lastName").value;

    if (emailInput === "" && firstNameInput === "" && lastNameInput === "") {
      appendAlertSucess(
        "Please fill out the fields you wish to update.",
        "danger"
      );
    } else {
      const newUpdates = {
        email: emailInput || user.email,
        firstName: firstNameInput || user.firstName,
        lastName: lastNameInput || user.lastName,
      };

      if ($("email").value !== "" && user.email === newUpdates.email) {
        //console.log("Error, same email.")
        appendAlertSucess(
          "Email already in use. Please specify a different email.",
          "danger"
        );
      } else {
        const updatedProfile = {
          ...user,
          ...newUpdates,
        };
        localStorage.setItem("UserLogin", JSON.stringify(updatedProfile));
        appendAlertSucess("Information Updated", "success");
        setTimeout(() => {
          window.location.href = "profile.html";
        }, 2000);
      }
    }
  });
}
