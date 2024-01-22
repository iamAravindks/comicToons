import { User } from "../Auth/Index.js";
import { getProductView, products } from "./LoadProducts.js";

function getProduct(id) {
  return products.find((x) => x.id.toString() === id.toString());
}

function displayProduct(id) {
  const currentProduct = getProduct(id);

  const productSection = document.getElementById("product__detail");

  productSection.innerHTML = getProductView(currentProduct);
  const addToCartBtn = document.getElementById("add-to-cart");
  console.log(addToCartBtn);
  addToCartBtn.addEventListener("click", () => {
    User.addToCart(currentProduct);
  });
}

window.onload = function () {
  const currentUrl = new URL(window.location.href);
  const productId = currentUrl.searchParams.get("id");
  if (!productId) return;
  displayProduct(productId);
};
