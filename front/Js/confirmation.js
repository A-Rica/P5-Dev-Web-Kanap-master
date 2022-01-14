function confirmation () {
    const numeroCommande = document.getElementById('orderId');
    const boncommande = localStorage.getItem('orderId');
    console.log(boncommande);
    numeroCommande.innerText = boncommande;
    localStorage.clear();
}

confirmation();