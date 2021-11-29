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



popupClose.addEventListener("click", closePopup);
cartButton.addEventListener("click", showCartPopup);
popupBuyButton.addEventListener("click",addFromPopup);

/* search bar */
let searchInput = document.getElementById("searchInput");
let searchButton = document.querySelector(".searchButton");

searchButton.addEventListener("click",() => {
  searchProduct(searchInput.value);
});

/* search bar */

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



let cart = [];
let allProducts = [];
let sortedProducts =[];

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

function fillArray(elements) {
  elements.forEach((product) => {
    allProducts.push(product);
  });
  console.log(allProducts);
}

function createProducts(elements) {
  elements.forEach((product) => {
    fillProductPage(product);
  });
}


  function fillArray(elements){
    elements.forEach(product => {
      allProducts.push(product);
    });
  }

  function createProducts(elements){
      elements.forEach(product => {
        fillProductPage(product);
      });
  }

/* fyller popup med info om produkten */
  function fillPopup(test) {
    popupImage.src = test.image;
    popupImage.setAttribute('data-attribut', test.id);
    popupTitle.textContent = test.title;
    popupDesc.textContent = test.description;
    popupCategory.textContent = "Category: " + test.category;
    popupRating.textContent = "Rating : " + test.rating.rate + " , " + "Amount left: " + test.rating.count;
    popupPrice.textContent = "Price: $" + test.price;
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
  cart.push(product);
  addtoTotal();
  // saveToDatabase(cart);
}

function updateCart(product) {
  let textId = product.id;
  for (let i = 0; i < cart.length; i++) {
    let currentId = cart[i].id;
    if (textId === currentId) {
      return;
    }
  }

  let imgcontainer = document.createElement("div");
  let image = document.createElement("img");
  let price = document.createElement("p");
  let title = document.createElement("p");

  imgcontainer.className = "cart-container";
  image.className = "cart-image";
  price.className = "cart-price";
  title.className = "cart-title";

  image.src = product.image;
  price.textContent = product.price + "$";
  title.textContent = product.title;

  imgcontainer.appendChild(image);
  imgcontainer.appendChild(title);
  imgcontainer.appendChild(price);

  cartPreview.appendChild(imgcontainer);
 // cartPageCheckout.appendChild(imgcontainer);

  }

function addFromPopup(){
  let id = Number(popupImage.getAttribute('data-attribut'));
  console.log(id);
  allProducts.forEach(x => {
    if( id === x.id){
      addToCart(x);
    }
  });
}

function addFromPopup() {}

function addtoTotal() {
  let sum = 0;
  cart.forEach(product => {
    sum += product.price;
  });
  cartPreviewtotal.textContent = "Total: " +parseFloat(sum).toFixed(2);
}

/* visar specifika category */
function showAllcategories(){
  document.getElementById("price-sort").value = "relevance";
  productContainer.innerHTML = "";
  productsheader.innerHTML = "OUR PRODUCTS : ";
  productContainer.appendChild(productsheader);

  allProducts.forEach((product) => {
    fillProductPage(product);
  });
}

function showElectronicsCategory(){
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

function showWomenCategory(){
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

function showMenCategory(){
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

function showJewelryCategory(){
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

function changePrice(){
  let priceSort = document.getElementById("price-sort").value;

  if(priceSort ==='low'){
  let sorted =  allProducts.slice().sort(function(a,b){
      return a.price - b.price;
    });
    productContainer.innerHTML = "";
    productsheader.innerHTML = "Lowest price for : "+  currentcategory;
    productContainer.appendChild(productsheader);
    if(currentcategory === "all"){
      sorted.forEach(x=> {
         fillProductPage(x);  
        
      });
    } else {
      sorted.forEach(x=> {
      if(x.category == currentcategory){
       fillProductPage(x);  
      }
    });
  }
  } else if (priceSort === 'high') {
    let sorted = allProducts.slice().sort(function(a,b) {
      return b.price - a.price;
    });
    productContainer.innerHTML = "";
    productsheader.innerHTML = "Highest price for : " + currentcategory;
    productContainer.appendChild(productsheader);
    if(currentcategory === "all"){
      sorted.forEach(x=> {
         fillProductPage(x);  
        
      });
    } else {
      sorted.forEach(x=> {
      if(x.category == currentcategory){
       fillProductPage(x);  
      }
    });
  }
  } else {
    productsheader.innerHTML = "OUR PRODUCTS :";
    productContainer.innerHTML = "";
    productContainer.appendChild(productsheader);
    allProducts.forEach(product => {
      fillProductPage(product);
  });
 }
}


function fillProductPage(product){
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
        
        buyproduct.addEventListener("click", ()=>{
          addToCart(product);
        });

        info.addEventListener("click", () => {
          showPopup();
          fillPopup(product);
        });
        image.addEventListener("click", ()=>{
          showPopup();
          fillPopup(product);
        });
}

  productContainer.appendChild(imgcontainer);

  buyproduct.addEventListener("click", () => {
    addToCart(product);
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

//Hur hemsidan memorerar ens cart när man byter sida.

// function saveToDatabase(cart){

// localStorage.setItem('cartSaved',JSON.stringify(cart)); //spara i lokal databas

// let otherProducts = JSON.parse(localStorage.getItem('cartSaved'));

// //addToCart(otherProducts);

// console.log(otherProducts.title); 
// }