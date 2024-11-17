const gridProduit = document.getElementById("produit");
let productContainer = document.getElementById("produits_container");

const btnNext = document.getElementById("cata_btn_next");
const btnPrev = document.getElementById("cata_btn_prev");
const checkboxes = document.querySelectorAll('input[name="marque"]');
let min = 0;
let max = 8;
let AllProduit = [];

let productsToShow = [];

function deselectOtherCheckboxes(selectedCheckbox) {
  checkboxes.forEach((checkbox) => {
    if (checkbox !== selectedCheckbox) {
      checkbox.checked = false;
    }
  });
}

// Fetch product data
fetch("https://product-api-yucm.onrender.com/api/products")
  .then((res) => res.json())
  .then((data) => {
    AllProduit.push(...data);
    displayProducts(min, max);
  })
  .catch((err) => console.error("Error fetching products:", err));

function displayProducts(min, max) {
  productContainer.innerHTML = ""; 

  productsToShow = AllProduit.slice(min, max);

  productsToShow.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.className="product-card p-4 rounded-md text-center transform transition-all duration-300 shadow-md hover:shadow-blue-600";
    productCard.innerHTML = `
        <a href="details.html?${product.id}" class=" hover:shodow-blue-600"><img src="${product.images[0]}" alt="${product.name}" class="w-full h-40 object-contain rounded-md mb-2"></a>
        <a href="details.html?${product.id}"><h3 class=" hover:text-blue-600 text-sm font-semibold text-gray-800 h-9 overflow-hidden">${product.name}</h3></a>
        <p class="text-gray-600 text-xs h-fit overflow-hidden flex-grow">${product.short_description}</p>
        <p class="text-blue-600 font-bold h-[30px]">${product.price}</p>
        <div class="mt-auto">
          <button class="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">Ajouter au panier</button>
        </div>
     
    `;
    productContainer.appendChild(productCard);
  });
}

// "Next" button event listener
btnNext.addEventListener("click", () => {
  if (max < AllProduit.length) {
    min += 8;
    max += 8;
    displayProducts(min, max);
  }
});

// "Prev" button event listener
btnPrev.addEventListener("click", () => {
  if (min > 0) {
    min -= 8;
    max -= 8;
    displayProducts(min, max);
  }
});

document.getElementById('btn_next1').addEventListener('click', () => {
  displayProducts(0,8)
})
document.getElementById('btn_next2').addEventListener('click', () => {
  displayProducts(8,16)
})
document.getElementById('btn_next3').addEventListener('click', () => {
  displayProducts(16,20)
})
document.getElementById('btn_next4').addEventListener('click', () => {
  productContainer.innerHTML = ` <p class="text-4xl col-span-4 font-semibold text-blue-600 p-6 bg-white shadow-lg rounded-lg text-center transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
    Pas de produit à afficher
  </p>`;
})

// Carousel function
let count = 0;
let cata_price_caroussele = document.getElementById("paragrapher_prix");
let cata_image_caroussele = document.getElementById("cata_image_caroussel");

function updateCarousel() {
  if (AllProduit.length > 0) {
    cata_price_caroussele.textContent = `${AllProduit[count].price}`;
    cata_image_caroussele.src = `${AllProduit[count].images[0]}`;
    count++;

    if (count >= AllProduit.length) {
      count = 0;
    }
  }
  
}

const intervalId = setInterval(updateCarousel, 1000);
function resetCarousel() {
  clearInterval(intervalId);
  setInterval(updateCarousel, 1000);
}

const btnSort = document.getElementById("sort");
btnSort.addEventListener("click", () => {
switch(btnSort.value){
  case "price":
    AllProduit.sort((a, b) => b.price - a.price);
    displayProducts(min, max);
    break;
  case "stock":
    AllProduit.sort((a, b) => b.stock - a.stock);
    displayProducts(min, max);
    console.log("Sort stock");
    break;
  default:
    case "all":
    AllProduit = [...data];
    displayProducts(min, max);
    break;
}
});

// checkboxes.forEach(checkbox => {
//   checkbox.addEventListener('change', () => {
//       const selectedBrands = Array.from(checkboxes).filter(checkbox => checkbox.checked).map(checkbox => checkbox.value);
//       filterProductsByBrand(selectedBrands);
//   });
// });

// function filterProductsByBrand(brands) {
//   const filteredProducts = AllProduit.filter(product => brands.includes(product.marque));
//   displayProducts(0, 8, filteredProducts);
// }
function filterProductsByBrand(products, brandName) {
  return products.filter(product => product.marque.toLowerCase() === brandName.toLowerCase());
}

const brandName = "Samsung";
const filteredProducts = filterProductsByBrand(AllProduit, brandName);

// Affichage des produits filtrés
filteredProducts.forEach(product => {
  alert(product)
  console.log(`Produit : ${product.name}, Marque : ${product.marque}, Prix : ${product.price}`);
});
