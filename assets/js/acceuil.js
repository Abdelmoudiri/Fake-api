document.addEventListener("DOMContentLoaded", function () {
  let products = document.querySelector(".products");
  async function fetchproducts(url) {
    let data = await fetch(url);
    let response = await data.json();
    console.log(response);

    for (let i = 0; i < 3; i++) {
      products.innerHTML += `
                    <div class="flex flex-col justify-between items-center max-w-[250px] p-5 bg-white rounded-md gap-2 shadow-md hover:shadow-blue-600">
                        <img class="w-[100%]" src="${response[i].images[0]}" alt="produit" style="height:200px;width:200px;object-fit : fill">
                        <a href="details.html?${response[i].id}"><h4 id="product-name" class="text-[1rem] text-center font-semibold capitalize hover:text-blue-600 cursor-pointer">${response[i].name}</h4></a>
                        <h5 class="text-[0.9rem] font-semibold">$<span id="d-product-price">${response[i].price}</span></h5>
                        <button type="button" id="d-add-to-cart_btn"
                            class="bg-blue-600 px-4 py-1 text-white rounded-md text-center hover:bg-[#183876] transition-colors ease-in-out">
                            Ajouter Au Panier
                        </button>
                    </div>
    `;
    }
  }

  fetchproducts("http://localhost:3000/produits");
});

document.addEventListener("DOMContentLoaded", function () {
  let products = document.querySelector(".products6");
  async function fetchproducts(url) {
    let data = await fetch(url);
    let response = await data.json();
    console.log(response);

    for (let i = 0; i < 8; i++) {
      //   let description = response[i].description;
      products.innerHTML += `
                    <div class="flex flex-col justify-between items-center max-w-[250px] p-5 bg-white rounded-md gap-2 shadow-md hover:shadow-blue-600">
                        <img class="w-[100%]" src="${response[i].images[0]}" alt="produit" style="height:200px;width:200px;object-fit : fill">
                         <a href="details.html?${response[i].id}"><h4 id="product-name" class="text-[1rem] text-center font-semibold capitalize hover:text-blue-600 cursor-pointer">${response[i].name}</h4></a>
                        <h5 class="text-[0.9rem] font-semibold">$<span id="d-product-price">${response[i].price}</span></h5>
                        <button type="button" id="d-add-to-cart_btn"
                            class="bg-blue-600 px-4 py-1 text-white rounded-md text-center hover:bg-[#183876] transition-colors ease-in-out">
                            Ajouter Au Panier
                        </button>
                    </div>
    `;
    }
  }
  fetchproducts("http://localhost:3000/produits");
});

$(document).ready(function () {
  $(".owl-carousel").owlCarousel({
    items: 1,
    nav: false,
    loop: true,
    autoplay: true,
    autoplayTimeout: 3000,
  });
});
