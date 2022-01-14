function getid() {
    let str = window.location.href;
    let url = new URL(str);
    return url.searchParams.get("id");
}


fetch('http://localhost:3000/api/products/' + getid())
    .then((res) => res.json())
    .then((data) => {
        displayProduct(data)
    });

function displayProduct(data) {
    const image = document.createElement('img');
    let itemsimg = document.querySelector('.item__img');
    const nomskanap = document.getElementById('title');
    const prix = document.getElementById('price');
    const description = document.getElementById('description');
    const select = document.getElementById("colors");

    itemsimg.appendChild(image);

    titrepage = data.name;
    document.title = titrepage;
    image.src = data.imageUrl;
    image.alt = data.altTxt;
    nomskanap.innerHTML = data.name;
    prix.innerHTML = data.price;
    description.innerHTML = data.description;
    price = data.price;
    console.log(data.price);
    console.log(data);
    for (let e = 0; e < data.colors.length; e++) {
        let newOption = new Option(data.colors[e]);
        newOption.value = data.colors[e];
        select.options.add(newOption);

    };

    const quantite = document.getElementById('quantity');
    const bouton = document.getElementById('addToCart');
    const confirmation = () => {
        if (window.confirm(`Votre commande est bien ajoutée au panier.`)) {
            window.location.href = "cart.html";
        }
    }
    bouton.addEventListener("click", (event) => {
        setProductPanier();
        confirmation();

    })

}
function setProductPanier() {
    let productStorage = localStorage.getItem("products");
    let panier = [];
    const id = getid();
    const color = document.getElementById("colors").value;
    let quantite = parseInt(document.getElementById("quantity").value);
    if (productStorage) {
        panier = JSON.parse(productStorage);
        let productExiste = false;

        for (product of panier) {
            if (product.color == color && product.id == id) {
                product.quantite += quantite;
                
                productExiste = true;
            }
        }

        if (!productExiste) {
            panier.push(
                {
                    "id": id,
                    "color": color,
                    "quantite": quantite,
                    
                }
            );

        }
    } else {
        panier = [
            {
                "id": id,
                "color": color,
                "quantite": quantite,
               
            }
        ]
    }
    localStorage.setItem('products', JSON.stringify(panier));

}