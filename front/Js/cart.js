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

    let div6 = document.createElement('div');
    div6.classList.add('cart__item__content__settings__delete');

    let p4 = document.createElement('p');
    p4.classList.add('deleteItem');
    p4.textContent = "Supprimer";

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
    //**Suppression des articles**/
    function Suppression() {
        let buttonSupp = document.querySelectorAll('.deleteItem');
        console.log(buttonSupp);

        for (let i = 0; i < buttonSupp.length; i++) {
            buttonSupp[i].addEventListener('click', (e) => {
                console.log(e);

                let product = JSON.parse(localStorage.getItem('products'));

                let parent = e.target.closest('[data-id]');

                newproduct = product.filter(
                    (product) =>
                        product.id !== parent.dataset.id ||
                        product.color !== parent.dataset.color
                );

                console.log(newproduct);


                parent.remove();
                alert('Ce produit à bien été supprimé.')
                location.reload();



            })
        }
    }

    Suppression();
    return article;
};

