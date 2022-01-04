//**Récupération de l'url**//

function getId() {
    let str = window.location.href;
    let url = new URL(str);
    return url.searchParams.get('id');
}

//** récuperation produit  API**//

fetch('http://localhost:3000/api/products/' + getId())
    .then((res) => res.json())
    .then((data) => {
        displayProduct(data)
    });

//**mise en place de la page**//

function displayProduct(data) {
    const image = document.createElement('img');
    let itemsimg = document.querySelector('.item__img');
    const nomskanap = document.getElementById('title');
    const prix = document.getElementById('price');
    const description = document.getElementById('description');
    const quantite = document.querySelectorAll('input[name="itemQuantity"]');
    console.log(quantite);

    itemsimg.appendChild(image);

    titrepage = data.name;
    document.title = titrepage;
    image.src = data.imageUrl;
    image.alt = data.altTxt;
    nomskanap.innerHTML = data.name;
    prix.innerHTML = data.price;
    description.innerHTML = data.description;
    console.log(data);
    for (let colors of data.colors) {
        let select = document.createElement('option');
        document.getElementById('colors').appendChild(select);
        select.value = colors;
        select.innerHTML = colors;
    };

    const bouton = document.getElementById('addToCart');

    bouton.addEventListener("click", () => {
        setProductPanier();

    })
}

//**Local Storage**//

function setProductPanier() {
    let productStorage = localStorage.getItem("products");
    let panier = [];
    const id = getId();
    const color = document.getElementById("colors").value;
    let quantite = parseInt(document.getElementById("quantity").value);
    console.log(quantite);
    console.log(color);
    if (productStorage) {
        panier = JSON.parse(productStorage);
        let productExiste = false;

        for (product of panier) {
            if (product.color == color && product.id == id) {
                product.quantite == quantite;
                productExiste = true;
            }
        }

        if (!productExiste) {
            panier.push(
                {
                    "id": id,
                    "color": color,
                    "quantite": quantite
                }
            );

        }
    } else {
        panier = [
            {
                "id": id,
                "color": color,
                "quantite": quantite
            }
        ]
    }
    localStorage.setItem('products', JSON.stringify(panier));

}