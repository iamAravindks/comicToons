import { User } from "../Auth/Index.js";

function displayCart() {
  const cartItems = User.getCart();
  console.log(cartItems);
}

window.onload = function () {
  displayCart();
};
