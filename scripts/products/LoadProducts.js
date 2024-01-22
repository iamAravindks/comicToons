import { routeToProduct } from "../index.js";

const categories = [
  { id: 1, name: "Action" },
  { id: 2, name: "Adventure" },
  { id: 3, name: "Comedy" },
  { id: 4, name: "Drama" },
  { id: 5, name: "Fantasy" },
  { id: 6, name: "Horror" },
  { id: 7, name: "Mystery" },
  { id: 8, name: "Romance" },
  { id: 9, name: "Science Fiction" },
  { id: 10, name: "Thriller" },
];

const products = [
  {
    id: 1,
    name: "One Piece Vol 104",
    price: "35",
    img: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTC7q-xqMy91s2L-6c9mNwO_6wHjO4auVoy_ZB0e13WqXcdJ6bh3DmSRjo6JpvHXYGA56lT4qYlEMk38s0Vgh7jxCyKt76QQ3j2YGtHp-VfBPChiOVt4rf1&usqp=CAE",
    writer: "Eiichiro Oda",
    categories: [1, 2, 3],
    artist: "Eiichiro Oda",
    description:
      "The latest volume of the popular manga One Piece by Eiichiro Oda. Follow Monkey D. Luffy and his crew as they embark on new adventures and face powerful foes.",
  },

  {
    id: 3,
    name: "JJK Vol.20",
    price: "30",
    img: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcS2UBIxOQkMQZ8apSWLV1G0VMhXxEb9msyG_Bpd7uQvUJoIah5tTfk5vkDOjXozCG0LbO9PS5zaArzoUgP0IJzDaE53IVbhqEF_gNEjAYc&usqp=CAE",
    writer: "Gege Akutami",
    artist: "Gege Akutami",
    categories: [1, 2, 5],

    description:
      "Experience the intense battles and supernatural world of Jujutsu Kaisen in this gripping manga volume. Yuji Itadori faces curses and fights to protect his friends.",
  },
  {
    id: 2,
    name: "Spider-Man Marvel Age",
    price: "20",
    img: "https://cdn.marvel.com/u/prod/marvel/i/mg/6/90/5a664c954a55b/portrait_uncanny.jpg",
    writer: "Stan Lee",
    artist: "Steve Ditko",
    categories: [1, 8],

    description:
      "Classic Spider-Man comics featuring the iconic superhero. Join Peter Parker as he balances life as a student and a superhero, facing villains like Green Goblin and Doctor Octopus.",
  },
  {
    id: 4,
    name: "Watchmen",
    price: "19",
    img: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTrePu4fwBUtKYdVpr-A2yLl8uu1_To1D7WzUR9ag6_At-8FVJsfJv8oXpv4hZQVHNdTx7QDe2jVWO1sdYXO7gYgEMMwkUo5hlONF8LXk3N&usqp=CAE",
    writer: "Alan Moore",
    artist: "Dave Gibbons",
    categories: [1, 2, 7],

    description:
      "Explore the complex world of Watchmen, a groundbreaking graphic novel that delves into the lives of masked vigilantes. A thought-provoking story about morality and power.",
  },
  {
    id: 5,
    name: "Giant-Size Spiderman",
    price: "19",
    img: "https://cdn.marvel.com/u/prod/marvel/i/mg/1/d0/6596e128788c8/portrait_uncanny.jpg",
    writer: "Gerry Conway",
    artist: "Ross Andru",
    categories: [1, 2, 6, 7],

    description:
      "Join Spider-Man in these giant-sized adventures filled with action and excitement. Swing through the streets of New York with your friendly neighborhood Spider-Man!",
  },
  {
    id: 6,
    name: "Demon slayer Vol 20",
    price: "35",
    img: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRvgu-HSgwRuz3lfWL5PNHAa-YHiHhZLttmv1lJjUUg79g8S-gSZY6L6f808hBoztb4WqZeIsfGgdkLSXuIFTBhyLWb4geIcci7XM9jRaI&usqp=CAE",
    writer: "Koyoharu Gotouge",
    artist: "Koyoharu Gotouge",
    categories: [1, 2, 8, 5],

    description:
      "Continue the thrilling journey of Tanjiro Kamado and his friends in Demon Slayer. In this volume, they face new challenges and encounter powerful demons in their quest.",
  },
  {
    id: 7,
    name: "Bakuman Vol.20",
    price: "20",
    img: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTC_HwKKvO5wtu2gKmzS6i_iT6QB2qt08Ip53879umJaHzKWNYOsSeTxub38hRFeuMjrp3-7Qkt_IMYBf94boMnjpT80FnZq8riw8o0YUZE&usqp=CAE",
    writer: "Tsugumi Ohba",
    artist: "Takeshi Obata",
    categories: [1, 2, 3, 4],

    description:
      "Step into the world of manga creation with Bakuman. Follow the story of two aspiring manga artists, Moritaka Mashiro and Akito Takagi, as they pursue their dreams.",
  },
  {
    id: 8,
    name: "Marvel-verse Thanos",
    price: "30",
    img: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQgj5eDRMA03sUGvBcwKBR0P-KmUgbyaN_ExeGa7c8aiqN5w-aIwmX2Zfmn_TVl5YCcde0ljY_c-Dijqk2iIjBaJxFx62H-D_mM4IaB8ck&usqp=CAE",
    writer: "Jim Starlin",
    artist: "Jim Starlin",
    categories: [1, 2, 7],

    description:
      "Delve into the Marvel-verse with Thanos, the formidable villain. Witness the cosmic battles and epic showdowns as Thanos seeks ultimate power.",
  },
  {
    id: 9,
    name: "Ultimate X-men",
    price: "19",
    img: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcREpZzRMtkL6oMFdedzNx7kOlmQe5GliTW7BYuGnK8FF_80tCkaZIYH70LYtBrm4dvGRGssqWA1b-nrN0MPPTo9eH__eTGm9yqr7_3MLYUs96e0mx6lKf99pQ&usqp=CAE",
    writer: "Mark Millar",
    artist: "Adam Kubert",
    categories: [1, 2, 7],
    description:
      "Experience the X-Men in the Ultimate universe with new twists and turns. Join mutants like Wolverine, Cyclops, and Storm as they face unique challenges and threats.",
  },
  {
    id: 10,
    name: "Solo leveling Vol.1(Novel)",
    price: "51",
    img: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQIQKFZDtdVTb72kyCfQIfzMVqbbDzGFXUDSAjp9uYf7jyap9He7AK1lkJAr1B8IqCoA_kxiJUDx_uDu8omaLykvpCTPY-DVeJjivdcHoM&usqp=CAE",
    writer: "Chugong",
    artist: "Dubu (Redice Studio)",
    categories: [1, 2, 7],
    description:
      "THE WEAKEST HUNTER OF ALL MANKIND E-rank hunter Jinwoo Sung has no money, no talent, and no prospects to speak of--and apparently, no luck, either When he enters a hidden double dungeon one fateful day, he's abandoned by his party and left to die at the hands of some of the most horrific monsters he's ever encountered. But just before the last, fatal blow... PING Congratulations on becoming a Player.]",
  },
  {
    id: 11,
    name: "Berserk Deluxe Vol.1",
    price: "68",
    img: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcSIdXlbkZxM9H1oorVYVmv6f9-M_X4WIAO-koCZGlqIfF32frSNkhhZXpzj5nPfMN3hmNPBEBIEQbu_qyXCs9BtuohviHLUoXx5oYc6EmY&usqp=CAE",
    writer: "Kentaro Miura ",
    artist: "Kentaro Miura ",
    categories: [1, 2, 4, 5, 6],
    description:
      "Volume 1: His name is Guts, the Black Swordsman, a feared warrior spoken of only in whispers. Bearer of a gigantic sword, an iron hand, and the scars of countless battles and tortures, his flesh is also indelibly marked with The Brand, an unholy symbol that draws the forces of darkness to him and dooms him as their sacrifice. But Guts won't take his fate lying down; he'll cut a crimson swath of carnage through the ranks of the damned - and anyone else foolish enough to oppose him!",
  },
  {
    id: 12,
    name: "Monster Vol.1",
    price: "48",
    img: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRHDsoFVuLDoBlUXib1502z_DtzSQTvWk5axi7y4q6CWEyMkfrjblYREQjXkelVSTsHwRsAfxJIv83BP75aPFN-X9EqKmDlggzKYwGuRmU&usqp=CAE",
    writer: " Naoki Urasawa",
    artist: " Naoki Urasawa",
    categories: [1, 4, 7, 10],
    description:
      "Johan is a cold and calculating killer with a mysterious past, and brilliant Dr. Kenzo Tenma is the only one who can stop him! Conspiracy and serial murder open the door to a compelling, intricately woven plot in this masterwork of suspense. Everyone faces uncertainty at some point in their lives., Even a brilliant surgeon like Kenzo Tenma is no exception. But there's no way he could have known that his decision to stop chasing professional success and instead concentrate on his oath to save peoples' lives would result in the birth of an abomination. The questions of good and evil now take on a terrifyingly real dimension., Years later, in Germany during the tumultuous post-reunification period, middle-aged childless couples are being killed one after another. The serial killer's identity is known. The reasons why he kills are not., Dr. Tenma sets out on a journey to find the killer's twin sister, who may hold some clues to solving the enigma of the Monster.",
  },
];

