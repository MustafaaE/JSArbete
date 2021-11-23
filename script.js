let productContainer = document.querySelector(".products-container");
let popupContainer = document.querySelector(".popupcontainer");
let popupImage = document.querySelector(".popup-image");
let popupTitle = document.querySelector(".popup-title");
let popupClose = document.querySelector(".popup-closebutton");
let popupDesc = document.querySelector(".popup-description");
let popupCategory = document.querySelector(".popup-category");
let popupRating = document.querySelector(".popup-rating");
let popupPrice  = document.querySelector(".popup-price");
let popupBuyButton = document.querySelector(".popup-buy-button");
let cartButton = document.querySelector(".shoppingcart-button");
let cartPreview = document.querySelector(".cartPreview");

popupClose.addEventListener("click", closePopup);

cartButton.addEventListener("click", showCartPopup);


let cart =[];




fetch("./products.json")
  .then(function (respons) {
    console.log(respons); //ska få status 200
    if (respons.ok) {
      return respons.json(); //parsea json objektet.
    }
  })
  .then((data) => {
    createProducts(data);

  })
  .catch((error) => console.log(error));
 

  function createProducts(elements){
      elements.forEach(product => {
        let imgcontainer = document.createElement("div");
        let image = document.createElement("img");
        let info = document.createElement("a");
        let price = document.createElement("p");
        let buyproduct = document.createElement("button");

        imgcontainer.className = "product-preview";
        image.className = "product-image";
        info.className = "product-name";
        price.className = "product-price";
        buyproduct.className = "buy-button";

        image.src = product.image;
        info.textContent = product.title;
        info.href = "#";
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

        image.addEventListener("click", ()=>{
          showPopup();
          fillPopup(product);
        });
      });
  }

//  let buy = document.querySelector(".buy-button");
//  buy.addEventListener("click", test);
 


  function showPopup(){
   popupContainer.style.visibility = "visible";
  }

  function fillPopup(test) {
    popupImage.src = test.image;
    popupTitle.textContent = test.title;
    popupDesc.textContent = test.description;
    popupCategory.textContent = "Category: " + test.category;
    popupRating.textContent = "Rating : " + test.rating.rate + " , " + "Amount left: " + test.rating.count;
    popupPrice.textContent = "Price: $" + test.price;
  }

  function closePopup(){
    popupContainer.style.visibility = "hidden";
  }

  function showCartPopup(){
    if (cartPreview.style.visibility !== "visible"){
     return cartPreview.style.visibility = "visible";
    } else{
      return cartPreview.style.visibility = "hidden";
    }
  }

  function addToCart(product){
    updateCart(product);
    cart.push(product);
  }

  function updateCart(product) {

    let z = product.id;
    for (let i = 0; i < cart.length; i++) {
      let x = cart[i].id;
        if(z=== x){
          return;
        }
        
    }

    let imgcontainer = document.createElement("div");
    let image = document.createElement("img");
    let price = document.createElement("p");
    let title = document.createElement("p");
    let totalPrice = document.createElement("p");
    
    imgcontainer.className = "cart-container";
    image.className = "cart-image";
    price.className = "cart-price";
    title.className = "cart-title";
    totalPrice.className = "cart-totalPrice";

    image.src = product.image;
    title.textContent = product.title;
    title.href = "#";
    price.textContent = "$" + product.price;

    totalPrice.textContent = "Det totala priset är :" + product.price;
    imgcontainer.appendChild(image);
    imgcontainer.appendChild(title);
    imgcontainer.appendChild(price);
    imgcontainer.appendChild(totalPrice);

   cartPreview.appendChild(imgcontainer);
//  let buy = document.querySelector(".buy-button");
//  buy.addEventListener("click", test);
  }

/*Hur hemsidan memorerar ens cart när man byter sida.

localStorage.setItem('productcart',JSON.stringify(products)); //spara i lokal databas

let otherProducts = JSON.parse(localStorage.getItem('productcart'));

console.log(otherProducts[0].name); */