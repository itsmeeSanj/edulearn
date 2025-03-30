// Get the modal and close modal button
var successMsg = document.getElementById("success_login");

// success Message modal
const appendAlert = (message, type) => {
  const wrapper = document.createElement("div");
  successMsg.classList.add("contact_sucess");
  wrapper.innerHTML = [
    `<div class="alert alert-${type} alert-dismissible" role="alert">`,
    `   <div>${message}</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    "</div>",
  ].join("");

  successMsg.append(wrapper);
};

// Regex for email
var validEmailRegex =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

// Regex for phone
var specialCharRegex = /[.!@#$%^&*()_+-={|}~-]/;

// Get form
var form = document.getElementById("contactPageForm");

// Validate name form value
function validateName(name) {
  if (name == null || name == "") {
    appendAlertSucess("Please enter your full name to proceed.","danger");
    document.getElementById("fullName").style.border = "1px solid red";
    return false;
  } else if (name.match(/\d+/g) !== null) {
    appendAlertSucess("Name has numeric values.","danger");
    document.getElementById("fullName").style.border = "1px solid red";
    return false;
  } else if (name.match(specialCharRegex) !== null) {
    appendAlertSucess("Name has special characters.","danger");
    document.getElementById("fullName").style.border = "1px solid red";
    return false;
  } else {
    return true;
  }
}

// Validate email form value
function validateEmail(email) {
  if (email == null || email == "") {
    appendAlertSucess("Please enter your email to proceed.","danger");
    document.getElementById("email").style.border = "1px solid red";
    return false;
  } else if (email.match(validEmailRegex) == null) {
    appendAlertSucess("Entered email is not valid.","danger");
    document.getElementById("email").style.border = "1px solid red";
    return false;
  } else {
    return true;
  }
}

// Validate phone form value
function validatePhone(phone) {
  if (phone == "") {
    appendAlertSucess("Please enter mobile number.","danger");
    document.getElementById("phone").style.border = "1px solid red";
    return false;
  } else if (
    phone.match(
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
    ) == null
  ) {
    appendAlertSucess("Entered mobile number is not valid.","danger");
    document.getElementById("phone").style.border = "1px solid red";
    return false;
  } else {
    return true;
  }
}

// Validate phone form value
function validateMsg(msgArea) {
  if (msgArea == "") {
    appendAlertSucess("Please enter your message to proceed.","danger");
    document.getElementById("msg").style.border = "1px solid red";
    return false;
  } else {
    return true;
  }
}



// Reset borders of name form input
function resetBordersFullName() {
  document.getElementById("fullName").style.border =
    "1px solid rgb(20, 25, 33)";
}

// Reset borders of email form input
function resetBordersEmail() {
  document.getElementById("email").style.border = "1px solid rgb(20, 25, 33)";
}

// Reset borders of phone form input
function resetBordersPhone() {
  document.getElementById("phone").style.border = "1px solid rgb(20, 25, 33)";
}

// Reset borders of msg form input
function resetMsgArea() {
  document.getElementById("msg").style.border = "1px solid rgb(20, 25, 33)";
}

// Submit form event listener
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const data = new FormData(e.target);
    if (
      validateName(data.get("fullName")) == false ||
      validateEmail(data.get("email")) == false ||
      validatePhone(data.get("phone")) == false ||
      validateMsg(data.get("msg")) == false
    ) {
      return false;
    } else {
      appendAlert("Nice, your message is sent :)", "success");
      setTimeout(() => {
        console.log("Delayed for 2 second.");
        window.location.reload();
        console.log("Form erased!!!");
      }, 2000);
    }
  });
}
