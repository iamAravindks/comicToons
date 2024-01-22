const USERS_KEY = "Users";
const CURRENT_USER_KEY = "CurrentUser";
const CART_ITEMS = "CartItems";

const PATHS = {
  home: "/pages/index.html",
  signup: "/pages/signup.html",
  login: "/pages/login.html",
  cart: "/pages/cart.html",
  product: "/pages/product.html",
  shop: "/pages/shop.html",
};

class Utils {
  static loadFromLS(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
  }

  static setToLS(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }
}

class User {
  constructor(username, email) {
    this.username = username;
    this.email = email;
  }

  signUp(password) {
    let users = Utils.loadFromLS(USERS_KEY);

    if (users.some((user) => user.email === this.email)) {
      alert(`User with email ${this.email} already exists`);
      return;
    }

    const newUser = {
      username: this.username,
      email: this.email,
      password: password,
    };

    Utils.setToLS(USERS_KEY, [...users, newUser]);
    Utils.setToLS(CURRENT_USER_KEY, newUser);

    window.alert("You're in");
    location.pathname = PATHS.home;
  }

  static login(email, password) {
    let users = Utils.loadFromLS(USERS_KEY);
    const existingUser = users.find((x) => x.email === email);
    if (!existingUser || existingUser.password !== password) {
      alert("Invalid Credentials");
      return;
    }
    delete existingUser.password;
    Utils.setToLS(CURRENT_USER_KEY, existingUser);
    location.pathname = PATHS.home;
  }
  //TODO : make it better
  static addToCart(product) {
    const currentUser = Utils.loadFromLS(CURRENT_USER_KEY);

    if (!currentUser) return;

    let cartItems = Utils.loadFromLS(CART_ITEMS) || [];

    const existingProductOwnerIndex = cartItems.findIndex(
      (item) => item.user.email === currentUser.email
    );

    if (existingProductOwnerIndex !== -1) {
      const existingProduct = cartItems[
        existingProductOwnerIndex
      ].user.cartItems.find((p) => p.id === product.id);

      if (existingProduct) {
        existingProduct.qty += 1;
      } else {
        cartItems[existingProductOwnerIndex] = {
          ...cartItems[existingProductOwnerIndex],
          user: {
            email: currentUser.email,
            username: currentUser.username,
            cartItems: [
              ...cartItems[existingProductOwnerIndex].user.cartItems,
              { ...product, qty: 1 },
            ],
          },
        };
      }
    } else {
      cartItems.push({
        user: {
          email: currentUser.email,
          username: currentUser.username,
          cartItems: [{ ...product, qty: 1 }],
        },
      });
    }

    alert(`${product.name} added to cart`);
    Utils.setToLS("CART_ITEMS", cartItems);
  }

  static getCart() {
    const currentUser = Utils.loadFromLS("currentUser");

    if (!currentUser) return;

    let cartItems = Utils.loadFromLS("CART_ITEMS") || [];
    return cartItems;
  }
}

window.onload = function () {
  window.ComicToons = {
    Users: Utils.loadFromLS(USERS_KEY),
  };
};

const signupForm = document.querySelector("#signup__form");
if (signupForm) {
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const user = new User(username, email);
    user.signUp(password);
  });
}

const loginForm = document.querySelector("#login__form");
if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    User.login(email, password);
  });
}

export { PATHS, Utils, USERS_KEY, CURRENT_USER_KEY, User };
