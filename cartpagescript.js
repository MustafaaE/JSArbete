let orderButton = document.querySelector(".order-btn");
let orderPopup = document.querySelector(".popup-order-confirmed");
let orderClosebtn = document.querySelector(".order-closebtn");

orderButton.addEventListener("click", showOrderPopup);
orderClosebtn.addEventListener("click", orderClosepopup);

function showOrderPopup() {
  orderPopup.style.visibility = "visible";
}
function orderClosepopup() {
  orderPopup.style.visibility = "hidden";
}
