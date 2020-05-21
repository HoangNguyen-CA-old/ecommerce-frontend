let hamburger = document.querySelector('#hamburger');
let navLinks = document.querySelector('#navLinks');
let navbarClose = document.querySelector('#navbarClose');
let productsContainer = document.querySelector('#products');

let shoppingCart = document.querySelector('#shoppingCart');
let modal = document.querySelector('#modal');
let modalBackdrop = document.querySelector('#modalBackdrop');
let modalClose = document.querySelector('#modalClose');

let shoppingContainer = document.querySelector('#shoppingContainer');

let cart = new Map(); //id => amount
let taxRatio = 0.1;

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

function addToCart(id) {
  let item = cart.get(id);
  let amount;
  if (item != null) {
    amount = item.amount + 1;
  } else {
    amount = 1;
  }

  let display = document.querySelector(`#display-${id}`);
  display.innerHTML = `${amount} item(s) in cart`;
  cart.set(id, { amount, total: 0 });
}

function updateCartTotal() {
  for (let [key, val] of cart) {
    let product = getProduct(key);

    let total = (val.amount * product.price).toFixed(2);
    cart.set(key, { ...val, total });
  }
}

function updateTax() {
  let taxPrice = document.querySelector('#taxPrice');
  let totalPrice = document.querySelector('#totalPrice');

  let total = 0;
  for (let [key, val] of cart) {
    total += +val.total;
  }

  let taxTotal = total * taxRatio;
  taxPrice.innerHTML = taxTotal.toFixed(2);
  totalPrice.innerHTML = (total + taxTotal).toFixed(2);
}

function initCart() {
  updateCartTotal();

  let content = `
  <tr>
    <th>Name</th>
    <th>Price</th>
    <th>#</th>
    <th>Total</th>
    <th>Remove</th>
  </tr>
  `;

  for (let [key, val] of cart) {
    let id = +key;
    let product = getProduct(id);
    if (val.amount > 0) {
      content += `
          <tr class="table__item">
            <td>${product.name}</td>
            <td>$${product.price}</td>
            <td><input type="number" class="modal__item-amount" onchange="updateCartValue(${id}, this.value)" value="${val.amount}"/></td>
            <td>$${val.total}</td>
            <td><button onclick="deleteCartItem(${id})" class="modal__item-remove">remove</button></td>
          </tr>
      `;
    }
  }
  content += `
  <tr>
    <td>Tax (10%)</td>
    <td></td>
    <td></td>
    <td id="taxPrice"></td>
    <td></td>
  </tr>
  <tr>
    <th>Total Cost</th>
    <th></th>
    <th></th>
    <th id="totalPrice"></th>
    <th></th>
  </tr>`;

  shoppingContainer.innerHTML = content;
  updateTax();
}

function updateCartValue(id, value) {
  let item = cart.get(id);

  let display = document.querySelector(`#display-${id}`);
  display.innerHTML = `${value} item(s) in cart`;
  cart.set(id, { ...item, amount: value });

  initCart();
}

function deleteCartItem(id) {
  cart.set(id, { amount: 0, total: 0 });
  initCart();
}

function getProduct(id) {
  for (let product of products) {
    if (product.id === id) return product;
  }
  throw new Error(`Product with an id of ${id} not found`);
}

function addProductToDOM(product) {
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
  <button class="button button--buy" onclick="addToCart(${product.id})">ADD TO CART</button>
  <p id="display-${product.id}"></p>
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
  navLinks.classList.remove('navbar__links--active');
});

shoppingCart.addEventListener('click', () => {
  initCart();
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
