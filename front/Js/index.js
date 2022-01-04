
fetch('http://localhost:3000/api/products')
  .then((res) => res.json())
  .then((data) => {
    for (product of data) {
      let elementProduct = displayProduct(product);
      const items = document.getElementById('items');
      items.appendChild(elementProduct);
    }
  });

function displayProduct(product) {
  const link = document.createElement('a');
  link.setAttribute('href', './product.html?id=' + product._id);

  const article = document.createElement('article');

  const image = document.createElement('img');
  image.setAttribute('src', product.imageUrl);
  image.setAttribute('alt', product.altTxt);

  const h3 = document.createElement('h3');
  h3.classList.add('productName');
  h3.textContent = product.name;

  const p = document.createElement('p')
  p.classList.add('productDescription');
  p.textContent = product.description;

  article.appendChild(image);
  article.appendChild(h3);
  article.appendChild(p);

  link.appendChild(article);

  return link;
}