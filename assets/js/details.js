const productGalerie = document.getElementById("d-product-galerie");
const imageContainer = document.getElementById("d-image-container");
const productName = document.getElementById("d-product-name");
const productDescription = document.getElementById("d-product-description");
const productShortDescription = document.getElementById(
  "d-product-short_description"
);
const productPrice = document.getElementById("new-price");
const productBrand = document.getElementById("d-brand");
const productStatus = document.getElementById("d-stock");
const productQuantity = document.getElementById("d-quantite-input");
const popularProducts = document.getElementById("d-popular-products");
const totalPrice = document.getElementById("d-total-price");
// let dataArray = [];

//function to get url parameters
// const productId = new URLSearchParams(window.location.search);
// function getUrlParameter(id) {
//   return productId.get(id);
// }
function show(id) {
  console.log("id", id);
}
var full_url = document.URL;
var stuff = full_url.split("?");
var id = stuff[stuff.length - 1] - 1;
// let id = 10;

fetch("http://localhost:3000/produits")
  .then((responce) => responce.json())
  .then((data) => {
    // data.map((data) => {
    //   dataArray.push(data);
    // });
    // console.log(data);

    //display product details
    for (let i = 0; i < data.length; i++) {
      if (i == id) {
        productGalerie.innerHTML = `
    <div class="mb-5 flex justify-center" id="d-image-container">
        <img id=${id} class="md:w-[50%] md:h-[450px] object-cover" src="${data[id].images[0]}" alt="product Image"
            style="width: 100%; max-width: 450px;">
    </div>
    <div class="flex gap-2 justify-center" id="d-image-variants">
        <div
            class="d-variant bg-blue-600 rounded-md p-1 cursor-pointer w-[100px] h-[109px] my-auto">
            <img class = "rounded-md w-[100%] h-[100%]"  src="${data[id].images[0]}" alt="product Image"
                onclick="switchImages(this)">
        </div>
        <div
            class="d-variant bg-blue-600 rounded-md p-1 cursor-pointer w-[100px] h-[109px] my-auto">
            <img class = "rounded-md w-[100%] h-[100%]" src="${data[id].images[1]}" alt="product Image" onclick="switchImages(this)">
        </div>
        <div
            class="d-variant bg-blue-600 rounded-md p-1 cursor-pointer w-[100px] h-[109px] my-auto">
            <img class = "rounded-md w-[100%] h-[100%]"  src="${data[id].images[2]}" alt="product Image" onclick="switchImages(this)">
        </div>

    </div>`;
        productName.innerHTML = data[id].name;
        productDescription.innerHTML = data[id].full_description;
        productShortDescription.innerHTML = data[id].short_description;
        productBrand.innerHTML = data[id].marque;
        productStatus.innerHTML = data[id].stock;
        productPrice.innerHTML = data[id].price;
        totalPrice.innerHTML = data[id].price;
      }
    }

    // console.log("data", data);

    //display popular products

    for (let i = 0; i < 3; i++) {
      popularProducts.innerHTML += `<div class="flex flex-col items-center justify-between max-w-[250px] p-5 bg-white shadow-md hover:shadow-blue-600 rounded-md gap-2">
                    <img class="w-[100%]" src="${data[i].images[0]}" alt="product Image" style = "max-height : 200px">
                    <a href = "?${data[i].id}"><h4 id="product-name" class="text-[1rem] text-center font-semibold capitalize hover:text-blue-600">${data[i].name}</h4></a>
                    <h5 class="text-[0.9rem] font-semibold">$<span id="d-product-price">${data[i].price}</span></h5>
                    <button type="button" id="d-add-to-cart_btn" onclick = "show(${data[i].id}"
                        class="bg-blue-600 px-4 py-1 text-white rounded-md text-center hover:bg-[#183876] transition-colors ease-in-out">
                        Ajouter Au Panier
                    </button>
                </div>`;
    }
  });

//image Galerie function
let switchImages = (currentImage) => {
  var imageBox = document.getElementById(id);
  imageBox.src = currentImage.src;
};

//change product quantity function
productQuantity.value = 1;

let changeQuantity = () => {
  document.getElementById("increment-button").addEventListener("click", () => {
    if (productQuantity.value <= 0) {
      productQuantity.value = 1;
      document.getElementById("d-total-price").innerHTML =
        productPrice.innerHTML;
    } else {
      productQuantity.value++;
      document.getElementById("d-total-price").innerHTML = (
        productPrice.innerHTML * productQuantity.value
      ).toFixed(2);
    }
  });

  document.getElementById("decrement-button").addEventListener("click", () => {
    if (productQuantity.value <= 1) {
      productQuantity.value = 1;
      document.getElementById("d-total-price").innerHTML =
        productPrice.innerHTML;
    } else {
      productQuantity.value--;
      document.getElementById("d-total-price").innerHTML = (
        productPrice.innerHTML * productQuantity.value
      ).toFixed(2);
    }
  });
};

changeQuantity();
