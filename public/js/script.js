$(".partners_wrap_carousel").owlCarousel({
  loop: false,
  dots: false,
  margin: 15,
  autoplay: true,
  autoplayTimeout: 2500,
  navText: [
    '<i class="las la-angle-left"></i>',
    '<i class="las la-angle-right"></i>',
  ],
  nav: true,
  items: 2,
  responsive: {
    0: {
      items: 2,
    },
    576: {
      items: 3,
    },
    769: {
      items: 4,
    },
    1024: {
      items: 5,
    },
    1440: {
      items: 6,
    },
  },
});

$(".hot_courses").owlCarousel({
  loop: true,
  dots: false,
  margin: 15,
  autoplay: false,
  autoplayTimeout: 3200,
  navText: [
    '<i class="las la-angle-left"></i>',
    '<i class="las la-angle-right"></i>',
  ],
  nav: true,
  items: 1,
  responsive: {
    0: {
      items: 1,
    },
    425: {
      items: 2,
    },
    769: {
      items: 3,
    },
    1024: {
      items: 4,
    },
    1440: {
      items: 4,
    },
  },
});

$(".recomended_course").owlCarousel({
  loop: true,
  dots: false,
  margin: 15,
  autoplay: false,
  autoplayTimeout: 3400,
  navText: [
    '<i class="las la-angle-left"></i>',
    '<i class="las la-angle-right"></i>',
  ],
  nav: true,
  items: 1,
  responsive: {
    0: {
      items: 1,
    },
    425: {
      items: 2,
    },
    769: {
      items: 3,
    },
    1024: {
      items: 4,
    },
    1440: {
      items: 4,
    },
  },
});

$(".new_wrap").owlCarousel({
  loop: true,
  dots: false,
  margin: 15,
  autoplay: true,
  autoplayTimeout: 3600,
  navText: [
    '<i class="las la-angle-left"></i>',
    '<i class="las la-angle-right"></i>',
  ],
  nav: true,
  items: 1,
  responsive: {
    0: {
      items: 1,
    },
    425: {
      items: 2,
    },
    769: {
      items: 3,
    },
    1024: {
      items: 4,
    },
    1440: {
      items: 4,
    },
  },
});

// news
$(".testimonial-slider").owlCarousel({
  loop: true,
  dots: false,
  margin: 15,
  autoplay: false,
  autoplayTimeout: 3300,
  navText: [
    '<i class="las la-angle-left"></i>',
    '<i class="las la-angle-right"></i>',
  ],
  nav: true,
  items: 2,
  responsive: {
    0: {
      items: 1,
    },
    576: {
      items: 2,
    },
    769: {
      items: 4,
    },
  },
});

// add-to-cart

// search-bar
const searchSubmit = document.getElementById("searchInput");
if (searchSubmit) {
  searchSubmit.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      alert(":sdfsdf");
      window.location.href = "list.html";
    }
  });
}

// sticky-header
window.onscroll = function () {
  myFunction();
};

// scrollUp
var scrollTop = document.getElementById("scrollUp");
var header = document.getElementById("header");
var sticky = header.offsetTop;

if (scrollTop) {
  scrollTop.addEventListener("click", () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  });
}

function myFunction() {
  if (window.scrollY > sticky) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }

  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    scrollTop.style.display = "block";
    scrollTop.style.transition = "all .4s ease-in-out";
  } else {
    scrollTop.style.display = "none";
  }
}
