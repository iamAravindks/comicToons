import { PATHS } from "../Auth/Index.js";
import { routeToProduct } from "../index.js";
import { products } from "./LoadProducts.js";

//for the full-text search
import Fuse from "https://cdn.jsdelivr.net/npm/fuse.js@7.0.0/dist/fuse.mjs";

const fuseOptions = {
  isCaseSensitive: false,
  threshold: 0.3,
  keys: ["name", "writer", "artist", "categories"],
};

function FuseSearch(products) {
  return new Fuse(products, fuseOptions);
}
const fuse = FuseSearch(products);

const searchInput = document.getElementById("searchInput");
const searchResult = document.getElementById("searchResult");
const searchBtn = document.getElementById("searchButton");
console.log(searchBtn);
const resultElementClass = {
  show: "search__results__display",
  none: "search__results__display__none",
};

let timer;

function performSearch() {
  let searchPattern = searchInput.value.trim();
  if (searchPattern) {
    let results = fuse.search(searchPattern);
    searchResult.classList.replace(
      resultElementClass.none,
      resultElementClass.show
    );

    if (results.length !== 0) {
      const output = results.slice(0, 10).map((x) => {
        return `
            <li class="search__item" data-id="${x.item.id}" >
                ${x.item.name}
            </li>
        `;
      });
      searchResult.innerHTML = output.join(" ");

      const searchResultElements = document.querySelectorAll(
        ".search__item[data-id]"
      );
      searchResultElements.forEach((el) => {
        el.addEventListener("click", (e) => {
          const productId = el.getAttribute("data-id");
          routeToProduct(productId);
        });
      });
    } else {
      searchResult.innerHTML = `<li class="search__item__no__result">No items found</li>`;
    }
  } else {
    searchResult.classList.replace(
      resultElementClass.show,
      resultElementClass.none
    );
  }
}

function redirectSearch(e) {
  const searchUrl = new URL(`${PATHS.shop}`, window.location.origin);
  if (!searchInput.value) return;
  searchUrl.searchParams.set("query", searchInput.value);
  window.location.href = searchUrl.toString();
}

searchBtn.addEventListener("click", redirectSearch);

searchInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();
    redirectSearch();
  }
});

searchInput.addEventListener("input", function () {
  clearTimeout(timer);
  timer = setTimeout(function () {
    performSearch();
  }, 300);
});

searchInput.addEventListener("focus", function () {
  clearTimeout(timer);
  timer = setTimeout(function () {
    performSearch();
  }, 300);
});

searchInput.addEventListener("blur", (e) => {
  setTimeout(() => {
    searchResult.classList.replace(
      resultElementClass.show,
      resultElementClass.none
    );
  }, 300);
});
document.getElementById("close-btn").addEventListener("click", (e) => {
  searchResult.classList.replace(
    resultElementClass.show,
    resultElementClass.none
  );
  const currentUrl = new URL(window.location.href);
  const searchTerm = currentUrl.searchParams.get("query");
  if (searchTerm) {
    window.location.href = PATHS.shop;
  }
  searchInput.value = "";
});

window.onload = function () {
  const currentUrl = new URL(window.location.href);
  const searchTerm = currentUrl.searchParams.get("query");
  console.log(searchTerm);
  if (searchInput) {
    searchInput.value = searchTerm;
  }
};

export { FuseSearch };
