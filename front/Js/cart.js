let product = JSON.parse(localStorage.getItem("products"));
console.table(product);


for (productinStorage of product) {
    let productStorage = productinStorage;
    fetch('http://localhost:3000/api/products/' + productStorage.id)
        .then((res) => res.json())
        .then((product) => {
            let elementPanier = displayPanier(product, productStorage);
            const cartItems = document.getElementById('cart__items');
            cartItems.appendChild(elementPanier);

            totalArticle();
        })
};


function displayPanier(product, productStorage) {
    let article = document.createElement('article');
    article.classList.add('cart__item');
    article.setAttribute('data-id', product._id);
    article.setAttribute('data-color', productStorage.color);


    let div = document.createElement('div');
    div.classList.add('cart__item__img');

    let image = document.createElement('img');
    image.setAttribute('src', product.imageUrl);
    image.setAttribute('alt', product.altTxt);

    let div2 = document.createElement('div');
    div2.classList.add('cart__item__content');

    let div3 = document.createElement('div');
    div3.classList.add('cart__item__content__description');

    let h2 = document.createElement('h2');
    h2.textContent = product.name;

    let p = document.createElement('p');
    p.textContent = product.price;
    p.classList.add('price');

    let p2 = document.createElement('p');
    p2.textContent = productStorage.color;

    let div4 = document.createElement('div');
    div4.classList.add('cart__item__content__settings');

    let div5 = document.createElement('div');
    div5.classList.add('cart__item__content__settings__quantity');

    let p3 = document.createElement('p');
    p3.textContent = "Qté :"


    let input = document.createElement('input');
    input.setAttribute('type', 'number');
    input.classList.add('itemQuantity');
    input.setAttribute('name', 'itemQuantity');
    input.setAttribute('min', '1');
    input.setAttribute('max', '100');
    input.setAttribute('value', productStorage.quantite);
    input.addEventListener('change', (event) => {
        modification(event);
    })

    let div6 = document.createElement('div');
    div6.classList.add('cart__item__content__settings__delete');

    let p4 = document.createElement('p');
    p4.classList.add('deleteItem');
    p4.textContent = "Supprimer";
    p4.addEventListener('click', (event) => {
        suppression(event);
    }
    )
    article.appendChild(div);
    div.appendChild(image);

    article.appendChild(div2);
    div2.appendChild(div3);
    div3.appendChild(h2);
    div3.appendChild(p);
    div3.appendChild(p2);

    article.appendChild(div4);
    div4.appendChild(div5);
    div5.appendChild(p3);
    div5.appendChild(input);
    div4.appendChild(div6);
    div6.appendChild(p4);

    return article;
};
//**Suppression des articles**/
function suppression(event) {


    let product = JSON.parse(localStorage.getItem('products'));

    let supprimer = event.target.closest('[data-id]');

    let productIndex = product.findIndex(
        (product) =>
            product.id == supprimer.dataset.id &&
            product.color == supprimer.dataset.color,

    );
    if (productIndex < 0) {
        return;
    }

    product.splice(productIndex, 1);
    console.log(productIndex);
    console.log(supprimer);
    console.log(product);

    alert('Ce produit à bien été supprimé.');
    localStorage.setItem('products', JSON.stringify(product))

    location.reload();

}

//** Modification des quantité **/

function modification(event) {

    let product = JSON.parse(localStorage.getItem('products'));

    let quantitevalue = event.target.valueAsNumber;
    console.log(quantitevalue);

    let article = event.target.closest('[data-id]');

    let productIndex = product.findIndex(
        (product) =>
            product.id == article.dataset.id &&
            product.color == article.dataset.color,

    );

    if (productIndex < 0) {
        return;
    }

    console.log(productIndex);

    product[productIndex].quantite = quantitevalue;

    localStorage.setItem("products", JSON.stringify(product));

    location.reload();
}

//** Article Total**/

