"use strict";

// Function to retrieve HTML Element object using ID
var $ = function (id) {
  return document.getElementById(id);
};

const addToCartButtons = document.querySelectorAll(".add_cart");
let exists = false;

addToCartButtons.forEach((button) => {
  button.addEventListener("click", function (e) {
    exists = false;
<<<<<<< HEAD
    const selectedCourse = e.target.closest(".course_block");
    const id = selectedCourse.dataset.id;
    const courseInfo = selectedCourse.querySelector(".course_content");
    const imgSource = selectedCourse.querySelector("img").src.trim();
    const title = courseInfo
      .querySelector("a")
      .textContent.replace("\n", "")
      .trim();
    const author = courseInfo.querySelector("p").textContent.trim();
    const lectures = courseInfo.querySelector(".lectures").textContent.trim();
    const hours = courseInfo.querySelector(".hours").textContent.trim();
    const price = courseInfo.querySelector(".price").textContent.trim();
=======
    let id = null;
    let imgSource = null;
    let title = null;
    let author = null;
    let hours = null;
    let lectures = null;
    let price = null;
    let selectedCourse = null;
    let courseInfo = null;

    if (e.target.closest(".course_block") !== null) {
      selectedCourse = e.target.closest(".course_block");
      id = selectedCourse.dataset.id;
      courseInfo = selectedCourse.querySelector(".course_content");
      imgSource = selectedCourse.querySelector("img").src.trim();
      title = courseInfo
          .querySelector("a")
          .textContent.replace("\n", "")
          .trim();
      author = courseInfo.querySelector("p").textContent.trim();
      lectures = courseInfo.querySelector(".lectures").textContent.trim();
      hours = courseInfo.querySelector(".hours").textContent.trim();
      price = courseInfo.querySelector(".price").textContent.trim();
    } else {
      selectedCourse = e.target.closest(".course-item");
      id = selectedCourse.dataset.id;
      courseInfo = selectedCourse.querySelector(".course-info");
      imgSource = selectedCourse.querySelector("img").src.trim();
      title = courseInfo.querySelector("h2").textContent.replace("\n", "").trim();
      author = courseInfo.querySelector(".author").textContent.trim();
      const courseDetail = courseInfo.querySelector(".course_detail").textContent.trim();
      // Find the positions of specific keywords to extract substrings
      const hoursEndIndex = courseDetail.indexOf(" total hours");
      const lecturesStartIndex = courseDetail.indexOf("•") + 1;
      const lecturesEndIndex = courseDetail.indexOf(" lectures");
      lectures = courseDetail.substring(lecturesStartIndex, lecturesEndIndex).trim();
      hours = courseDetail.substring(0, hoursEndIndex).trim();
      price = courseInfo.querySelector(".price").textContent.trim();
    }
>>>>>>> 1e9616e (add:project)

    const courseDetails = {
      id: id,
      imgSrc: imgSource,
      title: title,
      author: author,
      hours: hours,
      lectures: lectures,
      price: price,
    };

    addToCart(courseDetails);

    // Display the cart after adding the item
    displayCart();

    // Update Cart number
    updateNumCart();

    // Update prices
    computePrices();

    if (exists) {
      appendAlertSucess("Course already added to cart.", "danger");
    }
  });
});

function addToCart(courseDetails) {
  // Get Cart from local storage
  const courseCart = JSON.parse(localStorage.getItem("Cart")) || [];

  // Check if the course is already in the cart
  const existingCourse = courseCart.find(
    (course) => course.id === courseDetails.id
  );

  if (!existingCourse) {
    // Add the new course item to the cart
    courseCart.push(courseDetails);
  } else {
    exists = true;
  }
  // Save the updated cart back to localStorage
  localStorage.setItem("Cart", JSON.stringify(courseCart));
<<<<<<< HEAD
=======

  appendAlertSucess("Course added to cart.", "success");
>>>>>>> 1e9616e (add:project)
}

function displayCart() {
  const cartContainer = document.getElementById("course-list"); // Replace with your actual container ID
  cartContainer.innerHTML = ""; // Clear existing content

  // Retrieve the cart from localStorage
  let cart = JSON.parse(localStorage.getItem("Cart")) || [];

  cart.forEach((course) => {
    const courseHTML = `
            <div class="course-item d-flex gap-2 gap-lg-3">
              <div>
                <a href="details.html">
                  <img
                    src="${course.imgSrc}"
                    alt="Course Image"
                  />
                </a>
              </div>
              <div class="course-info">
                <h2>
                  <a href="details.html">
                    ${course.title}
                  </a>
                </h2>

                <div class="author">${course.author}</div>
                <p class="course_detail">
                  <span class="badge">Bestseller</span> ${course.hours} • ${course.lectures}
                  lectures
                </p>
                <div class="course-rating">
                  <span class="price">${course.price}</span>
                </div>
                <div>
<<<<<<< HEAD
                <button class="mt-1 btn btn-danger btn-sm">Delete</button>
=======
                <button class="delete-cart-item mt-1 btn btn-danger btn-sm" data-id="${course.id}">Delete</button>
>>>>>>> 1e9616e (add:project)
                </div>
              </div>
            </div>
        `;

    cartContainer.innerHTML += courseHTML;
<<<<<<< HEAD
=======

    // Add delete listener
    deleteCartItemEventListeners();
>>>>>>> 1e9616e (add:project)
  });
}

function updateNumCart() {
  // Retrieve the cart from localStorage
  const cart = JSON.parse(localStorage.getItem("Cart")) || [];
  // Update cart number
  if (cart.length === 0) {
    $("numCart").textContent = "";
  } else {
    $("numCart").textContent = cart.length;
  }
}

function computePrices() {
  // Retrieve the cart from localStorage
  const cart = JSON.parse(localStorage.getItem("Cart")) || [];
  let sum = 0;
  cart.forEach((course) => {
    sum += parseFloat(course.price.replace("CA$", "").trim());
  });

  $("subTotal").textContent = `$${sum.toFixed(2)}`;
  $("subTotalvalue").textContent = `$${sum.toFixed(2)}`;
  $("totalPayable").textContent = `$${(sum * 0.15).toFixed(2)}`;
<<<<<<< HEAD
=======
  $("subTotalvalue").textContent = `$${(sum+(sum * 0.15)).toFixed(2)}`;
>>>>>>> 1e9616e (add:project)
}

// Call displayCart when the page loads
document.addEventListener("DOMContentLoaded", () => {
  displayCart();
  updateNumCart();
  computePrices();
});
<<<<<<< HEAD
=======

function deleteCartItemEventListeners() {
  const deleteButtons = document.querySelectorAll(".delete-cart-item");

  deleteButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      const id = e.target.dataset.id;
      deleteFromCart(id);
      displayCart(); // Update cart display after deletion
      updateNumCart(); // Update cart number
      computePrices(); // Update prices
    });
  });
}

function deleteFromCart(id) {
  // Get Cart from local storage
  const courseCart = JSON.parse(localStorage.getItem("Cart")) || [];

  // Filter out the course to be deleted
  const updatedCart = courseCart.filter((course) => course.id !== id);

  // Save the updated cart back to localStorage
  localStorage.setItem("Cart", JSON.stringify(updatedCart));
}

>>>>>>> 1e9616e (add:project)