products.forEach((product) => {
  product.categories = product.categories.map((categoryId) => {
    const category = categories.find((cat) => cat.id === categoryId);
    return category ? category.name : null;
  });
});

function getProductView(currentProduct) {
  return `
           <div class="product__detail__img">
            <img src="${currentProduct.img}" alt=${currentProduct.name}">
        </div>
        <div class="product__detail__desc">
            <h1>
                ${currentProduct.name}
                </h2>
                <div class="product__creator">
                    <div>
                        <h2>Writer</h2>
                        <p>${currentProduct.writer}</p>
                    </div>
                    <div>
                        <h2>Artist</h2>
                        <p>${currentProduct.artist}</p>
                    </div>
                </div>
                <div class="product__description">
                    <p>
            ${currentProduct.description}
                    </p>
                </div>
                <div class="price">
                    Price : <span>$${currentProduct.price}</span>
                </div>
                <div class="btn__container__center" >
                    <button class="add-cart-btn" id="add-to-cart">Add to cart</button>
                </div>
        </div>
        </div>
    
    `;
}

function productCard(currentProduct) {
  return `
        
        <div class="product__heading" >
          <h2 class="product__name">
            ${currentProduct.name}
          </h2>
          <h5 class="product__price">${currentProduct.price}</h5>
          <div class="product__body">
            <img class="product__img"
              src="${currentProduct.img}" </div>
          </div>
        </div>
      
      `;
}

function productNavigation() {
  document.querySelectorAll(".product__card").forEach((el) => {
    if (el.hasAttribute("data-id")) {
      el.addEventListener("click", (e) => {
        const productId = el.getAttribute("data-id");
        routeToProduct(productId);
      });
    }
  });
}

export { products, categories, getProductView, productCard, productNavigation };