function totalArticle() {
    //**Total quantité**/
    let quantitetotal = document.getElementsByClassName('itemQuantity');
    totalquantite = 0;
    for (i = 0; i < quantitetotal.length; ++i) {
        totalquantite += quantitetotal[i].valueAsNumber;
    }
    console.log(totalquantite);

    let totalQuantityproduc = document.getElementById('totalQuantity');
    totalQuantityproduc.innerHTML = totalquantite;

    /**Total Prix**/
    let product = JSON.parse(localStorage.getItem('products'));
    console.log(product);
    let price = document.querySelectorAll('.price');
    console.log(price);
    let totalPrix = document.getElementById('totalPrice');

     totauxPrix = 0;
   console.log(totalPrix);
 for (i = 0; i < quantitetotal.length; ++i) {
     totauxPrix += (quantitetotal[i].valueAsNumber * price[i].textContent )
  }
     console.log(totauxPrix);
   totalPrix.innerHTML = totauxPrix;
}

//**Formulaire**/

function formulaire() {
    let form = document.querySelector('.cart__order__form')
    const NameRegex = new RegExp("^[a-zA-Z]{3,20}$");
    const AddressRegex = new RegExp("^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+");
    const EmailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

    form.firstName.addEventListener('change', () => {
        valideFirstNameRegex(this);
    })
    form.lastName.addEventListener('change', () => {
        valideLastNameRegex(this);
    })
    form.address.addEventListener('change', () => {
        valideAddressRegex(this);
    })
    form.city.addEventListener('change', () => {
        valideCityRegex(this);
    })
    form.email.addEventListener('change', () => {
        valideEmailRegex(this);
    })

    const valideFirstNameRegex = function () {
        let firstNameErrorMsg = document.getElementById('firstName').nextElementSibling;

        if (NameRegex.test(form.firstName.value)) {
            firstNameErrorMsg.innerHTML = '';
            console.log("OK");

        } else {
            firstNameErrorMsg.innerHTML = 'Not Valide';
            console.log('not ok');
        }
    }

     const valideLastNameRegex = function () {
        let lastNameErrorMsg = document.getElementById('lastName').nextElementSibling;

        if (NameRegex.test(form.lastName.value)) {
            lastNameErrorMsg.innerHTML = '';
            console.log("OK");

        } else {
            lastNameErrorMsg.innerHTML = 'Not Valide';
            console.log('not ok');
        }
    }

     const valideAddressRegex = function () {
        let addressErrorMsg = document.getElementById('address').nextElementSibling;

        if (AddressRegex.test(form.address.value)) {
            addressErrorMsg.innerHTML = '';
            console.log("OK");

        } else {
            addressErrorMsg.innerHTML = 'Not Valide';
            console.log('not ok');
        }
    }

     const valideCityRegex = function () {
        let cityErrorMsg = document.getElementById('city').nextElementSibling;

        if (NameRegex.test(form.city.value)) {
            cityErrorMsg.innerHTML = '';
            console.log("OK");

        } else {
            cityErrorMsg.innerHTML = 'Not Valide';
            console.log('not ok');
        }
    }

         const  valideEmailRegex = function () {
        let emailErrorMsg = document.getElementById('email').nextElementSibling;

        if (EmailRegex.test(form.email.value)) {
            emailErrorMsg.innerHTML = '';
            console.log("OK");

        } else {
            emailErrorMsg.innerHTML = 'Not Valide';
            console.log('not ok');
        }
    }

}

formulaire();

let boutonformulaire = document.querySelector('#order');

console.log(boutonformulaire);

boutonformulaire.addEventListener('click', (event) => {
    event.preventDefault();
let product = JSON.parse(localStorage.getItem('products'));
    let firstName = document.getElementById('firstName');
    let lastName = document.getElementById('lastName');
    let address = document.getElementById('address');
    let city = document.getElementById('city');
    let email = document.getElementById('email');

    let product_id = [];
    for (let h = 0; h < product.length; h++) {
        product_id.push(product[h].id)
    }

        const order = {
    contact:
    {
                firstName: firstName.value,
                lastName: lastName.value,
                address: address.value,
                city: city.value,
                email: email.value,
            },
            products: product_id,
    }

    localStorage.setItem('contact', JSON.stringify(order));
    
console.log(product_id);
    console.log(order);
    
    const option = {
        method: 'POST',
        body: JSON.stringify(order),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    };

    console.log(option);

    fetch('http://localhost:3000/api/products/order', option)
        .then((res) => res.json())
        .then((data) => {
            console.log(data),
            localStorage.setItem('orderId', data.orderId),
                console.log(data.orderId);
        
        document.location.href= "confirmation.html"})

})