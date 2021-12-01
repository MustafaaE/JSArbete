let productContainer = document.querySelector(".products-container");
let popupContainer = document.querySelector(".popupcontainer");
let popupImage = document.querySelector(".popup-image");
let popupTitle = document.querySelector(".popup-title");
let popupClose = document.querySelector(".popup-closebutton");
let popupDesc = document.querySelector(".popup-description");
let popupCategory = document.querySelector(".popup-category");
let popupRating = document.querySelector(".popup-rating");
let popupPrice = document.querySelector(".popup-price");
let popupBuyButton = document.querySelector(".popup-buy-button");
let cartButton = document.querySelector(".shoppingcart-button");
let cartPreview = document.querySelector(".cartPreview");
let cartPreviewtotal = document.querySelector(".cartPreview-total");

let cartPageCheckout = document.querySelector(".cartpage-checkout");

let productsheader = document.getElementById("products-header");

let totalInCart = document.querySelector(".cart-total-products");

let cart = [];
let allProducts = [];
let sortedProducts = [];

/*fetchar*/
fetch("./products.json")
  .then(function (respons) {
    console.log(respons); //ska få status 200
    if (respons.ok) {
      return respons.json(); //parsea json objektet.
    }
  })
  .then((data) => {
    createProducts(data);
    fillArray(data);
  })
  .catch((error) => console.log(error));

/*fyller sidan med produkter */
function createProducts(elements) {
  elements.forEach((product) => {
    fillProductPage(product);
  });
}

/*fyller allProducts array med alla produktobjekt*/
function fillArray(elements) {
  elements.forEach((product) => {
    allProducts.push(product);
  });
}

/* category */
let allCategory = document.getElementById("all-category");
let electronicscategory = document.getElementById("electronics-category");
let womencategory = document.getElementById("tshirtW-category");
let mencategory = document.getElementById("tShirtM-category");
let jewelrycategory = document.getElementById("jewelry-category");
let currentcategory = "all";

allCategory.addEventListener("click", showAllcategories);
electronicscategory.addEventListener("click", showElectronicsCategory);
womencategory.addEventListener("click", showWomenCategory);
mencategory.addEventListener("click", showMenCategory);
jewelrycategory.addEventListener("click", showJewelryCategory);
/*category */

/* visar specifika category */
function showAllcategories() {
  document.getElementById("price-sort").value = "relevance";
  currentcategory = "all";
  productContainer.innerHTML = "";
  productsheader.innerHTML = "OUR PRODUCTS : ";
  productContainer.appendChild(productsheader);

  allProducts.forEach((product) => {
    fillProductPage(product);
  });
}

function showElectronicsCategory() {
  document.getElementById("price-sort").value = "relevance";
  currentcategory = "electronics";
  productContainer.innerHTML = "";
  productsheader.innerHTML = "ELECTRONICS :";
  productContainer.appendChild(productsheader);

  allProducts.forEach((product) => {
    if (product.category === "electronics") {
      fillProductPage(product);
    }
  });
}

function showWomenCategory() {
  document.getElementById("price-sort").value = "relevance";
  currentcategory = "women's clothing";
  productContainer.innerHTML = "";
  productsheader.innerHTML = "WOMEN'S CLOTHING :";
  productContainer.appendChild(productsheader);

  allProducts.forEach((product) => {
    if (product.category === "women's clothing") {
      fillProductPage(product);
    }
  });
}

function showMenCategory() {
  document.getElementById("price-sort").value = "relevance";
  currentcategory = "men's clothing";
  productContainer.innerHTML = "";
  productsheader.innerHTML = "MEN'S CLOTHING :";
  productContainer.appendChild(productsheader);

  allProducts.forEach((product) => {
    if (product.category === "men's clothing") {
      fillProductPage(product);
    }
  });
}

function showJewelryCategory() {
  document.getElementById("price-sort").value = "relevance";
  currentcategory = "jewelery";
  productContainer.innerHTML = "";
  productsheader.innerHTML = "JEWELRY :";
  productContainer.appendChild(productsheader);

  allProducts.forEach((product) => {
    if (product.category === "jewelery") {
      fillProductPage(product);
    }
  });
}
/* End of visar specifika category */



/* Ta bort hela cart knapp */
let deleteCart = document.querySelector(".cartPreview-deleteAll");
deleteCart.addEventListener("click", () => {
  cart.splice(0, cart.length);
  addtoTotal();
  updateTotalItems();
  let container = document.getElementsByClassName("cart-product");
  for (let i = container.length - 1; i >= 0; i--) {
    container[i].remove();
  }
});
/* Ta bort hela cart knapp */

