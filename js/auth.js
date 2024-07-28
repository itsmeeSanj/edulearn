var successMsg = document.getElementById("success_login");
const register = document.getElementById("register_form");
const login = document.getElementById("login_form");

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

  // Add event listener to remove the contact_success class when the alert is closed
  const alert = wrapper.querySelector(".alert");
  alert.addEventListener("", () => {
    successMsg.classList.remove("contact_success");
  });
};

if (register) {
  register.addEventListener("submit", function (e) {
    e.preventDefault();

    const userEmail = document.getElementById("email").value;
    const userPassword = document.getElementById("password").value;

    if (localStorage.getItem(userEmail)) {
      document.getElementById("register_message").textContent =
        "emailId already used!";
    } else {
      localStorage.setItem(userEmail, userPassword);
      document.getElementById("register_message").textContent =
        "Registration successful!";
    }
  });
}

if (login) {
  login.addEventListener("submit", function (e) {
    e.preventDefault();

    const userEmail = document.getElementById("loginEmail").value;
    const userPassword = document.getElementById("loginPassword").value;

    const storedPassword = localStorage.getItem(userEmail);

    console.log(storedPassword, userPassword, storedPassword == userPassword);
    if (storedPassword == userPassword) {
      //   document.getElementById("login_message").textContent =
      //     "Login successful!";
      appendAlertSucess("Login Successful :)", "success");
    } else {
      appendAlertSucess("Opps!, Invalid username or password!", "danger");
    }
  });
}
