import {
  products,
  productCard,
  productNavigation,
} from "./products/LoadProducts.js";
import { PATHS } from "./Auth/Index.js";

displayProductsOn(document.querySelector("#showcase"), 4, products.length);
displayProductsOn(document.getElementById("weekly"), 0, 4);

function displayProductsOn(
  parentElement,
  startIndex,
  endIndex,
  productList = products
) {
  if (parentElement) {
    const productCards = productList
      .slice(startIndex, endIndex)
      .map((product) => {
        return `
      <div class="product__card" data-id =${product.id}>
      ${productCard(product)}
        </div>
        `;
      })
      .join("");
    parentElement.innerHTML = productCards;
    productNavigation();
  }
}

function routeToProduct(productId) {
  const productUrl = new URL(`${PATHS.product}`, window.location.origin);
  productUrl.searchParams.set("id", productId);
  window.location.href = productUrl.toString();
}

export { routeToProduct, displayProductsOn };
