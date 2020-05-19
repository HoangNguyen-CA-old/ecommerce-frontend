let hamburger = document.querySelector('#hamburger');
let navLinks = document.querySelector('#navLinks');
let navbarClose = document.querySelector('#navbarClose');
let productsContainer = document.querySelector('#products');

let shoppingCart = document.querySelector('#shoppingCart');
let modal = document.querySelector('#modal');
let modalBackdrop = document.querySelector('#modalBackdrop');
let modalClose = document.querySelector('#modalClose');

let cart = new Map(); //id => amount

//products supposed to be fetched from database
let products = [
  {
    id: 0,
    name:
      'Sapphire Technology 11265-67-20G Radeon Pulse RX 580 8GB GDDR5   Dual HDMI / Dual DP OC w/ Backplate (UEFI) PCI-E Graphics Card',
    desc: 'Free Shipping',
    price: 229.99,
    image: './products/rx-580.jpg',
  },
  {
    id: 1,
    name:
      'Gigabyte Radeon RX 5600 XT WINDFORCE OC 6G Graphics Card, 3X WINDFORCE Fans, 8GB 256-Bit GDDR6, GV-R56XTWF2OC-6GD Video Card',
    desc: 'Free Shipping',
    price: 419.99,
    image: './products/rx-5600xt.jpg',
  },
  {
    id: 2,
    name:
      'ASUS ROG Strix GeForce RTX 2080TI Overclocked 11G GDDR6 HDMI DP 1.4 USB Type-C Gaming Graphics Card',
    desc: 'Free Shopping',
    price: 1899.99,
    image: './products/2080ti.jpg',
  },
];

function addProductToDOM(product) {
  console.log('RAN');
  let el = document.createElement('div');
  el.classList.add('product__item');
  let image = document.createElement('img');
  image.classList.add('product__image');
  image.src = product.image;
  el.appendChild(image);

  let main = document.createElement('div');
  main.classList.add('product__main');
  main.innerHTML = `
  <h6 class="product__name">
 ${product.name}
  </h6>
  <p class="product__desc">${product.desc}</p>
  <p class="product__price">$${product.price}</p>
  <button class="button button--buy">ADD TO CART</button>
  `;
  el.appendChild(main);
  productsContainer.appendChild(el);
}

function init() {
  products.forEach((el) => {
    addProductToDOM(el);
  });
}

hamburger.addEventListener('click', () => {
  navLinks.classList.add('navbar__links--active');
});

navbarClose.addEventListener('click', () => {
  console.log('wow');
  navLinks.classList.remove('navbar__links--active');
});

shoppingCart.addEventListener('click', () => {
  modal.classList.add('modal--active');
  modalBackdrop.classList.add('modal__backdrop--active');
});

modalBackdrop.addEventListener('click', () => {
  modal.classList.remove('modal--active');
  modalBackdrop.classList.remove('modal__backdrop--active');
});

modalClose.addEventListener('click', () => {
  modal.classList.remove('modal--active');
  modalBackdrop.classList.remove('modal__backdrop--active');
});

init();
