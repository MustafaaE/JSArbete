let productContainer = document.querySelector(".product-container");






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

        imgcontainer.className = "product-preview";
        image.className = "product-image";
        info.className = "product-name";
        image.src = product.image;
        info.textContent = product.title;
        info.href = "#";

        imgcontainer.appendChild(image);
        imgcontainer.appendChild(info);
        productContainer.appendChild(imgcontainer);
      });
  }






/*Hur hemsidan memorerar ens cart när man byter sida.

localStorage.setItem('productcart',JSON.stringify(products)); //spara i lokal databas

let otherProducts = JSON.parse(localStorage.getItem('productcart'));

console.log(otherProducts[0].name); */


