// ********** add <li> items **********

const myList = document.getElementById("myList");
// new list item

let newListItem = document.createElement("li");
newListItem.innerHTML = `<a href="#section1">Section 1</a>
<a href="#section2">Section 2</a>
<a href="#section3">Section 3</a>
<a href="#section4">Section 4</a>`;

myList.appendChild(newListItem);

// ********** add new section **********

const main = document.getElementsByTagName("main")[0];
// new section item

let newSecItem = document.createElement("section");
newSecItem.innerHTML = `
<section id="section4" data-nav="Section 4">
<div class="landing__container right">
  <h2>Section 4</h2>
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi fermentum metus faucibus lectus pharetra
    dapibus. Suspendisse potenti. Aenean aliquam elementum mi, ac euismod augue. Donec eget lacinia ex. Phasellus
    imperdiet porta orci eget mollis. Sed convallis sollicitudin mauris ac tincidunt. Donec bibendum, nulla eget
    bibendum consectetur, sem nisi aliquam leo, ut pulvinar quam nunc eu augue. Pellentesque maximus imperdiet
    elit a pharetra. Duis lectus mi, aliquam in mi quis, aliquam porttitor lacus. Morbi a tincidunt felis. Sed leo
    nunc, pharetra et elementum non, faucibus vitae elit. Integer nec libero venenatis libero ultricies molestie
    semper in tellus. Sed congue et odio sed euismod.</p>

  <p>Aliquam a convallis justo. Vivamus venenatis, erat eget pulvinar gravida, ipsum lacus aliquet velit, vel
    luctus diam ipsum a diam. Cras eu tincidunt arcu, vitae rhoncus purus. Vestibulum fermentum consectetur
    porttitor. Suspendisse imperdiet porttitor tortor, eget elementum tortor mollis non.</p>
</div>
</section>
`;

main.appendChild(newSecItem);

// ********** responsive Navigation on smaller screens **********

const navbarSwitch = document.querySelector(".navbar-toggler");
const navbarMenu = document.querySelector("#myList");
const navbarLinks = document.querySelectorAll(".navbar__menu a");

navbarSwitch.addEventListener("click", navbarSwitchClick);

function navbarSwitchClick() {
  navbarSwitch.classList.toggle("open-navbar-toggler");
  navbarMenu.classList.toggle("open");
}

navbarLinks.forEach(elem => elem.addEventListener("click", navbarLinkClick));

function navbarLinkClick() {
  smoothScroll(event);
  if (navbarMenu.classList.contains("open")) {
    navbarSwitch.click();
  }
}

// script to create scrolling for navigation

smoothScroll = event => {
  event.preventDefault();
  const targetId =
    event.currentTarget.getAttribute("href") === "#"
      ? "body"
      : event.currentTarget.getAttribute("href");
  document.querySelector(targetId).scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
};

// ********* scroll top function *************

const backToTopButton = document.querySelector("#back-to-top-btn");

window.addEventListener("scroll", scrollFunction);

function scrollFunction() {
  if (window.pageYOffset > 300) { // Show backToTopButton
    if(!backToTopButton.classList.contains("btnEntrance")) {
      backToTopButton.classList.remove("btnExit");
      backToTopButton.classList.add("btnEntrance");
      backToTopButton.style.display = "block";
    }
  }
  else { // Hide backToTopButton
    if(backToTopButton.classList.contains("btnEntrance")) {
      backToTopButton.classList.remove("btnEntrance");
      backToTopButton.classList.add("btnExit");
      setTimeout(function() {
        backToTopButton.style.display = "none";
      }, 250);
    }
  }
}

backToTopButton.addEventListener("click", smoothScrollBackTop);

function smoothScrollBackTop() {
  const targetPosition = 0;
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  const duration = 750;
  let start = null;
  
  window.requestAnimationFrame(step);

  function step(timestamp) {
    if (!start) start = timestamp;
    const progress = timestamp - start;
    window.scrollTo(0, easeInOutCubic(progress, startPosition, distance, duration));
    if (progress < duration) window.requestAnimationFrame(step);
  }
}

function easeInOutCubic(a, b, c, d) {
	a /= d/2;
	if (a < 1) return c/2*a*a*a + b;
	a -= 2;
	return c/2*(a*a*a + 2) + b;
};