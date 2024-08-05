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
                <button class="mt-1 btn btn-danger btn-sm">Delete</button>
                </div>
              </div>
            </div>
        `;

    cartContainer.innerHTML += courseHTML;
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
}

// Call displayCart when the page loads
document.addEventListener("DOMContentLoaded", () => {
  displayCart();
  updateNumCart();
  computePrices();
});
