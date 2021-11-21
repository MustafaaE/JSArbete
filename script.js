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
 

  function createProducts(p){
      console.log(p);
  }






/*Hur hemsidan memorerar ens cart när man byter sida.

localStorage.setItem('productcart',JSON.stringify(products)); //spara i lokal databas

let otherProducts = JSON.parse(localStorage.getItem('productcart'));

console.log(otherProducts[0].name); */


