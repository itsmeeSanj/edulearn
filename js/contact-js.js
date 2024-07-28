// Get the modal and close modal button
var modal = document.getElementById("success-modal");
var closeModal = document.getElementById("closeModal");

var successMsg = document.getElementById("success");

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
    alert("Please enter your full name to proceed.");
    document.getElementById("fullName").style.border = "1px solid red";
    return false;
  } else if (name.match(/\d+/g) !== null) {
    alert("Name has numeric values.");
    document.getElementById("fullName").style.border = "1px solid red";
    return false;
  } else if (name.match(specialCharRegex) !== null) {
    alert("Name has special characters.");
    document.getElementById("fullName").style.border = "1px solid red";
    return false;
  } else {
    return true;
  }
}

// Validate email form value
function validateEmail(email) {
  if (email == null || email == "") {
    alert("Please enter your email to proceed.");
    document.getElementById("email").style.border = "1px solid red";
    return false;
  } else if (email.match(validEmailRegex) == null) {
    alert("Entered email is not valid.");
    document.getElementById("email").style.border = "1px solid red";
    return false;
  } else {
    return true;
  }
}

// Validate phone form value
function validatePhone(phone) {
  if (phone == "") {
    alert("Please enter mobile number.");
    document.getElementById("phone").style.border = "1px solid red";
    return false;
  } else if (
    phone.match(
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
    ) == null
  ) {
    alert("Entered mobile number is not valid.");
    document.getElementById("phone").style.border = "1px solid red";
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

// Submit form event listener
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const data = new FormData(e.target);
    if (
      validateName(data.get("fullName")) == false ||
      validateEmail(data.get("email")) == false ||
      validatePhone(data.get("phone")) == false
    ) {
      return false;
    } else {
      appendAlert("Nice, your message is send :)", "success");
      setTimeout(() => {
        console.log("Delayed for 2 second.");
        document.getElementById("email").value = "";
        document.getElementById("phone").value = "";
        document.getElementById("fullName").value = "";
        document.getElementById("msg").value = "";
        // successMsg.classList.remove("contact_sucess");
        console.log("Form erased!!!");
      }, 4000);
    }
  });
}
