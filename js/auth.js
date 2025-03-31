var successMsg = document.getElementById("success_login");

const register = document.getElementById("register_form");
const login = document.getElementById("login_form");
const logout = document.getElementById("logout");

const loggedOutLinks = document.querySelector(".auth_logged_out");
const loggedInLinks = document.querySelector(".auth_logged_in");

const currentPath = window.location.pathname;
const currentPage = currentPath.substring(currentPath.lastIndexOf("/") + 1);

var specialCharRegex = /[.!@#$%^&*()_+-={|}~-]/;

// Retrieve localStorage data
localStorageData = JSON.parse(localStorage.getItem("UserLogin"));

function resetBordersFirstName() {
  document.getElementById("firstName").style.border =
    "1px solid rgb(20, 25, 33)";
}

function resetBorderslastName() {
  document.getElementById("lastName").style.border =
    "1px solid rgb(20, 25, 33)";
}

function resetBorderPassword() {
  document.getElementById("confirmPassword").style.border =
    "1px solid rgb(20, 25, 33)";
}

// success_alert_function
const appendAlertSucess = (message, type) => {
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

// Registration form submission
if (register) {
  register.addEventListener("submit", function (e) {
    e.preventDefault();

    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    const userData = {
      email: document.getElementById("email").value,
      password: document.getElementById("password").value,
      firstName: document.getElementById("firstName").value,
      lastName: document.getElementById("lastName").value,
      loginStatus: true,
    };

    // Check if passwords match
    if (password !== confirmPassword) {
      appendAlertSucess("Passwords do not match :(", "danger");
      document.getElementById("confirmPassword").style.border = "1px solid red";
      return; // Prevent form submission
    }

    // validate

    const emailUser = JSON.parse(localStorage.getItem("UserLogin")) || {};

    if (emailUser.email == userData.email) {
      appendAlertSucess("Oops! Email already used :(", "danger");
      return false;
    } else if (userData.firstName.match(/\d+/g) !== null) {
      appendAlertSucess("Opps! Name has numeric values :(", "danger");
      document.getElementById("firstName").style.border = "1px solid red";
      return false;
    } else if (userData.firstName.match(specialCharRegex) !== null) {
      appendAlertSucess("Opps! Name has special characters :(", "danger");
      document.getElementById("firstName").style.border = "1px solid red";
      return false;
    } else if (userData.lastName.match(/\d+/g) !== null) {
      appendAlertSucess("Opps! Name has numeric values :(", "danger");
      document.getElementById("lastName").style.border = "1px solid red";
      return false;
    } else if (userData.lastName.match(specialCharRegex) !== null) {
      appendAlertSucess("Opps! Name has special characters :(", "danger");
      document.getElementById("lastName").style.border = "1px solid red";
      return false;
    } else {
      localStorage.setItem("UserLogin", JSON.stringify(userData));
      appendAlertSucess("Registration Successful :)", "success");
      setTimeout(() => {
        window.location.href = "index.html";
      }, 2000);
      return true;
    }
  });
}

// Login form submission
if (login) {
  login.addEventListener("submit", function (e) {
    e.preventDefault();

    const userEmail = document.getElementById("loginEmail").value;
    const userPassword = document.getElementById("loginPassword").value;

    if (JSON.parse(localStorage.getItem("UserLogin")).email == userEmail) {
      const loginData = JSON.parse(localStorage.getItem("UserLogin"));
      if (userEmail == loginData.email && userPassword == loginData.password) {
        localStorageData.loginStatus = true;
        localStorage.setItem("UserLogin", JSON.stringify(localStorageData));

        appendAlertSucess("Login Successful :)", "success");
        setTimeout(() => {
          window.location.href = "index.html";
        }, 2000);
      } else {
        appendAlertSucess("Opps!, Invalid Email or Password!", "danger");
      }
    } else {
      appendAlertSucess("Opps!, User not registered", "danger");
    }
  });
}

// checkStatus loggedIN
if (localStorageData?.loginStatus) {
  //isloggedIn ? redirect index.html if(login and register page) : else goto(login || register);

  if (currentPage == "login.html" || currentPage == "register.html") {
    setTimeout(() => {
      window.location.href = "index.html";
    }, 1000);
  }

  //isloggedIn ? show(profile_name) : hide(profile_name);
  const user_name = document.getElementById("user_name");
  if (user_name) {
    user_name.textContent = `Hi, ${localStorageData.firstName}`;
  }

  loggedOutLinks.style.display = "none";
  loggedInLinks.style.display = "block";
} else {
  if (
    currentPage == "profile.html" ||
    currentPage == "change-password.html" ||
    currentPage == "orders.html"
  ) {
    setTimeout(() => {
      window.location.href = "index.html";
    }, 1000);
  }
  loggedOutLinks.style.display = "block";
  loggedInLinks.style.display = "none";
}

// Logout button click
if (logout) {
  logout.addEventListener("click", function (e) {
    e.preventDefault();
    if (localStorageData) {
      localStorageData.loginStatus = false;
      localStorage.setItem("UserLogin", JSON.stringify(localStorageData));
      window.location.href = "login.html";
    }
  });
}
