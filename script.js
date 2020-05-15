let hamburger = document.querySelector('#hamburger');
let navLinks = document.querySelector('#navLinks');
let navbarClose = document.querySelector('#navbarClose');

hamburger.addEventListener('click', () => {
  navLinks.classList.add('navbar__links--active');
});

navbarClose.addEventListener('click', () => {
  console.log('wow');
  navLinks.classList.remove('navbar__links--active');
});
