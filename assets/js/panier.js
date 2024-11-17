var totalPanier = 0 ;
let arrayPrd = localStorage.getItem('prd').split('-');
var nbrProduits;

arrayPrd.map(Prd => {
    const prd = Prd.split(',');

    fetch(`https://product-api-yucm.onrender.com/api/products/${prd[0]}`)
    .then(res => res.json())
    .then(product => {

        // Ajouter Chaque Produit au Panier
        const pProduct = document.createElement('div');
        pProduct.id = "product-panier";
        pProduct.className = "product-panier";

        pProduct.innerHTML = 
                            `<div id="product-details" class="flex items-center justify-between flex-wrap">
                            <div class="flex  gap-5">
                                <img class="w-32 h-32" src="${product.images[0]}" alt="${product.name}">
                                <div class="w-72 flex flex-col justify-around">
                                    <h1 id="prd-name" class="font-bold text-lg">${product.name}</h1>
                                    <h2 class="font-semibold text-xl text-red-600"><span id="unit-price">${product.price}</span> $</h2>
                                </div>
                            </div>
                            <div class="flex" data-id="${prd[1]}">
                                <button id="dec-qtt-btn" class="font-medium text-lg px-4 py-2 rounded-s-sm bg-gray-200" type="button">-</button>
                                <input id="qtt-display" class="outline-none font-medium text-lg py-2 bg-slate-200 text-center w-14" type="number" value="${prd[1]}" min="1" max="${product.stock}">
                                <button id="inc-qtt-btn" class="font-medium text-lg px-4 py-2 rounded-r-sm bg-gray-200" type="button">+</button>
                            </div>
                            <h1 class="font-medium text-xl"><span id="total-price">${product.price * prd[1]}</span> $</h1>
                            <svg id="delete-product" class="cursor-pointer" width="32px" height="64px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M10 12V17" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M14 12V17" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M4 7H20" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M6 10V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V10" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                        </div>
                        <hr class="border-gray-400">`;

        document.getElementById("panier-products-container").appendChild(pProduct);


        // Mettre à Jour le Nombre des Produits Ajoutés au Panier
        document.getElementById("cout-products").innerText = document.getElementById("panier-products-container").childElementCount;


        // Mettre à Jour les Produits dans Total Panier
        const tpProduct = document.createElement('div');
        tpProduct.className = 'grid grid-cols-[1fr_80px_80px] gap-3';

        tpProduct.innerHTML = 
        `<h1>${product.name}</h1>
        <h2 class="font-medium mx-5">x <span id="${product.id}">${prd[1]}</span></h2>
        <h3 id="total-${product.id}" class="font-semibold justify-self-end">${product.price * prd[1]}</h3>`;

        document.getElementById('total-panier-products').appendChild(tpProduct);

        totalPanier+= product.price * prd[1];
        document.getElementById("total-price-panier").innerText = totalPanier.toFixed(2);

        

        // Fonction de Mise à Jour du Panier et Total Panier lors de l'Incrémentation du Quantité 
        pProduct.querySelector('#inc-qtt-btn').addEventListener("click", function(){
            const currentTarget = this.previousElementSibling;
            const currentQuantity = parseInt(currentTarget.value, 10);
            const currentPrice = product.price;
            const maxStock = product.stock;
        
            // Augmentation de Quantité et Mise à Jour du Prix Totale du Panier
            if (currentQuantity < maxStock) {
                currentTarget.value = currentQuantity + 1;
                totalPanier += currentPrice;
            } else {
                currentTarget.value = maxStock;
            }
        
            // Mise à Jour du Prix Totale du Produit Séléctionné
            const currentTargetPrice = currentTarget.parentElement.nextElementSibling.firstElementChild;
            currentTargetPrice.innerText = (currentTarget.value * currentPrice).toFixed(2) ;
        
            // Affichage du Quantité et du Prix Totale du Produit Séléctionné
            document.getElementById(`${product.id}`).innerText = currentTarget.value; 
            const variantIncPrice = document.getElementById(`total-${product.id}`); 
            variantIncPrice.innerText = (currentTarget.value * currentPrice).toFixed(2);
        
            // Affichage du Prix Total du Panier
            document.getElementById("total-price-panier").innerText = totalPanier.toFixed(2);
        })



        // Fonction de Mise à Jour du Panier et Total Panier lors de la Décrémentation du Quantité 
        pProduct.querySelector('#dec-qtt-btn').addEventListener("click", function () {
            const currentTarget = this.nextElementSibling;
            const currentQuantity = parseInt(currentTarget.value, 10);
            const currentPrice = product.price;
        
            // Réduction de Quantité et Mise à Jour du Prix Totale du Panier
            if (currentQuantity > 1) {
                currentTarget.value = currentQuantity - 1;
                totalPanier -= currentPrice;
            } else {
                currentTarget.value = 1;
            }
        
            // Mise à Jour du Prix Totale du Produit Séléctionner
            const currentTargetPrice = currentTarget.parentElement.nextElementSibling.firstElementChild;
            currentTargetPrice.innerText = (currentTarget.value * currentPrice).toFixed(2);
        
            // Affichage du Quantité et du Prix Totale du Produit Séléctionné
            document.getElementById(`${product.id}`).innerText = currentTarget.value;
            const varDecPrice = document.getElementById(`total-${product.id}`);
            varDecPrice.innerText = (currentTarget.value * currentPrice).toFixed(2);
        
            // Affichage du Prix Total du Panier
            document.getElementById("total-price-panier").innerText = totalPanier.toFixed(2);
        });


        // Fonction de Suppression des Produits du Panier
        pProduct.querySelector('#delete-product').addEventListener("click", function (){
            const currentTarget = this.parentElement.parentElement;
            console.log(currentTarget);

            const deletePopup = document.getElementById("popup-modal");
            const closeDeletePopup = document.getElementById('close-popup');
            const cancelDelete = document.getElementById('cancel-delete');
            const confirmDelete = document.getElementById('confirm-delete');

            nbrProduits = document.getElementById("panier-products-container").childElementCount ;
            
            deletePopup.classList.remove('hidden');
            
            closeDeletePopup.onclick = function(){
                deletePopup.classList.add('hidden');
            }

            cancelDelete.onclick = function(){
                deletePopup.classList.add('hidden');
            }

            confirmDelete.onclick = function(){
                const minusPrice = parseFloat(document.getElementById(`total-${product.id}`).innerText).toFixed(2);
                totalPanier -= minusPrice;
                document.getElementById('total-price-panier').innerText = totalPanier.toFixed(2);
                
                currentTarget.remove();
                document.getElementById(`${product.id}`).parentElement.parentElement.remove();
                nbrProduits = document.getElementById("panier-products-container").childElementCount ;
                deletePopup.classList.add('hidden');
                document.getElementById("cout-products").innerText = nbrProduits;
                if(document.getElementById("panier-products-container").childElementCount == 0){
                    document.getElementById('panier-message').classList.remove('hidden');
                }
            }
        })




        // Fonction de Validation du Formulaire REGEX
        document.getElementById('download').addEventListener('click', function () {

            // Récupérer les Valeurs du Formulaire
            const form = document.getElementById('form-devis');
            const name = form['name'].value.trim();
            const phone = form['phone'].value.trim();
            const email = form['email'].value.trim();
            const address = form['adress'].value.trim();

            // Réinitialiser les Messages d'Alerte
            document.getElementById('alert-name').innerText = "";
            document.getElementById('alert-phone').innerText = "";
            document.getElementById('alert-email').innerText = "";
            document.getElementById('alert-address').innerText = "";

            let isValid = true;

            // Validation du Nom Complet
            const nameValid = /^[A-Za-z]+(\s[A-Za-z]+)+$/;
            if(!nameValid.test(name)) {
                document.getElementById('alert-name').innerText = "Nom invalide";
                isValid = false;
            }

            // Validation du Numéro de Téléphone
            const phoneValid = /^\+212 (5|6|7)[0-9]{8}$/;
            if(!phoneValid.test(phone)) {
                document.getElementById('alert-phone').innerText = "N° de téléphone invalide";
                isValid = false;
            }

            // Validation de l'Email
            const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if(!emailValid.test(email)) {
                document.getElementById('alert-email').innerText = "Adresse email invalide";
                isValid = false;
            }

            // Validation de l'Adresse
            if(address.length < 10) {
                document.getElementById('alert-address').innerText = "Adresse trop courte";
                isValid = false;
            }

            if(isValid) {
                console.log('Formulaire Validé !');
                const devisProducts = [];
                const devisTotal = totalPanier;

                const article = document.getElementsByClassName("product-panier");

                const nombrePrd = document.getElementById('panier-products-container').childElementCount;


                for(let j=0 ; j<nombrePrd ; j++){
                    devisProducts.push([article[j].querySelector('#prd-name').innerText,
                                        article[j].querySelector('#qtt-display').value,
                                        article[j].querySelector('#unit-price').innerText,
                                        article[j].querySelector('#total-price').innerText
                                    ]);
                }

                
                const { jsPDF } = window.jspdf;
                const devis = new jsPDF();
                
                devis.addImage('../assets/img/logo.png', 'PNG', 90, 10, 30, 20);

                
                devis.setFontSize(16);
                devis.setFont('helvetica', 'bold');
                devis.text('DEVIS DE VOTRE COMMANDE', 105, 40, { align: 'center' });

                
                devis.setFontSize(12);
                devis.setFont('helvetica', 'normal');
                const clientInfo = [
                    { label: "N° de Commande :", value: "123456789" },
                    { label: "Nom Complet :", value: name },
                    { label: "Email :", value: email },
                    { label: "Numéro de Téléphone :", value: phone },
                    { label: "Adresse :", value: address }
                ];

                clientInfo.forEach((info, index) => {
                    devis.text(`${info.label}`, 20, 60 + (index * 10));
                    devis.text(`${info.value}`, 70, 60 + (index * 10));
                });

                
                devis.autoTable({
                    head: [['Article', 'Quantité', 'Prix Unitaire', 'Prix Total']],
                    body: devisProducts,
                    startY: 120,
                    theme: 'grid',
                    styles: { halign: 'center' },
                    headStyles: { fillColor: [0, 0, 0], textColor: [255, 255, 255] },
                    columnStyles: {
                        0: { halign: 'left' },
                        1: { halign: 'center' },
                        2: { halign: 'right' },
                        3: { halign: 'right' }
                    }
                });

                
                devis.setFontSize(12);
                devis.setFont('helvetica', 'bold');
                devis.text("Total", 140, devis.lastAutoTable.finalY + 10);
                devis.text(devisTotal.toFixed(2) + " $", 180, devis.lastAutoTable.finalY + 10, { align: 'right' });

                
                devis.setFontSize(14);
                devis.setFont('helvetica', 'bold');
                devis.text('MERCI D\'AVOIR CHOISI WATCHIFY', 105, devis.lastAutoTable.finalY + 30, { align: 'center' });

                
                devis.save('devis_commande.pdf');
            }
        });

    })  
})



// Fonction de Récupération des Produits Intéréssants de l'API
fetch(`https://product-api-yucm.onrender.com/api/products`)
.then(res => res.json())
.then(products => {
    for(let i=0 ; i<5 ; i++){
        const imgProduct = document.createElement('img');
        imgProduct.src = `${products[i].images[0]}` ;
        imgProduct.className = "w-[200px] h-[200px]" ;
        document.getElementById('interested').appendChild(imgProduct);
    }
})








// console.log(devisNames);