popupClose.addEventListener("click", closePopup);
cartButton.addEventListener("click", showCartPopup);
// popupBuyButton.addEventListener("click", addFromPopup);

/* search bar */
let searchInput = document.getElementById("searchInput");
let searchButton = document.querySelector(".searchButton");

searchButton.addEventListener("click", () => {
  searchProduct(searchInput.value);
});

function searchProduct(searchedItem) {
  let searched = searchedItem.toUpperCase();
  productContainer.innerHTML = "";
  productsheader.innerHTML = '"' + searchedItem.toUpperCase() + '"';
  productContainer.appendChild(productsheader);

  allProducts.forEach((product) => {
    let productName = product.title.toUpperCase();
    if (productName.includes(searched)) {
      fillProductPage(product);
    }
  });
}
/* search bar */

/*söker baserat på pris */
function changePrice() {
  let priceSort = document.getElementById("price-sort").value;

  if (priceSort === "low") {
    let sorted = allProducts.slice().sort(function (a, b) {
      return a.price - b.price;
    });
    productContainer.innerHTML = "";
    productsheader.innerHTML = "Lowest price for : " + currentcategory;
    productContainer.appendChild(productsheader);
    if (currentcategory === "all") {
      sorted.forEach((x) => {
        fillProductPage(x);
      });
    } else {
      sorted.forEach((x) => {
        if (x.category == currentcategory) {
          fillProductPage(x);
        }
      });
    }
  } else if (priceSort === "high") {
    let sorted = allProducts.slice().sort(function (a, b) {
      return b.price - a.price;
    });
    productContainer.innerHTML = "";
    productsheader.innerHTML = "Highest price for : " + currentcategory;
    productContainer.appendChild(productsheader);
    if (currentcategory === "all") {
      sorted.forEach((x) => {
        fillProductPage(x);
      });
    } else {
      sorted.forEach((x) => {
        if (x.category == currentcategory) {
          fillProductPage(x);
        }
      });
    }
  } else {
    productsheader.innerHTML = "OUR PRODUCTS :";
    productContainer.innerHTML = "";
    productContainer.appendChild(productsheader);
    if (currentcategory === "all") {
      allProducts.forEach((x) => {
        fillProductPage(x);
      });
    } else {
      allProducts.forEach((x) => {
        if (x.category === currentcategory) {
          fillProductPage(x);
        }
      });
    }
  }
}


/* fyller popup med info om produkten */
function fillPopup(test) {
  popupImage.src = test.image;
  popupTitle.textContent = test.title;
  popupDesc.textContent = test.description;
  popupCategory.textContent = "Category: " + test.category;
  popupRating.textContent =
    "Rating : " +
    test.rating.rate +
    " , " +
    "Amount left: " +
    test.rating.count;
  popupPrice.textContent = "Price: $" + test.price;
  popupBuyButton.addEventListener("click", () =>{
    addToCart(test);
    updateNumber(test);

  });
  
}
/* END fyller popup med info om produkten */

function showPopup() {
  popupContainer.style.visibility = "visible";
}

function closePopup() {
  popupContainer.style.visibility = "hidden";
}

function showCartPopup() {
  if (cartPreview.style.visibility !== "visible") {
    return (cartPreview.style.visibility = "visible");
  } else {
    return (cartPreview.style.visibility = "hidden");
  }
}

function addToCart(product) {
  updateCart(product);
  addtoTotal();
  updateTotalItems();
  // saveToDatabase(cart);
}

