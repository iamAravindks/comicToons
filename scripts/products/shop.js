import { displayProductsOn } from "../index.js";
import {
  categories,
  productNavigation,
  products,
} from "../products/LoadProducts.js";
import { FuseSearch } from "./searchProduct.js";

const shopDiv = document.getElementById("showcase");

const PAGE_STATE = {
  skip: 0,
  limit: 4,
  productList: products,
  filterdProductList: products,
};

function displayProducts(
  skip = PAGE_STATE.skip,
  limit = PAGE_STATE.limit,
  products
) {
  if (products.length == 0) {
    shopDiv.innerHTML = `<h3>No products found!!</h3>`;
    return;
  }
  console.log("this is ", products);
  displayProductsOn(shopDiv, skip, limit, products);
}

function displayPagination(products) {
  const totalProducts = products.length;
  const pageSize = PAGE_STATE.limit;

  const pageCount = Math.ceil(totalProducts / pageSize);
  const count = pageCount < 1 ? 1 : pageCount;

  const pageDiv = document.getElementById("pagination");

  const displayPages = Array.from(
    { length: count },
    (_, index) => index + 1
  ).map((i) => {
    if (i == 1) {
      return `<li class="page__active" data-page=${i}>${i}</li>`;
    } else {
      return `<li data-page=${i}>${i}</li>`;
    }
  });

  pageDiv.innerHTML = `
    <li class="backward">«</li>
    ${displayPages.join("")}
    <li class="forward">»</li>
  `;

  const pages = document.querySelectorAll("li[data-page]");
  pages.forEach((page) => {
    page.addEventListener("click", () => {
      if (page.classList.contains("page__active")) return;

      const pageNo = page.getAttribute("data-page");
      if (pageNo) {
        pages.forEach((p) => p.classList.remove("page__active"));

        page.classList.add("page__active");
        console.log(products);
        displayProducts(
          (pageNo - 1) * PAGE_STATE.limit,
          pageNo * PAGE_STATE.limit,
          products
        );
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    });
  });
}

function reRender(products) {
  displayProducts(PAGE_STATE.skip, PAGE_STATE.limit, products);
  displayPagination(products);
}

const priceFilterBtn = document.getElementById("filter-price");
const nameFilterBtn = document.getElementById("filter-name");

priceFilterBtn.addEventListener("click", () => {
  PAGE_STATE.productList.sort((a, b) => {
    return Number(b.price) - Number(a.price);
  });

  reRender(PAGE_STATE.productList);
});

nameFilterBtn.addEventListener("click", () => {
  PAGE_STATE.productList.sort((a, b) => {
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
    return 0;
  });

  reRender(PAGE_STATE.productList);
});

const categoryFilter = document.getElementById("categories");
for (let cat of categories) {
  let option = document.createElement("option");
  option.setAttribute("value", cat.name);

  let optionText = document.createTextNode(cat.name);
  option.appendChild(optionText);

  categoryFilter.appendChild(option);
}

categoryFilter.addEventListener("change", (e) => {
  console.log(e.target.value);
  PAGE_STATE.filterdProductList = PAGE_STATE.productList.filter((item) =>
    item.categories.includes(e.target.value)
  );

  console.log(PAGE_STATE.filterdProductList);
  reRender(PAGE_STATE.filterdProductList);
});

window.onload = function () {
  const currentUrl = new URL(window.location.href);
  const searchTerm = currentUrl.searchParams.get("query");
  if (searchTerm) {
    document.getElementById("searchInput").value = searchTerm;
    const fuse = FuseSearch(products);
    PAGE_STATE.productList = fuse.search(searchTerm).map((item) => item.item);
    console.log(PAGE_STATE.productList);
  }
  reRender(PAGE_STATE.productList);
};
