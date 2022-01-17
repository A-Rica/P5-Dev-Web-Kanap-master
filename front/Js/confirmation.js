function getOrderId() {
    let str = window.location.href;
    let url = new URL(str);
    return url.searchParams.get("orderId");
}
 function confirmation () {
     const numeroCommande = document.getElementById('orderId');
     let order = JSON.parse(localStorage.getItem("contact"));
    console.log(numeroCommande);
   numeroCommande.innerText = getOrderId();
     window.localStorage.removeItem("contact");
     window.localStorage.removeItem("products")
}

 confirmation();

 
