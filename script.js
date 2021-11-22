let productContainer = document.querySelector(".product-container");
let popupContainer = document.querySelector(".popupcontainer");





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
        price.textContent = product.price +":-";
        buyproduct.textContent = "Köp";

        imgcontainer.appendChild(image);
        imgcontainer.appendChild(info);
        imgcontainer.appendChild(price);
        imgcontainer.appendChild(buyproduct);
        productContainer.appendChild(imgcontainer);




       image.addEventListener("click", showProduct);
      });
  }



  function showProduct(){
   console.log("test");
   popupContainer.style.display = "block";

  }



/*Hur hemsidan memorerar ens cart när man byter sida.

localStorage.setItem('productcart',JSON.stringify(products)); //spara i lokal databas

let otherProducts = JSON.parse(localStorage.getItem('productcart'));

console.log(otherProducts[0].name); */


