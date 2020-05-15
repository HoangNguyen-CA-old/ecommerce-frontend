let hamburger = document.querySelector('#hamburger');
let navLinks = document.querySelector('#navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.add('navbar__links--active');
});
