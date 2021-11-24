let popUpBtn = document.querySelector("#confirmBtn");
let popUpContainer = document.querySelector(".hiddenContainer");
let closeBtn = document.querySelector(".close");

popUpBtn.addEventListener("click", popUp);
closeBtn.addEventListener("click", closeWindow);

function popUp() {
    popUpContainer.style.visibility = "visible";
}
function closeWindow() {
    popUpContainer.style.visibility = "hidden";
}