function updateCart(product) {
  let textId = product.id;
  for (let i = 0; i < cart.length; i++) {
    let currentId = cart[i].id;
    if (textId === currentId) {
      cart.push(product);
      return;
    }
  }
  cart.push(product);

  let cartProduct = document.createElement("div");

  let imgcontainer = document.createElement("div");
  let image = document.createElement("img");
  let price = document.createElement("p");
  let title = document.createElement("p");

  let cartAmount = document.createElement("div");
  let decreaseBtn = document.createElement("button");
  let amount = document.createElement("p");
  amount.setAttribute("data-cart", product.id);
  let increaseBtn = document.createElement("button");
  let deleteItem = document.createElement("button");

  cartProduct.className = "cart-product";
  imgcontainer.className = "cart-productInfo";
  image.className = "cart-image";
  price.className = "cart-price";
  title.className = "cart-title";

  cartAmount.className = "cart-amount";
  decreaseBtn.className = "decrease-amount";
  amount.className = "in-cart-amount";
  increaseBtn.className = "increase-amount";
  deleteItem.className = "cart-delete-item";

  decreaseBtn.innerHTML = "-";
  increaseBtn.innerHTML = "+";
  deleteItem.innerHTML = "delete";
  amount.innerHTML = parseInt(0);
  image.src = product.image;
  price.textContent = product.price + "$";
  title.textContent = product.title;

  imgcontainer.appendChild(image);
  imgcontainer.appendChild(title);
  imgcontainer.appendChild(price);

  cartAmount.appendChild(decreaseBtn);
  cartAmount.appendChild(amount);
  cartAmount.appendChild(increaseBtn);
  cartAmount.appendChild(deleteItem);

  cartProduct.appendChild(imgcontainer);
  cartProduct.appendChild(cartAmount);
  cartPreview.appendChild(cartProduct);

  decreaseBtn.addEventListener("click", function () {
    let searched = Number(amount.getAttribute("data-cart"));
    let i = 0;
    if (amount.innerHTML == 0) {
      amount.style.background = "red";
    } else {
      // let firstInstance = cart.id.indexOf(searched);
      // console.log(cart.id.indexOf(searched));
      // cart.splice(firstInstance,1);
      while (i < cart.length) {
        if (searched === cart[i].id) {
          cart.splice(i, 1);
          break;
        } else {
          i++;
        }
      }
      addtoTotal();
      updateTotalItems();
      amount.innerHTML--;
    }
  });

  increaseBtn.addEventListener("click", () => {
    cart.push(product);
    addtoTotal();
    updateTotalItems();
    amount.innerHTML++;
    amount.style.background = "white";
  });

  deleteItem.addEventListener("click", function () {
    let searched = Number(amount.getAttribute("data-cart"));
    let i = 0;
    while (i < cart.length) {
      if (searched === cart[i].id) {
        cart.splice(i, 1);
      } else {
        i++;
      }
    }
    amount.parentNode.parentNode.remove();
    addtoTotal();
    updateTotalItems();
  });

  // cartPageCheckout.appendChild(imgcontainer);
}

// function decreaseAmount(e){
//   // let x = document.querySelector(".in-cart-amount").getAttribute("data-cart");

//   let x = e.target.dataset.cart;
//   console.log(x);
// }

function addFromPopup() {
  let id = Number(popupImage.getAttribute("data-attribut"));
  console.log(id);
  allProducts.forEach((x) => {
    if (id === x.id) {
      addToCart(x);
    }
  });
}

function addtoTotal() {
  let sum = 0;
  cart.forEach((product) => {
    sum += product.price;
  });
  cartPreviewtotal.textContent = "Total: " + parseFloat(sum).toFixed(2) + "$";
}



function updateTotalItems() {
  totalInCart.innerHTML = "(" + cart.length + ")";
}

function fillProductPage(product) {
  let imgcontainer = document.createElement("div");
  let image = document.createElement("img");
  let info = document.createElement("p");
  let price = document.createElement("p");
  let buyproduct = document.createElement("button");

  imgcontainer.className = "product-preview";
  image.className = "product-image";
  info.className = "product-name";
  price.className = "product-price";
  buyproduct.className = "buy-button";

  image.src = product.image;
  info.textContent = product.title;
  price.textContent = product.price + "$";
  buyproduct.textContent = "Köp";

  imgcontainer.appendChild(image);
  imgcontainer.appendChild(info);
  imgcontainer.appendChild(price);
  imgcontainer.appendChild(buyproduct);

  productContainer.appendChild(imgcontainer);

  buyproduct.addEventListener("click", () => {
    addToCart(product);
    updateNumber(product);
  });

  info.addEventListener("click", () => {
    showPopup();
    fillPopup(product);
  });
  image.addEventListener("click", () => {
    showPopup();
    fillPopup(product);
  });
}

function updateNumber(product) {
  let id = product.id;
  let ptagg = document.getElementsByClassName("in-cart-amount");
  // console.log(Number(ptagg.dataset.cart));
  // console.log(id);
  for (let i = 0; i < ptagg.length; i++) {
    if (Number(ptagg[i].dataset.cart)=== id) {
      ptagg[i].innerHTML++;
    } 
  }
 
}

//Hur hemsidan memorerar ens cart när man byter sida.

// function saveToDatabase(cart){

// localStorage.setItem('cartSaved',JSON.stringify(cart)); //spara i lokal databas

// let otherProducts = JSON.parse(localStorage.getItem('cartSaved'));

// //addToCart(otherProducts);

// console.log(otherProducts.title);
// }
